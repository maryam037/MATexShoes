import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Star } from 'lucide-react';

const FeaturedShoes = ({ shoes, onAddToCart, onViewProduct, selectedBrand, priceRange }) => {
  const featuredIds = [17, 14, 13, 12, 9, 8, 6, 3, 23, 22, 20, 18];
  
  // Helper function to check if a shoe is sold out
  const isSoldOut = (shoeId) => {
    return [8, 12, 13, 14, 15, 21, 23].includes(shoeId);
  };

  // Filtering logic
  const filteredShoes = shoes.filter(shoe => {
    const isFeatured = featuredIds.includes(shoe.id);
    const brandMatch = selectedBrand === 'All' || shoe.brand === selectedBrand;
    const priceMatch = 
      priceRange === 'All' ||
      (priceRange === 'Under 1000' && shoe.price < 1000) ||
      (priceRange === '1000 to 3000' && shoe.price >= 1000 && shoe.price <= 3000) ||
      (priceRange === 'Over 3000' && shoe.price > 3000);
    
    return isFeatured && brandMatch && priceMatch;
  });
  
  // Conditional rendering if no shoes match filters
  if (filteredShoes.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Star className="text-yellow-400" size={28} />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-pink-500 bg-clip-text text-transparent">
            Featured Collection
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredShoes.map((shoe) => (
            <Card
              key={shoe.id}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative">
                <CardHeader className="p-0">
                  <img 
                    src={shoe.image} 
                    alt={shoe.name} 
                    className={`w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300 ${
                      isSoldOut(shoe.id) ? 'opacity-50' : ''
                    }`}
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-gradient-to-r from-teal-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm">
                      Featured
                    </span>
                  </div>
                  {isSoldOut(shoe.id) && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                        Sold Out
                      </span>
                    </div>
                  )}
                </CardHeader>
              </div>
              
              <CardContent className="p-4">
                <CardTitle className="text-lg font-bold truncate">{shoe.name}</CardTitle>
                <CardDescription className="mt-2">
                  <p className="text-gray-600 truncate">{shoe.description}</p>
                  <p className="text-gray-600">Brand: {shoe.brand}</p>
                  <p className="font-bold text-lg mt-2 text-teal-600">Rs. {shoe.price}</p>
                </CardDescription>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex gap-2">
                <button
                  onClick={() => onViewProduct(shoe)}
                  className="flex-1 bg-gray-100 text-gray-800 py-2 rounded hover:bg-gray-200 transition-colors"
                >
                  View Details
                </button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button 
                      className={`flex-1 py-2 rounded transition-colors ${
                        isSoldOut(shoe.id)
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-black text-white hover:bg-gray-800'
                      }`}
                    >
                      Add to Cart
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {isSoldOut(shoe.id) ? 'Item Sold Out' : 'Add to Cart'}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {isSoldOut(shoe.id)
                          ? "We're sorry, this item is currently sold out."
                          : `Do you want to add ${shoe.name} to your cart?`
                        }
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      {!isSoldOut(shoe.id) && (
                        <AlertDialogAction onClick={() => onAddToCart(shoe)}>
                          Add to Cart
                        </AlertDialogAction>
                      )}
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedShoes;
