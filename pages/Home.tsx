import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  UtensilsCrossed, 
  Phone, 
  ArrowRight, 
  Star, 
  Clock, 
  Truck, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-40 md:pb-32" id="home">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background-light via-background-light/90 to-transparent dark:from-background-dark dark:via-background-dark/95 dark:to-transparent z-10"></div>
          <img 
            alt="Delicious Pepperoni Pizza Background" 
            className="w-full h-full object-cover object-center opacity-30 dark:opacity-40" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGRLP-o0M6kMc6R5Nk3MIXstKtT6x-0w50_0GXx8DxRiMSDDuKK7HZpAudrr_uSbdj6MhvOliBzPs_0zYkrtm5HUWxWJoMgp6YacppVz3Un1R8IkY4Ecafy1iLHV5n2DM5KdtiTFYSfunO0eGkWjfhV-yPv41QvIUkv0nlKOj4WdecvKENippMCthpxF6wxzbZT7pq7y52yDQGYIz7AdH9ca3gIkt9H0naHGAJ3QlKfMyig6PWkOLFxK_K0ZcazDuj_I7XJONGmw" 
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary dark:text-red-400 font-display uppercase tracking-widest text-xs font-bold mb-6 border border-primary/20 backdrop-blur-sm"
            >
              The Original American Taste
            </motion.span>
            
            <h1 className="text-6xl md:text-8xl font-brand text-gray-900 dark:text-white mb-8 leading-[0.9] tracking-tighter">
              A MELHOR PIZZA <br />
              <span className="text-primary drop-shadow-[0_4px_12px_rgba(209,40,47,0.3)]">DE LUANDA</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-lg mx-auto md:mx-0 font-light leading-relaxed">
              Massa fresca artesanal, ingredientes premium selecionados e o autêntico sabor que você merece. Descubra por que somos a número 1.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/mesa/08" 
                className="group bg-secondary hover:bg-amber-400 text-gray-900 font-display text-lg font-black px-8 py-4 rounded-xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-3 active:scale-95 border-2 border-amber-500/30"
              >
                <UtensilsCrossed size={22} className="group-hover:rotate-12 transition-transform" />
                Pedir na Mesa (QR Code)
              </Link>
              <Link 
                to="/menu" 
                className="group bg-primary hover:bg-red-700 text-white font-display text-lg px-8 py-4 rounded-xl shadow-2xl shadow-primary/20 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                Delivery
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-800/50 flex flex-wrap gap-8 justify-center md:justify-start opacity-70">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-primary" />
                <span className="text-xs font-bold dark:text-gray-400">Entrega Rápida</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-primary" />
                <span className="text-xs font-bold dark:text-gray-400">Qualidade Premium</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-primary" />
                <span className="text-xs font-bold dark:text-gray-400">Taxas Justas</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full md:w-1/2 relative"
          >
            <div className="relative group p-4">
              <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <img 
                alt="Fresh baked pizza on wooden board" 
                className="relative rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-8 border-white dark:border-gray-800 w-full max-w-[500px] mx-auto hover:rotate-6 transition-transform duration-[2000ms] ease-out" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbD9ShthF5-ehLZ49s8tKiTdpP00GgBo67cEc4uwLu7rQ0Ej7GLDg4oevAq-z6M4qhMbu3UOJF6pKGYEfVGCU-7feWpzgNw0a11oPSsW3C13J5SRpdKsNddsr0DDclE5Cuv_goOwABtlUtfx8P8Xeu95G_Wk7EAE_CPjKSd3fbnef78NmNXWgWQOkQt8-vvRwXKK5GJaw7bdedruX1fCfqJABXCLNPQ85JhbfZXbve3ne7eeCuiFRZhB1ZiCIGmcmnpF5h41bagA" 
              />
              
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 right-10 md:right-20 bg-white dark:bg-card-dark p-5 rounded-2xl shadow-2xl border-l-[6px] border-primary"
              >
                <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-black tracking-widest mb-1">Combo Familiar</p>
                <p className="text-3xl font-brand text-gray-900 dark:text-white leading-none">12,000 <span className="text-sm font-body font-bold text-primary">Kz</span></p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-white dark:bg-background-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-brand text-gray-900 dark:text-white uppercase leading-tight mb-4">
                NOSSOS <span className="text-primary">DESTAQUES</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400">O que há de melhor em nossa cozinha, preparado na hora para você.</p>
            </div>
            <Link to="/menu" className="group flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm hover:underline">
              Explorar Todas <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Pizzas Americanas", 
                desc: "Pepperoni, Texas BBQ, Mexican Passion e muito mais.", 
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCLCuAVGtCxLshwMdxbQYQVoF7SUF9z69EpIwQCUtonw1mATGWud10WylM4FrTVaEbyyQLbVqrH65ZCsIZ6Bu_JMR4Et7r8opNiMH-ZOzYQRHVaCogHYEDlf5k4RtdfohvOiKtwSDG1meFtWgsJg_rk9FPkiPvMmgF-pm0wJOKxGv-qj2rDaqUH7EWnCz_7XLhQroSC5716PKAAzqeFUSpP777yVjuAXRdARLY7G29IsQjueMs0rVuzdWWkts3rCYpbl0TW02vSg",
                link: "/menu"
              },
              { 
                title: "Fried Chicken", 
                desc: "Receita secreta de Tandy's Fried Chicken, ultra crocante.", 
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUAeih02hgYGXNrG4g_DsgcKKEdc4Hwduj0HwAKEVzjSZ8LMgPzkMfYboPsLZh7RDwu5bDdKNRpWcLFxSOkkorcPwanKfwMpJrfJMGqDjir6pg0Evlx_8FfxsZIfuFcB06tOWBn-BJpGtsMXDNiWHR2m4L9xOfmG_v-qOACjwyvGETmjcT-UolmmPRGyAwUpqPi3hAXIOaRby6p_Tc-AcRB7jOI6r6cwN0qgkruVLOybl1_hP4Olfif1T2RMP7ZSCk50rbPOBN9w",
                link: "/tandy"
              },
              { 
                title: "Combos Familiares", 
                desc: "A melhor forma de alimentar toda a família e poupar.", 
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDz18YeI_2VeX4xeQ6UYi5uZEcp0JlaxCPGBq27ojBKyLPUHn5EnPfIHmDWkq90B8aCdSnCNnt4pxyQC9ZaJ05_qK96i5qyG_VM_Q97bESNRn3eeCTdvtA72hiujO2D8I73Q6WIEI5qM6cxoWKTqFJoMhJaSR3InGZuRABWftiOGSQILsQCRqxyi4Kk8x6WpIoIEppEs51_u38kw2x70pT77E4wy44wIDWQU21jALBTjNsKBlXtedZe9z9jizmPgm-t8YqSzooxgw",
                link: "/offers"
              }
            ].map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link to={cat.link} className="group block relative overflow-hidden rounded-2xl aspect-[4/5] shadow-xl">
                   <img alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={cat.img} />
                   <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                   <div className="absolute bottom-0 left-0 p-8 w-full">
                     <h3 className="text-3xl font-brand text-white mb-3 uppercase tracking-tight">{cat.title}</h3>
                     <p className="text-gray-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 leading-relaxed font-light">
                       {cat.desc}
                     </p>
                     <div className="flex items-center gap-2 text-secondary font-black text-xs uppercase tracking-[0.2em]">
                       Ver Opções <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                     </div>
                   </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-gray-50 dark:bg-[#0f172a] border-y border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-brand text-gray-900 dark:text-white mb-4 uppercase">EXPERIÊNCIAS <span className="text-primary tracking-normal">REAIS</span></h2>
            <div className="flex justify-center gap-1 text-primary">
              <Star size={20} className="fill-current" />
              <Star size={20} className="fill-current" />
              <Star size={20} className="fill-current" />
              <Star size={20} className="fill-current" />
              <Star size={20} className="fill-current" />
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "João D.", 
                text: "A melhor pizza que já comi em Luanda! A massa é incrível e o recheio é muito generoso. O serviço de entrega foi super rápido.",
                initials: "JD",
                color: "bg-primary"
              },
              { 
                name: "Ana M.", 
                text: "O frango frito é igual ao dos Estados Unidos. Muito crocante por fora e suculento por dentro. Recomendo o Nashville Hot!",
                initials: "AM",
                color: "bg-accent-green"
              },
              { 
                name: "Carlos P.", 
                text: "Ótimo atendimento pelo WhatsApp e os combos valem muito a pena. A pizza Hot Stuff é a minha favorita.",
                initials: "CP",
                color: "bg-secondary"
              }
            ].map((review, idx) => (
              <motion.div 
                key={review.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 relative hover:shadow-md transition-shadow"
              >
                <Star size={40} className="absolute top-6 right-6 text-primary/5 dark:text-primary/10" />
                <p className="text-gray-600 dark:text-gray-300 italic mb-8 relative z-10 leading-[1.8] font-light">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-sm", review.color)}>
                    {review.initials}
                  </div>
                  <div>
                    <span className="block font-bold text-gray-900 dark:text-white uppercase text-sm tracking-widest">{review.name}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Cliente Verificado</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
