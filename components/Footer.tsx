// File: components/Footer.tsx (Güncellenmiş)
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900">
            About
          </Link>
          <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900">
            Contact
          </Link>
          <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-900">
            Privacy Policy
          </Link>
        </div>
        <p className="mt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Hespix.com. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
