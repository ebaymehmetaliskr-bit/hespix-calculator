// File: app/contact/page.tsx
export default function ContactPage() {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-500">
          If you have any questions or comments, please don&apos;t hesitate to contact us.
        </p>
        <p className="mt-4 text-lg text-gray-500">
          Email: <a href="mailto:contact@hespix.com" className="text-indigo-600 hover:underline">contact@hespix.com</a>
        </p>
      </div>
    </div>
  );
}