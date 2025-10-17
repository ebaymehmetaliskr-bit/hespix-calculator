// File: app/bmi-calculator/page.tsx (Fonksiyonel BMI Hesaplayıcı - Düzeltilmiş)
'use client';

import { useState, useMemo } from 'react';

export default function BMICalculatorPage() {
  const [unitSystem, setUnitSystem] = useState('metric'); // 'metric' or 'imperial'
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [heightInches, setHeightInches] = useState(''); // For imperial feet and inches

  const bmiResult = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const h_in = parseFloat(heightInches);

    if (w > 0 && h > 0) {
      if (unitSystem === 'metric') {
        // BMI = weight (kg) / [height (m)]^2
        const heightInMeters = h / 100;
        return w / (heightInMeters * heightInMeters);
      } else {
        // BMI = 703 * weight (lbs) / [height (in)]^2
        const totalHeightInInches = h * 12 + (h_in || 0);
        if (totalHeightInInches === 0) return null;
        return (w / (totalHeightInInches * totalHeightInInches)) * 703;
      }
    }
    return null;
  }, [weight, height, heightInches, unitSystem]);

  const getBmiCategory = (bmi: number | null) => {
    if (bmi === null) return { category: '', color: 'text-gray-800' };
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-500' };
    if (bmi >= 18.5 && bmi < 25) return { category: 'Normal weight', color: 'text-green-500' };
    if (bmi >= 25 && bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-500' };
  };

  const bmiCategory = getBmiCategory(bmiResult);

  return (
    <>
      <div className="bg-white py-12">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">BMI Calculator</h1>
            
            {/* Unit System Toggle */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-200 p-1 rounded-lg flex space-x-1">
                <button onClick={() => setUnitSystem('metric')} className={`px-4 py-2 rounded-md text-sm font-medium ${unitSystem === 'metric' ? 'bg-white shadow' : 'text-gray-600'}`}>Metric</button>
                <button onClick={() => setUnitSystem('imperial')} className={`px-4 py-2 rounded-md text-sm font-medium ${unitSystem === 'imperial' ? 'bg-white shadow' : 'text-gray-600'}`}>Imperial</button>
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{unitSystem === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{unitSystem === 'metric' ? 'Height (cm)' : 'Height (ft & in)'}</label>
                <div className={`flex items-center space-x-2 ${unitSystem === 'metric' ? 'hidden' : ''}`}>
                    <input type="number" placeholder="ft" value={height} onChange={(e) => setHeight(e.target.value)} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="number" placeholder="in" value={heightInches} onChange={(e) => setHeightInches(e.target.value)} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                 <div className={`${unitSystem === 'imperial' ? 'hidden' : ''}`}>
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
              </div>
            </div>

            {/* Result Display */}
            {bmiResult !== null && (
              <div className="mt-8 text-center bg-indigo-50 p-6 rounded-lg">
                <p className="text-lg text-gray-600">Your BMI is</p>
                <p className="text-5xl font-bold text-indigo-600 my-2">{bmiResult.toFixed(1)}</p>
                <p className={`text-xl font-semibold ${bmiCategory.color}`}>{bmiCategory.category}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Complete SEO Content Section for BMI Calculator */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-gray-700">
          
          {/* Main Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            🧮 BMI Calculator - Free Body Mass Index Calculator & Health Assessment Tool
          </h1>
          
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">📊 What is BMI Calculator?</h2>
            <p className="mb-4 text-lg">
              The <strong>BMI Calculator</strong> (Body Mass Index Calculator) is a free, easy-to-use online tool that helps you determine whether your weight is within a healthy range for your height. BMI is a widely accepted measurement used by healthcare professionals, fitness experts, and individuals worldwide to assess body weight status and potential health risks.
            </p>
            <p className="mb-4">
              BMI calculation is based on a simple mathematical formula that compares your weight to your height, providing an objective assessment of whether you are underweight, normal weight, overweight, or obese. This essential health metric serves as a screening tool to identify potential weight-related health problems in adults.
            </p>
          </div>

          {/* How to Use */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">🚀 How to Use Our BMI Calculator</h2>
            <p className="mb-4">Using our <strong>free BMI calculator</strong> is simple and takes just seconds:</p>
            <ol className="list-decimal list-inside space-y-2 mb-4">
              <li><strong>Select your gender</strong> (Male/Female) - This helps provide more accurate health recommendations</li>
              <li><strong>Enter your height</strong> in feet and inches or centimeters</li>
              <li><strong>Input your current weight</strong> in pounds or kilograms</li>
              <li><strong>Click &quot;Calculate BMI&quot;</strong> to get your instant results</li>
              <li><strong>Review your BMI category</strong> and personalized health recommendations</li>
            </ol>
            <p className="text-sm bg-blue-100 p-3 rounded">
              💡 <strong>Tip:</strong> Our BMI calculator automatically converts between metric and imperial units, making it convenient for users worldwide.
            </p>
          </div>

          {/* BMI Formula */}
          <div className="bg-green-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-green-700 mb-4">🔢 BMI Calculation Formula</h2>
            <p className="mb-4">The BMI formula is straightforward:</p>
            <div className="bg-white p-4 rounded border-l-4 border-green-500 mb-4">
              <p className="text-lg font-bold text-center">BMI = Weight (kg) / Height (m)²</p>
            </div>
            <p className="mb-4">For imperial measurements:</p>
            <div className="bg-white p-4 rounded border-l-4 border-green-500 mb-4">
              <p className="text-lg font-bold text-center">BMI = (Weight in pounds × 703) / (Height in inches)²</p>
            </div>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-green-600">📝 Example BMI Calculation:</h3>
            <ul className="list-disc list-inside space-y-1 bg-white p-4 rounded">
              <li><strong>Person:</strong> 5&apos;9&quot; tall, weighing 150 pounds</li>
              <li><strong>Calculation:</strong> (150 × 703) / (69)² = 105,450 / 4,761 = <span className="text-green-600 font-bold">22.1 BMI</span></li>
              <li><strong>Category:</strong> Normal Weight</li>
            </ul>
          </div>

          {/* BMI Categories */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📈 BMI Categories and Health Implications</h2>
            <p className="mb-6">Understanding your BMI category is crucial for maintaining optimal health:</p>
            
            {/* Underweight */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <h3 className="text-xl font-bold text-blue-700 mb-2">🔵 Underweight (BMI Below 18.5)</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Health Risks:</strong> Malnutrition, weakened immune system, osteoporosis risk</li>
                <li><strong>Recommendations:</strong> Increase caloric intake with nutrient-dense foods, consult healthcare provider</li>
                <li><strong>Action Plan:</strong> Focus on healthy weight gain through balanced nutrition and strength training</li>
              </ul>
            </div>

            {/* Normal Weight */}
            <div className="mb-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <h3 className="text-xl font-bold text-green-700 mb-2">🟢 Normal Weight (BMI 18.5-24.9)</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Health Status:</strong> Ideal weight range for most adults</li>
                <li><strong>Recommendations:</strong> Maintain current weight through balanced diet and regular exercise</li>
                <li><strong>Benefits:</strong> Lower risk of chronic diseases, optimal energy levels, better overall health</li>
              </ul>
            </div>

            {/* Overweight */}
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <h3 className="text-xl font-bold text-yellow-700 mb-2">🟡 Overweight (BMI 25.0-29.9)</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Health Risks:</strong> Increased risk of heart disease, type 2 diabetes, high blood pressure</li>
                <li><strong>Recommendations:</strong> Gradual weight loss through caloric deficit and increased physical activity</li>
                <li><strong>Goal:</strong> Lose 5-10% of body weight to significantly improve health markers</li>
              </ul>
            </div>

            {/* Obese Classes */}
            <div className="mb-6 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
              <h3 className="text-xl font-bold text-red-700 mb-2">🔴 Obese Class I (BMI 30.0-34.9)</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Health Risks:</strong> Significantly elevated risk of cardiovascular disease, diabetes, sleep apnea</li>
                <li><strong>Recommendations:</strong> Structured weight loss program with medical supervision</li>
                <li><strong>Target:</strong> Achieve 5-10% weight reduction within 6 months</li>
              </ul>
            </div>

            <div className="mb-6 p-4 bg-red-100 rounded-lg border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-red-800 mb-2">🔴 Obese Class II (BMI 35.0-39.9)</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Health Risks:</strong> High risk of serious health complications</li>
                <li><strong>Recommendations:</strong> Comprehensive medical intervention, possible medication therapy</li>
                <li><strong>Treatment:</strong> Multi-disciplinary approach including nutrition, exercise, and medical care</li>
              </ul>
            </div>

            <div className="p-4 bg-red-200 rounded-lg border-l-4 border-red-600">
              <h3 className="text-xl font-bold text-red-900 mb-2">🔴 Obese Class III (BMI 40.0+)</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Health Risks:</strong> Extreme risk of life-threatening conditions</li>
                <li><strong>Recommendations:</strong> Immediate medical attention, consider bariatric surgery options</li>
                <li><strong>Priority:</strong> Urgent lifestyle intervention with medical supervision</li>
              </ul>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-purple-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">✨ Benefits of Regular BMI Monitoring</h2>
            <p className="mb-4">Regular BMI calculation offers numerous health benefits:</p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-purple-600 mb-2">🎯 Health Awareness</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li><strong>Early Detection:</strong> Identify weight-related health risks before symptoms appear</li>
                  <li><strong>Trend Tracking:</strong> Monitor weight changes over time</li>
                  <li><strong>Motivation:</strong> Set realistic health and fitness goals</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-purple-600 mb-2">🛡️ Disease Prevention</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li><strong>Diabetes Prevention:</strong> Maintain healthy BMI reduces type 2 diabetes risk by 70%</li>
                  <li><strong>Heart Health:</strong> Normal BMI significantly lowers cardiovascular disease risk</li>
                  <li><strong>Cancer Risk:</strong> Healthy weight reduces risk of various cancers</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-purple-600 mb-2">🏃‍♂️ Fitness Planning</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li><strong>Goal Setting:</strong> Establish realistic weight loss or gain targets</li>
                  <li><strong>Progress Tracking:</strong> Monitor fitness journey effectively</li>
                  <li><strong>Program Adjustment:</strong> Modify diet and exercise plans based on BMI changes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Limitations */}
          <div className="bg-yellow-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-yellow-700 mb-4">⚠️ BMI Limitations and Considerations</h2>
            <p className="mb-4">While BMI is a valuable health screening tool, it has important limitations:</p>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border-l-4 border-yellow-400">
                <h3 className="text-lg font-bold text-yellow-700 mb-2">💪 Muscle Mass Factor</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Athletes:</strong> High muscle mass may result in elevated BMI despite low body fat</li>
                  <li><strong>Bodybuilders:</strong> Muscle weighs more than fat, potentially skewing results</li>
                  <li><strong>Solution:</strong> Consider body composition analysis alongside BMI</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-yellow-400">
                <h3 className="text-lg font-bold text-yellow-700 mb-2">👥 Age & Population Considerations</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Elderly:</strong> BMI ranges may differ for older adults</li>
                  <li><strong>Children:</strong> Special pediatric BMI charts required</li>
                  <li><strong>Pregnant Women:</strong> BMI calculations don&apos;t apply during pregnancy</li>
                  <li><strong>Ethnic Variations:</strong> Different populations may need adjusted thresholds</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="bg-indigo-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">📏 Additional Health Metrics to Consider</h2>
            <p className="mb-4">Complement your BMI calculation with these important health measurements:</p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow border-t-4 border-indigo-400">
                <h3 className="text-lg font-bold text-indigo-600 mb-2">📐 Waist Circumference</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li><strong>Men:</strong> Health risk increases above 40 inches (102 cm)</li>
                  <li><strong>Women:</strong> Health risk increases above 35 inches (88 cm)</li>
                  <li><strong>Importance:</strong> Better predictor of abdominal obesity</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded shadow border-t-4 border-indigo-400">
                <h3 className="text-lg font-bold text-indigo-600 mb-2">🔢 Body Fat Percentage</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li><strong>Men:</strong> Healthy range 10-20%</li>
                  <li><strong>Women:</strong> Healthy range 16-25%</li>
                  <li><strong>Measurement:</strong> Use calipers or bioelectrical impedance</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded shadow border-t-4 border-indigo-400">
                <h3 className="text-lg font-bold text-indigo-600 mb-2">📊 Waist-to-Hip Ratio</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li><strong>Calculation:</strong> Waist ÷ Hip circumference</li>
                  <li><strong>Risk Level:</strong> &gt;0.9 (men) or &gt;0.85 (women)</li>
                  <li><strong>Significance:</strong> Indicates fat distribution pattern</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Weight Management */}
          <div className="bg-teal-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-teal-700 mb-4">🎯 Healthy Weight Management Strategies</h2>
            <p className="mb-4">Achieving and maintaining a healthy BMI requires sustainable lifestyle changes:</p>
            
            <div className="space-y-6">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-teal-600 mb-3">🥗 Nutrition Guidelines</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Balanced Diet:</strong> Include all food groups in appropriate portions</li>
                  <li><strong>Caloric Balance:</strong> Create modest deficit for weight loss (500-750 calories/day)</li>
                  <li><strong>Hydration:</strong> Drink adequate water (8-10 glasses daily)</li>
                  <li><strong>Meal Timing:</strong> Eat regular, well-spaced meals</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-teal-600 mb-3">🏋️‍♀️ Exercise Recommendations</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Cardio:</strong> 150 minutes moderate-intensity or 75 minutes vigorous weekly</li>
                  <li><strong>Strength Training:</strong> 2-3 sessions per week targeting all major muscle groups</li>
                  <li><strong>Flexibility:</strong> Include stretching and mobility work</li>
                  <li><strong>Daily Activity:</strong> Increase steps and reduce sedentary time</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-teal-600 mb-3">🧠 Behavioral Changes</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Sleep Quality:</strong> Aim for 7-9 hours nightly</li>
                  <li><strong>Stress Management:</strong> Practice relaxation techniques</li>
                  <li><strong>Social Support:</strong> Engage family and friends in health journey</li>
                  <li><strong>Professional Help:</strong> Consult healthcare providers when needed</li>
                </ul>
              </div>
            </div>
          </div>

          {/* When to Consult */}
          <div className="bg-red-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-red-700 mb-4">🏥 When to Consult Healthcare Professionals</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded shadow border-l-4 border-red-500">
                <h3 className="text-lg font-bold text-red-700 mb-2">🚨 Immediate Consultation Required</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>BMI above 30 or below 18.5</li>
                  <li>Rapid weight gain or loss (more than 5 pounds/week)</li>
                  <li>Symptoms of metabolic disorders</li>
                  <li>Difficulty losing weight despite lifestyle changes</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded shadow border-l-4 border-orange-400">
                <h3 className="text-lg font-bold text-orange-700 mb-2">📅 Regular Check-ups Recommended</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Annual BMI assessment as part of routine health screening</li>
                  <li>Monitoring during weight loss programs</li>
                  <li>Adjusting health goals based on medical conditions</li>
                  <li>Medication effects on weight and metabolism</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-100 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">❓ Frequently Asked Questions About BMI</h2>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-gray-700 mb-2">Is BMI accurate for everyone?</h3>
                <p className="text-sm">BMI is a screening tool that works well for most adults but may not be accurate for athletes with high muscle mass, elderly individuals, or pregnant women.</p>
              </div>
              
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-gray-700 mb-2">How often should I calculate my BMI?</h3>
                <p className="text-sm">For general health monitoring, calculating BMI monthly is sufficient. During active weight loss or gain periods, weekly calculations can help track progress.</p>
              </div>
              
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-gray-700 mb-2">What&apos;s the ideal BMI for optimal health?</h3>
                <p className="text-sm">Research suggests BMI between 20-25 is associated with lowest mortality risk for most adults, with 22-23 often considered optimal.</p>
              </div>
            </div>
          </div>

          {/* Technology Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">📱 Technology and BMI Tracking</h2>
            <p className="mb-4">Modern technology offers various tools for BMI monitoring:</p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-blue-600 mb-2">📱 Smartphone Apps</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li><strong>Convenience:</strong> Track BMI changes over time</li>
                  <li><strong>Features:</strong> Calorie tracking and exercise logging</li>
                  <li><strong>Privacy:</strong> Choose apps with strong data protection</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-green-600 mb-2">⚖️ Smart Scales</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li><strong>Advanced:</strong> Bioelectrical impedance analysis</li>
                  <li><strong>Tracking:</strong> Automatic long-term trend analysis</li>
                  <li><strong>Family:</strong> Multiple user profiles</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-purple-600 mb-2">⌚ Wearable Tech</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li><strong>Activity:</strong> Monitors physical activity levels</li>
                  <li><strong>Health:</strong> Heart rate and sleep tracking</li>
                  <li><strong>Integration:</strong> Comprehensive health metrics</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-green-700 mb-4">🌟 Conclusion: Your Path to Better Health</h2>
            <p className="mb-4 text-lg">
              Our <strong>BMI Calculator</strong> is more than just a measurement tool—it&apos;s your gateway to better health awareness and improved well-being. By regularly monitoring your BMI and understanding its implications, you can make informed decisions about your diet, exercise, and overall lifestyle.
            </p>
            
            <div className="bg-white p-4 rounded shadow border-l-4 border-green-500 mb-4">
              <p className="mb-2">
                <strong>🎯 Remember:</strong> BMI is one piece of the health puzzle. Combine regular BMI monitoring with:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Healthy eating habits and balanced nutrition</li>
                <li>Regular physical activity and exercise</li>
                <li>Adequate sleep and stress management</li>
                <li>Positive mental health practices</li>
              </ul>
            </div>
            
            <p className="text-center bg-green-100 p-4 rounded font-semibold">
              🚀 <strong>Start your health journey today</strong> with our free BMI calculator and take the first step toward achieving and maintaining your ideal weight for lifelong wellness!
            </p>
          </div>

          {/* Disclaimer */}
          <div className="bg-gray-200 rounded p-4 text-center">
            <p className="text-sm text-gray-600">
              <strong>⚠️ Disclaimer:</strong> This BMI calculator and information are for educational purposes only and should not replace professional medical advice. Always consult with qualified healthcare providers for personalized health recommendations and treatment plans.
            </p>
          </div>
          
        </div>
      </div>
    </>
  );
}