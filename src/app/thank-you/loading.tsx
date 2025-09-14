
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-neutral-light via-white to-brand-neutral-light py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Skeleton className="h-24 w-24 rounded-full mx-auto mb-6" />
          <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>

        <Skeleton className="h-48 mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
    </div>
  );
}
