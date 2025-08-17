// File: app/percentage-calculator/page.tsx (Fonksiyonel Yüzde Hesaplayıcı)
'use client';

import { useState, useMemo } from 'react';

type CalcMode = 'percentOf' | 'isWhatPercent' | 'change';

export default function PercentageCalculatorPage() {
  const [mode, setMode] = useState<CalcMode>('percentOf');
  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');

  const result = useMemo(() => {
    const a = parseFloat(valueA);
    const b = parseFloat(valueB);

    if (isNaN(a) || isNaN(b)) return null;

    switch (mode) {
      case 'percentOf':
        // What is [a]% of [b]?
        return (a / 100) * b;
      case 'isWhatPercent':
        // [a] is what percent of [b]?
        if (b === 0) return null; // Avoid division by zero
        return (a / b) * 100;
      case 'change':
        // Percentage change from [a] to [b]
        if (a === 0) return null; // Avoid division by zero
        return ((b - a) / a) * 100;
      default:
        return null;
    }
  }, [mode, valueA, valueB]);

  const renderInputs = () => {
    switch (mode) {
      case 'percentOf':
        return (
          <div className="flex items-center space-x-2">
            <input type="number" value={valueA} onChange={(e) => setValueA(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" placeholder="%" />
            <span className="text-gray-600">of</span>
            <input type="number" value={valueB} onChange={(e) => setValueB(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" placeholder="value" />
          </div>
        );
      case 'isWhatPercent':
        return (
          <div className="flex items-center space-x-2">
            <input type="number" value={valueA} onChange={(e) => setValueA(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" placeholder="value" />
            <span className="text-gray-600">is what percent of</span>
            <input type="number" value={valueB} onChange={(e) => setValueB(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" placeholder="value" />
          </div>
        );
      case 'change':
        return (
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">From</span>
            <input type="number" value={valueA} onChange={(e) => setValueA(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" placeholder="initial value" />
            <span className="text-gray-600">to</span>
            <input type="number" value={valueB} onChange={(e) => setValueB(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" placeholder="final value" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-white py-12">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Percentage Calculator</h1>
            
            {/* Mode Tabs */}
            <div className="grid grid-cols-3 gap-1 bg-gray-200 p-1 rounded-lg mb-6">
              <button onClick={() => setMode('percentOf')} className={`px-2 py-2 rounded-md text-sm font-medium ${mode === 'percentOf' ? 'bg-white shadow' : 'text-gray-600'}`}>% of a number</button>
              <button onClick={() => setMode('isWhatPercent')} className={`px-2 py-2 rounded-md text-sm font-medium ${mode === 'isWhatPercent' ? 'bg-white shadow' : 'text-gray-600'}`}>X is % of Y</button>
              <button onClick={() => setMode('change')} className={`px-2 py-2 rounded-md text-sm font-medium ${mode === 'change' ? 'bg-white shadow' : 'text-gray-600'}`}>% Change</button>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              {renderInputs()}
            </div>

            {/* Result Display */}
            {result !== null && (
              <div className="mt-8 text-center bg-indigo-50 p-6 rounded-lg">
                <p className="text-lg text-gray-600">Result</p>
                <p className="text-5xl font-bold text-indigo-600 my-2">
                  {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  {mode !== 'percentOf' && '%'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Complete SEO Content Section for Percentage Calculator */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-gray-700">
            
            {/* Main Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            🧮 Percentage Calculator - Free Online Percentage Calculator Tool
            </h1>
            
            {/* Introduction */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">📊 What is a Percentage Calculator?</h2>
            <p className="mb-4 text-lg">
                A <strong>Percentage Calculator</strong> is a free, easy-to-use online tool that helps you quickly solve various percentage problems. Whether you need to calculate what percentage one number is of another, find a percentage of a number, or determine percentage changes, our calculator provides instant and accurate results for all your mathematical needs.
            </p>
            <p className="mb-4">
                Percentages are fundamental in mathematics and are used in many areas of everyday life, from calculating discounts in stores to understanding statistics in the news. Our percentage calculator provides a simple way to solve various percentage problems without manual calculations.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm">
                💡 <strong>Quick Tip:</strong> Our calculator supports three main types of percentage calculations: finding a percentage of a number, calculating what percentage one number is of another, and determining percentage changes.
                </p>
            </div>
            </div>

            {/* How to Use */}
            <div className="bg-green-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-green-700 mb-4">🚀 How to Use Our Percentage Calculator</h2>
            <p className="mb-4">Using our <strong>free percentage calculator</strong> is simple and intuitive:</p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white p-4 rounded shadow border-t-4 border-green-400">
                <h3 className="text-lg font-bold text-green-600 mb-2">🔢 % of a Number</h3>
                <ol className="list-decimal list-inside text-sm space-y-1">
                    <li>Enter the percentage value</li>
                    <li>Input the number</li>
                    <li>Get instant results</li>
                </ol>
                <p className="text-xs text-gray-500 mt-2">Example: 20% of 150 = 30</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow border-t-4 border-blue-400">
                <h3 className="text-lg font-bold text-blue-600 mb-2">🎯 X is % of Y</h3>
                <ol className="list-decimal list-inside text-sm space-y-1">
                    <li>Enter the first number (X)</li>
                    <li>Input the second number (Y)</li>
                    <li>Calculate the percentage</li>
                </ol>
                <p className="text-xs text-gray-500 mt-2">Example: 30 is 20% of 150</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow border-t-4 border-purple-400">
                <h3 className="text-lg font-bold text-purple-600 mb-2">📈 % Change</h3>
                <ol className="list-decimal list-inside text-sm space-y-1">
                    <li>Enter the initial value</li>
                    <li>Input the final value</li>
                    <li>See percentage increase/decrease</li>
                </ol>
                <p className="text-xs text-gray-500 mt-2">Example: 120 to 150 = 25% increase</p>
                </div>
            </div>
            
            <div className="bg-green-100 p-4 rounded">
                <p className="text-center">
                <strong>✨ All calculations are performed instantly</strong> - No waiting, no complicated formulas to remember!
                </p>
            </div>
            </div>

            {/* Understanding Percentage Calculations */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🧠 Understanding Percentage Calculations</h2>
            <p className="mb-6">Percentages are a fundamental part of mathematics and are used in many areas of everyday life. Let's explore the three main types of percentage calculations:</p>
            
            {/* Type 1: Percentage of a Number */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <h3 className="text-xl font-bold text-blue-700 mb-3">1️⃣ Calculating a Percentage of a Number</h3>
                <p className="mb-3">This is the most common percentage problem. The formula is to convert the percentage to a decimal and multiply it by the number.</p>
                
                <div className="bg-white p-4 rounded border mb-3">
                <p className="font-bold text-center text-lg">Formula: (Percentage / 100) × Number</p>
                </div>
                
                <div className="bg-blue-100 p-3 rounded">
                <p className="font-semibold mb-1">💡 Example: What is 20% of 150?</p>
                <p className="text-sm">Calculation: (20 / 100) × 150 = 30</p>
                <p className="text-sm text-blue-700"><strong>Answer: 30</strong></p>
                </div>
                
                <div className="mt-3 text-sm">
                <p><strong>Common Uses:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Calculating discounts during shopping</li>
                    <li>Determining tax amounts</li>
                    <li>Finding tips at restaurants</li>
                    <li>Computing interest on loans or savings</li>
                </ul>
                </div>
            </div>

            {/* Type 2: What Percentage */}
            <div className="mb-8 p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                <h3 className="text-xl font-bold text-green-700 mb-3">2️⃣ Calculating What Percentage One Number is of Another</h3>
                <p className="mb-3">This calculation is used to express one number as a percentage of another. The formula is to divide the first number by the second and multiply by 100.</p>
                
                <div className="bg-white p-4 rounded border mb-3">
                <p className="font-bold text-center text-lg">Formula: (Part / Whole) × 100</p>
                </div>
                
                <div className="bg-green-100 p-3 rounded">
                <p className="font-semibold mb-1">💡 Example: 30 is what percent of 150?</p>
                <p className="text-sm">Calculation: (30 / 150) × 100 = 20%</p>
                <p className="text-sm text-green-700"><strong>Answer: 20%</strong></p>
                </div>
                
                <div className="mt-3 text-sm">
                <p><strong>Common Uses:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Analyzing test scores and grades</li>
                    <li>Measuring completion rates</li>
                    <li>Calculating market share</li>
                    <li>Determining success rates</li>
                </ul>
                </div>
            </div>

            {/* Type 3: Percentage Change */}
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                <h3 className="text-xl font-bold text-purple-700 mb-3">3️⃣ Calculating Percentage Change</h3>
                <p className="mb-3">This is used to find the percentage increase or decrease from an initial value to a final value. The formula is to divide the difference between values by the initial value and multiply by 100.</p>
                
                <div className="bg-white p-4 rounded border mb-3">
                <p className="font-bold text-center text-lg">Formula: ((Final Value - Initial Value) / Initial Value) × 100</p>
                </div>
                
                <div className="bg-purple-100 p-3 rounded">
                <p className="font-semibold mb-1">💡 Example: What is the percentage change from 120 to 150?</p>
                <p className="text-sm">Calculation: ((150 - 120) / 120) × 100 = 25% increase</p>
                <p className="text-sm text-purple-700"><strong>Answer: 25% increase</strong></p>
                </div>
                
                <div className="mt-3 text-sm">
                <p><strong>Common Uses:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Tracking stock price changes</li>
                    <li>Measuring sales growth</li>
                    <li>Analyzing population changes</li>
                    <li>Comparing performance metrics</li>
                </ul>
                </div>
            </div>
            </div>

            {/* Real-World Applications */}
            <div className="bg-yellow-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-yellow-700 mb-4">🌍 Real-World Applications of Percentage Calculations</h2>
            <p className="mb-4">Percentages are everywhere in our daily lives. Here are some practical applications:</p>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                <div className="bg-white p-4 rounded shadow border-l-4 border-yellow-400">
                    <h3 className="text-lg font-bold text-yellow-700 mb-2">🛒 Shopping & Finance</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Sales Discounts:</strong> Calculate 30% off $80 = $24 savings</li>
                    <li><strong>Tax Calculations:</strong> Find 8.5% sales tax on purchases</li>
                    <li><strong>Tips:</strong> Calculate 18% tip on restaurant bills</li>
                    <li><strong>Interest Rates:</strong> Determine loan payments and savings growth</li>
                    <li><strong>Credit Card Fees:</strong> Understand APR and monthly charges</li>
                    </ul>
                </div>
                
                <div className="bg-white p-4 rounded shadow border-l-4 border-green-400">
                    <h3 className="text-lg font-bold text-green-700 mb-2">📈 Business & Analytics</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Revenue Growth:</strong> Track quarterly performance changes</li>
                    <li><strong>Market Share:</strong> Analyze competitive positioning</li>
                    <li><strong>Conversion Rates:</strong> Measure website and sales effectiveness</li>
                    <li><strong>Profit Margins:</strong> Calculate business profitability</li>
                    <li><strong>Employee Performance:</strong> Evaluate productivity metrics</li>
                    </ul>
                </div>
                </div>
                
                <div className="space-y-4">
                <div className="bg-white p-4 rounded shadow border-l-4 border-blue-400">
                    <h3 className="text-lg font-bold text-blue-700 mb-2">🎓 Education & Statistics</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Test Scores:</strong> Convert raw scores to percentages</li>
                    <li><strong>Grade Calculations:</strong> Determine final course grades</li>
                    <li><strong>Survey Results:</strong> Analyze poll and questionnaire data</li>
                    <li><strong>Research Data:</strong> Present statistical findings</li>
                    <li><strong>Academic Progress:</strong> Track improvement over time</li>
                    </ul>
                </div>
                
                <div className="bg-white p-4 rounded shadow border-l-4 border-red-400">
                    <h3 className="text-lg font-bold text-red-700 mb-2">🏥 Health & Science</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Body Composition:</strong> Calculate body fat percentages</li>
                    <li><strong>Medical Dosages:</strong> Determine medication concentrations</li>
                    <li><strong>Clinical Trials:</strong> Analyze treatment effectiveness</li>
                    <li><strong>Nutrition Labels:</strong> Understand daily value percentages</li>
                    <li><strong>Exercise Progress:</strong> Track fitness improvements</li>
                    </ul>
                </div>
                </div>
            </div>
            </div>

            {/* Advanced Percentage Concepts */}
            <div className="bg-indigo-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">🔬 Advanced Percentage Concepts</h2>
            
            <div className="space-y-6">
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-indigo-600 mb-3">📊 Compound Percentage Changes</h3>
                <p className="mb-2">When dealing with multiple percentage changes, the calculations become more complex:</p>
                <div className="bg-indigo-100 p-3 rounded">
                    <p className="text-sm"><strong>Example:</strong> A price increases by 20%, then decreases by 15%</p>
                    <p className="text-sm">Step 1: $100 + 20% = $120</p>
                    <p className="text-sm">Step 2: $120 - 15% = $102</p>
                    <p className="text-sm font-semibold">Net change: 2% increase (not 5%!)
                    </p>
                </div>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-indigo-600 mb-3">⚖️ Percentage Points vs. Percentage</h3>
                <p className="mb-2">Understanding the difference between percentage points and percentages:</p>
                <div className="bg-indigo-100 p-3 rounded">
                    <p className="text-sm"><strong>Percentage Points:</strong> Interest rate changes from 5% to 7% = 2 percentage point increase</p>
                    <p className="text-sm"><strong>Percentage Change:</strong> Same change = 40% relative increase (2/5 × 100)</p>
                </div>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-indigo-600 mb-3">🎯 Percentage Accuracy and Precision</h3>
                <p className="mb-2">Tips for accurate percentage calculations:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Always use the original values, not rounded intermediates</li>
                    <li>Be careful with negative percentages (decreases)</li>
                    <li>Consider significant figures in your final answer</li>
                    <li>Double-check calculations for financial applications</li>
                </ul>
                </div>
            </div>
            </div>

            {/* Common Mistakes */}
            <div className="bg-red-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-red-700 mb-4">⚠️ Common Percentage Calculation Mistakes</h2>
            <p className="mb-4">Avoid these frequent errors when working with percentages:</p>
            
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow border-l-4 border-red-400">
                <h3 className="text-lg font-bold text-red-600 mb-2">❌ Mistake 1: Reversing Operations</h3>
                <p className="text-sm mb-2"><strong>Wrong:</strong> Adding 20% then subtracting 20% returns to original</p>
                <p className="text-sm"><strong>Correct:</strong> $100 → +20% = $120 → -20% = $96 (not $100!)</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow border-l-4 border-red-400">
                <h3 className="text-lg font-bold text-red-600 mb-2">❌ Mistake 2: Using Wrong Base</h3>
                <p className="text-sm mb-2"><strong>Wrong:</strong> Calculating percentage of the result instead of original</p>
                <p className="text-sm"><strong>Correct:</strong> Always use the appropriate reference value</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow border-l-4 border-red-400">
                <h3 className="text-lg font-bold text-red-600 mb-2">❌ Mistake 3: Forgetting to Convert</h3>
                <p className="text-sm mb-2"><strong>Wrong:</strong> Using 20% directly instead of 0.20 in calculations</p>
                <p className="text-sm"><strong>Correct:</strong> Always divide by 100 to convert percentage to decimal</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow border-l-4 border-red-400">
                <h3 className="text-lg font-bold text-red-600 mb-2">❌ Mistake 4: Rounding Too Early</h3>
                <p className="text-sm mb-2"><strong>Wrong:</strong> Rounding intermediate steps in complex calculations</p>
                <p className="text-sm"><strong>Correct:</strong> Keep full precision until final result</p>
                </div>
            </div>
            </div>

            {/* Tips and Tricks */}
            <div className="bg-teal-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-teal-700 mb-4">💡 Tips and Tricks for Quick Percentage Calculations</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-bold text-teal-600 mb-2">🧠 Mental Math Shortcuts</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>10%:</strong> Move decimal point one place left</li>
                    <li><strong>1%:</strong> Move decimal point two places left</li>
                    <li><strong>5%:</strong> Half of 10%</li>
                    <li><strong>25%:</strong> One quarter (divide by 4)</li>
                    <li><strong>50%:</strong> Half (divide by 2)</li>
                    <li><strong>75%:</strong> Three quarters (3/4)</li>
                    </ul>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-bold text-teal-600 mb-2">📱 Digital Tools</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Use online calculators for complex calculations</li>
                    <li>Smartphone apps for quick percentage solutions</li>
                    <li>Spreadsheet formulas for bulk calculations</li>
                    <li>Financial calculators for investment scenarios</li>
                    </ul>
                </div>
                </div>
                
                <div className="space-y-4">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-bold text-teal-600 mb-2">✅ Verification Methods</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Cross-check with reverse calculations</li>
                    <li>Use estimation to verify reasonableness</li>
                    <li>Compare results with known benchmarks</li>
                    <li>Double-check input values and formulas</li>
                    </ul>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-bold text-teal-600 mb-2">📝 Best Practices</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Always clearly identify what you're calculating</li>
                    <li>Show your work for important calculations</li>
                    <li>Use consistent decimal places in final answers</li>
                    <li>Consider context when interpreting results</li>
                    </ul>
                </div>
                </div>
            </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-100 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">❓ Frequently Asked Questions</h2>
            
            <div className="space-y-4">
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-gray-700 mb-2">What's the difference between percentage and percentile?</h3>
                <p className="text-sm">A <strong>percentage</strong> is a fraction out of 100, while a <strong>percentile</strong> indicates the value below which a certain percentage of data falls in a distribution.</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-gray-700 mb-2">Can percentages be greater than 100%?</h3>
                <p className="text-sm">Yes! Percentages over 100% indicate values greater than the reference amount. For example, a 150% increase means the new value is 2.5 times the original.</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-gray-700 mb-2">How do I calculate percentage with negative numbers?</h3>
                <p className="text-sm">The same formulas apply, but be careful with interpretation. A change from -10 to -5 is a 50% increase (becoming less negative).</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-gray-700 mb-2">Why doesn't a 50% increase followed by a 50% decrease return to the original?</h3>
                <p className="text-sm">Because the base value changes. Example: 100 → +50% = 150 → -50% = 75. The 50% decrease is calculated from 150, not 100.</p>
                </div>
            </div>
            </div>

            {/* Benefits of Using Calculator */}
            <div className="bg-purple-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">🌟 Benefits of Using Our Percentage Calculator</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="text-lg font-bold text-purple-600 mb-2">Lightning Fast</h3>
                <p className="text-sm">Instant calculations with real-time results as you type</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow text-center">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="text-lg font-bold text-purple-600 mb-2">100% Accurate</h3>
                <p className="text-sm">Precise calculations with proper mathematical formulas</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow text-center">
                <div className="text-3xl mb-2">🆓</div>
                <h3 className="text-lg font-bold text-purple-600 mb-2">Completely Free</h3>
                <p className="text-sm">No registration, no limits, no hidden costs</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow text-center">
                <div className="text-3xl mb-2">📱</div>
                <h3 className="text-lg font-bold text-purple-600 mb-2">Mobile Friendly</h3>
                <p className="text-sm">Works perfectly on all devices and screen sizes</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow text-center">
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="text-lg font-bold text-purple-600 mb-2">Privacy Protected</h3>
                <p className="text-sm">No data stored, completely secure calculations</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow text-center">
                <div className="text-3xl mb-2">🎓</div>
                <h3 className="text-lg font-bold text-purple-600 mb-2">Educational</h3>
                <p className="text-sm">Learn while you calculate with detailed explanations</p>
                </div>
            </div>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">🎉 Master Percentage Calculations Today!</h2>
            <p className="mb-4 text-lg">
                Our <strong>Percentage Calculator</strong> is your go-to tool for all percentage-related calculations. Whether you're a student, professional, or just need quick calculations for daily life, we've got you covered with accurate, fast, and free percentage calculations.
            </p>
            
            <div className="bg-white p-4 rounded shadow border-l-4 border-purple-500 mb-4">
                <p className="mb-2">
                <strong>🚀 Ready to start calculating?</strong> Use our calculator above for:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm grid md:grid-cols-2 gap-2">
                <li>Shopping discounts and sales</li>
                <li>Tax and tip calculations</li>
                <li>Business growth analysis</li>
                <li>Academic grade calculations</li>
                <li>Investment returns</li>
                <li>Statistical analysis</li>
                <li>Health and fitness metrics</li>
                <li>Financial planning</li>
                </ul>
            </div>
            
            <div className="text-center bg-purple-100 p-4 rounded">
                <p className="font-semibold">
                💡 <strong>Pro Tip:</strong> Bookmark this page for quick access to reliable percentage calculations anytime, anywhere!
                </p>
            </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-gray-200 rounded p-4 text-center">
            <p className="text-sm text-gray-600">
                <strong>📋 Note:</strong> This percentage calculator is designed for general mathematical calculations. For critical financial, medical, or legal applications, please verify results with professional tools and consult qualified experts.
            </p>
            </div>
            
        </div>
        </div>
    </>
  );
}