import React, { useState } from 'react';
import { Product, ExtraOption } from '../types';
import { availableExtras, availableSides } from '../data';
import { X, Plus, Minus, Flame, Clock, Check, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

interface TableCustomizationModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (customizedItem: {
    product: Product;
    quantity: number;
    size?: 'regular' | 'medium' | 'large';
    selectedExtras: ExtraOption[];
    removedIngredients: string[];
    selectedSide?: string;
    notes: string;
    finalPrice: number;
  }) => void;
  tableNumber: string;
}

const TableCustomizationModal: React.FC<TableCustomizationModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  tableNumber,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<'regular' | 'medium' | 'large'>('regular');
  const [selectedExtras, setSelectedExtras] = useState<ExtraOption[]>([]);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [selectedSide, setSelectedSide] = useState<string>('');
  const [notes, setNotes] = useState('');

  // Calculate base price
  const basePrice = product.prices ? product.prices[selectedSize] : product.price;
  const extrasPrice = selectedExtras.reduce((acc, curr) => acc + curr.price, 0);
  
  // Find selected side price if any
  const sideObj = availableSides.find(s => s.name === selectedSide);
  const sidePrice = sideObj ? sideObj.price : 0;

  const unitPrice = basePrice + extrasPrice + sidePrice;
  const totalPrice = unitPrice * quantity;

  const toggleExtra = (extra: ExtraOption) => {
    if (selectedExtras.some(e => e.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter(e => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const toggleRemovedIngredient = (ingredient: string) => {
    if (removedIngredients.includes(ingredient)) {
      setRemovedIngredients(removedIngredients.filter(i => i !== ingredient));
    } else {
      setRemovedIngredients([...removedIngredients, ingredient]);
    }
  };

  const handleAdd = () => {
    onAddToCart({
      product,
      quantity,
      size: product.prices ? selectedSize : undefined,
      selectedExtras,
      removedIngredients,
      selectedSide: selectedSide || undefined,
      notes,
      finalPrice: unitPrice,
    });
    onClose();
    // Reset state
    setQuantity(1);
    setSelectedExtras([]);
    setRemovedIngredients([]);
    setSelectedSide('');
    setNotes('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white dark:bg-card-dark rounded-3xl shadow-2xl overflow-hidden z-10 my-8 border border-gray-100 dark:border-gray-800 flex flex-col max-h-[90vh]"
          >
            {/* Header Image */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
              >
                <X size={20} />
              </button>

              <div className="absolute top-4 left-4 flex gap-2">
                {product.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-secondary text-gray-900 uppercase tracking-wider shadow-md">
                    {product.badge}
                  </span>
                )}
                {product.spicy && (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Flame size={12} className="fill-current" /> Picante
                  </span>
                )}
              </div>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/20 px-2.5 py-0.5 rounded-full border border-primary/30">
                  Mesa {tableNumber} • Personalização
                </span>
                <h3 className="text-3xl font-brand mt-1 uppercase tracking-tight">{product.name}</h3>
                {product.prepTime && (
                  <p className="text-xs text-gray-300 flex items-center gap-1 mt-1 font-medium">
                    <Clock size={12} className="text-secondary" /> Tempo estimado: {product.prepTime}
                  </p>
                )}
              </div>
            </div>

            {/* Scrollable Form Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-gray-800 dark:text-gray-100">
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>

              {/* Ingredients Pill Tag List */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2">
                    Ingredientes Principais
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {product.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-700"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.prices && (
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-200/60 dark:border-gray-700/60">
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3 flex items-center justify-between">
                    <span>Escolha o Tamanho</span>
                    <span className="text-primary font-bold text-[10px]">Obrigatório</span>
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {(Object.keys(product.prices) as Array<keyof typeof product.prices>).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={cn(
                          'py-3 px-2 rounded-xl text-center transition-all flex flex-col items-center border',
                          selectedSize === s
                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]'
                            : 'bg-white dark:bg-card-dark border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary/50'
                        )}
                      >
                        <span className="text-xs font-bold uppercase tracking-wider">{s}</span>
                        <span className="text-sm font-black mt-1">
                          {product.prices![s].toLocaleString()} Kz
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Extra Ingredients */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-secondary" />
                  Ingredientes Extras (Opcional)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {availableExtras.map((extra) => {
                    const isSelected = selectedExtras.some((e) => e.id === extra.id);
                    return (
                      <button
                        key={extra.id}
                        type="button"
                        onClick={() => toggleExtra(extra)}
                        className={cn(
                          'p-3 rounded-xl flex items-center justify-between transition-all border text-left text-xs',
                          isSelected
                            ? 'bg-secondary/10 border-secondary text-gray-900 dark:text-white font-bold'
                            : 'bg-gray-50/70 dark:bg-gray-800/40 border-gray-200/80 dark:border-gray-700/80 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              'w-4 h-4 rounded flex items-center justify-center border transition-colors',
                              isSelected ? 'bg-secondary border-secondary text-gray-900' : 'border-gray-400'
                            )}
                          >
                            {isSelected && <Check size={10} strokeWidth={4} />}
                          </div>
                          <span>{extra.name}</span>
                        </div>
                        <span className="font-bold text-secondary">+{extra.price} Kz</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Remove Ingredients */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                    <AlertCircle size={14} className="text-red-500" />
                    Remover Algum Ingrediente?
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {product.ingredients.map((ing) => {
                      const isRemoved = removedIngredients.includes(ing);
                      return (
                        <button
                          key={ing}
                          type="button"
                          onClick={() => toggleRemovedIngredient(ing)}
                          className={cn(
                            'p-2.5 rounded-xl flex items-center gap-2 transition-all border text-xs font-medium',
                            isRemoved
                              ? 'bg-red-500/10 border-red-500 text-red-600 dark:text-red-400 font-bold line-through'
                              : 'bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                          )}
                        >
                          <div
                            className={cn(
                              'w-4 h-4 rounded flex items-center justify-center border',
                              isRemoved ? 'bg-red-500 border-red-500 text-white' : 'border-gray-400'
                            )}
                          >
                            {isRemoved && <X size={10} strokeWidth={4} />}
                          </div>
                          <span className="truncate">Sem {ing}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Choose Side / Acompanhamento */}
              {product.category !== 'drinks' && product.category !== 'desserts' && (
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3">
                    Acompanhamento Especial
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {availableSides.map((side) => {
                      const isSelected = selectedSide === side.name;
                      return (
                        <button
                          key={side.id}
                          type="button"
                          onClick={() => setSelectedSide(isSelected ? '' : side.name)}
                          className={cn(
                            'p-3 rounded-xl flex items-center justify-between border transition-all text-xs',
                            isSelected
                              ? 'bg-primary/10 border-primary text-gray-900 dark:text-white font-bold'
                              : 'bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                          )}
                        >
                          <span>{side.name}</span>
                          <span className="font-bold text-primary">+{side.price} Kz</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Special Notes / Observações */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2">
                  Observações para a Cozinha
                </h4>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Servir molho à parte, bem passado, etc..."
                  rows={2}
                  className="w-full bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-xs outline-none focus:border-primary transition-colors text-gray-900 dark:text-white"
                ></textarea>
              </div>
            </div>

            {/* Footer Action Bar */}
            <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-800/90 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
              {/* Quantity Counter */}
              <div className="flex items-center gap-3 bg-white dark:bg-card-dark p-1.5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm w-full sm:w-auto justify-center">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-black text-lg text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add Button */}
              <button
                type="button"
                onClick={handleAdd}
                className="w-full sm:w-auto flex-1 bg-primary hover:bg-red-700 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-between gap-4 transition-all active:scale-95"
              >
                <span className="text-sm uppercase tracking-wider">Adicionar ao Pedido</span>
                <span className="text-lg font-black font-brand tracking-wider">
                  {totalPrice.toLocaleString()} Kz
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TableCustomizationModal;
