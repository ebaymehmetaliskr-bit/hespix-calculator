'use client';

import { useState, useMemo } from 'react';
import { TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('25000');
  const [interestRate, setInterestRate] = useState('7.5');
  const [loanTerm, setLoanTerm] = useState('5');

  const calculations = useMemo(() => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseFloat(loanTerm) * 12;

    if (principal > 0 && rate > 0 && months > 0) {
      const monthly = (principal * rate) / (1 - Math.pow(1 + rate, -months));
      const total = monthly * months;
      const interest = total - principal;
      return { monthly, total, interest, months };
    }
    return { monthly: 0, total: 0, interest: 0, months: 0 };
  }, [loanAmount, interestRate, loanTerm]);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(num);
  };

  const handleInputChange = (value: string, min = 0) => {
    const num = parseFloat(value);
    return isNaN(num) ? '' : Math.max(min, num).toString();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            💰 Loan Calculator - Free Loan Payment Calculator 2025
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            Calculate your loan payments instantly. See exactly how much you&apos;ll pay in interest and plan your finances with precision. Free, accurate, and easy to use.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Calculator Panel - Sticky */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-4 border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Calculate</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Loan Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(handleInputChange(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">$1,000 - $1,000,000</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Annual Interest Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(handleInputChange(e.target.value))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">%</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Typical: 3% - 36%</p>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Loan Term
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(handleInputChange(e.target.value))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">years</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">1 - 30 years</p>
              </div>

              {calculations.monthly > 0 && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-slate-600 font-medium">Monthly Payment</p>
                    <p className="text-3xl font-bold text-blue-600 mt-1">
                      {formatCurrency(calculations.monthly)}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-600 font-medium">Total Interest</p>
                      <p className="text-lg font-bold text-slate-900 mt-1">
                        {formatCurrency(calculations.interest)}
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-600 font-medium">Total Paid</p>
                      <p className="text-lg font-bold text-slate-900 mt-1">
                        {formatCurrency(calculations.total)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* What This Means */}
            {calculations.monthly > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex gap-3">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 w-5 h-5 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">What Your Payment Means</h3>
                    <p className="text-slate-700 text-sm">
                      You&apos;ll pay <strong>{formatCurrency(calculations.monthly)}</strong> every month for {calculations.months.toLocaleString()} months. 
                      Over the loan&apos;s lifetime, <strong>{((calculations.interest / calculations.total) * 100).toFixed(1)}%</strong> of your total payments go to interest.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* What is a Loan Calculator */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">🔍 What is a Loan Calculator?</h2>
              <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
                <p className="text-slate-700">
                  A <strong>Loan Calculator</strong> is a free online tool that helps you estimate monthly payments, total interest costs, and repayment schedules for various types of loans including personal loans, auto loans, student loans, and business loans. Our calculator considers your loan amount, interest rate, and loan term to provide accurate payment estimates.
                </p>
                <p className="text-slate-700">
                  Whether you&apos;re planning to finance a car, consolidate debt, fund your education, or start a business, our loan payment calculator provides instant calculations to help you make smart borrowing decisions and understand your financial obligations.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-slate-700">
                    <strong>🎯 Quick Fact:</strong> Americans carry over $1.6 trillion in personal loan debt. Our calculator helps you understand the true cost of borrowing before you commit.
                  </p>
                </div>
              </div>
            </div>

            {/* How to Use */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">🚀 How to Use Our Loan Calculator</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-green-700 mb-2">1️⃣ Loan Amount</h3>
                  <p className="text-sm text-slate-700 mb-2">Enter the total amount you want to borrow</p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• Personal: $1K - $50K</li>
                    <li>• Auto: $5K - $100K</li>
                    <li>• Student: $1K - $200K</li>
                    <li>• Business: $5K - $500K+</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-bold text-blue-700 mb-2">2️⃣ Interest Rate</h3>
                  <p className="text-sm text-slate-700 mb-2">Input annual rate (APR)</p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• Personal: 6% - 36%</li>
                    <li>• Auto: 3% - 15%</li>
                    <li>• Student: 4% - 14%</li>
                    <li>• Business: 5% - 30%</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-bold text-purple-700 mb-2">3️⃣ Loan Term</h3>
                  <p className="text-sm text-slate-700 mb-2">Select repayment period</p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• Personal: 1-7 years</li>
                    <li>• Auto: 2-8 years</li>
                    <li>• Student: 5-20 years</li>
                    <li>• Business: 1-25 years</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Types of Loans */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">📋 Types of Loans in the United States</h2>
              <div className="space-y-4">
                
                {/* Personal Loans */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">💳 Personal Loans</h3>
                  <p className="text-slate-700 mb-4">Unsecured loans for debt consolidation, home improvements, medical expenses, or major purchases.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <h4 className="font-bold text-blue-600 mb-2">Secured Personal Loans</h4>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• <strong>Collateral Required:</strong> Car, savings</li>
                        <li>• <strong>Lower Rates:</strong> 5% - 18%</li>
                        <li>• <strong>Higher Amounts:</strong> Up to $100K</li>
                        <li>• <strong>Risk:</strong> Lose collateral if default</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <h4 className="font-bold text-blue-600 mb-2">Unsecured Personal Loans</h4>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• <strong>No Collateral:</strong> Credit-based</li>
                        <li>• <strong>Higher Rates:</strong> 8% - 36%</li>
                        <li>• <strong>Lower Amounts:</strong> $1K - $50K</li>
                        <li>• <strong>Faster:</strong> Less documentation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Auto Loans */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                  <h3 className="text-xl font-bold text-green-700 mb-3">🚗 Auto Loans</h3>
                  <p className="text-slate-700 mb-4">Secured loans for purchasing new or used vehicles, where the car serves as collateral.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-green-200">
                      <h4 className="font-bold text-green-600 mb-2 text-sm">New Car Loans</h4>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• Lower rates (3% - 7%)</li>
                        <li>• Up to 84 months</li>
                        <li>• Better financing</li>
                        <li>• Manufacturer deals</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-green-200">
                      <h4 className="font-bold text-green-600 mb-2 text-sm">Used Car Loans</h4>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• Higher rates (4% - 15%)</li>
                        <li>• 24-72 months</li>
                        <li>• Age/mileage matters</li>
                        <li>• More flexible</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-green-200">
                      <h4 className="font-bold text-green-600 mb-2 text-sm">Refinancing</h4>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• Lower interest rate</li>
                        <li>• Reduce payment</li>
                        <li>• Change term</li>
                        <li>• Save on interest</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Student Loans */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
                  <h3 className="text-xl font-bold text-purple-700 mb-3">🎓 Student Loans</h3>
                  <p className="text-slate-700 mb-4">Education financing for tuition, books, housing, and college expenses.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h4 className="font-bold text-purple-600 mb-2">Federal Student Loans</h4>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• <strong>Subsidized:</strong> No interest in school</li>
                        <li>• <strong>Unsubsidized:</strong> Interest accrues</li>
                        <li>• <strong>Fixed Rates:</strong> 4.99% - 7.54%</li>
                        <li>• <strong>Flexible:</strong> Income-driven plans</li>
                        <li>• <strong>Forgiveness:</strong> Public service</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h4 className="font-bold text-purple-600 mb-2">Private Student Loans</h4>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• <strong>Credit-Based:</strong> Score matters</li>
                        <li>• <strong>Variable Rates:</strong> 4% - 14%</li>
                        <li>• <strong>Higher Limits:</strong> Cost of attendance</li>
                        <li>• <strong>Co-signer:</strong> Better rates</li>
                        <li>• <strong>Less Flexible:</strong> Fewer options</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Business Loans */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
                  <h3 className="text-xl font-bold text-orange-700 mb-3">💼 Business Loans</h3>
                  <p className="text-slate-700 mb-4">Financing for starting, expanding, or managing business operations.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                      <h4 className="font-bold text-orange-600 mb-2">SBA Loans</h4>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• <strong>7(a) Loans:</strong> Up to $5M</li>
                        <li>• <strong>Low Rates:</strong> 6% - 13%</li>
                        <li>• <strong>Long Terms:</strong> Up to 25 years</li>
                        <li>• <strong>Gov Backed:</strong> Easier approval</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                      <h4 className="font-bold text-orange-600 mb-2">Term Loans</h4>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• <strong>Traditional:</strong> Bank loans</li>
                        <li>• <strong>Fixed Payments:</strong> Predictable</li>
                        <li>• <strong>Various Terms:</strong> 1-25 years</li>
                        <li>• <strong>Multiple Uses:</strong> Equipment, etc</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Understanding Loan Terms */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 Understanding Loan Terms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { term: '💵 Principal', def: 'The original amount borrowed, excluding interest and fees. Example: Borrow $10,000 - that\'s your principal.' },
                  { term: '📈 Interest Rate (APR)', def: 'Annual Percentage Rate - yearly borrowing cost including all fees. 10% APR = $1,000/year on $10K loan.' },
                  { term: '⏰ Loan Term', def: 'Length of time to repay the loan in full. Example: 5-year term = 60 monthly payments.' },
                  { term: '💳 Monthly Payment', def: 'Fixed amount paid each month including principal and interest. $10K at 10% for 5 years = ~$212/month.' },
                  { term: '📋 Origination Fee', def: 'Upfront fee charged by lender, typically 1-8% of loan amount.' },
                  { term: '⚠️ Prepayment Penalty', def: 'Fee charged if you pay off the loan before the term ends.' },
                  { term: '💰 Collateral', def: 'Asset securing the loan (car, home, savings). Lender can seize if you default.' },
                  { term: '🤝 Co-signer', def: 'Person who guarantees loan payment if you can\'t pay. Usually has better credit.' },
                ].map((item, i) => (
                  <div key={i} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                    <h3 className="font-bold text-slate-900 mb-2">{item.term}</h3>
                    <p className="text-sm text-slate-700">{item.def}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Factors Affecting Rates */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">✅ Factors Affecting Loan Approval & Rates</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="border border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-900 mb-3">📊 Credit Score Impact</h3>
                  <div className="space-y-2 text-sm">
                    <div className="bg-green-100 p-2 rounded">
                      <strong>Excellent (750+):</strong> Best rates
                    </div>
                    <div className="bg-blue-100 p-2 rounded">
                      <strong>Good (700-749):</strong> Competitive
                    </div>
                    <div className="bg-yellow-100 p-2 rounded">
                      <strong>Fair (650-699):</strong> Average
                    </div>
                    <div className="bg-orange-100 p-2 rounded">
                      <strong>Poor (600-649):</strong> Higher rates
                    </div>
                    <div className="bg-red-100 p-2 rounded">
                      <strong>Bad (&lt;600):</strong> Very high/denial
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-900 mb-3">💼 Income & Employment</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• <strong>Stable Job:</strong> 2+ years preferred</li>
                    <li>• <strong>Income Proof:</strong> Pay stubs, taxes</li>
                    <li>• <strong>DTI Ratio:</strong> Below 43% ideal</li>
                    <li>• <strong>Job Type:</strong> W-2 vs self-employed</li>
                    <li>• <strong>Income Level:</strong> Must support payments</li>
                  </ul>
                </div>

                <div className="border border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-900 mb-3">📋 Other Factors</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• <strong>Loan Purpose:</strong> Affects approval</li>
                    <li>• <strong>Loan Amount:</strong> Higher = higher risk</li>
                    <li>• <strong>Collateral:</strong> Secured = better rates</li>
                    <li>• <strong>Loan Term:</strong> Longer = higher rate</li>
                    <li>• <strong>Payment History:</strong> Past performance</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How to Get Better Rates */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">🏆 How to Get the Best Loan Rates</h2>
              <div className="space-y-3">
                {[
                  { icon: '📈', title: 'Check Credit Score', desc: 'Know where you stand before applying. Each 50-point increase can lower your rate by 0.5%+' },
                  { icon: '💪', title: 'Improve Your Credit', desc: 'Pay down debts, fix errors on credit report. Can save thousands over loan life' },
                  { icon: '🔍', title: 'Shop Multiple Lenders', desc: 'Compare at least 3-5 offers. Rates can vary by 2-3% between lenders' },
                  { icon: '⏰', title: 'Shorten Your Term', desc: '3-year loans often 1-3% lower rates than 7-year loans' },
                  { icon: '🤝', title: 'Add a Co-signer', desc: 'Someone with better credit can reduce your rate by 1-3%' },
                  { icon: '🏦', title: 'Consider Credit Unions', desc: 'Often offer 0.5-1% lower rates than big banks' },
                  { icon: '🔒', title: 'Use Collateral', desc: 'Secured loans can cut rates by 2-5%' },
                  { icon: '💰', title: 'Make Larger Down Payment', desc: 'Reduces risk for lender, may qualify for better terms' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="text-2xl">{item.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-slate-700 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Loan Comparison Table */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">⚖️ Comparing Loan Options</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-slate-300 rounded-lg">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="border border-slate-300 p-3 text-left font-bold text-slate-900">Loan Type</th>
                      <th className="border border-slate-300 p-3 text-left font-bold text-slate-900">Interest Rate</th>
                      <th className="border border-slate-300 p-3 text-left font-bold text-slate-900">Typical Term</th>
                      <th className="border border-slate-300 p-3 text-left font-bold text-slate-900">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[
                      { type: 'Personal Loan', rate: '6% - 36%', term: '1-7 years', best: 'Debt consolidation, emergencies' },
                      { type: 'Auto Loan', rate: '3% - 15%', term: '2-8 years', best: 'Vehicle purchase' },
                      { type: 'Student Loan', rate: '4% - 14%', term: '5-20 years', best: 'Education expenses' },
                      { type: 'Business Loan', rate: '5% - 30%', term: '1-25 years', best: 'Business operations' },
                      { type: 'Credit Card', rate: '15% - 30%', term: 'Revolving', best: 'Short-term, flexible' },
                    ].map((loan, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="border border-slate-300 p-3 font-semibold text-slate-900">{loan.type}</td>
                        <td className="border border-slate-300 p-3 text-slate-700">{loan.rate}</td>
                        <td className="border border-slate-300 p-3 text-slate-700">{loan.term}</td>
                        <td className="border border-slate-300 p-3 text-slate-700">{loan.best}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h3 className="font-bold text-slate-900 mb-2">🎯 Comparison Checklist</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-700">
                  <div>
                    <ul className="space-y-1">
                      <li>✓ Compare APR, not just interest rate</li>
                      <li>✓ Check all fees (origination, late, prepayment)</li>
                      <li>✓ Calculate total cost over loan life</li>
                      <li>✓ Review monthly payment affordability</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-1">
                      <li>✓ Consider loan term flexibility</li>
                      <li>✓ Check for prepayment penalties</li>
                      <li>✓ Read customer reviews and ratings</li>
                      <li>✓ Verify lender legitimacy</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">❓ Frequently Asked Questions</h2>
              <div className="space-y-3">
                {[
                  { 
                    q: 'What credit score do I need to get a loan?', 
                    a: 'It varies by loan type. Personal loans typically need 580-600 minimum, auto loans around 661, and the best rates require 720+. Some lenders work with scores as low as 500 but charge higher interest rates.' 
                  },
                  { 
                    q: 'How much can I borrow with a personal loan?', 
                    a: 'Most personal loans range from $1,000 to $50,000, though some lenders offer up to $100,000. The amount depends on your income, credit score, debt-to-income ratio, and the lender\'s policies.' 
                  },
                  { 
                    q: 'What\'s the difference between APR and interest rate?', 
                    a: 'The interest rate is the cost of borrowing the principal. APR (Annual Percentage Rate) includes the interest rate plus origination fees, closing costs, and other charges, giving you the true annual cost of the loan.' 
                  },
                  { 
                    q: 'Can I pay off my loan early?', 
                    a: 'Most loans allow early payoff, but some charge prepayment penalties (typically 2-5% of remaining balance). Always check your loan agreement. Paying early saves on interest but may trigger penalties.' 
                  },
                  { 
                    q: 'How does a loan affect my credit score?', 
                    a: 'Initially, applying causes a small drop (5-10 points) from the hard inquiry. However, responsible on-time payments improve your score over time by building positive payment history and reducing credit utilization.' 
                  },
                  { 
                    q: 'What happens if I miss a loan payment?', 
                    a: 'Missing one payment typically results in a late fee ($25-40). Payments 30+ days late are reported to credit bureaus, damaging your score. Multiple missed payments can lead to default, collections, and legal action.' 
                  },
                  { 
                    q: 'Should I get a secured or unsecured loan?', 
                    a: 'Secured loans (with collateral) offer lower rates but risk losing the asset. Unsecured loans are faster and safer but have higher rates. Choose secured if you have valuable collateral and need the best rate.' 
                  },
                  { 
                    q: 'How long does it take to get approved for a loan?', 
                    a: 'Online lenders can approve within minutes to 24 hours, with funding in 1-7 days. Traditional banks take 1-2 weeks. Business loans take longer (2-8 weeks). The process is faster with good credit and complete documentation.' 
                  },
                ].map((item, i) => (
                  <div key={i} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                    <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                    <p className="text-slate-700 text-sm">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits of Calculator */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">🌟 Why Use Our Loan Calculator?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: '⚡', title: 'Instant Calculations', desc: 'Get immediate payment estimates as you adjust parameters' },
                  { icon: '🎯', title: 'Accurate Results', desc: 'Industry-standard formulas ensure precise calculations' },
                  { icon: '📊', title: 'Detailed Breakdown', desc: 'See principal, interest, and total cost clearly' },
                  { icon: '📱', title: 'Mobile Friendly', desc: 'Works perfectly on all devices' },
                  { icon: '🆓', title: 'Completely Free', desc: 'No registration, unlimited calculations' },
                  { icon: '🔒', title: '100% Private', desc: 'Your data stays on your device' },
                ].map((item, i) => (
                  <div key={i} className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-700">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-green-700 mb-3">🎉 Make Smart Borrowing Decisions Today!</h2>
              <p className="text-slate-700 mb-4">
                Our <strong>Loan Calculator</strong> is your essential tool for understanding loan costs before you commit. Calculate your payment above and take control of your borrowing decisions!
              </p>
              <div className="bg-white border border-green-300 rounded-lg p-4">
                <p className="font-semibold text-slate-900 mb-2">🚀 Use our calculator to:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-700">
                  <ul className="space-y-1">
                    <li>✓ Estimate accurate monthly payments</li>
                    <li>✓ Compare different loan scenarios</li>
                    <li>✓ Calculate total interest costs</li>
                    <li>✓ Plan your borrowing budget</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>✓ See complete amortization</li>
                    <li>✓ Understand total cost</li>
                    <li>✓ Make informed decisions</li>
                    <li>✓ Save money with planning</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="text-amber-600 flex-shrink-0 w-5 h-5 mt-0.5" />
              <div>
                <p className="text-sm text-slate-700">
                  <strong>⚠️ Disclaimer:</strong> This loan calculator provides estimates for informational and educational purposes only. Actual loan terms, interest rates, and payments may vary based on your creditworthiness, lender requirements, loan type, and current market conditions. The calculator does not constitute financial advice. Always consult with qualified financial professionals and compare multiple lenders before making borrowing decisions. Read all loan agreements carefully before signing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}