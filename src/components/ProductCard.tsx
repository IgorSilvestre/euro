import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  name: string
  price: string
  imageUrl: string
}

export default function ProductCard({ name, price, imageUrl }: ProductCardProps) {
  return (
    <Card className="w-[300px]">
      <CardContent className="p-4">
        <div className="aspect-square relative mb-4">
          <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="object-cover rounded-md" />
        </div>
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-muted-foreground">{price}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Comprar</Button>
      </CardFooter>
    </Card>
  )
}

