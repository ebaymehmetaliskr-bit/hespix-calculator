// File: components/Header.tsx (Güncellenmiş)
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800">
              Hespix<span className="text-gray-500">.com</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <div className="group relative">
              <button className="text-base font-medium text-gray-500 hover:text-gray-900">
                Calculators
              </button>
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="py-1">
                  <Link href="/unit-converter" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Unit Converter</Link>
                  <Link href="/mortgage-calculator" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mortgage Calculator</Link>
                  <Link href="/bmi-calculator" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">BMI Calculator</Link>
                  <Link href="/percentage-calculator" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Percentage Calculator</Link>
                </div>
              </div>
            </div>
            <Link href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}