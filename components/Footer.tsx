import React from 'react';
import { Pizza, MessageSquare, Camera, Play, MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 overflow-hidden relative">
      {/* Decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6 group">
              <Pizza className="text-primary group-hover:rotate-12 transition-transform duration-500" size={32} />
              <div className="flex flex-col">
                <h2 className="font-brand text-2xl tracking-[0.1em] leading-none">U.S. PIZZA</h2>
                <span className="text-[10px] font-black tracking-[0.3em] text-primary mt-1">LUANDA</span>
              </div>
            </div>
            <p className="text-gray-400 text-lg font-light leading-relaxed mb-8 max-w-sm">
                O autêntico sabor da comfort food americana com o coração angolano. Pizzas artesanais e o famoso TANDY'S Chicken.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <MessageSquare size={20} />, href: "#" },
                { icon: <Camera size={20} />, href: "#" },
                { icon: <Play size={20} />, href: "#" },
              ].map((social, i) => (
                <motion.a 
                    key={i}
                    href={social.href} 
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-all shadow-xl"
                >
                    {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-8">Navegação</h3>
            <ul className="space-y-4">
              {[
                { label: 'Menu Digital', href: '/menu' },
                { label: 'Tandy\'s Chicken', href: '/tandy' },
                { label: 'Ofertas Atuais', href: '/offers' },
                { label: 'Checkout', href: '/checkout' },
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors flex items-center group gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-8">Horários</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <Clock className="text-primary mt-1" size={18} />
                <div className="text-sm font-light">
                    <p className="text-white font-bold mb-1">Segunda - Quinta</p>
                    <p className="text-gray-400">11h00 — 22h00</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <Clock className="text-secondary mt-1" size={18} />
                <div className="text-sm font-light">
                    <p className="text-white font-bold mb-1">Sexta - Domingo</p>
                    <p className="text-gray-400">11h00 — 23h50</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-8">Onde Estamos</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-primary flex-shrink-0">
                    <MapPin size={18} />
                </div>
                <div className="text-sm">
                    <p className="text-white font-bold mb-1">Luanda, Angola</p>
                    <p className="text-gray-500 font-light leading-relaxed">Maianga, Rua Gamal Abdel Nasser, Edifício Tandy.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 pt-2">
                <div className="p-3 bg-white/5 rounded-xl text-primary flex-shrink-0">
                    <Phone size={18} />
                </div>
                <div className="text-sm">
                    <p className="text-white font-bold mb-1">+244 923 456 789</p>
                    <p className="text-gray-500 font-light">Atendimento 24/7 via WhatsApp</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 text-center md:text-left">
            © 2024 U.S. Pizza Luanda. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-colors">Privacidade</a>
          </div>
        </div>
      </div>

      {/* Background Graphic */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
    </footer>
  );
};

export default Footer;