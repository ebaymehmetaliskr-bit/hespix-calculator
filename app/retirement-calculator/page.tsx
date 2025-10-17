'use client';

import { useState, useMemo } from 'react';
import { TrendingUp, AlertCircle, CheckCircle2, PiggyBank } from 'lucide-react';

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [currentSavings, setCurrentSavings] = useState('50000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [annualReturn, setAnnualReturn] = useState('7');
  const [inflationRate, setInflationRate] = useState('3');

  const calculations = useMemo(() => {
    const age = parseFloat(currentAge);
    const retAge = parseFloat(retirementAge);
    const savings = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const returnRate = parseFloat(annualReturn) / 100;
    const inflation = parseFloat(inflationRate) / 100;

    if (age > 0 && retAge > age && returnRate >= 0) {
      const years = retAge - age;
      const monthlyRate = returnRate / 12;
      const months = years * 12;

      // Future value of current savings
      const futureValueSavings = savings * Math.pow(1 + returnRate, years);

      // Future value of monthly contributions
      let futureValueContributions = 0;
      if (monthly > 0 && monthlyRate > 0) {
        futureValueContributions = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      }

      const totalAtRetirement = futureValueSavings + futureValueContributions;
      const totalContributed = savings + (monthly * 12 * years);
      const totalGrowth = totalAtRetirement - totalContributed;

      // Adjusted for inflation
      const inflationAdjusted = totalAtRetirement / Math.pow(1 + inflation, years);

      // Estimated monthly income (4% rule)
      const monthlyIncome = (totalAtRetirement * 0.04) / 12;
      const monthlyIncomeInflationAdjusted = (inflationAdjusted * 0.04) / 12;

      return {
        totalAtRetirement,
        totalContributed,
        totalGrowth,
        years,
        inflationAdjusted,
        monthlyIncome,
        monthlyIncomeInflationAdjusted,
        percentageGrowth: ((totalGrowth / totalContributed) * 100).toFixed(1)
      };
    }

    return {
      totalAtRetirement: 0,
      totalContributed: 0,
      totalGrowth: 0,
      years: 0,
      inflationAdjusted: 0,
      monthlyIncome: 0,
      monthlyIncomeInflationAdjusted: 0,
      percentageGrowth: '0'
    };
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn, inflationRate]);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleInputChange = (value: string, min = 0) => {
    const num = parseFloat(value);
    return isNaN(num) ? '' : Math.max(min, num).toString();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-emerald-50 to-white border-b border-emerald-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            🏖️ Retirement Calculator - Plan Your Future 2025
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            Calculate how much you need to retire comfortably. See your retirement savings grow and plan for financial independence with confidence.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Calculator Panel - Sticky */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-4 border border-emerald-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Calculate Your Future</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Current Age
                </label>
                <input
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(handleInputChange(e.target.value, 18))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <p className="text-xs text-slate-500 mt-1">18 - 80 years</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Retirement Age
                </label>
                <input
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(handleInputChange(e.target.value, 50))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <p className="text-xs text-slate-500 mt-1">Typical: 62-67 years</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Current Savings
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <input
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(handleInputChange(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Total retirement savings</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Monthly Contribution
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(handleInputChange(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">How much you&apos;ll add monthly</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Annual Return Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(handleInputChange(e.target.value))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">%</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Typical: 6-10% for stocks</p>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Inflation Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(handleInputChange(e.target.value))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">%</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Historical avg: 2-3%</p>
              </div>

              {calculations.totalAtRetirement > 0 && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200">
                    <p className="text-sm text-slate-600 font-medium">Total at Retirement</p>
                    <p className="text-3xl font-bold text-emerald-600 mt-1">
                      {formatCurrency(calculations.totalAtRetirement)}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      In {calculations.years} years
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-600 font-medium">Total Growth</p>
                      <p className="text-lg font-bold text-slate-900 mt-1">
                        {formatCurrency(calculations.totalGrowth)}
                      </p>
                      <p className="text-xs text-emerald-600 font-semibold">
                        +{calculations.percentageGrowth}%
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-600 font-medium">Monthly Income</p>
                      <p className="text-lg font-bold text-slate-900 mt-1">
                        {formatCurrency(calculations.monthlyIncome)}
                      </p>
                      <p className="text-xs text-slate-600">
                        4% rule
                      </p>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                    <p className="text-xs text-slate-600 font-medium">Inflation-Adjusted Value</p>
                    <p className="text-xl font-bold text-slate-900 mt-1">
                      {formatCurrency(calculations.inflationAdjusted)}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      In today&apos;s dollars
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Results Interpretation */}
            {calculations.totalAtRetirement > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <div className="flex gap-3">
                  <CheckCircle2 className="text-emerald-600 flex-shrink-0 w-5 h-5 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Your Retirement Outlook</h3>
                    <p className="text-slate-700 text-sm">
                      In <strong>{calculations.years} years</strong>, you&apos;ll have <strong>{formatCurrency(calculations.totalAtRetirement)}</strong> saved. 
                      Using the 4% rule, that provides <strong>{formatCurrency(calculations.monthlyIncome)}/month</strong> in retirement income. 
                      After adjusting for {inflationRate}% inflation, your savings will have the purchasing power of <strong>{formatCurrency(calculations.inflationAdjusted)}</strong> in today&apos;s dollars.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* What is Retirement Calculator */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">🔍 What is a Retirement Calculator?</h2>
              <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
                <p className="text-slate-700">
                  A <strong>Retirement Calculator</strong> is a free online tool that helps you estimate how much money you&apos;ll have saved by retirement, calculate your monthly retirement income, and determine if you&apos;re on track to meet your retirement goals. Our calculator factors in your current savings, monthly contributions, expected investment returns, and inflation to give you a realistic projection.
                </p>
                <p className="text-slate-700">
                  Whether you&apos;re just starting to save in your 20s or approaching retirement in your 60s, understanding your retirement trajectory is crucial for financial security. Our calculator helps you visualize the power of compound interest and make informed decisions about your savings strategy.
                </p>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <p className="text-sm text-slate-700">
                    <strong>🎯 Quick Fact:</strong> According to the Federal Reserve, the median retirement savings for Americans aged 55-64 is only $134,000 - far below what most financial advisors recommend. Start planning early to secure your future!
                  </p>
                </div>
              </div>
            </div>

            {/* How to Use */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">🚀 How to Use Our Retirement Calculator</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-bold text-blue-700 mb-3">📊 Enter Your Current Situation</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li><strong>Current Age:</strong> Your age today</li>
                    <li><strong>Retirement Age:</strong> When you plan to retire (62-70 typical)</li>
                    <li><strong>Current Savings:</strong> Total in retirement accounts (401k, IRA, etc.)</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-green-700 mb-3">💰 Add Your Contributions</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li><strong>Monthly Contribution:</strong> How much you&apos;ll save each month</li>
                    <li><strong>Expected Return:</strong> Investment growth rate (6-10% typical)</li>
                    <li><strong>Inflation Rate:</strong> Cost of living increases (2-3% average)</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="text-sm text-slate-700 text-center">
                  <strong>✨ Get instant results</strong> showing your retirement nest egg, monthly income using the 4% rule, and inflation-adjusted purchasing power!
                </p>
              </div>
            </div>

            {/* Retirement Accounts Types */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">🏦 Types of Retirement Accounts in the USA</h2>
              <div className="space-y-4">
                
                {/* 401(k) */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">💼 401(k) Plans</h3>
                  <p className="text-slate-700 mb-4">Employer-sponsored retirement accounts that let you save pre-tax dollars with potential employer matching.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <h4 className="font-bold text-blue-600 mb-2">Traditional 401(k)</h4>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• <strong>Pre-tax contributions:</strong> Reduce taxable income now</li>
                        <li>• <strong>2025 Limit:</strong> $23,000 ($30,500 if 50+)</li>
                        <li>• <strong>Employer Match:</strong> Free money! (typical 3-6%)</li>
                        <li>• <strong>Taxes:</strong> Pay taxes on withdrawals in retirement</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <h4 className="font-bold text-blue-600 mb-2">Roth 401(k)</h4>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• <strong>After-tax contributions:</strong> No upfront tax break</li>
                        <li>• <strong>Same Limits:</strong> $23,000 ($30,500 if 50+)</li>
                        <li>• <strong>Tax-Free Growth:</strong> No taxes on qualified withdrawals</li>
                        <li>• <strong>Best For:</strong> Young workers expecting higher tax brackets</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* IRA */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                  <h3 className="text-xl font-bold text-green-700 mb-3">🏛️ IRA (Individual Retirement Account)</h3>
                  <p className="text-slate-700 mb-4">Personal retirement accounts you can open independently, with tax advantages and investment flexibility.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <h4 className="font-bold text-green-600 mb-2">Traditional IRA</h4>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• <strong>2025 Limit:</strong> $7,000 ($8,000 if 50+)</li>
                        <li>• <strong>Tax Deduction:</strong> May reduce taxable income</li>
                        <li>• <strong>RMD Required:</strong> Withdrawals start at 73</li>
                        <li>• <strong>Flexibility:</strong> Choose your own investments</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <h4 className="font-bold text-green-600 mb-2">Roth IRA</h4>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• <strong>Same Limits:</strong> $7,000 ($8,000 if 50+)</li>
                        <li>• <strong>Tax-Free Withdrawals:</strong> After age 59½</li>
                        <li>• <strong>No RMD:</strong> Keep it growing as long as you want</li>
                        <li>• <strong>Income Limits:</strong> Phaseout at $146K-$161K (single)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Other Plans */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
                  <h3 className="text-xl font-bold text-purple-700 mb-3">📋 Other Retirement Plans</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-purple-200">
                      <h4 className="font-bold text-purple-600 mb-2 text-sm">SEP IRA</h4>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• Self-employed & small business</li>
                        <li>• Up to $69,000 (2025)</li>
                        <li>• Employer contributions only</li>
                        <li>• Easy to set up</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-purple-200">
                      <h4 className="font-bold text-purple-600 mb-2 text-sm">Solo 401(k)</h4>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• Self-employed only</li>
                        <li>• Up to $69,000 (2025)</li>
                        <li>• Employee + employer contributions</li>
                        <li>• Roth option available</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-purple-200">
                      <h4 className="font-bold text-purple-600 mb-2 text-sm">403(b)</h4>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• Non-profit employees</li>
                        <li>• Similar to 401(k)</li>
                        <li>• Same contribution limits</li>
                        <li>• Lower fees often</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* How Much Do You Need */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">💰 How Much Do You Need to Retire?</h2>
              <div className="space-y-4">
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                  <h3 className="font-bold text-amber-700 mb-3">🎯 Common Rules of Thumb</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                      <h4 className="font-bold text-amber-600 mb-2">4% Rule</h4>
                      <p className="text-sm text-slate-700 mb-2">Withdraw 4% of savings annually</p>
                      <div className="bg-amber-50 p-2 rounded text-xs">
                        <strong>Example:</strong> $1M saved = $40K/year income
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                      <h4 className="font-bold text-amber-600 mb-2">25x Rule</h4>
                      <p className="text-sm text-slate-700 mb-2">Save 25x your annual expenses</p>
                      <div className="bg-amber-50 p-2 rounded text-xs">
                        <strong>Example:</strong> $60K expenses = $1.5M needed
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                      <h4 className="font-bold text-amber-600 mb-2">80% Rule</h4>
                      <p className="text-sm text-slate-700 mb-2">Need 80% of pre-retirement income</p>
                      <div className="bg-amber-50 p-2 rounded text-xs">
                        <strong>Example:</strong> $100K salary = $80K/year needed
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                  <h3 className="font-bold text-slate-900 mb-3">📊 Retirement Income Sources</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                      <div>
                        <h4 className="font-bold text-slate-900">Social Security</h4>
                        <p className="text-sm text-slate-700">Average: $1,907/month (2025). Full retirement age: 67 for those born 1960+</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                      <div>
                        <h4 className="font-bold text-slate-900">Personal Savings (401k, IRA)</h4>
                        <p className="text-sm text-slate-700">Most important source. Start early and contribute consistently for maximum growth</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                      <div>
                        <h4 className="font-bold text-slate-900">Pension (If Available)</h4>
                        <p className="text-sm text-slate-700">Less common now. Provides guaranteed monthly income for life</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</div>
                      <div>
                        <h4 className="font-bold text-slate-900">Other Income</h4>
                        <p className="text-sm text-slate-700">Rental properties, part-time work, annuities, or business income</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Strategy */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">📈 Retirement Investment Strategies</h2>
              <div className="space-y-4">
                
                <div className="border border-slate-200 rounded-lg p-5">
                  <h3 className="font-bold text-slate-900 mb-3">🎯 Asset Allocation by Age</h3>
                  <div className="space-y-3">
                    {[
                      { age: '20s-30s', stocks: '90%', bonds: '10%', desc: 'Aggressive growth - maximize long-term returns' },
                      { age: '40s', stocks: '80%', bonds: '20%', desc: 'Growth-focused with slight stability increase' },
                      { age: '50s', stocks: '70%', bonds: '30%', desc: 'Balanced approach as retirement nears' },
                      { age: '60s', stocks: '60%', bonds: '40%', desc: 'Conservative shift to preserve capital' },
                      { age: 'Retired', stocks: '40-50%', bonds: '50-60%', desc: 'Income-focused with stability priority' },
                    ].map((allocation, i) => (
                      <div key={i} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold text-slate-900">{allocation.age}</h4>
                          <div className="text-sm font-semibold text-slate-700">
                            Stocks: {allocation.stocks} / Bonds: {allocation.bonds}
                          </div>
                        </div>
                        <p className="text-sm text-slate-600">{allocation.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-slate-200 rounded-lg p-4">
                    <h3 className="font-bold text-slate-900 mb-3">✅ Do&apos;s</h3>
                    <ul className="text-sm text-slate-700 space-y-2">
                      <li>✓ Start saving as early as possible</li>
                      <li>✓ Max out employer 401(k) match</li>
                      <li>✓ Diversify investments across asset classes</li>
                      <li>✓ Automate your contributions</li>
                      <li>✓ Increase contributions with raises</li>
                      <li>✓ Rebalance portfolio annually</li>
                    </ul>
                  </div>
                  <div className="border border-slate-200 rounded-lg p-4">
                    <h3 className="font-bold text-slate-900 mb-3">❌ Don&apos;ts</h3>
                    <ul className="text-sm text-slate-700 space-y-2">
                      <li>✗ Don&apos;t leave free money (employer match)</li>
                      <li>✗ Don&apos;t panic sell during market drops</li>
                      <li>✗ Don&apos;t try to time the market</li>
                      <li>✗ Don&apos;t cash out early (penalties + taxes)</li>
                      <li>✗ Don&apos;t put all eggs in one basket</li>
                      <li>✗ Don&apos;t ignore fees (they compound!)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Power of Starting Early */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">⏰ The Power of Starting Early</h2>
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-lg p-6">
                <h3 className="font-bold text-slate-900 mb-4">🎯 Example: Starting at 25 vs. Starting at 35</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border-2 border-emerald-400">
                    <h4 className="font-bold text-emerald-600 mb-2">Start at Age 25</h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Monthly contribution: $500</li>
                      <li>• Years investing: 40 years</li>
                      <li>• Total contributed: $240,000</li>
                      <li>• At 7% return: <strong className="text-emerald-600">$1,316,000</strong></li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-2 border-orange-400">
                    <h4 className="font-bold text-orange-600 mb-2">Start at Age 35</h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Monthly contribution: $500</li>
                      <li>• Years investing: 30 years</li>
                      <li>• Total contributed: $180,000</li>
                      <li>• At 7% return: <strong className="text-orange-600">$606,000</strong></li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 bg-emerald-100 p-4 rounded-lg">
                  <p className="text-sm text-slate-900 font-semibold text-center">
                    🚀 Starting 10 years earlier = <strong className="text-emerald-700">$710,000 more</strong> at retirement! That&apos;s the power of compound interest.
                  </p>
                </div>
              </div>
            </div>

            {/* Catch-Up Contributions */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">🏃 Catch-Up Contributions (Age 50+)</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                <p className="text-slate-700 mb-4">If you&apos;re 50 or older, you can make additional &quot;catch-up&quot; contributions to supercharge your retirement savings:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <h3 className="font-bold text-blue-600 mb-2">401(k) Catch-Up</h3>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Regular limit: $23,000 (2025)</li>
                      <li>• Catch-up: +$7,500</li>
                      <li>• <strong>Total: $30,500</strong></li>
                      <li>• Age 60-63: +$11,250 (new for 2025)</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <h3 className="font-bold text-blue-600 mb-2">IRA Catch-Up</h3>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Regular limit: $7,000 (2025)</li>
                      <li>• Catch-up: +$1,000</li>
                      <li>• <strong>Total: $8,000</strong></li>
                      <li>• Applies to Traditional & Roth IRAs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Security */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">🏛️ Understanding Social Security</h2>
              <div className="space-y-4">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                  <h3 className="font-bold text-slate-900 mb-3">When to Claim Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-red-300">
                      <h4 className="font-bold text-red-600 mb-2">Age 62 (Early)</h4>
                      <p className="text-sm text-slate-700 mb-2">Reduced benefit: -30%</p>
                      <div className="bg-red-50 p-2 rounded text-xs">
                        Best if: You need income now or have health concerns
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-300">
                      <h4 className="font-bold text-blue-600 mb-2">Age 67 (Full)</h4>
                      <p className="text-sm text-slate-700 mb-2">100% benefit</p>
                      <div className="bg-blue-50 p-2 rounded text-xs">
                        Best if: You&apos;re ready to retire and want full benefit
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-green-300">
                      <h4 className="font-bold text-green-600 mb-2">Age 70 (Delayed)</h4>
                      <p className="text-sm text-slate-700 mb-2">Increased benefit: +24%</p>
                      <div className="bg-green-50 p-2 rounded text-xs">
                        Best if: You can afford to wait for maximum benefit
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg p-5">
                  <h3 className="font-bold text-slate-900 mb-3">💡 Key Social Security Facts</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• <strong>Average Benefit (2025):</strong> $1,907/month ($22,884/year)</li>
                    <li>• <strong>Maximum Benefit:</strong> $3,822/month at age 67 ($4,873 if wait until 70)</li>
                    <li>• <strong>Based On:</strong> Your 35 highest-earning years</li>
                    <li>• <strong>COLA:</strong> Benefits adjusted annually for inflation</li>
                    <li>• <strong>Taxable:</strong> Up to 85% of benefits may be taxed if other income is high</li>
                    <li>• <strong>Working While Claiming:</strong> Benefits may be reduced if you claim before full retirement age</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">❓ Frequently Asked Questions</h2>
              <div className="space-y-3">
                {[
                  { 
                    q: 'How much should I save for retirement?', 
                    a: 'Financial advisors recommend saving 15% of your gross income for retirement. If your employer matches, include that in the 15%. Start with at least enough to get the full employer match, then increase gradually.' 
                  },
                  { 
                    q: 'What\'s a good rate of return for retirement savings?', 
                    a: 'Historically, the stock market has returned about 10% annually before inflation. A conservative estimate is 6-8% for a diversified portfolio. As you near retirement, expect lower returns as you shift to bonds and safer investments.' 
                  },
                  { 
                    q: 'Should I pay off debt or save for retirement?', 
                    a: 'Always get your full employer 401(k) match first - it\'s free money! Then tackle high-interest debt (>6-7%). After that, balance between retirement savings and remaining debt. Don\'t delay retirement savings too long; compound interest is powerful.' 
                  },
                  { 
                    q: 'Can I retire at 55 or 60?', 
                    a: 'Yes, but you\'ll need significant savings. You can\'t claim Social Security until 62, and withdrawing from 401(k)/IRA before 59½ incurs a 10% penalty (with some exceptions). Consider the Rule of 55 for 401(k) withdrawals if you retire at 55+.' 
                  },
                  { 
                    q: 'What happens to my 401(k) if I change jobs?', 
                    a: 'You have options: (1) Leave it with old employer, (2) Roll it over to new employer\'s 401(k), (3) Roll it into an IRA, or (4) Cash out (not recommended - taxes and penalties). Most people roll over to an IRA for more investment options.' 
                  },
                  { 
                    q: 'How does inflation affect my retirement?', 
                    a: 'At 3% inflation, your purchasing power cuts in half every 24 years. $50,000 today will only buy $37,000 worth of goods in 10 years. That\'s why it\'s crucial to keep investing in growth assets and not just hold cash.' 
                  },
                  { 
                    q: 'What is the 4% rule?', 
                    a: 'The 4% rule suggests you can safely withdraw 4% of your retirement savings in the first year, then adjust for inflation each year, with a low risk of running out of money over 30 years. For $1 million saved, that\'s $40,000 in year one.' 
                  },
                  { 
                    q: 'Do I need a financial advisor?', 
                    a: 'Not required, but helpful for complex situations. Robo-advisors offer low-cost automated investing. Consider a fee-only (not commission-based) advisor if you have significant assets, complex tax situations, or need retirement planning help. Many people successfully self-manage with index funds.' 
                  },
                ].map((item, i) => (
                  <div key={i} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                    <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                    <p className="text-slate-700 text-sm">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Section */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">🌟 Why Use Our Retirement Calculator?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: '⚡', title: 'Instant Projections', desc: 'See your retirement future in real-time as you adjust inputs' },
                  { icon: '📊', title: 'Inflation-Adjusted', desc: 'View results in today\'s dollars for realistic planning' },
                  { icon: '💰', title: '4% Rule Built-In', desc: 'Automatically calculates sustainable retirement income' },
                  { icon: '🎯', title: 'Compound Interest', desc: 'Visualize the power of long-term growth' },
                  { icon: '🆓', title: '100% Free', desc: 'No registration, no fees, unlimited calculations' },
                  { icon: '🔒', title: 'Private & Secure', desc: 'All calculations done on your device' },
                ].map((item, i) => (
                  <div key={i} className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-700">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-emerald-700 mb-3">🎉 Start Planning Your Dream Retirement Today!</h2>
              <p className="text-slate-700 mb-4">
                Whether you&apos;re 25 or 55, it&apos;s never too early or too late to plan for retirement. Use our calculator above to see your retirement trajectory and make adjustments to reach your goals!
              </p>
              <div className="bg-white border border-emerald-300 rounded-lg p-4">
                <p className="font-semibold text-slate-900 mb-2">🚀 Take Action Now:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-700">
                  <ul className="space-y-1">
                    <li>✓ Calculate your retirement number</li>
                    <li>✓ Maximize employer 401(k) match</li>
                    <li>✓ Open an IRA if you don&apos;t have one</li>
                    <li>✓ Automate your contributions</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>✓ Diversify your investments</li>
                    <li>✓ Review and rebalance annually</li>
                    <li>✓ Plan for healthcare costs</li>
                    <li>✓ Start today - don&apos;t delay!</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="text-amber-600 flex-shrink-0 w-5 h-5 mt-0.5" />
              <div>
                <p className="text-sm text-slate-700">
                  <strong>⚠️ Disclaimer:</strong> This retirement calculator provides estimates for educational and informational purposes only. Actual investment returns, inflation rates, and retirement outcomes will vary. Past performance does not guarantee future results. This tool does not constitute financial, investment, or tax advice. Consult with qualified financial professionals before making retirement planning decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}