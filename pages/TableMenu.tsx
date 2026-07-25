import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { products, availableExtras } from '../data';
import { Product, TableOrder, TableOrderItem, TableServiceRequest, ExtraOption, TableRating } from '../types';
import TableCustomizationModal from '../components/TableCustomizationModal';
import TableServiceFloatingButton from '../components/TableServiceFloatingButton';
import TablePaymentModal from '../components/TablePaymentModal';
import TableRatingModal from '../components/TableRatingModal';
import QRCodeGeneratorModal from '../components/QRCodeGeneratorModal';
import { 
  Pizza, 
  Users, 
  Clock, 
  Flame, 
  Sparkles, 
  ShoppingCart, 
  Send, 
  CheckCircle2, 
  ChefHat, 
  Bike, 
  Smile, 
  QrCode, 
  Trash2, 
  Plus, 
  Minus, 
  UtensilsCrossed,
  Info,
  ChevronRight,
  Star,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const TableMenu: React.FC = () => {
  const { tableId } = useParams<{ tableId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active table number (default 08)
  const [tableNumber, setTableNumber] = useState<string>(tableId || '08');
  const [guestCount, setGuestCount] = useState<number>(2);

  // Sync route tableId
  useEffect(() => {
    if (tableId) {
      setTableNumber(tableId);
    }
  }, [tableId]);

  // Categories and Highlight Tabs
  const [activeCategory, setActiveCategory] = useState<'all' | 'pizza' | 'chicken' | 'wings' | 'drinks' | 'desserts'>('all');
  const [activeHighlight, setActiveHighlight] = useState<'Especialidades' | 'Promoções' | 'Mais Pedidos' | 'Recomendados' | 'Novidades'>('Especialidades');

  // Modals state
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  // Table Cart State
  const [tableCart, setTableCart] = useState<TableOrderItem[]>([]);
  const [serviceRequests, setServiceRequests] = useState<TableServiceRequest[]>([]);

  // Active Order State (for kitchen tracking)
  const [activeOrder, setActiveOrder] = useState<TableOrder | null>(null);

  // Computed Cart Subtotal
  const cartSubtotal = tableCart.reduce((sum, item) => sum + item.totalItemPrice, 0);

  // Handle Add Customized Item to Table Cart
  const handleAddToCart = (customizedItem: {
    product: Product;
    quantity: number;
    size?: 'regular' | 'medium' | 'large';
    selectedExtras: ExtraOption[];
    removedIngredients: string[];
    selectedSide?: string;
    notes: string;
    finalPrice: number;
  }) => {
    const newItem: TableOrderItem = {
      id: Math.random().toString(36).substring(2, 9),
      name: customizedItem.product.name,
      quantity: customizedItem.quantity,
      price: customizedItem.finalPrice,
      selectedSize: customizedItem.size,
      selectedExtras: customizedItem.selectedExtras,
      removedIngredients: customizedItem.removedIngredients,
      selectedSide: customizedItem.selectedSide,
      notes: customizedItem.notes,
      totalItemPrice: customizedItem.finalPrice * customizedItem.quantity,
      image: customizedItem.product.image,
    };

    setTableCart([...tableCart, newItem]);
  };

  const handleRemoveFromCart = (id: string) => {
    setTableCart(tableCart.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setTableCart(tableCart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) return item;
        const unitPrice = item.totalItemPrice / item.quantity;
        return {
          ...item,
          quantity: newQty,
          totalItemPrice: unitPrice * newQty,
        };
      }
      return item;
    }));
  };

  // Dispatch Order to Kitchen
  const handleSendOrderToKitchen = () => {
    if (tableCart.length === 0) return;

    const newOrder: TableOrder = {
      id: `US-${Math.floor(1000 + Math.random() * 9000)}`,
      tableNumber,
      guestCount,
      items: [...tableCart],
      subtotal: cartSubtotal,
      serviceFee: Math.round(cartSubtotal * 0.1),
      total: Math.round(cartSubtotal * 1.1),
      status: 'recebido',
      createdAt: new Date().toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' }),
      paymentStatus: 'pendente',
    };

    setActiveOrder(newOrder);
    setTableCart([]); // Clear cart after placing order
  };

  // Simulate Order Tracking Status Progression
  useEffect(() => {
    if (!activeOrder) return;

    const statuses: Array<TableOrder['status']> = [
      'recebido',
      'preparacao',
      'quase_pronto',
      'a_caminho',
      'entregue',
    ];

    let currentIndex = statuses.indexOf(activeOrder.status);

    if (currentIndex < statuses.length - 1) {
      const timer = setTimeout(() => {
        setActiveOrder((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            status: statuses[currentIndex + 1],
          };
        });
      }, 7000); // Progresses status every 7 seconds for demonstration

      return () => clearTimeout(timer);
    }
  }, [activeOrder]);

  // Handle In-Table Service Request
  const handleRequestService = (
    type: 'garcom' | 'bebidas' | 'sobremesa' | 'talheres' | 'conta',
    label: string
  ) => {
    const newReq: TableServiceRequest = {
      id: Math.random().toString(36).substring(2, 7),
      tableNumber,
      type,
      label,
      timestamp: new Date().toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' }),
      status: 'pendente',
    };
    setServiceRequests([newReq, ...serviceRequests]);
  };

  // Handle Payment Completion
  const handlePaymentComplete = (methodName: string, receiptId: string) => {
    if (activeOrder) {
      setActiveOrder({
        ...activeOrder,
        paymentStatus: 'pago',
        paymentMethod: methodName,
        receiptId,
      });
    }
  };

  // Highlight Section Products Filter
  const highlightProducts = products.filter(
    (p) => p.highlightCategory === activeHighlight
  );

  // Filtered Menu Products
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const getStatusStep = (status: TableOrder['status']) => {
    switch (status) {
      case 'recebido': return 1;
      case 'preparacao': return 2;
      case 'quase_pronto': return 3;
      case 'a_caminho': return 4;
      case 'entregue': return 5;
      default: return 1;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-28 bg-gray-50 dark:bg-background-dark relative">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-15 bg-repeat bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Top Table Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-card-dark rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-xl mb-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-primary text-white font-brand text-sm px-4 py-1.5 rounded-full shadow-lg shadow-primary/20 tracking-wider">
                  MESA {tableNumber}
                </span>

                <button
                  onClick={() => setIsQRModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full transition-colors"
                >
                  <QrCode size={14} /> Trocar Mesa / Ver QR
                </button>

                <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/20">
                  <Clock size={12} /> Prep Médio: 20-25 min
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl font-brand text-gray-900 dark:text-white uppercase tracking-tight">
                Bem-vindo ao <span className="text-primary">U.S. Pizza Luanda</span>
              </h2>

              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                Você está na <strong className="font-bold text-gray-900 dark:text-white">Mesa {tableNumber}</strong>. Faça seu pedido de forma rápida e confortável direto pelo telemóvel.
              </p>
            </div>

            {/* Guest Count Selector & Opening Hours Info */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto bg-gray-50 dark:bg-gray-800/60 p-4 rounded-2xl border border-gray-200/60 dark:border-gray-700/60">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1">
                  <Users size={12} /> Pessoas na Mesa
                </span>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5, 6].map((cnt) => (
                    <button
                      key={cnt}
                      onClick={() => setGuestCount(cnt)}
                      className={cn(
                        "w-8 h-8 rounded-lg text-xs font-black transition-all flex items-center justify-center",
                        guestCount === cnt
                          ? "bg-primary text-white shadow-md scale-105"
                          : "bg-white dark:bg-card-dark text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                      )}
                    >
                      {cnt}{cnt === 6 ? '+' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-gray-700"></div>

              <div className="text-xs space-y-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">Horário</span>
                <p className="font-bold text-gray-900 dark:text-white">Seg - Dom: 11h - 23h50</p>
                <p className="text-[10px] text-green-500 font-bold">● Cozinha Aberta</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Live Order Tracking Timeline Card (When Order Dispatched) */}
        <AnimatePresence>
          {activeOrder && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="bg-white dark:bg-card-dark rounded-3xl p-6 sm:p-8 border-2 border-primary/30 shadow-2xl mb-12 relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-black uppercase tracking-widest rounded-full">
                    Acompanhamento em Tempo Real • Mesa {activeOrder.tableNumber}
                  </span>
                  <h3 className="text-2xl font-brand text-gray-900 dark:text-white uppercase tracking-tight mt-1">
                    Status do Pedido #{activeOrder.id}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  {activeOrder.paymentStatus === 'pago' ? (
                    <span className="px-4 py-2 bg-emerald-500/10 text-emerald-500 font-bold text-xs rounded-xl border border-emerald-500/20 flex items-center gap-1.5">
                      <CheckCircle2 size={16} /> Pago via {activeOrder.paymentMethod}
                    </span>
                  ) : (
                    <button
                      onClick={() => setIsPaymentModalOpen(true)}
                      className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-green-500/20 text-xs flex items-center gap-2 transition-transform active:scale-95"
                    >
                      Pagar na Mesa ({activeOrder.total.toLocaleString()} Kz)
                    </button>
                  )}

                  {activeOrder.status === 'entregue' && (
                    <button
                      onClick={() => setIsRatingModalOpen(true)}
                      className="bg-secondary text-gray-900 font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md hover:bg-amber-400"
                    >
                      <Star size={14} className="fill-current" /> Avaliar Refeição
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Steps Timeline */}
              <div className="relative mb-8">
                <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0"></div>
                
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
                  {[
                    { step: 1, key: 'recebido', label: 'Pedido Recebido', desc: 'Recebido na cozinha', icon: <Info size={18} /> },
                    { step: 2, key: 'preparacao', label: 'Em Preparação', desc: 'Chef a preparar', icon: <ChefHat size={18} /> },
                    { step: 3, key: 'quase_pronto', label: 'Quase Pronto', desc: 'No forno / montagem', icon: <Flame size={18} /> },
                    { step: 4, key: 'a_caminho', label: 'A Caminho', desc: 'A levar à Mesa ' + activeOrder.tableNumber, icon: <Bike size={18} /> },
                    { step: 5, key: 'entregue', label: 'Pedido Entregue', desc: 'Bom apetite!', icon: <Smile size={18} /> },
                  ].map((s) => {
                    const currentStep = getStatusStep(activeOrder.status);
                    const isDone = s.step <= currentStep;
                    const isCurrent = s.step === currentStep;

                    return (
                      <div
                        key={s.key}
                        className={cn(
                          "p-4 rounded-2xl flex flex-col items-center text-center transition-all border",
                          isCurrent
                            ? "bg-primary text-white border-primary shadow-xl scale-105"
                            : isDone
                            ? "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-bold"
                            : "bg-gray-50 dark:bg-gray-800/50 text-gray-400 border-gray-200/60 dark:border-gray-700/60"
                        )}
                      >
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center mb-2 font-black text-sm",
                            isCurrent
                              ? "bg-white text-primary shadow-md"
                              : isDone
                              ? "bg-emerald-500 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                          )}
                        >
                          {isDone && !isCurrent ? <CheckCircle2 size={18} /> : s.icon}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider">{s.label}</span>
                        <span className="text-[10px] opacity-80 mt-0.5">{s.desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Itemized Order Recap */}
              <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-2xl border border-gray-200/60 dark:border-gray-700/60">
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">
                  Itens do Pedido ({activeOrder.items.length})
                </p>
                <div className="divide-y divide-gray-200/60 dark:divide-gray-700/60">
                  {activeOrder.items.map((item, idx) => (
                    <div key={idx} className="py-2 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-gray-900 dark:text-white">
                          {item.quantity}x {item.name}
                        </span>
                        {item.selectedSize && (
                          <span className="ml-2 text-[10px] text-primary font-bold uppercase">
                            ({item.selectedSize})
                          </span>
                        )}
                        {item.selectedExtras && item.selectedExtras.length > 0 && (
                          <p className="text-[10px] text-secondary font-medium">
                            + Extras: {item.selectedExtras.map(e => e.name).join(', ')}
                          </p>
                        )}
                        {item.removedIngredients && item.removedIngredients.length > 0 && (
                          <p className="text-[10px] text-red-400 font-medium">
                            Sem: {item.removedIngredients.join(', ')}
                          </p>
                        )}
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {item.totalItemPrice.toLocaleString()} Kz
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Highlights Section (Destaques) */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-secondary flex items-center gap-1">
                <Sparkles size={14} /> Sugestões da Casa
              </span>
              <h3 className="text-3xl font-brand text-gray-900 dark:text-white uppercase tracking-tight">
                Destaques do Chefe
              </h3>
            </div>

            {/* Highlight Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-white dark:bg-card-dark rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              {(['Especialidades', 'Promoções', 'Mais Pedidos', 'Recomendados', 'Novidades'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveHighlight(tab)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                    activeHighlight === tab
                      ? "bg-primary text-white shadow-md scale-105"
                      : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Highlight Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlightProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-card-dark rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-lg flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>

                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-secondary text-gray-900 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      {product.badge}
                    </span>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                    <span className="text-xs font-medium flex items-center gap-1 opacity-90">
                      <Clock size={12} className="text-secondary" /> {product.prepTime || '15 min'}
                    </span>
                    <span className="text-lg font-brand text-secondary drop-shadow">
                      {product.price.toLocaleString()} Kz
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-brand text-xl text-gray-900 dark:text-white uppercase mb-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 font-light leading-relaxed mb-4">
                      {product.description}
                    </p>
                  </div>

                  <button
                    onClick={() => setCustomizingProduct(product)}
                    className="w-full bg-primary hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-primary/20"
                  >
                    <Plus size={16} /> Personalizar & Pedir
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Categorized Full Menu & Table Cart Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Menu Products List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-card-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="font-brand text-2xl text-gray-900 dark:text-white uppercase tracking-tight">
                Cardápio da Mesa
              </h3>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'Todos' },
                  { id: 'pizza', label: 'Pizzas' },
                  { id: 'chicken', label: 'Frango Tandy' },
                  { id: 'wings', label: 'Asas' },
                  { id: 'desserts', label: 'Sobremesas' },
                  { id: 'drinks', label: 'Bebidas' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                      activeCategory === cat.id
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-primary"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-card-dark rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className="absolute top-2 left-2 bg-secondary text-gray-900 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md shadow-sm">
                        {product.badge}
                      </span>
                    )}
                    {product.spicy && (
                      <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                        <Flame size={10} className="fill-current" /> SPICY
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="font-brand text-lg text-gray-900 dark:text-white uppercase leading-tight group-hover:text-primary transition-colors">
                        {product.name}
                      </h4>
                      <span className="font-bold text-primary whitespace-nowrap text-base">
                        {product.price.toLocaleString()} Kz
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 font-light">
                      {product.description}
                    </p>

                    {/* Ingredients preview */}
                    {product.ingredients && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.ingredients.slice(0, 3).map((ing) => (
                          <span key={ing} className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-md font-medium">
                            {ing}
                          </span>
                        ))}
                        {product.ingredients.length > 3 && (
                          <span className="text-[10px] text-gray-400 font-bold">
                            +{product.ingredients.length - 3} mais
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setCustomizingProduct(product)}
                    className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white text-gray-900 dark:text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <Plus size={16} /> Personalizar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Table Cart & Kitchen Dispatch Bar */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white dark:bg-card-dark rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 text-primary rounded-xl">
                    <ShoppingCart size={20} />
                  </div>
                  <div>
                    <h4 className="font-brand text-lg text-gray-900 dark:text-white uppercase leading-none">
                      Carrinho da Mesa {tableNumber}
                    </h4>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      {tableCart.length} Itens Adicionados
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold bg-primary text-white px-2.5 py-1 rounded-full">
                  Mesa {tableNumber}
                </span>
              </div>

              {/* Items List */}
              <div className="p-6 space-y-4 max-h-[380px] overflow-y-auto">
                {tableCart.length === 0 ? (
                  <div className="py-12 text-center text-gray-400 space-y-3">
                    <UtensilsCrossed size={40} className="mx-auto opacity-30" />
                    <p className="text-xs font-medium">Nenhum item adicionado para a Mesa {tableNumber}.</p>
                    <p className="text-[10px] text-gray-500">Escolha um prato e clique em "Personalizar".</p>
                  </div>
                ) : (
                  tableCart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-700/60 space-y-2"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <p className="font-bold text-sm text-gray-900 dark:text-white">
                            {item.quantity}x {item.name}
                          </p>
                          {item.selectedSize && (
                            <span className="text-[10px] font-bold text-primary uppercase">
                              Tamanho: {item.selectedSize}
                            </span>
                          )}
                        </div>

                        <span className="font-bold text-xs text-primary whitespace-nowrap">
                          {item.totalItemPrice.toLocaleString()} Kz
                        </span>
                      </div>

                      {/* Display extras & removals */}
                      {item.selectedExtras && item.selectedExtras.length > 0 && (
                        <p className="text-[10px] text-secondary font-medium">
                          + Extras: {item.selectedExtras.map(e => e.name).join(', ')}
                        </p>
                      )}

                      {item.removedIngredients && item.removedIngredients.length > 0 && (
                        <p className="text-[10px] text-red-400 font-medium">
                          Sem: {item.removedIngredients.join(', ')}
                        </p>
                      )}

                      {item.selectedSide && (
                        <p className="text-[10px] text-blue-400 font-medium">
                          Acompanhamento: {item.selectedSide}
                        </p>
                      )}

                      {item.notes && (
                        <p className="text-[10px] text-gray-400 italic">
                          "{item.notes}"
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center gap-2 bg-white dark:bg-card-dark rounded-xl p-1 border border-gray-200 dark:border-gray-700">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-primary"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                            className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-primary"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-red-500 hover:text-red-600 p-1 rounded-lg text-xs"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Total & Enviar Pedido Button */}
              <div className="p-6 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-100 dark:border-gray-800 space-y-4">
                <div className="flex justify-between text-xs text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span className="text-gray-900 dark:text-white font-bold">{cartSubtotal.toLocaleString()} Kz</span>
                </div>

                <div className="flex justify-between items-center text-lg font-black text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="font-brand uppercase">Total do Pedido</span>
                  <span className="text-primary font-brand text-2xl">{cartSubtotal.toLocaleString()} Kz</span>
                </div>

                <button
                  onClick={handleSendOrderToKitchen}
                  disabled={tableCart.length === 0}
                  className={cn(
                    "w-full py-4 px-6 rounded-2xl font-bold uppercase tracking-wider text-white shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 text-sm",
                    tableCart.length === 0
                      ? "bg-gray-300 cursor-not-allowed opacity-50"
                      : "bg-primary hover:bg-red-700 shadow-primary/20"
                  )}
                >
                  <Send size={18} /> Enviar Pedido para a Cozinha
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Service Action Button */}
      <TableServiceFloatingButton
        tableNumber={tableNumber}
        onRequestService={handleRequestService}
        onRequestPayment={() => setIsPaymentModalOpen(true)}
        activeRequests={serviceRequests.filter((r) => r.status === 'pendente')}
      />

      {/* Customization Modal */}
      <TableCustomizationModal
        product={customizingProduct}
        isOpen={!!customizingProduct}
        onClose={() => setCustomizingProduct(null)}
        onAddToCart={handleAddToCart}
        tableNumber={tableNumber}
      />

      {/* QR Code / Table Switcher Modal */}
      <QRCodeGeneratorModal
        currentTable={tableNumber}
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        onSelectTable={(newTbl) => {
          setTableNumber(newTbl);
          navigate(`/mesa/${newTbl}`);
        }}
      />

      {/* Payment Modal */}
      <TablePaymentModal
        order={activeOrder}
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentComplete={handlePaymentComplete}
      />

      {/* Rating Modal */}
      <TableRatingModal
        tableNumber={tableNumber}
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        onSubmitRating={(rating) => {
          console.log('Rating submitted:', rating);
        }}
      />
    </div>
  );
};

export default TableMenu;
