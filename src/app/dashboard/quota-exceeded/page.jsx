'use client';

import { useRouter } from 'next/navigation';
import { AlertTriangle } from 'lucide-react'; // optional, if using lucide-react
import DefaultLayout from '@/components/Layouts/DefaultLayout';

export default function QuotaExceededPage() {
  const router = useRouter();

  return (
    <DefaultLayout>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 text-center">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-6 text-red-500">
          <AlertTriangle size={64} />
        </div>

        <h1 className="text-4xl font-extrabold text-red-600 mb-4">Quota Exceeded</h1>
        <p className="text-gray-600 text-lg mb-6">
          You’ve reached your usage limit for this feature. To continue using this service, please wait until your quota resets or consider upgrading your plan.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="bg-yellow-400 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded"
          >
            Go Back
          </button>
          <button
            onClick={() => router.push('/dashboard/payment')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
          >
            Upgrade My Plan
          </button>
        </div>
      </div>
    </div>
    </DefaultLayout>
  );
}
