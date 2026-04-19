function SkeletonBlock({ className = '' }) {
  return <div className={`skeleton-block ${className}`.trim()} aria-hidden="true" />;
}

function SkeletonCard({ className = '', children }) {
  return <div className={`bento-card ${className}`.trim()}>{children}</div>;
}

export default function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-500 animate-in">
      <div className="fixed top-0 left-0 z-[100] w-full border-b border-black/5 bg-bg-primary/80 backdrop-blur-xl dark:border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <SkeletonBlock className="h-8 w-20 rounded-full" />
          <div className="hidden md:flex items-center gap-6">
            <SkeletonBlock className="h-3 w-14 rounded-full" />
            <SkeletonBlock className="h-3 w-16 rounded-full" />
            <SkeletonBlock className="h-3 w-14 rounded-full" />
          </div>
          <div className="flex items-center gap-4">
            <SkeletonBlock className="size-10 rounded-full" />
            <SkeletonBlock className="hidden sm:block h-11 w-28 rounded-full" />
          </div>
        </div>
      </div>

      <main className="space-y-2">
        <section className="pt-32 pb-4 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          <SkeletonCard className="md:col-span-3 p-10 min-h-[400px] flex flex-col justify-center">
            <SkeletonBlock className="h-3 w-36 rounded-full mb-6" />
            <SkeletonBlock className="h-16 md:h-24 w-full max-w-2xl rounded-[2rem]" />
            <SkeletonBlock className="h-12 md:h-16 w-3/4 rounded-[2rem] mt-4" />
            <SkeletonBlock className="h-5 w-full max-w-md rounded-full mt-8" />
            <SkeletonBlock className="h-5 w-3/4 max-w-sm rounded-full mt-3" />
          </SkeletonCard>

          <SkeletonCard className="md:col-span-1 p-8 min-h-[400px] flex flex-col items-center justify-center">
            <SkeletonBlock className="size-32 rounded-full mb-6" />
            <SkeletonBlock className="h-7 w-32 rounded-full" />
            <SkeletonBlock className="h-4 w-36 rounded-full mt-3" />
            <SkeletonBlock className="h-7 w-24 rounded-full mt-6" />
          </SkeletonCard>
        </section>

        <section className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <SkeletonCard key={index} className="p-8 min-h-[220px]">
                <SkeletonBlock className="size-10 rounded-xl mb-6" />
                <SkeletonBlock className="h-8 w-28 rounded-full mb-4" />
                <SkeletonBlock className="h-4 w-full rounded-full" />
                <SkeletonBlock className="h-4 w-4/5 rounded-full mt-3" />
              </SkeletonCard>
            ))}
          </div>

          <SkeletonCard className="p-6 md:p-8">
            <SkeletonBlock className="h-10 w-56 rounded-full mb-8" />
            <div className="flex gap-4 overflow-hidden">
              {[...Array(5)].map((_, index) => (
                <SkeletonBlock key={index} className="h-24 md:h-28 w-32 md:w-40 rounded-2xl shrink-0" />
              ))}
            </div>
          </SkeletonCard>
        </section>

        <section className="py-24 px-4 max-w-6xl mx-auto">
          <SkeletonBlock className="h-3 w-48 rounded-full mb-4" />
          <SkeletonBlock className="h-12 w-48 rounded-[1.5rem] mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
              <SkeletonCard key={index} className="h-[380px] p-10">
                <div className="flex items-start justify-between">
                  <SkeletonBlock className="size-14 rounded-2xl" />
                  <SkeletonBlock className="h-3 w-16 rounded-full" />
                </div>
                <SkeletonBlock className="h-10 w-2/3 rounded-[1.5rem] mt-10" />
                <SkeletonBlock className="h-3 w-1/2 rounded-full mt-3" />
                <SkeletonBlock className="h-4 w-full rounded-full mt-6" />
                <SkeletonBlock className="h-4 w-4/5 rounded-full mt-3" />
              </SkeletonCard>
            ))}
          </div>
        </section>

        <section className="py-32 px-6 max-w-6xl mx-auto min-h-[70vh] flex flex-col justify-center">
          <SkeletonBlock className="h-3 w-40 rounded-full mb-6" />
          <SkeletonBlock className="h-12 w-64 rounded-[1.5rem] mb-16" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-10">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="pl-6 border-l border-black/5 dark:border-white/10">
                  <SkeletonBlock className="h-3 w-32 rounded-full mb-4" />
                  <SkeletonBlock className="h-8 w-4/5 rounded-[1rem]" />
                </div>
              ))}
            </div>
            <SkeletonCard className="hidden lg:block lg:col-span-5 p-10 min-h-[280px]">
              <SkeletonBlock className="h-3 w-28 rounded-full mb-8" />
              <SkeletonBlock className="h-2 w-full rounded-full mb-6" />
              <SkeletonBlock className="h-3 w-full rounded-full" />
              <SkeletonBlock className="h-3 w-5/6 rounded-full mt-3" />
              <SkeletonBlock className="h-3 w-2/3 rounded-full mt-3" />
            </SkeletonCard>
          </div>
        </section>
      </main>

      <footer className="w-full py-16 px-6 md:px-12 border-t border-card-border bg-bg-primary">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <SkeletonBlock className="h-10 w-48 rounded-full mb-6" />
              <SkeletonBlock className="h-4 w-full max-w-sm rounded-full" />
              <SkeletonBlock className="h-4 w-4/5 max-w-xs rounded-full mt-3" />
            </div>
            <div>
              <SkeletonBlock className="h-3 w-24 rounded-full mb-4" />
              <div className="flex gap-2">
                {[...Array(3)].map((_, index) => (
                  <SkeletonBlock key={index} className="size-10 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
          <SkeletonBlock className="h-3 w-48 rounded-full" />
        </div>
      </footer>
    </div>
  );
}
