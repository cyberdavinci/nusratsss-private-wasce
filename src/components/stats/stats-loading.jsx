export function StatsLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-gray-300">
                <div className="h-4 w-24 rounded-lg bg-gray-800 animate-pulse"></div>
              </div>
              <div className="h-4 w-4 rounded-full bg-gray-800 animate-pulse"></div>
            </div>
            <div>
              <div className="h-8 w-20 rounded-lg bg-gray-800 animate-pulse"></div>
              <div className="mt-4 h-2 w-full rounded-lg bg-gray-800 animate-pulse"></div>
            </div>
          </div>
        ))}

      <div className="col-span-full bg-gray-900 border border-gray-800 rounded-lg p-4">
        <div className="mb-4">
          <div className="h-5 w-40 rounded-lg bg-gray-800 animate-pulse"></div>
        </div>
        <div className="h-[300px] w-full bg-gray-800 animate-pulse rounded-lg"></div>
      </div>
    </div>
  )
}

