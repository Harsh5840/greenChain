import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

export default async function Marketplace() {
  // Fetch products from /api/marketplace (replace with real fetch)
  const products = [
    { id: 1, name: "Eco Bottle", description: "Reusable water bottle.", price: 20, image: "/bottle.png" },
    { id: 2, name: "Solar Charger", description: "Portable solar charger.", price: 50, image: "/charger.png" },
  ];
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4 text-green-800">Marketplace</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}