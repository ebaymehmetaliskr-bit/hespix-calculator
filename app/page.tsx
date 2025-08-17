// File: app/page.tsx (Yeni Portal Ana Sayfası v2 - Düzeltilmiş)
import Link from 'next/link';

const toolCategories = [
  {
    name: 'Financial Calculators',
    tools: [
      {
        name: 'Mortgage Calculator',
        description: 'Estimate your monthly mortgage payments.',
        href: '/mortgage-calculator',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-6m-3 6h.01M9 17h.01M12 17h.01M15 17h.01M9 14h.01M12 14h.01M15 14h.01M9 11h.01M12 11h.01M15 11h.01M12 21a9 9 0 110-18 9 9 0 010 18z" /></svg>,
        bgColor: 'bg-blue-500',
      },
    ],
  },
  {
    name: 'Health & Fitness Calculators',
    tools: [
      {
        name: 'BMI Calculator',
        description: 'Calculate your Body Mass Index to assess your weight.',
        href: '/bmi-calculator',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
        bgColor: 'bg-green-500',
      },
    ],
  },
  {
    name: 'General & Math Calculators',
    tools: [
      {
        name: 'Unit Converter',
        description: 'Convert mass, length, temperature, and more.',
        href: '/unit-converter',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>,
        bgColor: 'bg-indigo-500',
      },
      {
        name: 'Percentage Calculator',
        description: 'Quickly calculate percentages for any need.',
        href: '/percentage-calculator',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a5 5 0 100-10 5 5 0 000 10zm10-10a5 5 0 100 10 5 5 0 000-10zm-5 5L8 8m8 8l-4-4" /></svg>,
        bgColor: 'bg-yellow-500',
      },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Powerful Calculation Tools
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Free, fast, and accurate calculators for your everyday needs.
          </p>
        </div>
        
        <div className="mt-16 space-y-12">
          {toolCategories.map((category) => (
            <div key={category.name}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{category.name}</h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className="group block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`flex-shrink-0 p-3 rounded-lg ${tool.bgColor}`}>
                        {tool.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">{tool.name}</h3>
                      </div>
                    </div>
                    <p className="mt-4 text-base text-gray-500">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}