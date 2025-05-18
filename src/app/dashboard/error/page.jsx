'use client'; // Error components must be client components
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function GlobalError() {
 

  return (
    <DefaultLayout>
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-3xl font-bold text-red-600 mb-4">Something went wrong!</h2>
      <p className="text-gray-700 mb-4">{'An unexpected error occurred.'}</p>
      <button
        onClick={() => window.history.back()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back
      </button>
    </div>
    </DefaultLayout>
  );
}
