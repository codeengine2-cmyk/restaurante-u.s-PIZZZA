import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Flame, PlusCircle, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [size, setSize] = useState<'regular' | 'medium' | 'large'>('regular');
  
  const currentPrice = product.prices ? product.prices[size] : product.price;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-card-dark p-4 rounded-xl shadow-sm border-l-4 border-transparent hover:border-primary transition-all group flex flex-col h-full hover:shadow-md"
    >
      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        {product.spicy && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md flex items-center gap-1 uppercase tracking-wider">
            <Flame size={12} className="fill-current" /> SPICY
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-xl font-bold font-display text-gray-900 dark:text-white group-hover:text-primary transition-colors leading-tight">
          {product.name}
        </h4>
        <div className="text-right">
          <span className="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap">
            {currentPrice.toLocaleString()} Kz
          </span>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-1 line-clamp-3">
        {product.description}
      </p>

      {product.prices && (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1.5 mb-4">
          <div className="flex justify-between items-center bg-white dark:bg-gray-700/50 rounded-md p-1 shadow-sm">
            {(Object.keys(product.prices) as Array<keyof typeof product.prices>).map((s) => (
              <button 
                key={s}
                onClick={(e) => {
                  e.stopPropagation();
                  setSize(s);
                }}
                className={cn(
                  "flex-1 text-center py-1.5 text-[10px] font-bold rounded capitalize transition-all",
                  size === s 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <button 
        onClick={() => addToCart(product, product.prices ? size : undefined)}
        className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white text-gray-900 dark:text-white font-bold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 mt-auto active:scale-95"
      >
        <PlusCircle size={18} />
        <span>Adicionar</span>
      </button>
    </motion.div>
  );
};

export default ProductCard;
