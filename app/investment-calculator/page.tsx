'use client';

import { useState, useMemo } from 'react';
import { TrendingUp, AlertCircle, CheckCircle2, DollarSign } from 'lucide-react';

export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState('10000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [investmentYears, setInvestmentYears] = useState('20');
  const [expectedReturn, setExpectedReturn] = useState('8');
  const [compoundFrequency, setCompoundFrequency] = useState('12'); // Monthly

  const calculations = useMemo(() => {
    const initial = parseFloat(initialInvestment);
    const monthly = parseFloat(monthlyContribution);
    const years = parseFloat(investmentYears);
    const annualRate = parseFloat(expectedReturn) / 100;
    const frequency = parseFloat(compoundFrequency);

    if (initial >= 0 && years > 0 && annualRate >= 0 && frequency > 0) {
      const periodicRate = annualRate / frequency;
      const periods = years * frequency;
      
      // Future value of initial investment
      const futureValueInitial = initial * Math.pow(1 + periodicRate, periods);
      
      // Future value of regular contributions
      let futureValueContributions = 0;
      if (monthly > 0) {
        const monthsPerPeriod = 12 / frequency;
        const adjustedMonthly = monthly * monthsPerPeriod;
        futureValueContributions = adjustedMonthly * 
          ((Math.pow(1 + periodicRate, periods) - 1) / periodicRate);
      }
      
      const totalValue = futureValueInitial + futureValueContributions;
      const totalContributed = initial + (monthly * 12 * years);
      const totalGains = totalValue - totalContributed;
      const returnOnInvestment = ((totalGains / totalContributed) * 100).toFixed(1);

      return {
        totalValue,
        totalContributed,
        totalGains,
        returnOnInvestment,
        years
      };
    }

    return {
      totalValue: 0,
      totalContributed: 0,
      totalGains: 0,
      returnOnInvestment: '0',
      years: 0
    };
  }, [initialInvestment, monthlyContribution, investmentYears, expectedReturn, compoundFrequency]);

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
      <div className="bg-gradient-to-b from-blue-50 to-white border-b border-blue-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            📈 Investment Calculator - Grow Your Wealth 2025
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            Calculate your investment returns with compound interest. See how your money grows over time and make smart investing decisions.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Calculator Panel - Sticky */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-4 border border-blue-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Calculate Returns</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Initial Investment
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <input
                    type="number"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(handleInputChange(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Starting amount to invest</p>
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
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Regular monthly additions</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Investment Period
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={investmentYears}
                    onChange={(e) => setInvestmentYears(handleInputChange(e.target.value, 1))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">years</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">How long you&apos;ll invest</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Expected Annual Return
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(handleInputChange(e.target.value))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">%</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">S&P 500 avg: ~10%</p>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Compound Frequency
                </label>
                <select
                  value={compoundFrequency}
                  onChange={(e) => setCompoundFrequency(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1">Annually</option>
                  <option value="2">Semi-Annually</option>
                  <option value="4">Quarterly</option>
                  <option value="12">Monthly</option>
                  <option value="365">Daily</option>
                </select>
                <p className="text-xs text-slate-500 mt-1">How often returns compound</p>
              </div>

              {calculations.totalValue > 0 && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-slate-600 font-medium">Future Value</p>
                    <p className="text-3xl font-bold text-blue-600 mt-1">
                      {formatCurrency(calculations.totalValue)}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      After {calculations.years} years
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-600 font-medium">Total Invested</p>
                      <p className="text-lg font-bold text-slate-900 mt-1">
                        {formatCurrency(calculations.totalContributed)}
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-600 font-medium">Total Gains</p>
                      <p className="text-lg font-bold text-green-600 mt-1">
                        {formatCurrency(calculations.totalGains)}
                      </p>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <p className="text-xs text-slate-600 font-medium">Return on Investment</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                      +{calculations.returnOnInvestment}%
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Results Interpretation */}
            {calculations.totalValue > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex gap-3">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 w-5 h-5 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Your Investment Growth</h3>
                    <p className="text-slate-700 text-sm">
                      Starting with <strong>{formatCurrency(parseFloat(initialInvestment))}</strong> and adding <strong>{formatCurrency(parseFloat(monthlyContribution))}/month</strong> for <strong>{calculations.years} years</strong> at <strong>{expectedReturn}%</strong> annual return, 
                      your investment will grow to <strong>{formatCurrency(calculations.totalValue)}</strong>. That&apos;s a gain of <strong>{formatCurrency(calculations.totalGains)}</strong> ({calculations.returnOnInvestment}% ROI)!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* What is Investment Calculator */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">🔍 What is an Investment Calculator?</h2>
              <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
                <p className="text-slate-700">
                  An <strong>Investment Calculator</strong> is a free online tool that helps you estimate how your investments will grow over time using compound interest. It calculates your future investment value based on your initial deposit, regular contributions, time horizon, and expected rate of return.
                </p>
                <p className="text-slate-700">
                  Whether you&apos;re investing in stocks, bonds, mutual funds, ETFs, or index funds, understanding compound growth is essential for long-term wealth building. Our calculator shows you the power of consistent investing and helps you set realistic financial goals.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-slate-700">
                    <strong>🎯 Quick Fact:</strong> The S&P 500 has historically returned about 10% annually. If you invested $10,000 and added $500/month for 30 years at 10% return, you&apos;d have over $1.1 million!
                  </p>
                </div>
              </div>
            </div>

            {/* How to Use */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">🚀 How to Use Our Investment Calculator</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-green-700 mb-3">📊 Enter Your Investment Details</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li><strong>Initial Investment:</strong> Starting lump sum</li>
                    <li><strong>Monthly Contribution:</strong> Regular additions</li>
                    <li><strong>Investment Period:</strong> Time horizon in years</li>
                    <li><strong>Expected Return:</strong> Annual growth rate</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-bold text-blue-700 mb-3">💰 Typical Return Rates</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li><strong>Stocks (S&P 500):</strong> 10% average</li>
                    <li><strong>Bonds:</strong> 4-6% average</li>
                    <li><strong>Balanced Portfolio:</strong> 7-8% average</li>
                    <li><strong>Savings Account:</strong> 0.5-4% average</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Types of Investments */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">📋 Types of Investments</h2>
              <div className="space-y-4">
                
                {/* Stocks */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">📊 Stocks & Equities</h3>
                  <p className="text-slate-700 mb-4">Ownership shares in publicly traded companies. Highest potential returns but higher volatility.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-blue-200">
                      <h4 className="font-bold text-blue-600 mb-2 text-sm">Individual Stocks</h4>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• Direct company ownership</li>
                        <li>• High risk, high reward</li>
                        <li>• Requires research</li>
                        <li>• Dividends possible</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-200">
                      <h4 className="font-bold text-blue-600 mb-2 text-sm">Index Funds</h4>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• Tracks market index</li>
                        <li>• Low fees (0.03-0.20%)</li>
                        <li>• Instant diversification</li>
                        <li>• Best for beginners</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-200">
                      <h4 className="font-bold text-blue-600 mb-2 text-sm">ETFs</h4>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• Trade like stocks</li>
                        <li>• Diversified basket</li>
                        <li>• Sector/theme focused</li>
                        <li>• Tax efficient</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Bonds */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                  <h3 className="text-xl font-bold text-green-700 mb-3">🏛️ Bonds & Fixed Income</h3>
                  <p className="text-slate-700 mb-4">Loans to governments or corporations. Lower returns but more stable and predictable.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-green-200">
                      <h4 className="font-bold text-green-600 mb-2 text-sm">Government Bonds</h4>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• US Treasury bonds</li>
                        <li>• Safest investment</li>
                        <li>• 3-5% typical yield</li>
                        <li>• Tax advantages</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-green-200">
                      <h4 className="font-bold text-green-600 mb-2 text-sm">Corporate Bonds</h4>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• Company-issued debt</li>
                        <li>• Higher yields (4-7%)</li>
                        <li>• Credit risk varies</li>
                        <li>• Regular interest</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-green-200">
                      <h4 className="font-bold text-green-600 mb-2 text-sm">Bond Funds</h4>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• Diversified bonds</li>
                        <li>• Professional management</li>
                        <li>• Regular income</li>
                        <li>• Lower risk</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Real Estate */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
                  <h3 className="text-xl font-bold text-purple-700 mb-3">🏠 Real Estate</h3>
                  <p className="text-slate-700 mb-4">Property investments for income and appreciation. Tangible assets with tax benefits.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-purple-200">
                      <h4 className="font-bold text-purple-600 mb-2 text-sm">Rental Properties</h4>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• Direct ownership</li>
                        <li>• Monthly rental income</li>
                        <li>• Property appreciation</li>
                        <li>• Tax deductions</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-purple-200">
                      <h4 className="font-bold text-purple-600 mb-2 text-sm">REITs</h4>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• Real Estate Investment Trusts</li>
                        <li>• Stock-like liquidity</li>
                        <li>• 4-8% dividend yields</li>
                        <li>• No property management</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-purple-200">
                      <h4 className="font-bold text-purple-600 mb-2 text-sm">Crowdfunding</h4>
                      <ul className="text-xs text-slate-700 space-y-1">
                        <li>• Pooled investments</li>
                        <li>• Lower entry cost</li>
                        <li>• Commercial properties</li>
                        <li>• Platform fees apply</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Alternative */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
                  <h3 className="text-xl font-bold text-orange-700 mb-3">💎 Alternative Investments</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-orange-200">
                      <h4 className="font-bold text-orange-600 mb-2 text-sm">Commodities</h4>
                      <p className="text-xs text-slate-700">Gold, silver, oil. Inflation hedge, high volatility</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-orange-200">
                      <h4 className="font-bold text-orange-600 mb-2 text-sm">Cryptocurrency</h4>
                      <p className="text-xs text-slate-700">Bitcoin, Ethereum. Very high risk, speculative</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-orange-200">
                      <h4 className="font-bold text-orange-600 mb-2 text-sm">Peer-to-Peer</h4>
                      <p className="text-xs text-slate-700">Lending platforms. 6-12% returns, default risk</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-orange-200">
                      <h4 className="font-bold text-orange-600 mb-2 text-sm">Collectibles</h4>
                      <p className="text-xs text-slate-700">Art, wine, cards. Illiquid, expertise needed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Strategies */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">🎯 Investment Strategies</h2>
              <div className="space-y-4">
                
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                  <h3 className="font-bold text-slate-900 mb-4">Popular Investment Approaches</h3>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-2">💰 Dollar Cost Averaging (DCA)</h4>
                      <p className="text-sm text-slate-700 mb-2">Invest fixed amounts regularly, regardless of market conditions. Reduces timing risk and emotional decisions.</p>
                      <div className="bg-blue-50 p-2 rounded text-xs">
                        <strong>Example:</strong> Invest $500/month every month, whether market is up or down
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-2">📊 Index Fund Investing</h4>
                      <p className="text-sm text-slate-700 mb-2">Buy and hold low-cost index funds that track the entire market. Warren Buffett recommends this for most investors.</p>
                      <div className="bg-green-50 p-2 rounded text-xs">
                        <strong>Example:</strong> 100% S&P 500 index fund (VOO, SPY) or Total Stock Market (VTI)
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-2">🎨 Asset Allocation</h4>
                      <p className="text-sm text-slate-700 mb-2">Diversify across asset classes based on your age, goals, and risk tolerance. Rebalance annually.</p>
                      <div className="bg-purple-50 p-2 rounded text-xs">
                        <strong>Example:</strong> 70% stocks, 25% bonds, 5% cash (moderate risk)
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-2">💎 Value Investing</h4>
                      <p className="text-sm text-slate-700 mb-2">Buy undervalued stocks below intrinsic value. Requires research and patience. Long-term approach.</p>
                      <div className="bg-amber-50 p-2 rounded text-xs">
                        <strong>Example:</strong> Warren Buffett&apos;s strategy - find quality companies trading below worth
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-2">🚀 Growth Investing</h4>
                      <p className="text-sm text-slate-700 mb-2">Focus on companies with high growth potential. Higher risk but potentially higher returns.</p>
                      <div className="bg-red-50 p-2 rounded text-xs">
                        <strong>Example:</strong> Tech stocks, innovative companies, emerging markets
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-2">💵 Dividend Investing</h4>
                      <p className="text-sm text-slate-700 mb-2">Invest in companies that pay regular dividends. Provides passive income and reinvestment opportunities.</p>
                      <div className="bg-emerald-50 p-2 rounded text-xs">
                        <strong>Example:</strong> Dividend Aristocrats - companies with 25+ years of dividend growth
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Management */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">⚖️ Risk Management & Diversification</h2>
              
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                  <h3 className="font-bold text-amber-700 mb-3">🎯 Risk Levels</h3>
                  <div className="space-y-3">
                    {[
                      { level: 'Conservative', allocation: '20% stocks, 70% bonds, 10% cash', return: '4-5%', best: 'Near retirement, low risk tolerance' },
                      { level: 'Moderate', allocation: '60% stocks, 35% bonds, 5% cash', return: '6-7%', best: 'Balanced approach, 10-20 year horizon' },
                      { level: 'Aggressive', allocation: '90% stocks, 10% bonds', return: '8-10%', best: 'Young investors, 20+ year horizon' },
                      { level: 'Very Aggressive', allocation: '100% stocks (growth/small-cap)', return: '10-12%+', best: 'High risk tolerance, long timeline' },
                    ].map((risk, i) => (
                      <div key={i} className="bg-white rounded-lg p-4 border border-amber-200">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-slate-900">{risk.level}</h4>
                          <span className="text-sm font-semibold text-green-600">~{risk.return} annual</span>
                        </div>
                        <p className="text-sm text-slate-700 mb-1"><strong>Allocation:</strong> {risk.allocation}</p>
                        <p className="text-xs text-slate-600"><strong>Best for:</strong> {risk.best}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-slate-200 rounded-lg p-4">
                    <h3 className="font-bold text-slate-900 mb-3">✅ Diversification Rules</h3>
                    <ul className="text-sm text-slate-700 space-y-2">
                      <li>✓ Spread across asset classes</li>
                      <li>✓ Include international exposure</li>
                      <li>✓ Mix of large/mid/small cap</li>
                      <li>✓ Various sectors (tech, healthcare, etc)</li>
                      <li>✓ Different investment types</li>
                      <li>✓ Rebalance annually</li>
                    </ul>
                  </div>
                  
                  <div className="border border-slate-200 rounded-lg p-4">
                    <h3 className="font-bold text-slate-900 mb-3">❌ Common Mistakes</h3>
                    <ul className="text-sm text-slate-700 space-y-2">
                      <li>✗ Panic selling during downturns</li>
                      <li>✗ Trying to time the market</li>
                      <li>✗ Investing in what you don&apos;t understand</li>
                      <li>✗ Following hot tips/trends</li>
                      <li>✗ Ignoring fees (they compound!)</li>
                      <li>✗ Not starting early enough</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Advantages */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">💼 Tax-Advantaged Investing</h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                <h3 className="font-bold text-green-700 mb-4">Best Accounts for Investing</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <h4 className="font-bold text-green-600 mb-2">401(k) / IRA</h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• <strong>Benefit:</strong> Tax-deferred growth</li>
                      <li>• <strong>401(k) Limit:</strong> $23,000 (2025)</li>
                      <li>• <strong>IRA Limit:</strong> $7,000 (2025)</li>
                      <li>• <strong>Ideal for:</strong> Long-term retirement</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <h4 className="font-bold text-green-600 mb-2">Roth IRA / Roth 401(k)</h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• <strong>Benefit:</strong> Tax-free withdrawals</li>
                      <li>• <strong>Contributions:</strong> After-tax dollars</li>
                      <li>• <strong>Growth:</strong> 100% tax-free</li>
                      <li>• <strong>Ideal for:</strong> Young high-earners</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <h4 className="font-bold text-green-600 mb-2">HSA (Health Savings)</h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• <strong>Triple Tax Benefit:</strong> Deduct, grow, withdraw tax-free</li>
                      <li>• <strong>Limit:</strong> $4,150 individual (2025)</li>
                      <li>• <strong>Use:</strong> Medical expenses or retirement</li>
                      <li>• <strong>Bonus:</strong> Acts as retirement account after 65</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <h4 className="font-bold text-green-600 mb-2">Taxable Brokerage</h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• <strong>Flexibility:</strong> No contribution limits</li>
                      <li>• <strong>Access:</strong> Withdraw anytime, no penalties</li>
                      <li>• <strong>Taxes:</strong> Pay capital gains tax</li>
                      <li>• <strong>Ideal for:</strong> After maxing tax-advantaged</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Compound Interest Power */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">🚀 The Power of Compound Interest</h2>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                <p className="text-slate-700 mb-4">
                  Albert Einstein called compound interest &quot;the eighth wonder of the world.&quot; Here&apos;s why it&apos;s so powerful:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-4 border-2 border-blue-400">
                    <h4 className="font-bold text-blue-600 mb-2">Start: Age 25</h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Initial: $10,000</li>
                      <li>• Monthly: $300</li>
                      <li>• Years: 40</li>
                      <li>• Return: 8%</li>
                      <li>• <strong className="text-blue-600">Result: $1,118,000</strong></li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-2 border-orange-400">
                    <h4 className="font-bold text-orange-600 mb-2">Start: Age 35</h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Initial: $10,000</li>
                      <li>• Monthly: $300</li>
                      <li>• Years: 30</li>
                      <li>• Return: 8%</li>
                      <li>• <strong className="text-orange-600">Result: $468,000</strong></li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-2 border-red-400">
                    <h4 className="font-bold text-red-600 mb-2">Start: Age 45</h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Initial: $10,000</li>
                      <li>• Monthly: $300</li>
                      <li>• Years: 20</li>
                      <li>• Return: 8%</li>
                      <li>• <strong className="text-red-600">Result: $188,000</strong></li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-100 p-4 rounded-lg">
                  <p className="text-sm text-slate-900 font-semibold text-center">
                    🎯 Starting 10 years earlier = <strong className="text-blue-700">2.4x more money!</strong> Starting 20 years earlier = <strong className="text-blue-700">6x more!</strong> Time is your greatest asset.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">❓ Frequently Asked Questions</h2>
              <div className="space-y-3">
                {[
                  { 
                    q: 'How much should I invest each month?', 
                    a: 'Financial experts recommend saving/investing 15-20% of your gross income. Start with what you can afford - even $50/month makes a difference over time. Increase contributions as your income grows. Always get your full employer 401(k) match first.' 
                  },
                  { 
                    q: 'What\'s a realistic investment return?', 
                    a: 'The S&P 500 has historically returned about 10% annually over the long term. For planning, conservative estimates use 6-8% to account for inflation and market volatility. Bonds typically return 4-6%. Always remember past performance doesn\'t guarantee future results.' 
                  },
                  { 
                    q: 'Should I invest or pay off debt first?', 
                    a: 'It depends on interest rates. Always get employer 401(k) match first (free money!). Then pay off high-interest debt (>6-7% like credit cards). For low-interest debt (like mortgages), invest while paying minimums - your investment returns likely exceed the interest cost.' 
                  },
                  { 
                    q: 'When should I start investing?', 
                    a: 'NOW! The earlier you start, the more time compound interest has to work. A 25-year-old investing $300/month until 65 at 8% will have $930,000. A 35-year-old with the same plan? Only $388,000. That 10-year head start is worth $542,000!' 
                  },
                  { 
                    q: 'What if the market crashes after I invest?', 
                    a: 'Market crashes are temporary; long-term growth is the norm. Don\'t panic sell - that locks in losses. Continue investing (dollar cost averaging) to buy stocks \"on sale.\" History shows the market always recovers and reaches new highs. Stay invested for 5+ years minimum.' 
                  },
                  { 
                    q: 'Do I need a financial advisor?', 
                    a: 'Not required! Many successful investors self-manage with low-cost index funds. Robo-advisors charge 0.25-0.50% for automated investing. Human advisors (1-2% fees) make sense for complex situations or if you need guidance. Fee-only advisors are better than commission-based.' 
                  },
                  { 
                    q: 'What are the best investments for beginners?', 
                    a: 'Start with low-cost index funds that track the S&P 500 (like VOO, SPY, or VTI). They provide instant diversification, low fees (0.03-0.10%), and match market returns. Most professional investors can\'t beat index funds long-term. Avoid individual stock picking initially.' 
                  },
                  { 
                    q: 'How do I rebalance my portfolio?', 
                    a: 'Once a year, sell overperforming assets and buy underperforming ones to maintain your target allocation. Example: If stocks grew from 70% to 80% of portfolio, sell some stocks and buy bonds to return to 70/30. This forces you to \"buy low, sell high\" systematically.' 
                  },
                ].map((item, i) => (
                  <div key={i} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                    <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                    <p className="text-slate-700 text-sm">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">🌟 Why Use Our Investment Calculator?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: '⚡', title: 'Instant Calculations', desc: 'See your investment growth in real-time' },
                  { icon: '🎯', title: 'Goal Setting', desc: 'Plan for specific financial targets' },
                  { icon: '📊', title: 'Compound Interest', desc: 'Visualize the power of compounding' },
                  { icon: '💰', title: 'Multiple Scenarios', desc: 'Compare different investment strategies' },
                  { icon: '🆓', title: '100% Free', desc: 'No registration or hidden fees' },
                  { icon: '🔒', title: 'Private & Secure', desc: 'All calculations on your device' },
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
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-700 mb-3">🎉 Start Investing in Your Future Today!</h2>
              <p className="text-slate-700 mb-4">
                The best time to start investing was yesterday. The second best time is today. Use our calculator above to see how your money can grow with the power of compound interest!
              </p>
              <div className="bg-white border border-blue-300 rounded-lg p-4">
                <p className="font-semibold text-slate-900 mb-2">🚀 Take Action Now:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-700">
                  <ul className="space-y-1">
                    <li>✓ Calculate your investment potential</li>
                    <li>✓ Open a brokerage account</li>
                    <li>✓ Start with index funds</li>
                    <li>✓ Automate monthly contributions</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>✓ Max out tax-advantaged accounts</li>
                    <li>✓ Diversify your portfolio</li>
                    <li>✓ Stay invested long-term</li>
                    <li>✓ Don&apos;t wait - start today!</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="text-amber-600 flex-shrink-0 w-5 h-5 mt-0.5" />
              <div>
                <p className="text-sm text-slate-700">
                  <strong>⚠️ Disclaimer:</strong> This investment calculator provides estimates for educational purposes only. Past performance does not guarantee future results. Actual investment returns will vary based on market conditions, fees, taxes, and asset allocation. This tool does not constitute financial, investment, or tax advice. All investments carry risk, including potential loss of principal. Consult with qualified financial professionals before making investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}