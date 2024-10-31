import ProductDetails from "./UI/ProductDetails.jsx";
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import FeaturedShoes from './UI/FeaturedShoes.jsx';
import CheckoutPage from './UI/CheckoutPage.jsx';
import { ShoppingCart, Menu, X } from "lucide-react";
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
} from "@/components/ui/alert-dialog";

const ShoeStore = () => {
  // Sample data as fallback
  const sampleShoes = [
    {
      id: 1,
      name: "Nike Air Max",
      brand: "Nike",
      price: 2500,
      description: "Classic Nike sneakers in excellent condition",
      image: "/src/assets/shoes/nike-air-max.jpg"
    },
    {
      id: 2,
      name: "Vans Old Skool",
      brand: "Vans",
      price: 1800,
      description: "Vintage Vans skateboarding shoes",
      image: "/src/assets/shoes/vans-old-skool.jpg"
    },
    {
      id: 3,
      name: "LC Waikiki Casual",
      brand: "LC Waikiki",
      price: 900,
      description: "Comfortable casual shoes",
      image: "/src/assets/shoes/lc-waikiki-casual.jpg"
    }
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const mainRef = useRef(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [shoes, setShoes] = useState(sampleShoes);

// Add this function to update shoes
const updateShoesAfterOrder = (updatedShoes) => {
  setShoes(updatedShoes);
};

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/shoes');
        if (!response.ok) {
          throw new Error('Failed to fetch shoes');
        }
        const data = await response.json();
        setShoes(data);
      } catch (error) {
        console.error('Failed to fetch shoes:', error);
        // Keep using sample data if fetch fails
        setShoes(sampleShoes);
      }
    };

    fetchShoes();
  }, []);

  // Rest of your existing functions...
  const scrollToCollection = () => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const addToCart = (shoe) => {
    setCart(prevCart => [...prevCart, { ...shoe, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCart(prevCart => prevCart.filter(item => item.cartId !== cartId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toLocaleString();
  };

  const handleViewProduct = (product) => {
    setShowCheckout(false);
    setSelectedProduct(product);
  };

  const handleGoBack = () => {
    if (selectedProduct) {
      setSelectedProduct(null);
    }
    if (showCheckout) {
      setShowCheckout(false);
    }
  };

  const isSoldOut = (shoeId) => {
    return [8, 12, 13, 14, 15, 21, 23].includes(shoeId);
  };

  // Updated filtering logic to handle empty data
  const filteredShoes = shoes.filter(shoe => {
    const brandMatch = selectedBrand === 'All' || shoe.brand === selectedBrand;
    const priceMatch = 
      priceRange === 'All' ||
      (priceRange === 'Under 1000' && shoe.price < 1000) ||
      (priceRange === '1000 to 3000' && shoe.price >= 1000 && shoe.price <= 3000) ||
      (priceRange === 'Over 3000' && shoe.price > 3000);
    return brandMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-gray-100">
<nav className="fixed top-0 w-full bg-black text-white z-50">
  <div className="max-w-6xl mx-auto px-4">
    <div className="flex justify-between items-center h-16">
    <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-pink-500 bg-clip-text text-transparent">
  MATex <span className="font-black">SHOES</span>
</h1>

      <div className="hidden md:flex items-center space-x-4">
        <FilterDropdowns 
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
       <CartDialog 
  cart={cart} 
  removeFromCart={removeFromCart}
  calculateTotal={calculateTotal}
  onCheckoutPage={() => setShowCheckout(true)} // Pass the function here
/>

      </div>
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <CartDialog 
          cart={cart} 
          removeFromCart={removeFromCart}
          calculateTotal={calculateTotal}
          onCheckoutPage={() => setShowCheckout(true)}
        />
      </div>
    </div>
    {isMenuOpen && (
      <MobileMenu 
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        
      />
    )}
  </div>
</nav>
{/* Fixed portion of ShoeStore.jsx */}
   
{showCheckout ? (
        <CheckoutPage
          cart={cart}
          onClose={() => setShowCheckout(false)}
          removeFromCart={removeFromCart}
          onViewProduct={handleViewProduct}
        />
      ) : selectedProduct ? (
        <ProductDetails
          shoe={selectedProduct}
          onGoBack={handleGoBack}
          onAddToCart={addToCart}
          onCheckoutPage={() => setShowCheckout(true)}
        />
      ) : (
        <>
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    {/* Background Video */}
    <div className="absolute inset-0 z-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/src/assets/shoesbg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10" />

    {/* Content */}
    <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center mt-12 text-center text-white">
      <img
        src="/src/assets/MA logo2.jpg"
        alt="Brand Logo"
        className="w-36 h-36 rounded-full shadow-lg mb-6 object-cover"
      />
      <h1 className="text-6xl font-bold bg-gradient-to-r from-teal-500 to-pink-500 bg-clip-text text-transparent mb-8">
        MATex <span className="font-black">SHOES</span>
      </h1>

      <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-bold bg-gradient-to-r from-teal-400 to-teal-800 bg-clip-text text-transparent">
        Discover a world of style with pre-loved, high-quality shoes. Our collection is curated for those who value both quality and style. At MA Tex, every shoe has a story and a second chance.
      </p>

      <button onClick={scrollToCollection} className="px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 
    bg-gradient-to-r from-teal-500 to-pink-500 hover:from-teal-600 hover:to-pink-600 transform hover:-translate-y-1">
              Shop Now
            </button>
    </div>
  </section>
{/* After the hero section and before the main collection */}
<FeaturedShoes 
  shoes={shoes}
  onAddToCart={addToCart}
  onViewProduct={handleViewProduct}
  selectedBrand={selectedBrand}  // Added this prop
  priceRange={priceRange}      // Added this prop
/>{/* Updated main collection section */}
          <main
            ref={mainRef}
            className="max-w-6xl mx-auto px-4 py-12"
            style={{ scrollMarginTop: '80px' }}
          >
            <div className="flex items-center gap-2 mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-pink-500 bg-clip-text text-transparent">
                Complete Collection
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredShoes.map((shoe) => (
        <Card key={shoe.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
          <div className="relative">
            <CardHeader className="p-0">
              <img 
                src={shoe.image} 
                alt={shoe.name} 
                className={`w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300 ${
                  isSoldOut(shoe.id) ? 'opacity-50' : ''
                }`}
              />
              {[17, 14, 13, 12, 9, 8, 6, 3].includes(shoe.id) && (
                <div className="absolute top-2 left-2">
                  <span className="bg-gradient-to-r from-teal-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm">
                    Featured
                  </span>
                </div>
              )}
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
              onClick={() => handleViewProduct(shoe)}
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
                  <AlertDialogCancel>Close</AlertDialogCancel>
                  {!isSoldOut(shoe.id) && (
                    <AlertDialogAction 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(shoe);
                      }}
                    >
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
          </main>

    </>
)}
        <footer className="bg-black text-white mt-12">
    <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <h1 className="text-lg font-bold mb-4 bg-gradient-to-r from-teal-500 to-pink-500 bg-clip-text text-transparent">
                    About Us
                </h1>
                <p className="text-gray-300">
                At MATex Shoes, we believe in giving every shoe a second life. Rooted in the heart of Pakistan, we’re more than just a thrift shoe store – we’re part of a movement toward sustainability and resourcefulness.
                </p>
            </div>
            <div>
                <h1 className="text-lg font-bold mb-4 bg-gradient-to-r from-teal-500 to-pink-500 bg-clip-text text-transparent">
                    Contact
                </h1>
                <p className="text-gray-300">Email: maryamashfaq1828@gmail.com</p>
                <p className="text-gray-300">Phone: (+92) 324 5250505</p>
            </div>
            <div>
                <h1 className="text-lg font-bold mb-4 bg-gradient-to-r from-teal-500 to-pink-500 bg-clip-text text-transparent">
                    Follow Us
                </h1>
                <div className="flex space-x-4">
                    <a
                        href="#"
                        className="text-gray-300 hover:text-transparent bg-gradient-to-r from-teal-500 to-pink-500 bg-clip-text transition-colors duration-300"
                    >
                        Instagram
                    </a>
                </div>
            </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p className="bg-gradient-to-r from-teal-500 to-pink-500 bg-clip-text text-transparent">
                &copy; 2024 MATex. All rights reserved.
            </p>
        </div>
    </div>
</footer>

    </div>
  );
};

// Separate component files for better organization
const FilterDropdowns = ({ selectedBrand, setSelectedBrand, priceRange, setPriceRange }) => (
  <>
    <select 
      className="p-2 rounded border bg-white text-gray-900"
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
      className="p-2 rounded border bg-white text-gray-900"
      value={priceRange}
      onChange={(e) => setPriceRange(e.target.value)}
    >
      <option value="All">All Prices</option>
      <option value="Under 1000">Under 1000 pkr</option>
      <option value="1000 to 3000">1000 - 3000 pkr</option>
      <option value="Over 3000">Over 3000 pkr</option>
    </select>
  </>
);
const CartDialog = ({ cart, removeFromCart, calculateTotal, onCheckoutPage }) => {
 
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="relative text-white cursor-pointer">
          <ShoppingCart size={24} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cart.length}
            </span>
          )}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-6 rounded-lg shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">Your Cart</AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-300">
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul className="mt-2">
                {cart.map(item => (
                  <li key={item.cartId} className="flex justify-between items-center border-b border-gray-700 py-2">
                    <span className="text-black">{item.name}</span>
                    <span className="text-black">{item.price} PKR</span>
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-red-600 font-medium hover:text-red-800 transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-between items-center mt-4">
          <span className="text-black font-medium">Total: {calculateTotal()} PKR</span>
          <div className="flex gap-3">
            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 border border-gray-300">
              Close
            </AlertDialogCancel>
            {cart.length > 0 && (
              <AlertDialogAction
                onClick={onCheckoutPage}
                className="py-2 px-4 rounded-lg text-white font-medium transition-all duration-300 bg-gradient-to-r from-teal-500 to-pink-500 hover:from-teal-600 hover:to-pink-600 transform hover:-translate-y-1"
              >
                Proceed to Checkout
              </AlertDialogAction>
            )}
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
const MobileMenu = ({ selectedBrand, setSelectedBrand, priceRange, setPriceRange }) => (
  <div className="absolute top-16 left-0 w-full bg-gray-800 text-white p-4">
    <FilterDropdowns 
      selectedBrand={selectedBrand} 
      setSelectedBrand={setSelectedBrand}
      priceRange={priceRange}
      setPriceRange={setPriceRange}
    />
  </div>
);



export default ShoeStore;