'use client';

import { useState, useMemo } from 'react';
import { TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
// ... rest of code
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

  const formatCurrency = (num) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(num);

  const handleInputChange = (value, min = 0) => {
    const num = parseFloat(value);
    return isNaN(num) ? '' : Math.max(min, num).toString();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Loan Calculator
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            Calculate your loan payments instantly. See exactly how much you'll pay in interest and plan your finances with precision.
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
                      You'll pay <strong>{formatCurrency(calculations.monthly)}</strong> every month for {calculations.months.toLocaleString()} months. 
                      Over the loan's lifetime, <strong>{((calculations.interest / calculations.total) * 100).toFixed(1)}%</strong> of your total payments go to interest.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* What is a Loan Calculator */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">What is a Loan Calculator?</h2>
              <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
                <p className="text-slate-700">
                  A loan calculator is a free online tool that helps you estimate monthly payments, total interest costs, and repayment schedules for various types of loans including personal loans, auto loans, student loans, and business loans.
                </p>
                <p className="text-slate-700">
                  Whether you're planning to finance a car, consolidate debt, fund your education, or start a business, our calculator provides instant calculations to help you make smart borrowing decisions and understand your financial obligations.
                </p>
                <div className="bg-slate-50 p-4 rounded border border-slate-200">
                  <p className="text-sm text-slate-700">
                    <strong>Quick Fact:</strong> Americans carry over $1.6 trillion in personal loan debt. Our calculator helps you understand the true cost of borrowing before you commit.
                  </p>
                </div>
              </div>
            </div>

            {/* How Loan Payments Work */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How Loan Payments Work</h2>
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-900 mb-2">Monthly Payment Formula</h3>
                  <p className="text-slate-700 text-sm mb-3">
                    Your monthly payment is calculated using an amortization formula. Early in the loan, most of your payment covers interest. As you pay down the principal, more goes toward the amount you borrowed.
                  </p>
                  <div className="bg-slate-50 p-3 rounded font-mono text-xs text-slate-700">
                    Payment = [P × r(1+r)^n] / [(1+r)^n - 1]
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-slate-200 rounded-lg p-4">
                    <h3 className="font-semibold text-slate-900 mb-2">Principal</h3>
                    <p className="text-slate-700 text-sm">
                      The amount you borrow. Everything else is fees and interest on top of this number.
                    </p>
                  </div>
                  <div className="border border-slate-200 rounded-lg p-4">
                    <h3 className="font-semibold text-slate-900 mb-2">Interest Rate (APR)</h3>
                    <p className="text-slate-700 text-sm">
                      Your yearly cost to borrow, including all fees. A lower rate saves thousands over the loan's life.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Types of Loans */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Types of Loans</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Personal Loans', rate: '6% - 36%', term: '1-7 years', best: 'Debt consolidation, emergencies', details: 'Unsecured loans for various purposes' },
                  { name: 'Auto Loans', rate: '3% - 15%', term: '2-8 years', best: 'Vehicle purchase', details: 'Secured by the vehicle' },
                  { name: 'Student Loans', rate: '4% - 14%', term: '5-20 years', best: 'Education costs', details: 'Federal and private options' },
                  { name: 'Business Loans', rate: '5% - 30%', term: '1-25 years', best: 'Business growth', details: 'SBA and term loans' },
                ].map((loan) => (
                  <div key={loan.name} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                    <h3 className="font-semibold text-slate-900 mb-2">{loan.name}</h3>
                    <p className="text-xs text-slate-600 mb-3">{loan.details}</p>
                    <div className="space-y-1 text-sm text-slate-700">
                      <p><strong>Rate:</strong> {loan.rate}</p>
                      <p><strong>Term:</strong> {loan.term}</p>
                      <p><strong>Best for:</strong> {loan.best}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Get Better Rates */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Get Better Rates</h2>
              <div className="space-y-3">
                {[
                  { title: 'Improve Your Credit Score', desc: 'Each 50-point increase can lower your rate by 0.5%+' },
                  { title: 'Shorten Your Loan Term', desc: '3-year loans often have 1-3% lower rates than 7-year loans' },
                  { title: 'Shop Multiple Lenders', desc: 'Rates vary significantly. Compare at least 3-5 offers' },
                  { title: 'Add a Co-signer', desc: 'Someone with better credit can reduce your rate by 1-3%' },
                  { title: 'Consider Secured Loans', desc: 'Using collateral can cut rates by 2-5%' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 border border-slate-200 rounded-lg p-4">
                    <TrendingUp className="text-green-600 flex-shrink-0 w-5 h-5 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-slate-700 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Understanding Loan Terms */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Loan Terms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { term: 'Principal', def: 'The original amount borrowed, excluding interest and fees.' },
                  { term: 'APR (Annual Percentage Rate)', def: 'The yearly cost of borrowing including all fees, not just interest.' },
                  { term: 'Amortization', def: 'The payment schedule showing how your principal decreases over time.' },
                  { term: 'Fixed Rate', def: 'Interest rate stays the same throughout the entire loan term.' },
                  { term: 'Prepayment Penalty', def: 'Fee charged if you pay off the loan before the term ends.' },
                  { term: 'Collateral', def: 'Asset backing a secured loan (car, home, etc.).' },
                ].map((item, i) => (
                  <div key={i} className="border border-slate-200 rounded-lg p-4">
                    <h3 className="font-semibold text-slate-900 mb-1">{item.term}</h3>
                    <p className="text-sm text-slate-700">{item.def}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {[
                  { q: 'What credit score do I need?', a: 'Personal loans typically need 580-600 minimum. Best rates require 720+. Some lenders work with scores as low as 500 but charge higher rates.' },
                  { q: 'Can I pay off my loan early?', a: 'Most loans allow early payoff, but check for prepayment penalties. Paying early saves on interest but may trigger fees.' },
                  { q: 'What\'s the difference between APR and interest rate?', a: 'Interest rate is just borrowing cost. APR includes all fees, giving you the true annual cost.' },
                  { q: 'How does this affect my credit score?', a: 'A hard inquiry drops your score 5-10 points initially. On-time payments improve it significantly over time.' },
                  { q: 'How long does approval take?', a: 'Online lenders approve in minutes to 24 hours, with funding in 1-7 days. Banks take 1-2 weeks.' },
                ].map((item, i) => (
                  <div key={i} className="border border-slate-200 rounded-lg p-4">
                    <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                    <p className="text-slate-700 text-sm">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="text-amber-600 flex-shrink-0 w-5 h-5 mt-0.5" />
              <div>
                <p className="text-sm text-slate-700">
                  <strong>Disclaimer:</strong> This calculator provides estimates for informational purposes. Actual loan terms vary by lender, credit score, loan type, and market conditions. Always consult a financial advisor and compare multiple lenders before committing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}