import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const ShoeStore = () => {
  const [shoes, setShoes] = useState([
    {
      "id": 1,
      "name": "Black Long Boats",
      "brand": "White stag",
      "price": 3500,
      "sizes": [7.5],
      "color": "Black",
      "description": "100% Faux Suede | Imported | Synthetic material | 8/10 Condition",
      "image": "/src/assets/maryampic.png"
    },
    {
      "id": 2,
      "name": "Black Sandals with Studs",
      "brand": "Merry Scott",
      "price": 1500,
      "sizes": [38],
      "color": "Black",
      "description": " Imported | 6/10 Condition",
      "image": "/src/assets/maryampic.png"
    },
    {
      "id": 3,
      "name": "Chained High sole Women's Loafer",
      "brand": "ECS",
      "price": 3500,
      "sizes": [38],
      "color": "Gray/Green",
      "description": "New Shoes with Box | 10/10 Condition",
      "image": "/src/assets/maryampic.png"
    },
    {
      "id": 4,
      "name": "Sneakers",
      "brand": "Unknown",
      "price": 500,
      "sizes": [39],
      "color": "Sky Blue",
      "description": "Sneakers| 5/10 Condition",
      "image": "/src/assets/maryampic.png"
    },
    {
      "id": 5,
      "name": "Sneakers ",
      "brand": "Turkish Brand",
      "price": 1500,
      "sizes": [39],
      "color": "Beige/Golden/Brown",
      "description": "Sneakers | 8/10 Condition",
      "image": "/src/assets/maryampic.png"
    },
    {
      "id": 6,
      "name": "High Top Converse Chuck Taylor",
      "brand": "Converse",
      "price": 2500,
      "sizes": [39,38],
      "color": "Purple/ Red rust",
      "description": "Check pattern inside | 9/10 Condition",
      "image": "/src/assets/maryampic.png"
    },
{
      "id": 7,
      "name": "Sneakers",
      "brand": "Pull and bear",
      "price": 1000,
      "sizes": [38],
      "color": "White",
      "description": "Will be shipped after a wash | 7/10 Condition",
      "image": "/src/assets/maryampic.png"
    },
{
      "id": 8,
      "name": "Chunky Boots",
      "brand": "Outfitters ",
      "price": 3500,
      "sizes": [38,39],
      "color": "Black",
      "description": "Black shiny leather | High quality | 9.5/10 Condition",
      "image": "/src/assets/maryampic.png"
    },
{
      "id": 9,
      "name": "Formal penny Loafers",
      "brand": "Unknown ",
      "price": 2500,
      "sizes": [39],
      "color": "Black",
      "description": "Black neat leather | High quality | 9/10 Condition",
      "image": "/src/assets/maryampic.png"
    },
{
      "id": 10,
      "name": "Formal penny Loafers",
      "brand": "ECCO ",
      "price": 2500,
      "sizes": [37,38],
      "color": "Brown",
      "description": "Brown shiny leather | High quality | 9/10 Condition ",
      "image": "/src/assets/maryampic.png"
    },
{
      "id": 11,
      "name": "Loafers",
      "brand": "Aerosoles",
      "price": 800,
      "sizes": [7],
      "color": "Sky blue",
      "description": " Suede | High comfort | 7/10 Condition ",
      "image": "/src/assets/maryampic.png"
    },
{
      "id": 12,
      "name": "Vans Sk8-Hi Sneakers Orignal",
      "brand": "Vans",
      "price": 4000,
      "sizes": [38],
      "color": "White",
      "description": " Orignal | Light stains | 8/10 Condition ",
      "image": "/src/assets/maryampic.png"
    },
{
      "id": 13,
      "name": "Nike Court Borough Mid 2 Orignal",
      "brand": "Nike",
      "price": 4000,
      "sizes": [37.5],
      "color": "White",
      "description": " Orignal | Light stains | 8/10 Condition ",
      "image": "/src/assets/maryampic.png"
    },

{
      "id": 14,
      "name": "LC Waikiki Leather Long boots Orignal",
      "brand": "LC Waikiki",
      "price": 6000,
      "sizes": [39],
      "color": "Black",
      "description": " Orignal | 100% Comfort | Winters snow proof, strong Grip | 9/10 Condition ",
      "image": "/src/assets/maryampic.png"
    },
{
      "id": 15,
      "name": "Suede Long boots Orignal",
      "brand": "Decathon Turkey",
      "price": 6000,
      "sizes": [38],
      "color": "Brown",
      "description": " Orignal Suede | 100% Comfort | Strong Grip | 9/10 Condition ",
      "image": "/src/assets/maryampic.png"
    },
{
      "id": 16,
      "name": "Formal Heels",
      "brand": "ECS",
      "price": 800,
      "sizes": [36,37],
      "color": "Grey/Black",
      "description": " 100% Comfort | Small heels | 9/10 Condition ",
      "image": "/src/assets/maryampic.png"
    },
{
      "id": 17,
      "name": "Formal Heels",
      "brand": "Borjan",
      "price": 2500,
      "sizes": [37],
      "color": "Black",
      "description": " Black shiny high quality leather | High heels | 9/10 Condition ",
      "image": "/src/assets/maryampic.png"
    },
{
      "id": 18,
      "name": "Furr Slippers",
      "brand": "Unknown",
      "price": 1000,
      "sizes": [38,39],
      "color": "Black/Grey",
      "description": " Casual Furr slippers | 100% Comfort | 9/10 Condition ",
      "image": "/src/assets/maryampic.png"
    }

  ]);

  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState('All');

  // Filter shoes based on selected brand and price range
  const filteredShoes = shoes.filter(shoe => {
    const brandMatch = selectedBrand === 'All' || shoe.brand === selectedBrand;
    const priceMatch = 
      priceRange === 'All' ||
      (priceRange === 'Under 1000' && shoe.price < 1000) ||
      (priceRange === '1000 to 3000' && shoe.price >= 1000 && shoe.price <= 3000) ||
      (priceRange === 'Over 3000' && shoe.price > 3000);
    return brandMatch && priceMatch;
  });

  const addToCart = (shoe) => {
    setCart([...cart, shoe]);
  };

  const removeFromCart = (shoeId) => {
    setCart(cart.filter(item => item.id !== shoeId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-800 text-black z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">MA Tex</h1>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-4">
              <select 
                className="p-2 rounded border"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="All">All Brands</option>
                <option value="Nike">Nike</option>
                <option value="Vans">Vans</option>
                <option value="LC Waikiki">LC Waikiki</option>
                <option value="Unknown">Unknown</option>
              </select>

              <select 
                className="p-2 rounded border"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="All">All Prices</option>
                <option value="Under 1000">Under 1000 pkr</option>
                <option value="1000 to 3000">1000 - 3000 pkr</option>
                <option value="Over 3000">Over 3000 pkr</option>
              </select>

              <AlertDialog>
                <AlertDialogTrigger>
                  <div className="relative text-white">
                    <ShoppingCart size={24} />
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {cart.length}
                      </span>
                    )}
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Shopping Cart</AlertDialogTitle>
                    <AlertDialogDescription>
                      {cart.length === 0 ? (
                        <p>Your cart is empty</p>
                      ) : (
                        <div>
                          {cart.map(item => (
                            <div key={item.id} className="flex justify-between items-center mb-2">
                              <span>{item.name}</span>
                              <div className="flex items-center">
                                <span className="mr-4">${item.price}</span>
                                <button 
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                          <div className="mt-4 border-t pt-2">
                            <strong>Total: ${calculateTotal()}</strong>
                          </div>
                        </div>
                      )}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                    {cart.length > 0 && (
                      <AlertDialogAction>Checkout</AlertDialogAction>
                    )}
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-4">
            <select 
              className="w-full p-2 rounded border mb-2"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="All">All Brands</option>
              <option value="Nike">Nike</option>
              <option value="Vans">Vans</option>
              <option value="LC Waikiki">LC Waikiki</option>
              <option value="Unknown">Unknown</option>
            </select>

            <select 
              className="w-full p-2 rounded border"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="All">All Prices</option>
              <option value="Under 1000">Under 1000 pkr</option>
              <option value="1000 to 3000">1000 - 3000 pkr</option>
              <option value="Over 3000">Over 3000 pkr</option>
            </select>
          </div>
        )}
      </nav>

      {/* Welcome Section */}
      <section className="relative text-white py-16 px-4 text-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/src/assets/shoesbg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center mt-12">
        
          <img
            src="/src/assets/MA logo2.jpg"
            alt="Brand Logo"
            className="w-36 h-36 rounded-full shadow-lg mb-6 object-cover"
          />
          <h2 className="text-4xl font-bold mb-4">Welcome to MA Tex</h2>
          <p className="text-lg mb-4 max-w-3xl mx-auto">
            Discover a world of style with pre-loved, high-quality shoes. Our collection is curated for those who value both quality and style. At MA Tex, every shoe has a story and a second chance.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 rounded-md font-semibold text-white transition duration-300"
          >
            Shop Now
          </button>
        </div>
      </section>
 
      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Our Collection</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShoes.map(shoe => (
            <Card key={shoe.id} className="overflow-hidden rounded-lg shadow-lg border border-gray-300">
              <CardHeader>
                <img
                  src={shoe.image}
                  alt={shoe.name}
                  className="w-full h-48 object-cover rounded-t"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl font-bold">{shoe.name}</CardTitle>
                <CardDescription className="mt-2">
                  <p className="text-gray-600">{shoe.description}</p>
                  <p className="text-gray-600">Brand: {shoe.brand}</p>
                  <p className="text-gray-600">Color: {shoe.color}</p>
                  <p className="font-bold text-lg mt-2">${shoe.price}</p>
                </CardDescription>
              </CardContent>
              <CardFooter>
              <button
                    onClick={() => addToCart(shoe)}
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
                  >
                    Add to Cart
                  </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">About Us</h3>
              <p className="text-gray-300">
              We’re a thrift shoe store dedicated to giving pre-loved shoes a second chance.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="text-gray-300">Email: maryamashfaq1828@gmail.com</p>
              <p className="text-gray-300">Phone: (+92) 324 5250505</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>&copy; 2024 MA Tex. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShoeStore; 