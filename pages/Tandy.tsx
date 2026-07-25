import React from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data';
import { Link } from 'react-router-dom';
import { ShoppingCart, Flame, Star, Clock, Trophy, ChevronRight, Plus, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const Tandy: React.FC = () => {
  const { addToCart } = useCart();
  // Filter only chicken products for this page
  const chickenProducts = products.filter(p => p.category === 'chicken' || p.category === 'wings');

  return (
    <div className="bg-[#0f0a05] text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0a05]/60 via-[#0f0a05]/40 to-[#0f0a05] z-10"></div>
          <img 
            alt="Crispy Fried Chicken Bucket" 
            className="w-full h-full object-cover object-center" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUAeih02hgYGXNrG4g_DsgcKKEdc4Hwduj0HwAKEVzjSZ8LMgPzkMfYboPsLZh7RDwu5bDdKNRpWcLFxSOkkorcPwanKfwMpJrfJMGqDjir6pg0Evlx_8FfxsZIfuFcB06tOWBn-BJpGtsMXDNiWHR2m4L9xOfmG_v-qOACjwyvGETmjcT-UolmmPRGyAwUpqPi3hAXIOaRby6p_Tc-AcRB7jOI6r6cwN0qgkruVLOybl1_hP4Olfif1T2RMP7ZSCk50rbPOBN9w" 
          />
        </motion.div>

        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-orange-500/30 rounded-full bg-black/40 backdrop-blur-md mb-8"
          >
            <Trophy className="text-orange-500" size={16} />
            <span className="text-orange-400 font-display uppercase tracking-[0.2em] text-[10px] font-black">A Receita Original de 1982</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: 'spring' }}
            className="text-6xl md:text-8xl lg:text-9xl font-brand mb-6 leading-none"
          >
            TANDY'S <br/>
            <span className="text-orange-500 drop-shadow-[0_0_30px_rgba(249,115,22,0.4)]">FRIED CHICKEN</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            O segredo está na marinada de 24 horas e no empanamento artesanal. 
            Crocância extrema por fora, suculência absoluta por dentro.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Link to="/menu" className="bg-orange-500 hover:bg-orange-600 text-white font-display uppercase tracking-widest font-black px-10 py-5 rounded-2xl shadow-2xl shadow-orange-500/20 transition-all active:scale-95 group flex items-center gap-3 mx-auto w-fit">
              Explorar Menu <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Floating Icons */}
        <div className="absolute bottom-10 left-0 w-full z-20 overflow-hidden hidden md:block">
            <div className="container mx-auto px-4 flex justify-between items-center opacity-30">
                <div className="flex items-center gap-8">
                    <div className="flex flex-col items-center">
                        <Flame size={32} />
                        <span className="text-[10px] uppercase tracking-widest mt-2">Spicy</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Clock size={32} />
                        <span className="text-[10px] uppercase tracking-widest mt-2">Always Fresh</span>
                    </div>
                </div>
                <div className="flex items-center gap-8">
                    <div className="flex flex-col items-center">
                        <Star size={32} />
                        <span className="text-[10px] uppercase tracking-widest mt-2">Top Rated</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 -mt-10 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chickenProducts.map((product, index) => (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-[#1a140f] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-orange-500/30 transition-all duration-500 group shadow-2xl"
              >
                <div className="h-72 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a140f] via-transparent to-transparent opacity-90"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-6 left-6 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    Destaque
                  </div>
                </div>
                
                <div className="p-10 relative -mt-16">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-orange-500">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">(48 Avaliações)</span>
                  </div>

                  <h3 className="text-3xl font-brand text-white mb-2 uppercase leading-none tracking-tight group-hover:text-orange-500 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-8 line-clamp-2 font-light leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-white/5 pt-8">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">Preço Atual</span>
                        <span className="text-3xl font-brand text-orange-500">{product.price.toLocaleString()} <span className="text-sm font-sans font-bold text-gray-500">Kz</span></span>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-16 h-16 rounded-[1.5rem] bg-orange-500 text-white flex items-center justify-center shadow-2xl shadow-orange-500/40 hover:bg-white hover:text-orange-500 hover:-translate-y-2 transition-all duration-300 active:scale-90"
                    >
                      <Plus size={28} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="py-32 bg-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-brand text-white mb-8 uppercase tracking-tighter">Pronto para o Próximo Nível de Crocância?</h2>
            <div className="flex flex-wrap justify-center gap-6">
                <Link to="/checkout" className="bg-white text-orange-500 font-display uppercase tracking-widest font-black px-12 py-5 rounded-2xl shadow-xl hover:bg-gray-100 transition-all active:scale-95 flex items-center gap-3 w-fit">
                    <ShoppingCart size={20} /> Pedir Agora
                </Link>
                <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <Phone size={20} />
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Linha de Apoio</p>
                        <p className="text-lg font-bold">900 000 000</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Tandy;
