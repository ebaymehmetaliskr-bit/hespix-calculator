// File: app/mortgage-calculator/page.tsx (Fonksiyonel Mortgage Hesaplayıcı)
'use client';

import { useState, useMemo } from 'react';

export default function MortgageCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState('300000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');

  const calculation = useMemo(() => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const years = parseInt(loanTerm);

    if (principal > 0 && annualRate > 0 && years > 0) {
      const monthlyRate = annualRate / 100 / 12;
      const numberOfPayments = years * 12;

      const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
      if (isFinite(monthlyPayment)) {
        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - principal;
        return { monthlyPayment, totalPayment, totalInterest };
      }
    }
    return null;
  }, [loanAmount, interestRate, loanTerm]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <>
      <div className="bg-white py-12">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Mortgage Calculator</h1>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Loan Amount ($)</label>
                <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
                <input type="number" step="0.01" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Loan Term (years)</label>
                <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            </div>

            {calculation && (
              <div className="mt-8">
                <div className="text-center bg-indigo-50 p-6 rounded-lg">
                  <p className="text-lg text-gray-600">Your Estimated Monthly Payment</p>
                  <p className="text-5xl font-bold text-indigo-600 my-2">{formatCurrency(calculation.monthlyPayment)}</p>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Total Interest Paid</p>
                        <p className="text-2xl font-semibold text-gray-800">{formatCurrency(calculation.totalInterest)}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Total Cost of Loan</p>
                        <p className="text-2xl font-semibold text-gray-800">{formatCurrency(calculation.totalPayment)}</p>
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Complete SEO Content Section for Mortgage Calculator */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-gray-700">
            
            {/* Main Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            🏠 Mortgage Calculator - Free Home Loan Payment Calculator 2025
            </h1>
            
            {/* Introduction */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">💰 What is a Mortgage Calculator?</h2>
            <p className="mb-4 text-lg">
                A <strong>Mortgage Calculator</strong> is a free online tool that helps you estimate your monthly home loan payments, total interest costs, and affordability for buying a house in the United States. Our calculator considers your loan amount, interest rate, loan term, property taxes, homeowners insurance, and PMI to provide accurate monthly payment estimates.
            </p>
            <p className="mb-4">
                Whether you&apos;re a first-time homebuyer or looking to refinance your existing mortgage, our mortgage payment calculator provides instant calculations to help you make informed financial decisions about your home purchase.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm">
                🎯 <strong>Quick Fact:</strong> The average American spends 25-30% of their monthly income on housing costs. Our calculator helps you determine if a home fits your budget.
                </p>
            </div>
            </div>

            {/* How to Use */}
            <div className="bg-green-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-green-700 mb-4">🚀 How to Use Our Mortgage Calculator</h2>
            <p className="mb-4">Calculate your mortgage payments in just a few simple steps:</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="bg-white p-4 rounded shadow border-l-4 border-green-400">
                <h3 className="text-lg font-bold text-green-600 mb-3">📊 Basic Information</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li><strong>Home Price:</strong> Enter the purchase price of the home</li>
                    <li><strong>Down Payment:</strong> Input your down payment amount or percentage</li>
                    <li><strong>Loan Term:</strong> Choose 15, 20, or 30-year mortgage</li>
                    <li><strong>Interest Rate:</strong> Enter current mortgage rates</li>
                </ol>
                </div>
                
                <div className="bg-white p-4 rounded shadow border-l-4 border-blue-400">
                <h3 className="text-lg font-bold text-blue-600 mb-3">🏡 Additional Costs</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li><strong>Property Taxes:</strong> Annual property tax amount</li>
                    <li><strong>Home Insurance:</strong> Yearly homeowners insurance</li>
                    <li><strong>PMI:</strong> Private Mortgage Insurance (if down payment &lt; 20%)</li>
                    <li><strong>HOA Fees:</strong> Monthly homeowners association dues</li>
                </ol>
                </div>
            </div>
            
            <div className="bg-green-100 p-4 rounded">
                <p className="text-center">
                <strong>✨ Get instant results</strong> showing your monthly payment, total interest, and loan amortization schedule!
                </p>
            </div>
            </div>

            {/* Understanding Mortgages */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🏠 Understanding Mortgages and Home Loans</h2>
            <p className="mb-6">A mortgage is a loan specifically designed to help you purchase real estate, where the property itself serves as collateral for the loan.</p>
            
            {/* What is a Mortgage */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <h3 className="text-xl font-bold text-blue-700 mb-3">🏦 What is a Mortgage?</h3>
                <p className="mb-3">A mortgage is a secured loan where the lender provides funds to purchase a home, and the borrower agrees to repay the loan over a specified period with interest. The home serves as collateral, meaning the lender can foreclose if payments aren&apos;t made.</p>
                
                <div className="bg-white p-4 rounded border mb-3">
                <h4 className="font-bold mb-2">Key Components of a Mortgage:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Principal:</strong> The loan amount borrowed</li>
                    <li><strong>Interest:</strong> The cost of borrowing money</li>
                    <li><strong>Term:</strong> The length of time to repay (usually 15-30 years)</li>
                    <li><strong>Monthly Payment:</strong> Principal + Interest + Taxes + Insurance (PITI)</li>
                </ul>
                </div>
            </div>

            {/* Types of Mortgages */}
            <div className="mb-8 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                <h3 className="text-xl font-bold text-purple-700 mb-3">📋 Types of Mortgages in the US</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h4 className="text-lg font-bold text-purple-600 mb-2">🔒 Fixed-Rate Mortgages</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>30-Year Fixed:</strong> Most popular, lower monthly payments</li>
                    <li><strong>15-Year Fixed:</strong> Higher payments, less total interest</li>
                    <li><strong>Stability:</strong> Payment remains the same for entire term</li>
                    <li><strong>Predictability:</strong> Easy to budget and plan</li>
                    </ul>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                    <h4 className="text-lg font-bold text-purple-600 mb-2">📈 Adjustable-Rate Mortgages (ARM)</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Initial Period:</strong> Lower fixed rate for first few years</li>
                    <li><strong>Adjustment:</strong> Rate changes based on market conditions</li>
                    <li><strong>5/1 ARM:</strong> Fixed for 5 years, then adjusts annually</li>
                    <li><strong>Risk/Reward:</strong> Lower initial rates but potential increases</li>
                    </ul>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                    <h4 className="text-lg font-bold text-purple-600 mb-2">🇺🇸 Government-Backed Loans</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>FHA Loans:</strong> Low down payment (3.5%), easier qualification</li>
                    <li><strong>VA Loans:</strong> For veterans, no down payment required</li>
                    <li><strong>USDA Loans:</strong> Rural properties, zero down payment</li>
                    <li><strong>Benefits:</strong> Lower credit score requirements</li>
                    </ul>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                    <h4 className="text-lg font-bold text-purple-600 mb-2">💎 Jumbo Loans</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>High-Value Homes:</strong> Exceed conforming loan limits</li>
                    <li><strong>2025 Limit:</strong> $766,550 in most areas</li>
                    <li><strong>Stricter Requirements:</strong> Higher credit scores needed</li>
                    <li><strong>Competitive Rates:</strong> Often similar to conventional loans</li>
                    </ul>
                </div>
                </div>
            </div>

            {/* Mortgage Process */}
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <h3 className="text-xl font-bold text-yellow-700 mb-3">📝 The Mortgage Application Process</h3>
                <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded text-center">
                    <div className="text-2xl mb-2">1️⃣</div>
                    <h4 className="font-bold mb-1">Pre-Qualification</h4>
                    <p className="text-xs">Initial assessment of borrowing capacity</p>
                </div>
                <div className="bg-white p-3 rounded text-center">
                    <div className="text-2xl mb-2">2️⃣</div>
                    <h4 className="font-bold mb-1">Pre-Approval</h4>
                    <p className="text-xs">Detailed financial verification</p>
                </div>
                <div className="bg-white p-3 rounded text-center">
                    <div className="text-2xl mb-2">3️⃣</div>
                    <h4 className="font-bold mb-1">House Hunting</h4>
                    <p className="text-xs">Shop within your approved budget</p>
                </div>
                <div className="bg-white p-3 rounded text-center">
                    <div className="text-2xl mb-2">4️⃣</div>
                    <h4 className="font-bold mb-1">Formal Application</h4>
                    <p className="text-xs">Submit complete loan application</p>
                </div>
                <div className="bg-white p-3 rounded text-center">
                    <div className="text-2xl mb-2">5️⃣</div>
                    <h4 className="font-bold mb-1">Underwriting</h4>
                    <p className="text-xs">Lender reviews and approves loan</p>
                </div>
                <div className="bg-white p-3 rounded text-center">
                    <div className="text-2xl mb-2">6️⃣</div>
                    <h4 className="font-bold mb-1">Closing</h4>
                    <p className="text-xs">Sign documents and get keys</p>
                </div>
                </div>
            </div>
            </div>

            {/* Mortgage Payment Breakdown */}
            <div className="bg-indigo-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">💳 Understanding Your Monthly Mortgage Payment</h2>
            <p className="mb-4">Your monthly mortgage payment consists of several components, commonly referred to as <strong>PITI</strong>:</p>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                <div className="bg-white p-4 rounded shadow border-l-4 border-indigo-400">
                    <h3 className="text-lg font-bold text-indigo-600 mb-2">🏠 Principal & Interest (P&I)</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Principal:</strong> Portion that pays down loan balance</li>
                    <li><strong>Interest:</strong> Cost of borrowing money</li>
                    <li><strong>Amortization:</strong> Early payments are mostly interest</li>
                    <li><strong>Equity Building:</strong> Principal payments build home equity</li>
                    </ul>
                </div>
                
                <div className="bg-white p-4 rounded shadow border-l-4 border-green-400">
                    <h3 className="text-lg font-bold text-green-600 mb-2">🏛️ Property Taxes</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Local Government:</strong> Varies by location</li>
                    <li><strong>Escrow Account:</strong> Lender collects monthly</li>
                    <li><strong>Annual Assessment:</strong> Based on property value</li>
                    <li><strong>Tax Deductible:</strong> Up to $10,000 SALT limit</li>
                    </ul>
                </div>
                </div>
                
                <div className="space-y-4">
                <div className="bg-white p-4 rounded shadow border-l-4 border-red-400">
                    <h3 className="text-lg font-bold text-red-600 mb-2">🛡️ Homeowners Insurance</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Protection:</strong> Covers property damage and liability</li>
                    <li><strong>Required:</strong> Lender requirement for loan approval</li>
                    <li><strong>Coverage Types:</strong> Dwelling, personal property, liability</li>
                    <li><strong>Cost Factors:</strong> Location, home value, coverage amount</li>
                    </ul>
                </div>
                
                <div className="bg-white p-4 rounded shadow border-l-4 border-yellow-400">
                    <h3 className="text-lg font-bold text-yellow-600 mb-2">📋 Private Mortgage Insurance (PMI)</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>When Required:</strong> Down payment less than 20%</li>
                    <li><strong>Cost:</strong> 0.5% to 1% of loan amount annually</li>
                    <li><strong>Cancellation:</strong> When equity reaches 20%</li>
                    <li><strong>Purpose:</strong> Protects lender against default</li>
                    </ul>
                </div>
                </div>
            </div>
            </div>

            {/* Interest Rates and Factors */}
            <div className="bg-teal-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-teal-700 mb-4">📈 Mortgage Interest Rates and Influencing Factors</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-teal-600 mb-3">🎯 Factors Affecting Your Rate</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong>Credit Score:</strong> Higher scores = lower rates</li>
                    <li><strong>Down Payment:</strong> More down = better rates</li>
                    <li><strong>Loan Term:</strong> Shorter terms = lower rates</li>
                    <li><strong>Debt-to-Income Ratio:</strong> Lower DTI = better rates</li>
                    <li><strong>Loan Type:</strong> Conventional vs. government-backed</li>
                    <li><strong>Property Type:</strong> Primary residence vs. investment</li>
                    <li><strong>Location:</strong> State and local market conditions</li>
                    <li><strong>Points:</strong> Pay upfront to reduce rate</li>
                </ul>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-teal-600 mb-3">📊 Current Rate Environment (2025)</h3>
                <div className="space-y-3">
                    <div className="bg-teal-50 p-3 rounded">
                    <h4 className="font-bold mb-1">30-Year Fixed Average</h4>
                    <p className="text-sm">Typically ranges from 6.5% - 7.5%*</p>
                    </div>
                    <div className="bg-teal-50 p-3 rounded">
                    <h4 className="font-bold mb-1">15-Year Fixed Average</h4>
                    <p className="text-sm">Usually 0.5% - 1% lower than 30-year*</p>
                    </div>
                    <div className="bg-teal-50 p-3 rounded">
                    <h4 className="font-bold mb-1">5/1 ARM Average</h4>
                    <p className="text-sm">Often 0.5% - 1% lower initially*</p>
                    </div>
                    <p className="text-xs text-gray-500">*Rates vary by lender and borrower qualifications</p>
                </div>
                </div>
            </div>
            </div>

            {/* Down Payment Guide */}
            <div className="bg-orange-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-orange-700 mb-4">💰 Down Payment Guide and Strategies</h2>
            
            <div className="mb-4">
                <p className="mb-4">Your down payment significantly impacts your monthly payment, interest rate, and overall loan terms:</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded shadow border-t-4 border-green-400">
                <h3 className="text-lg font-bold text-green-600 mb-2">✅ 20% Down Payment</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>No PMI required</li>
                    <li>Better interest rates</li>
                    <li>Lower monthly payments</li>
                    <li>More equity from start</li>
                    <li>Stronger negotiating position</li>
                </ul>
                </div>
                
                <div className="bg-white p-4 rounded shadow border-t-4 border-yellow-400">
                <h3 className="text-lg font-bold text-yellow-600 mb-2">⚡ 10% Down Payment</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>PMI required</li>
                    <li>Conventional loan option</li>
                    <li>Moderate monthly payment</li>
                    <li>Good compromise option</li>
                    <li>Still competitive rates</li>
                </ul>
                </div>
                
                <div className="bg-white p-4 rounded shadow border-t-4 border-blue-400">
                <h3 className="text-lg font-bold text-blue-600 mb-2">🚀 3-5% Down Payment</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>FHA, VA, or conventional</li>
                    <li>Lower upfront costs</li>
                    <li>PMI or funding fee</li>
                    <li>Higher monthly payments</li>
                    <li>Good for first-time buyers</li>
                </ul>
                </div>
            </div>
            
            <div className="bg-orange-100 p-4 rounded">
                <h3 className="text-lg font-bold text-orange-700 mb-2">💡 Down Payment Assistance Programs</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>First-Time Buyer Programs:</strong> State and local grants</li>
                <li><strong>Employer Assistance:</strong> Company-sponsored programs</li>
                <li><strong>Gift Funds:</strong> Family contributions for down payment</li>
                <li><strong>IRA Withdrawals:</strong> First-time buyer exemption</li>
                </ul>
            </div>
            </div>

            {/* Affordability and Qualification */}
            <div className="bg-purple-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">📊 How Much House Can You Afford?</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-purple-600 mb-3">📏 Key Affordability Ratios</h3>
                <div className="space-y-3">
                    <div className="bg-purple-100 p-3 rounded">
                    <h4 className="font-bold mb-1">28% Rule (Front-End Ratio)</h4>
                    <p className="text-sm">Housing costs should not exceed 28% of gross monthly income</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded">
                    <h4 className="font-bold mb-1">36% Rule (Back-End Ratio)</h4>
                    <p className="text-sm">Total debt payments should not exceed 36% of gross monthly income</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded">
                    <h4 className="font-bold mb-1">DTI (Debt-to-Income)</h4>
                    <p className="text-sm">Most lenders prefer DTI below 43% for conventional loans</p>
                    </div>
                </div>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-purple-600 mb-3">💼 Qualification Requirements</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong>Credit Score:</strong> 620+ for conventional, 580+ for FHA</li>
                    <li><strong>Employment History:</strong> 2+ years steady employment</li>
                    <li><strong>Income Documentation:</strong> Pay stubs, tax returns, W-2s</li>
                    <li><strong>Asset Verification:</strong> Bank statements, investment accounts</li>
                    <li><strong>Down Payment:</strong> Verified source of funds</li>
                    <li><strong>Appraisal:</strong> Property value verification</li>
                </ul>
                </div>
            </div>
            </div>

            {/* Refinancing */}
            <div className="bg-cyan-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-cyan-700 mb-4">🔄 Mortgage Refinancing Guide</h2>
            <p className="mb-4">Refinancing can help you lower your monthly payment, reduce total interest, or access home equity:</p>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                <div className="bg-white p-4 rounded shadow border-l-4 border-cyan-400">
                    <h3 className="text-lg font-bold text-cyan-600 mb-2">✅ When to Consider Refinancing</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Interest rates dropped 0.5%+ from your current rate</li>
                    <li>Your credit score improved significantly</li>
                    <li>You want to change loan terms (15 vs 30 year)</li>
                    <li>You need to remove PMI</li>
                    <li>You want cash-out for improvements</li>
                    <li>Switch from ARM to fixed-rate</li>
                    </ul>
                </div>
                
                <div className="bg-white p-4 rounded shadow border-l-4 border-green-400">
                    <h3 className="text-lg font-bold text-green-600 mb-2">💰 Types of Refinancing</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Rate-and-Term:</strong> Change rate or loan term</li>
                    <li><strong>Cash-Out:</strong> Take equity as cash</li>
                    <li><strong>Cash-In:</strong> Pay down principal</li>
                    <li><strong>Streamline:</strong> Simplified process for existing borrowers</li>
                    </ul>
                </div>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-cyan-600 mb-3">📝 Refinancing Costs</h3>
                <ul className="list-disc list-inside space-y-2 text-sm mb-4">
                    <li><strong>Application Fee:</strong> $300-500</li>
                    <li><strong>Appraisal:</strong> $400-600</li>
                    <li><strong>Credit Report:</strong> $25-50</li>
                    <li><strong>Title Search:</strong> $200-400</li>
                    <li><strong>Attorney/Closing:</strong> $500-1,000</li>
                    <li><strong>Recording Fees:</strong> $50-250</li>
                </ul>
                <div className="bg-cyan-100 p-3 rounded">
                    <p className="text-sm"><strong>Total Costs:</strong> Typically 2-5% of loan amount</p>
                    <p className="text-sm"><strong>Break-Even:</strong> Calculate months to recoup costs</p>
                </div>
                </div>
            </div>
            </div>

            {/* Tips for First-Time Buyers */}
            <div className="bg-yellow-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-yellow-700 mb-4">🏠 Tips for First-Time Home Buyers</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-bold text-yellow-600 mb-2">📋 Before You Start</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Check and improve your credit score</li>
                    <li>Save for down payment and closing costs</li>
                    <li>Reduce existing debt</li>
                    <li>Gather financial documents</li>
                    <li>Research neighborhoods and prices</li>
                    <li>Get pre-approved for mortgage</li>
                    </ul>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-bold text-yellow-600 mb-2">🔍 During House Hunting</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Stay within your approved budget</li>
                    <li>Consider total monthly costs (PITI + HOA)</li>
                    <li>Factor in maintenance and repairs</li>
                    <li>Research schools and amenities</li>
                    <li>Get professional home inspection</li>
                    <li>Negotiate based on market conditions</li>
                    </ul>
                </div>
                </div>
                
                <div className="space-y-4">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-bold text-yellow-600 mb-2">💡 Money-Saving Tips</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Shop multiple lenders for best rates</li>
                    <li>Consider points if staying long-term</li>
                    <li>Look into first-time buyer programs</li>
                    <li>Time your rate lock strategically</li>
                    <li>Negotiate closing costs with seller</li>
                    <li>Consider smaller starter home</li>
                    </ul>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-bold text-yellow-600 mb-2">⚠️ Common Mistakes to Avoid</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Shopping for homes before pre-approval</li>
                    <li>Making major purchases before closing</li>
                    <li>Forgetting about closing costs</li>
                    <li>Skipping home inspection</li>
                    <li>Not shopping around for rates</li>
                    <li>Stretching budget to maximum</li>
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
                <h3 className="text-lg font-bold text-gray-700 mb-2">What credit score do I need for a mortgage?</h3>
                <p className="text-sm">For conventional loans, most lenders prefer a credit score of 620 or higher. FHA loans may accept scores as low as 580 with a 3.5% down payment, or 500 with a 10% down payment.</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-gray-700 mb-2">How much should I put down on a house?</h3>
                <p className="text-sm">While 20% down is ideal to avoid PMI, many programs allow 3-5% down. The right amount depends on your financial situation, loan type, and market conditions.</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-gray-700 mb-2">What&apos;s the difference between APR and interest rate?</h3>
                <p className="text-sm">The interest rate is the cost of borrowing the principal. APR (Annual Percentage Rate) includes the interest rate plus other costs like points, fees, and closing costs, giving you the true cost of the loan.</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-gray-700 mb-2">How long does the mortgage process take?</h3>
                <p className="text-sm">From application to closing typically takes 30-45 days. Pre-approval can be done in 1-3 days, while underwriting and final approval usually takes 2-3 weeks.</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-gray-700 mb-2">Can I pay off my mortgage early?</h3>
                <p className="text-sm">Yes, most mortgages allow early payoff without penalty. You can make extra principal payments, bi-weekly payments, or a lump sum to reduce the loan term and total interest paid.</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-gray-700 mb-2">What happens if I miss a mortgage payment?</h3>
                <p className="text-sm">Missing one payment typically results in a late fee. Multiple missed payments can lead to default and foreclosure proceedings. Contact your lender immediately if you&apos;re having payment difficulties.</p>
                </div>
            </div>
            </div>

            {/* Market Trends 2025 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">📈 2025 Mortgage Market Trends and Outlook</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-indigo-600 mb-3">🔮 Market Predictions</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong>Interest Rates:</strong> Expected to remain elevated but potentially stabilize</li>
                    <li><strong>Home Prices:</strong> Slower appreciation in most markets</li>
                    <li><strong>Inventory:</strong> Gradual improvement in housing supply</li>
                    <li><strong>First-Time Buyers:</strong> Continued challenges with affordability</li>
                    <li><strong>Refinancing:</strong> Limited activity due to higher rates</li>
                </ul>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-indigo-600 mb-3">💰 Current Market Conditions</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong>Median Home Price:</strong> $400,000+ nationally</li>
                    <li><strong>Average Rate:</strong> 6.5-7.5% for 30-year fixed</li>
                    <li><strong>Monthly Payment:</strong> ~$2,800 for median-priced home</li>
                    <li><strong>Down Payment:</strong> Average 15-20% for buyers</li>
                    <li><strong>Time to Close:</strong> 30-45 days typical</li>
                </ul>
                </div>
            </div>
            
            <div className="bg-indigo-100 p-4 rounded mt-4">
                <p className="text-sm text-center">
                <strong>💡 Strategy Tip:</strong> In today&apos;s market, focus on improving your credit score, saving for a larger down payment, and getting pre-approved to act quickly on good opportunities.
                </p>
            </div>
            </div>

            {/* State-Specific Information */}
            <div className="bg-emerald-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-emerald-700 mb-4">🗺️ State-Specific Mortgage Information</h2>
            <p className="mb-4">Mortgage rules, taxes, and costs can vary significantly by state:</p>
            
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-emerald-600 mb-2">🏖️ High-Cost States</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>California:</strong> Conforming limit up to $1.1M+</li>
                    <li><strong>New York:</strong> High property taxes</li>
                    <li><strong>Hawaii:</strong> Limited inventory, high prices</li>
                    <li><strong>Massachusetts:</strong> Strong buyer protections</li>
                </ul>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-emerald-600 mb-2">🏡 Affordable Markets</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Texas:</strong> No state income tax</li>
                    <li><strong>Florida:</strong> No state income tax</li>
                    <li><strong>Ohio:</strong> Low property taxes</li>
                    <li><strong>Indiana:</strong> Affordable housing costs</li>
                </ul>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-emerald-600 mb-2">📋 Special Programs</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>State Bond Programs:</strong> Below-market rates</li>
                    <li><strong>Down Payment Assistance:</strong> Local grants</li>
                    <li><strong>First-Time Buyer:</strong> Special loan programs</li>
                    <li><strong>Rural Areas:</strong> USDA loan eligibility</li>
                </ul>
                </div>
            </div>
            </div>

            {/* Calculator Benefits */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">🌟 Why Use Our Mortgage Calculator?</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="text-lg font-bold text-purple-600 mb-2">Instant Results</h3>
                <p className="text-sm">Get immediate payment calculations as you adjust loan parameters</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow text-center">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="text-lg font-bold text-purple-600 mb-2">Accurate Calculations</h3>
                <p className="text-sm">Industry-standard formulas ensure precise payment estimates</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow text-center">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="text-lg font-bold text-purple-600 mb-2">Detailed Breakdown</h3>
                <p className="text-sm">See principal, interest, taxes, and insurance separately</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow text-center">
                <div className="text-3xl mb-2">📱</div>
                <h3 className="text-lg font-bold text-purple-600 mb-2">Mobile Optimized</h3>
                <p className="text-sm">Works perfectly on smartphones, tablets, and computers</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow text-center">
                <div className="text-3xl mb-2">🆓</div>
                <h3 className="text-lg font-bold text-purple-600 mb-2">Always Free</h3>
                <p className="text-sm">No registration required, unlimited calculations</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow text-center">
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="text-lg font-bold text-purple-600 mb-2">Private & Secure</h3>
                <p className="text-sm">Your financial information stays on your device</p>
                </div>
            </div>
            </div>

            {/* Related Tools */}
            <div className="bg-slate-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-700 mb-4">🔧 Related Financial Calculators</h2>
            <p className="mb-4">Explore our comprehensive suite of financial planning tools:</p>
            
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow border-l-4 border-blue-400">
                <h3 className="text-lg font-bold text-blue-600 mb-2">🏠 Home Buying Tools</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Affordability Calculator:</strong> How much house can you afford?</li>
                    <li><strong>Rent vs Buy Calculator:</strong> Should you rent or purchase?</li>
                    <li><strong>Closing Cost Calculator:</strong> Estimate your closing expenses</li>
                    <li><strong>Property Tax Calculator:</strong> Calculate annual property taxes</li>
                </ul>
                </div>
                
                <div className="bg-white p-4 rounded shadow border-l-4 border-green-400">
                <h3 className="text-lg font-bold text-green-600 mb-2">💰 Loan Calculators</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Refinance Calculator:</strong> Should you refinance?</li>
                    <li><strong>Extra Payment Calculator:</strong> Pay off mortgage early</li>
                    <li><strong>ARM Calculator:</strong> Adjustable-rate mortgage payments</li>
                    <li><strong>PMI Calculator:</strong> Private mortgage insurance costs</li>
                </ul>
                </div>
            </div>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-green-700 mb-4">🎉 Start Your Home Buying Journey Today!</h2>
            <p className="mb-4 text-lg">
                Our <strong>Mortgage Calculator</strong> is your essential first step toward homeownership. Whether you&apos;re buying your first home, upgrading to a larger property, or refinancing your current mortgage, accurate payment calculations help you make confident financial decisions.
            </p>
            
            <div className="bg-white p-4 rounded shadow border-l-4 border-green-500 mb-4">
                <p className="mb-2">
                <strong>🚀 Ready to calculate your mortgage payment?</strong> Use our calculator to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm grid md:grid-cols-2 gap-2">
                <li>Estimate monthly payments accurately</li>
                <li>Compare different loan scenarios</li>
                <li>Plan your home buying budget</li>
                <li>Understand total interest costs</li>
                <li>Evaluate refinancing options</li>
                <li>See payment breakdowns (PITI)</li>
                <li>Factor in PMI and other costs</li>
                <li>Make informed financial decisions</li>
                </ul>
            </div>
            
            <div className="text-center bg-green-100 p-4 rounded">
                <p className="font-semibold">
                🏠 <strong>Your Dream Home Awaits:</strong> Calculate your mortgage payment above and take the first step toward homeownership!
                </p>
            </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-gray-200 rounded p-4 text-center">
            <p className="text-sm text-gray-600">
                <strong>⚠️ Disclaimer:</strong> This mortgage calculator provides estimates for informational purposes only. Actual loan terms, rates, and payments may vary based on your creditworthiness, lender requirements, and current market conditions. Always consult with qualified mortgage professionals and lenders for personalized advice and official loan quotes.
            </p>
            </div>
            
        </div>
        </div>
    </>
  );
}