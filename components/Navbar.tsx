import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Pizza, ShoppingCart, Menu as MenuIcon, X, PhoneCall, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-[60] top-0 bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="relative">
              <Pizza className="text-primary group-hover:rotate-12 transition-transform duration-500" size={32} />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-primary/20 blur-md rounded-full -z-10"
              ></motion.div>
            </div>
            <div className="flex flex-col">
              <h1 className="font-brand text-xl tracking-[0.1em] text-gray-900 dark:text-white leading-none">
                U.S. PIZZA
              </h1>
              <span className="text-[10px] font-black tracking-[0.3em] text-primary mt-1">LUANDA</span>
            </div>
          </Link>
          
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {[
                { path: '/', label: 'Início' },
                { path: '/mesa/08', label: 'Pedir na Mesa', highlight: true },
                { path: '/tandy', label: "Tandy's Chicken" },
                { path: '/menu', label: 'Menu Delivery' },
                { path: '/offers', label: 'Ofertas' },
              ].map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={cn(
                    "font-display uppercase px-4 py-2 text-xs font-bold tracking-widest transition-all rounded-full flex items-center gap-1.5",
                    link.highlight
                      ? "bg-secondary text-gray-900 shadow-md shadow-amber-500/10 font-black hover:bg-amber-400"
                      : isActive(link.path) 
                      ? "text-primary bg-primary/5 shadow-sm shadow-primary/10" 
                      : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/imprimir-qrcodes"
              className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-display uppercase tracking-widest text-[11px] font-bold px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
              title="Imprimir placas com QR Code para colocar nas mesas"
            >
              <Printer size={14} className="text-primary" />
              Imprimir QR
            </Link>
            <Link to="/checkout" className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-all group">
              <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[10px] font-black text-white bg-primary rounded-full ring-2 ring-white dark:ring-background-dark"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <a 
              href="https://wa.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary hover:bg-red-700 text-white font-display uppercase tracking-[0.1em] text-xs font-black px-5 py-2.5 rounded-xl shadow-lg shadow-primary/20 transform hover:-translate-y-0.5 transition-all flex items-center gap-2 active:scale-95"
            >
              <PhoneCall size={14} />
              Pedir Agora
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Link to="/checkout" className="relative p-2 text-gray-500 dark:text-gray-400">
               <ShoppingCart size={24} />
               {itemCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
               )}
            </Link>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              {[
                { path: '/', label: 'Início' },
                { path: '/mesa/08', label: 'Pedir na Mesa (Mesa 08)', highlight: true },
                { path: '/tandy', label: "Tandy's Chicken" },
                { path: '/menu', label: 'Menu Delivery' },
                { path: '/offers', label: 'Ofertas' },
              ].map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  onClick={() => setIsOpen(false)} 
                  className={cn(
                    "font-display uppercase block px-4 py-3 rounded-xl text-lg font-bold tracking-wider",
                    link.highlight
                      ? "bg-secondary text-gray-900 font-black shadow-md"
                      : isActive(link.path) 
                      ? "text-primary bg-primary/5" 
                      : "text-gray-800 dark:text-gray-200"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                to="/checkout" 
                onClick={() => setIsOpen(false)} 
                className="font-display uppercase text-white bg-[#25D366] mt-4 flex items-center justify-center gap-3 px-4 py-4 rounded-xl text-lg font-bold transition-transform active:scale-95"
              >
                 <ShoppingCart size={20} /> Finalizar Pedido ({itemCount})
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
