import { ReactElement } from "react";
import { SkeletonCard } from "./ui/skeletonCard";


export function ProductsShowcase() {
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
    <div className="p-4 flex flex-wrap">
      {skeleton}
    </div>
  )
}
