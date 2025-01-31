import { ProductsShowcase } from "@/components/ProductsShowcase";
import { SkeletonCard } from "@/components/ui/skeletonCard";
import { ReactElement, Suspense } from "react";

export default function Home() {
  const skeleton: ReactElement[] = []

  function generateSkeleton() {
  const numberOfSkeletons = 20
    for (let i = 0; i < numberOfSkeletons; i++) {
      skeleton.push(
        <div key={i} className="mx-2 mb-4">
          <SkeletonCard /> 
        </div>
      )
    }
  }
  generateSkeleton()
  return (
    <div>
    <Suspense fallback={skeleton}>
      <ProductsShowcase />
    </Suspense>
    </div>
  );
}
