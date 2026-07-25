import React, { useState } from 'react';
import { Bell, UserCheck, Wine, IceCream, Utensils, CreditCard, X, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TableServiceRequest } from '../types';

interface TableServiceFloatingButtonProps {
  tableNumber: string;
  onRequestService: (type: 'garcom' | 'bebidas' | 'sobremesa' | 'talheres' | 'conta', label: string) => void;
  onRequestPayment: () => void;
  activeRequests: TableServiceRequest[];
}

const TableServiceFloatingButton: React.FC<TableServiceFloatingButtonProps> = ({
  tableNumber,
  onRequestService,
  onRequestPayment,
  activeRequests,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAction = (type: 'garcom' | 'bebidas' | 'sobremesa' | 'talheres' | 'conta', label: string) => {
    if (type === 'conta') {
      setIsOpen(false);
      onRequestPayment();
      return;
    }

    onRequestService(type, label);
    setToastMessage(`Solicitação enviada: ${label} para a Mesa ${tableNumber}!`);
    setTimeout(() => setToastMessage(null), 4000);
    setIsOpen(false);
  };

  const serviceActions = [
    {
      id: 'garcom',
      type: 'garcom' as const,
      label: 'Chamar Funcionário',
      icon: <UserCheck size={20} className="text-primary" />,
      desc: 'Atendimento na Mesa',
      badgeColor: 'bg-primary/10 text-primary',
    },
    {
      id: 'bebidas',
      type: 'bebidas' as const,
      label: 'Mais Bebidas',
      icon: <Wine size={20} className="text-blue-500" />,
      desc: 'Sucos, Refrigerantes, Cerveja',
      badgeColor: 'bg-blue-500/10 text-blue-500',
    },
    {
      id: 'sobremesa',
      type: 'sobremesa' as const,
      label: 'Pedir Sobremesa',
      icon: <IceCream size={20} className="text-pink-500" />,
      desc: 'Brownie, Gelado, Mousse',
      badgeColor: 'bg-pink-500/10 text-pink-500',
    },
    {
      id: 'talheres',
      type: 'talheres' as const,
      label: 'Talheres & Guardanapos',
      icon: <Utensils size={20} className="text-amber-500" />,
      desc: 'Pratos extras, copos, talheres',
      badgeColor: 'bg-amber-500/10 text-amber-500',
    },
    {
      id: 'conta',
      type: 'conta' as const,
      label: 'Pedir a Conta',
      icon: <CreditCard size={20} className="text-emerald-500" />,
      desc: 'Multicaixa, Cartão ou Dinheiro',
      badgeColor: 'bg-emerald-500/10 text-emerald-500',
    },
  ];

  return (
    <>
      {/* Toast Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-4 sm:right-8 z-[120] bg-gray-900 text-white p-4 rounded-2xl shadow-2xl border border-secondary/40 flex items-center gap-3 max-w-md"
          >
            <div className="p-2 bg-secondary text-gray-900 rounded-xl flex-shrink-0">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-secondary uppercase tracking-wider">Mesa {tableNumber}</p>
              <p className="text-sm font-medium">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Trigger Button */}
      <div className="fixed bottom-6 right-6 z-[90]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-primary hover:bg-red-700 text-white p-4 rounded-full shadow-2xl shadow-primary/40 flex items-center gap-3 font-display uppercase tracking-wider text-sm font-bold border-2 border-white/20"
        >
          <div className="relative">
            <Bell size={24} className="animate-bounce" />
            {activeRequests.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full ring-2 ring-primary animate-ping"></span>
            )}
          </div>
          <span className="hidden sm:inline">Chamar Atendimento</span>

          <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-black">
            Mesa {tableNumber}
          </span>
        </motion.button>

        {/* Modal Drawer Options */}
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                className="relative w-full max-w-md bg-white dark:bg-card-dark rounded-t-3xl sm:rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 z-10 overflow-hidden"
              >
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-primary/10 rounded-2xl text-primary">
                      <Bell size={20} />
                    </div>
                    <div>
                      <h3 className="font-brand text-xl text-gray-900 dark:text-white uppercase tracking-tight">
                        Atendimento na Mesa
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-bold">
                        Mesa <span className="text-primary font-black">{tableNumber}</span> • Pressione para chamar
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-xl"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Service Request Items */}
                <div className="space-y-3">
                  {serviceActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleAction(action.type, action.label)}
                      className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-primary/5 dark:hover:bg-primary/10 border border-gray-100 dark:border-gray-700/60 flex items-center justify-between group transition-all text-left active:scale-95"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${action.badgeColor} group-hover:scale-110 transition-transform`}>
                          {action.icon}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                            {action.label}
                          </p>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                            {action.desc}
                          </p>
                        </div>
                      </div>
                      <Sparkles size={16} className="text-gray-300 dark:text-gray-600 group-hover:text-primary transition-colors" />
                    </button>
                  ))}
                </div>

                {/* Active Pending Requests */}
                {activeRequests.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">
                      Solicitações em Andamento
                    </p>
                    <div className="space-y-1.5">
                      {activeRequests.map((req) => (
                        <div
                          key={req.id}
                          className="text-xs p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 flex justify-between items-center font-medium"
                        >
                          <span>{req.label}</span>
                          <span className="text-[10px] bg-amber-500 text-gray-900 font-black px-2 py-0.5 rounded-full">
                            Garçom Notificado
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default TableServiceFloatingButton;
