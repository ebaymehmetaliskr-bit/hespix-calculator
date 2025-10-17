import { DollarSign, TrendingUp, Home, Calculator, Heart, Zap, PiggyBank } from 'lucide-react';

export default function HomePage() {
  const featuredTools = [
    {
      name: 'Loan Calculator',
      description: 'Calculate your monthly loan payments and total interest.',
      href: '/loan-calculator',
      icon: DollarSign,
      color: 'from-blue-600 to-blue-500',
      badge: 'Popular',
    },
    {
      name: 'Mortgage Calculator',
      description: 'Estimate monthly mortgage payments for your home.',
      href: '/mortgage-calculator',
      icon: Home,
      color: 'from-green-600 to-green-500',
      badge: 'High Intent',
    },
    {
      name: 'Retirement Calculator',
      description: 'Plan your retirement savings and calculate your future nest egg.',
      href: '/retirement-calculator',
      icon: PiggyBank,
      color: 'from-emerald-600 to-emerald-500',
      badge: 'New',
    },
    {
      name: 'Investment Calculator',
      description: 'Calculate investment returns with compound interest.',
      href: '/investment-calculator',
      icon: TrendingUp,
      color: 'from-purple-600 to-purple-500',
      badge: 'New',
    },
  ];

  const allTools = [
    {
      category: 'Financial',
      items: [
        { name: 'Loan Calculator', href: '/loan-calculator', icon: DollarSign },
        { name: 'Mortgage Calculator', href: '/mortgage-calculator', icon: Home },
        { name: 'Investment Calculator', href: '/investment-calculator', icon: TrendingUp },
        { name: 'Retirement Calculator', href: '/retirement-calculator', icon: PiggyBank },
      ],
    },
    {
      category: 'Health & Fitness',
      items: [
        { name: 'BMI Calculator', href: '/bmi-calculator', icon: Heart },
        { name: 'Calorie Calculator', href: '/calorie-calculator', icon: Zap },
      ],
    },
    {
      category: 'General & Conversion',
      items: [
        { name: 'Unit Converter', href: '/unit-converter', icon: Calculator },
        { name: 'Percentage Calculator', href: '/percentage-calculator', icon: Calculator },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Free, Accurate Calculators
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Make better financial decisions with our suite of powerful, easy-to-use calculators. Fast. Accurate. Private.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/loan-calculator"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Calculate Now
              </a>
              <a
                href="#all-tools"
                className="px-8 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-slate-400 transition"
              >
                Explore All Tools
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <p className="text-slate-600">Free & No Ads</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">Instant</div>
              <p className="text-slate-600">Real-time Results</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">Private</div>
              <p className="text-slate-600">No Data Stored</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Tools Section */}
      <div className="bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Most Popular Tools
            </h2>
            <p className="text-lg text-slate-600">
              Start with our most-used calculators trusted by thousands daily.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <a
                  key={tool.name}
                  href={tool.href}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 block"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-95 group-hover:opacity-100 transition`} />
                  
                  {/* Content */}
                  <div className="relative p-6 text-white h-full flex flex-col justify-between min-h-[240px]">
                    <div>
                      <div className="inline-block mb-3">
                        <span className="text-xs font-bold bg-white bg-opacity-20 px-3 py-1 rounded-full">
                          {tool.badge}
                        </span>
                      </div>
                      <IconComponent className="w-10 h-10 mb-3" />
                      <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                      <p className="text-white text-opacity-90 text-sm">{tool.description}</p>
                    </div>
                    <div className="mt-4 flex items-center text-white group-hover:translate-x-2 transition">
                      <span className="text-sm font-semibold">Get Started →</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* All Tools Section */}
      <div className="bg-white" id="all-tools">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">All Calculators</h2>

          <div className="space-y-12">
            {allTools.map((section) => (
              <div key={section.category}>
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                  <span className="inline-block w-1 h-6 bg-blue-600 rounded-full mr-3" />
                  {section.category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {section.items.map((tool) => {
                    const IconComponent = tool.icon;
                    return (
                      <a
                        key={tool.name}
                        href={tool.href}
                        className="group p-4 border-2 border-slate-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 group-hover:bg-blue-100 rounded-lg transition">
                            <IconComponent className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition text-sm">
                              {tool.name}
                            </p>
                          </div>
                          <span className="text-slate-400 group-hover:text-blue-600 transition">→</span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Why Choose Hespix?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Industry-Standard Formulas',
                desc: 'All calculations use proven financial and scientific formulas verified for accuracy.',
              },
              {
                title: 'Modern, Clean Interface',
                desc: 'Intuitive design means you get results in seconds, not minutes.',
              },
              {
                title: 'No Data Collection',
                desc: 'Your calculations happen locally. We never store or share your information.',
              },
              {
                title: 'Completely Free',
                desc: 'No hidden fees, no premium features. All tools are 100% free forever.',
              },
              {
                title: 'Detailed Guidance',
                desc: 'Each calculator includes explanations to help you understand your results.',
              },
              {
                title: 'Mobile Optimized',
                desc: 'Works seamlessly on phone, tablet, or desktop.',
              },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white rounded-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Calculate Smarter?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Start with our most popular calculators and make better financial decisions today.
          </p>
          <a
            href="/loan-calculator"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition"
          >
            Get Started Now
          </a>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center text-slate-600 text-sm">
          <p>
            All calculations are for informational purposes. Always consult financial or medical professionals for important decisions.
          </p>
        </div>
      </div>
    </div>
  );
}