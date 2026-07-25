import React from 'react';
import { Link } from 'react-router-dom';
import { 
  History, 
  Target, 
  Users, 
  Heart, 
  ShoppingBag, 
  ArrowRight, 
  Star,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const Offers: React.FC = () => {
  return (
    <div className="pt-24 bg-gray-50 dark:bg-background-dark min-h-screen pb-20">
       {/* Hero / About Section */}
       <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -skew-y-6 transform origin-top-left -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-1/2"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-6">
                        <History size={14} className="text-primary" />
                        <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">A Nossa História</span>
                    </div>
                    
                    <h2 className="text-5xl lg:text-7xl font-brand text-gray-900 dark:text-white mb-8 leading-[1.1] tracking-tighter">
                        SABOR AMERICANO,<br/>
                        <span className="text-primary">ALMA ANGOLANA</span>
                    </h2>
                    
                    <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-light">
                        <p>
                            A jornada da <span className="font-bold text-gray-900 dark:text-white">U.S. Pizza Luanda</span> começou com um sonho simples: trazer a autêntica experiência da pizza americana para o coração de Angola, sem perder a nossa essência hospitaleira.
                        </p>
                        <p>
                            Sob a chancela da <span className="font-bold text-gray-900 dark:text-white text-secondary">Tandy’s Fried Chicken</span>, unimos a tradição do frango frito crocante com a versatilidade das pizzas artesanais. Cada massa é preparada diariamente, cada ingrediente é selecionado com rigor.
                        </p>
                        <div className="grid grid-cols-2 gap-8 pt-6">
                            <div className="flex flex-col gap-2">
                                <span className="text-3xl font-brand text-primary">10+</span>
                                <span className="text-xs font-black uppercase tracking-widest opacity-60">Anos de Tradição</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-3xl font-brand text-primary">50k+</span>
                                <span className="text-xs font-black uppercase tracking-widest opacity-60">Clientes Felizes</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-1/2 relative"
                >
                    <div className="relative z-10 grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <img className="rounded-3xl shadow-2xl w-full aspect-[3/4] object-cover ring-8 ring-white dark:ring-gray-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz18YeI_2VeX4xeQ6UYi5uZEcp0JlaxCPGBq27ojBKyLPUHn5EnPfIHmDWkq90B8aCdSnCNnt4pxyQC9ZaJ05_qK96i5qyG_VM_Q97bESNRn3eeCTdvtA72hiujO2D8I73Q6WIEI5qM6cxoWKTqFJoMhJaSR3InGZuRABWftiOGSQILsQCRqxyi4Kk8x6WpIoIEppEs51_u38kw2x70pT77E4wy44wIDWQU21jALBTjNsKBlXtedZe9z9jizmPgm-t8YqSzooxgw" alt="Ambiente" />
                            <div className="bg-primary p-6 rounded-3xl text-white shadow-xl">
                                <Heart className="mb-2" fill="currentColor" />
                                <p className="font-bold text-sm leading-tight">Feito com paixão em cada fatia.</p>
                            </div>
                        </div>
                        <div className="space-y-4 pt-12">
                            <div className="bg-secondary p-6 rounded-3xl text-black shadow-xl">
                                <Star className="mb-2" fill="currentColor" />
                                <p className="font-bold text-sm leading-tight">O favorito da cidade.</p>
                            </div>
                            <img className="rounded-3xl shadow-2xl w-full aspect-[3/4] object-cover ring-8 ring-white dark:ring-gray-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUAeih02hgYGXNrG4g_DsgcKKEdc4Hwduj0HwAKEVzjSZ8LMgPzkMfYboPsLZh7RDwu5bDdKNRpWcLFxSOkkorcPwanKfwMpJrfJMGqDjir6pg0Evlx_8FfxsZIfuFcB06tOWBn-BJpGtsMXDNiWHR2m4L9xOfmG_v-qOACjwyvGETmjcT-UolmmPRGyAwUpqPi3hAXIOaRby6p_Tc-AcRB7jOI6r6cwN0qgkruVLOybl1_hP4Olfif1T2RMP7ZSCk50rbPOBN9w" alt="Food" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
       </section>

       {/* Values Section */}
       <section className="py-24 bg-white dark:bg-card-dark">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                    { icon: <Target className="text-primary" />, title: "Missão", desc: "Oferecer qualidade gastronômica excepcional com o melhor custo-benefício de Luanda." },
                    { icon: <Users className="text-secondary" />, title: "Comunidade", desc: "Ser o ponto de encontro preferido para famílias e amigos criarem memórias." },
                    { icon: <CheckCircle2 className="text-green-500" />, title: "Qualidade", desc: "Processos rigorosos e ingredientes frescos em todas as nossas cozinhas." }
                ].map((val, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-10 rounded-[2rem] bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center mb-6">
                            {val.icon}
                        </div>
                        <h4 className="text-2xl font-brand mb-4 text-gray-900 dark:text-white uppercase">{val.title}</h4>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light">{val.desc}</p>
                    </motion.div>
                ))}
            </div>
         </div>
       </section>

       {/* Offers Section */}
       <section className="py-32">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-7xl font-brand text-gray-900 dark:text-white uppercase tracking-tighter italic">OFERTAS <span className="text-primary">EXPLOSIVAS</span></h2>
                    <p className="text-gray-500 mt-4 uppercase tracking-[0.3em] font-black text-xs">Aproveite enquanto duram</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Promo Card 1 */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group bg-white dark:bg-card-dark rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-all duration-500"
                    >
                        <div className="relative h-[28rem]">
                            <div className="absolute top-6 left-6 z-20">
                                <span className="bg-secondary text-black text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">Mais Vendido</span>
                            </div>
                            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCLCuAVGtCxLshwMdxbQYQVoF7SUF9z69EpIwQCUtonw1mATGWud10WylM4FrTVaEbyyQLbVqrH65ZCsIZ6Bu_JMR4Et7r8opNiMH-ZOzYQRHVaCogHYEDlf5k4RtdfohvOiKtwSDG1meFtWgsJg_rk9FPkiPvMmgF-pm0wJOKxGv-qj2rDaqUH7EWnCz_7XLhQroSC5716PKAAzqeFUSpP777yVjuAXRdARLY7G29IsQjueMs0rVuzdWWkts3rCYpbl0TW02vSg" alt="Combo" />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                            
                            <div className="absolute bottom-10 left-10 right-10 z-20">
                                <h3 className="text-4xl font-brand text-white mb-2 uppercase italic tracking-tighter">COMBO FAMILIAR</h3>
                                <p className="text-gray-200 font-light mb-6">A alegria completa para o fim de semana. 2 Pizzas Grandes + 1 Coca-Cola 2L.</p>
                                <div className="flex justify-between items-center bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-white/60 font-bold uppercase tracking-widest">Apenas</span>
                                        <span className="text-3xl font-brand text-white">12,000 <span className="text-sm font-sans">Kz</span></span>
                                    </div>
                                    <Link to="/menu" className="bg-white text-primary p-4 rounded-2xl shadow-xl hover:scale-110 transition-transform active:scale-95">
                                        <ShoppingBag size={24} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Promo Card 2 */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group bg-white dark:bg-card-dark rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-orange-500/50 transition-all duration-500"
                    >
                        <div className="relative h-[28rem]">
                            <div className="absolute top-6 left-6 z-20">
                                <span className="bg-orange-500 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">Especial Tandy</span>
                            </div>
                            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUAeih02hgYGXNrG4g_DsgcKKEdc4Hwduj0HwAKEVzjSZ8LMgPzkMfYboPsLZh7RDwu5bDdKNRpWcLFxSOkkorcPwanKfwMpJrfJMGqDjir6pg0Evlx_8FfxsZIfuFcB06tOWBn-BJpGtsMXDNiWHR2m4L9xOfmG_v-qOACjwyvGETmjcT-UolmmPRGyAwUpqPi3hAXIOaRby6p_Tc-AcRB7jOI6r6cwN0qgkruVLOybl1_hP4Olfif1T2RMP7ZSCk50rbPOBN9w" alt="Chicken" />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                            
                            <div className="absolute bottom-10 left-10 right-10 z-20">
                                <h3 className="text-4xl font-brand text-white mb-2 uppercase italic tracking-tighter">CHICKEN PARTY BOX</h3>
                                <p className="text-gray-200 font-light mb-6">O crocante que você ama com preço imbatível. 10 Peças + 4 Batatas.</p>
                                <div className="flex justify-between items-center bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-white/40 line-through">10,500 Kz</span>
                                            <span className="text-[10px] bg-primary px-1 rounded font-bold text-white">-20%</span>
                                        </div>
                                        <span className="text-3xl font-brand text-white">8,400 <span className="text-sm font-sans">Kz</span></span>
                                    </div>
                                    <Link to="/menu" className="bg-orange-500 text-white p-4 rounded-2xl shadow-xl hover:scale-110 transition-transform active:scale-95">
                                        <Zap size={24} fill="currentColor" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
               </div>

               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="mt-20 text-center"
               >
                 <Link to="/menu" className="inline-flex items-center gap-3 text-lg font-bold text-gray-900 dark:text-white hover:text-primary group transition-colors">
                    Ver todas as opções do menu <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                 </Link>
               </motion.div>
           </div>
       </section>
    </div>
  );
};

export default Offers;
