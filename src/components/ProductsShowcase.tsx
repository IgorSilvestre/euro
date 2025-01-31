import { getProducts } from "@/lib/functions/getProducts";
import ProductCard from "./ProductCard";


export async function ProductsShowcase() {
  const { products } = await getProducts()

  return (
    <div className="p-4 flex flex-wrap">
      {products?.map(product => (
        <div key={product.id} className="flex items-center justify-center min-h-screen bg-background">
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  )
}
