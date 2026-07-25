import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { 
  ReceiptText, 
  Trash2, 
  Minus, 
  Plus, 
  User, 
  Phone, 
  MapPin, 
  CreditCard, 
  ArrowLeft,
  ChevronRight,
  MessageSquare,
  Bike,
  Store,
  ShoppingCart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const Checkout: React.FC = () => {
  const { cart, total, updateQuantity, removeFromCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'Dinheiro na Entrega',
    type: 'Entrega'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const deliveryFee = formData.type === 'Entrega' ? 1500 : 0;
  const finalTotal = total + deliveryFee;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    let message = `Olá U.S. Pizza, gostaria de fazer um pedido:\n\n`;
    message += `*Tipo:* ${formData.type}\n`;
    message += `*Nome:* ${formData.name}\n`;
    message += `*Telefone:* ${formData.phone}\n`;
    if (formData.type === 'Entrega') {
        message += `*Endereço:* ${formData.address}\n`;
    }
    message += `\n*Itens:*\n`;
    
    cart.forEach(item => {
        message += `- ${item.quantity}x ${item.name} ${item.selectedSize ? `(${item.selectedSize})` : ''} - ${(item.finalPrice * item.quantity).toLocaleString()} Kz\n`;
    });

    message += `\n*Subtotal:* ${total.toLocaleString()} Kz`;
    message += `\n*Taxa de Entrega:* ${deliveryFee.toLocaleString()} Kz`;
    message += `\n*TOTAL:* ${finalTotal.toLocaleString()} Kz`;
    message += `\n\n*Pagamento:* ${formData.paymentMethod}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/244900000000?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-50 dark:bg-background-dark pb-20">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-repeat bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')] z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4"
        >
          <div>
            <Link to="/menu" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors mb-4 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Menu
            </Link>
            <h2 className="text-4xl font-brand text-gray-900 dark:text-white uppercase tracking-tight">Finalizar <span className="text-primary">Pedido</span></h2>
          </div>
          
          <div className="flex bg-white dark:bg-card-dark p-1 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm w-fit">
            <button 
                type="button" 
                onClick={() => setFormData({...formData, type: 'Entrega'})}
                className={cn(
                  "flex items-center gap-2 py-2 px-6 rounded-xl text-sm font-bold transition-all",
                  formData.type === 'Entrega' ? "bg-primary text-white shadow-md" : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
            >
                <Bike size={18} /> Entrega
            </button>
            <button 
                type="button"
                onClick={() => setFormData({...formData, type: 'Takeaway'})}
                className={cn(
                  "flex items-center gap-2 py-2 px-6 rounded-xl text-sm font-bold transition-all",
                  formData.type === 'Takeaway' ? "bg-primary text-white shadow-md" : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
            >
                <Store size={18} /> Takeaway
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Cart Summary */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-12 xl:col-span-7 space-y-8"
          >
            <div className="bg-white dark:bg-card-dark rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <ReceiptText className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white uppercase tracking-tight">Resumo do Pedido</h3>
                </div>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-bold text-gray-500">{cart.length} Itens</span>
              </div>
              
              {cart.length === 0 ? (
                <div className="p-20 text-center flex flex-col items-center">
                  <ShoppingCart size={48} className="text-gray-200 dark:text-gray-700 mb-6" />
                  <p className="text-gray-500 dark:text-gray-400 font-medium mb-6">Seu carrinho está vazio.</p>
                  <Link to="/menu" className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-red-700 transition-colors">Voltar ao Menu</Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  <AnimatePresence initial={false}>
                    {cart.map(item => (
                      <motion.div 
                        key={item.cartId} 
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-8 flex flex-col sm:flex-row items-center gap-6 group hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors"
                      >
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 p-1">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover rounded-xl" />
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                             <div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h4>
                                {item.selectedSize && (
                                  <span className="text-xs font-black text-primary uppercase tracking-widest mt-1 inline-block">{item.selectedSize}</span>
                                )}
                             </div>
                             <p className="text-xl font-black text-gray-900 dark:text-white">{(item.finalPrice * item.quantity).toLocaleString()} <span className="text-xs font-bold opacity-40">Kz</span></p>
                          </div>
                          
                          <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4">
                            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                              <button onClick={() => item.quantity > 1 ? updateQuantity(item.cartId, -1) : removeFromCart(item.cartId)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors hover:bg-white dark:hover:bg-gray-700 rounded-lg">
                                <Minus size={14} />
                              </button>
                              <span className="w-10 text-center font-bold text-gray-900 dark:text-white">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.cartId, 1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors hover:bg-white dark:hover:bg-gray-700 rounded-lg">
                                <Plus size={14} />
                              </button>
                            </div>
                            <button onClick={() => removeFromCart(item.cartId)} className="text-red-500 hover:text-red-600 text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">
                              <Trash2 size={14} /> Remover
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              <div className="bg-gray-50 dark:bg-gray-800/30 p-10 space-y-4">
                <div className="flex justify-between text-gray-500 dark:text-gray-400 font-medium">
                  <p>Subtotal</p>
                  <p className="text-gray-900 dark:text-white">{total.toLocaleString()} Kz</p>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400 font-medium pb-4 border-b border-gray-200 dark:border-gray-700">
                  <p>Taxa de Entrega</p>
                  <p className={cn("font-bold", formData.type === 'Entrega' ? "text-gray-900 dark:text-white" : "text-green-500")}>
                    {formData.type === 'Entrega' ? '1,500 Kz' : 'Grátis'}
                  </p>
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <p className="text-2xl font-brand text-gray-900 dark:text-white uppercase tracking-tighter">Total do Pedido</p>
                  <p className="text-4xl font-brand text-primary drop-shadow-[0_2px_10px_rgba(209,40,47,0.2)]">{finalTotal.toLocaleString()} <span className="text-sm font-body font-bold">Kz</span></p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-12 xl:col-span-5"
          >
            <div className="bg-white dark:bg-card-dark rounded-3xl shadow-2xl p-10 border border-gray-100 dark:border-gray-800 sticky top-32">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-primary/10 rounded-xl">
                    <User className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-display font-bold text-gray-800 dark:text-white uppercase tracking-tight">Dados de Entrega</h3>
              </div>
              
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center justify-between" htmlFor="name">
                    Nome Completo
                    {formData.name && <span className="text-green-500"><ChevronRight size={14} /></span>}
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-primary transition-colors">
                      <User size={18} />
                    </div>
                    <input 
                      value={formData.name} onChange={handleInputChange}
                      type="text" name="name" id="name" 
                      className="bg-gray-50/50 dark:bg-gray-800/50 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-800 w-full pl-12 pr-4 py-4 rounded-2xl transition-all outline-none text-gray-900 dark:text-white font-medium" 
                      placeholder="Ex: João Manuel" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center justify-between" htmlFor="phone">
                    WhatsApp
                    {formData.phone && <span className="text-green-500"><ChevronRight size={14} /></span>}
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-primary transition-colors">
                      <Phone size={18} />
                    </div>
                    <input 
                      value={formData.phone} onChange={handleInputChange}
                      type="tel" name="phone" id="phone" 
                      className="bg-gray-50/50 dark:bg-gray-800/50 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-800 w-full pl-12 pr-4 py-4 rounded-2xl transition-all outline-none text-gray-900 dark:text-white font-medium" 
                      placeholder="+244 9XX XXX XXX" 
                    />
                  </div>
                </div>
                
                {formData.type === 'Entrega' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2"
                  >
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest" htmlFor="address">Morada Completa</label>
                    <div className="relative group">
                      <div className="absolute top-4 left-4 pointer-events-none group-focus-within:text-primary transition-colors">
                        <MapPin size={18} />
                      </div>
                      <textarea 
                        value={formData.address} onChange={handleInputChange}
                        name="address" id="address" rows={3} 
                        className="bg-gray-50/50 dark:bg-gray-800/50 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-800 w-full pl-12 pr-4 py-4 rounded-2xl transition-all outline-none text-gray-900 dark:text-white font-medium" 
                        placeholder="Bairro, Rua, Ponto de referência..."
                      ></textarea>
                    </div>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <CreditCard size={14} /> Pagamento
                  </label>
                  <select 
                    name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}
                    className="bg-gray-50/50 dark:bg-gray-800/50 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-800 w-full px-4 py-4 rounded-2xl transition-all outline-none text-gray-900 dark:text-white font-bold cursor-pointer"
                  >
                    <option>Dinheiro na Entrega</option>
                    <option>Multicaixa Express</option>
                    <option>TPA (Cartão)</option>
                  </select>
                </div>

                <div className="pt-6">
                  <button 
                    type="button"
                    onClick={handleCheckout}
                    disabled={cart.length === 0 || !formData.name || !formData.phone}
                    className={cn(
                      "w-full group relative flex justify-center items-center py-5 px-6 rounded-2xl text-xl font-bold text-white transition-all overflow-hidden",
                      cart.length === 0 || !formData.name || !formData.phone
                        ? "bg-gray-300 cursor-not-allowed" 
                        : "bg-[#25D366] hover:bg-[#20bd5a] shadow-[0_15px_30px_rgba(37,211,102,0.3)] active:scale-95"
                    )}
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <MessageSquare size={24} className="mr-3" />
                    Enviar via WhatsApp
                  </button>
                  <p className="mt-4 text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest px-6">
                    Ao confirmar, abriremos o WhatsApp para enviar os detalhes do seu pedido.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
