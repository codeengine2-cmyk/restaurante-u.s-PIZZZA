import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ReceiptText, Trash2, Minus, Plus, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pizza' | 'chicken' | 'wings'>('all');
  const { cart, updateQuantity, removeFromCart, total } = useCart();

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'pizza', label: 'Pizzas' },
    { id: 'chicken', label: 'Frango' },
    { id: 'wings', label: 'Asas' },
  ] as const;

  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-20">
      <main className="flex-1 bg-gray-50 dark:bg-[#0f172a] relative pb-32 md:pb-12">
        <div className="absolute inset-0 opacity-5 dark:opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-brand text-gray-900 dark:text-white mb-6 tracking-tight">
              MENU <span className="text-primary">DIGITAL</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 p-1.5 bg-white/50 dark:bg-card-dark/30 backdrop-blur-sm rounded-full w-fit mx-auto border border-gray-200 dark:border-gray-700">
              {categories.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300",
                    activeCategory === cat.id 
                      ? "bg-primary text-white shadow-md scale-105" 
                      : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      {/* Desktop Cart Sidebar */}
      <aside className="hidden md:flex w-[400px] bg-white dark:bg-card-dark border-l border-gray-200 dark:border-gray-700 flex-col h-[calc(100vh-80px)] sticky top-20 shadow-2xl z-40">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ReceiptText className="text-primary" size={24} />
            Seu Pedido
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-50 space-y-4">
              <ShoppingCart size={64} className="text-gray-300 dark:text-gray-600" />
              <p className="text-center text-gray-500 font-medium">Seu carrinho está vazio.</p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {cart.map(item => (
                <motion.div 
                  key={item.cartId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-4 p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <div className="w-20 h-20 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0 shadow-sm">
                    <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <h5 className="font-bold text-gray-900 dark:text-white text-sm truncate">{item.name}</h5>
                        {item.selectedSize && (
                          <span className="inline-block px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-500 dark:text-gray-400 capitalize mt-1">
                            {item.selectedSize}
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-bold text-primary whitespace-nowrap">
                        {item.finalPrice.toLocaleString()} Kz
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                        <button 
                          onClick={() => item.quantity > 1 ? updateQuantity(item.cartId, -1) : removeFromCart(item.cartId)} 
                          className="w-6 h-6 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.cartId, 1)} 
                          className="w-6 h-6 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.cartId)} 
                        className="p-1 px-2 text-red-500/80 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        <div className="p-6 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700 backdrop-blur-md">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <p>Subtotal</p>
              <p>{total.toLocaleString()} Kz</p>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
              <span>Total</span>
              <span className="text-primary">{total.toLocaleString()} Kz</span>
            </div>
          </div>
          <Link 
            to="/checkout" 
            className={cn(
              "w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-green-500/20",
              cart.length === 0 && "opacity-50 cursor-not-allowed grayscale pointer-events-none"
            )}
          >
            <ShoppingCart size={20} />
            Finalizar Pedido
          </Link>
        </div>
      </aside>

      {/* Mobile Bottom Cart Bar */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-card-dark/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 p-4 md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart className="text-primary" size={24} />
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white dark:ring-card-dark">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Total</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{total.toLocaleString()} Kz</p>
              </div>
            </div>
            <Link to="/checkout" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-2.5 px-6 rounded-xl shadow-lg flex items-center gap-2 transition-transform active:scale-95">
                Ver Carrinho
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
