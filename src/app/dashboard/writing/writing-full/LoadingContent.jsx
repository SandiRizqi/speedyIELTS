
'use client';

export default function LoadingContent() {
    return (
        <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="animate-pulse">
        {/* Table Body */}
        <div className="divide-y divide-slate-200">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4">
              <div className="flex flex-col space-y-2">
                <div className="h-2.5 bg-slate-300 rounded-full w-24"></div>
                <div className="h-2 bg-slate-200 rounded-full w-32"></div>
              </div>
              <div className="h-2.5 bg-slate-300 rounded-full w-12"></div>
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
    )
}