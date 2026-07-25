import React, { useState } from 'react';
import { TableOrder } from '../types';
import { 
  CreditCard, 
  Smartphone, 
  Banknote, 
  Building2, 
  CheckCircle, 
  Download, 
  Printer, 
  X, 
  QrCode, 
  Users, 
  Receipt, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

interface TablePaymentModalProps {
  order: TableOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: (method: string, receiptId: string) => void;
}

const TablePaymentModal: React.FC<TablePaymentModalProps> = ({
  order,
  isOpen,
  onClose,
  onPaymentComplete,
}) => {
  if (!order) return null;

  const [paymentMethod, setPaymentMethod] = useState<'express' | 'tpa' | 'iban' | 'dinheiro'>('express');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [includeServiceFee, setIncludeServiceFee] = useState(true);
  const [splitGuests, setSplitGuests] = useState<number>(order.guestCount || 1);
  const [isPaid, setIsPaid] = useState(false);
  const [receiptData, setReceiptData] = useState<{ id: string; timestamp: string } | null>(null);

  const subtotal = order.subtotal;
  const serviceFee = includeServiceFee ? Math.round(subtotal * 0.1) : 0;
  const grandTotal = subtotal + serviceFee;
  const splitAmount = Math.round(grandTotal / (splitGuests || 1));

  const handleProcessPayment = () => {
    const newReceiptId = `REC-${Math.floor(100000 + Math.random() * 900000)}`;
    const nowStr = new Date().toLocaleString('pt-AO', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    setReceiptData({
      id: newReceiptId,
      timestamp: nowStr,
    });
    setIsPaid(true);

    const methodNames = {
      express: 'Multicaixa Express',
      tpa: 'TPA na Mesa (Cartão)',
      iban: 'Transferência IBAN',
      dinheiro: 'Dinheiro na Mesa',
    };

    onPaymentComplete(methodNames[paymentMethod], newReceiptId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-white dark:bg-card-dark rounded-3xl shadow-2xl overflow-hidden z-10 my-8 border border-gray-100 dark:border-gray-800"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6 text-white flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                  Mesa {order.tableNumber} • Pagamento Seguro
                </span>
                <h3 className="text-2xl font-brand mt-2 uppercase tracking-tight">
                  {isPaid ? 'Comprovativo Digital' : 'Pagamento da Conta'}
                </h3>
                <p className="text-xs text-gray-400 font-medium mt-1">
                  Pedido #{order.id}
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {!isPaid ? (
              /* Payment Options State */
              <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-gray-800 dark:text-gray-100">
                {/* Order Summary breakdown */}
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 space-y-2">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 font-medium">
                    <span>Consumo da Mesa</span>
                    <span>{subtotal.toLocaleString()} Kz</span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeServiceFee}
                        onChange={(e) => setIncludeServiceFee(e.target.checked)}
                        className="rounded accent-primary w-4 h-4"
                      />
                      <span>Taxa de Serviço Opcional (10%)</span>
                    </label>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {serviceFee.toLocaleString()} Kz
                    </span>
                  </div>

                  <div className="flex justify-between text-lg font-black text-gray-900 dark:text-white pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="uppercase tracking-tight font-brand">Total a Pagar</span>
                    <span className="text-primary font-brand text-2xl">
                      {grandTotal.toLocaleString()} Kz
                    </span>
                  </div>
                </div>

                {/* Split Bill Calculator */}
                <div className="bg-secondary/10 p-4 rounded-2xl border border-secondary/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-secondary" />
                      <span className="text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white">
                        Dividir Conta entre Pessoas
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSplitGuests(Math.max(1, splitGuests - 1))}
                        className="w-7 h-7 rounded-lg bg-white dark:bg-card-dark text-gray-900 dark:text-white font-bold flex items-center justify-center border border-gray-200 dark:border-gray-700"
                      >
                        -
                      </button>
                      <span className="text-sm font-black w-6 text-center">{splitGuests}</span>
                      <button
                        type="button"
                        onClick={() => setSplitGuests(splitGuests + 1)}
                        className="w-7 h-7 rounded-lg bg-white dark:bg-card-dark text-gray-900 dark:text-white font-bold flex items-center justify-center border border-gray-200 dark:border-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {splitGuests > 1 && (
                    <div className="text-center p-3 bg-white dark:bg-card-dark rounded-xl border border-secondary/30">
                      <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
                        Cada pessoa paga ({splitGuests} pessoas)
                      </p>
                      <p className="text-xl font-brand text-secondary mt-0.5">
                        {splitAmount.toLocaleString()} Kz / pessoa
                      </p>
                    </div>
                  )}
                </div>

                {/* Payment Methods */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3">
                    Método de Pagamento
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        id: 'express',
                        label: 'Multicaixa Express',
                        desc: 'Telemóvel / App',
                        icon: <Smartphone size={20} className="text-primary" />,
                      },
                      {
                        id: 'tpa',
                        label: 'TPA na Mesa',
                        desc: 'Cartão Multicaixa / Visa',
                        icon: <CreditCard size={20} className="text-blue-500" />,
                      },
                      {
                        id: 'iban',
                        label: 'Transferência IBAN',
                        desc: 'BAI / BFA / BIC',
                        icon: <Building2 size={20} className="text-purple-500" />,
                      },
                      {
                        id: 'dinheiro',
                        label: 'Dinheiro na Mesa',
                        desc: 'Troco com o garçom',
                        icon: <Banknote size={20} className="text-emerald-500" />,
                      },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={cn(
                          'p-4 rounded-2xl border text-left transition-all flex flex-col justify-between',
                          paymentMethod === m.id
                            ? 'bg-primary/5 border-primary shadow-md text-gray-900 dark:text-white font-bold'
                            : 'bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                        )}
                      >
                        <div className="mb-2">{m.icon}</div>
                        <div>
                          <p className="text-xs font-bold">{m.label}</p>
                          <p className="text-[10px] text-gray-400 font-medium mt-0.5">{m.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Method Details */}
                {paymentMethod === 'express' && (
                  <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-2">
                    <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block">
                      Número do Telemóvel (Multicaixa Express)
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+244 9XX XXX XXX"
                      className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm outline-none focus:border-primary font-bold text-gray-900 dark:text-white"
                    />
                    <p className="text-[10px] text-gray-400">
                      Irá receber a notificação no seu telemóvel para confirmar o PIN.
                    </p>
                  </div>
                )}

                {paymentMethod === 'iban' && (
                  <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-1 text-xs">
                    <p className="font-bold text-gray-900 dark:text-white">U.S. Pizza Luanda Lda</p>
                    <p className="text-gray-500">IBAN BAI: <span className="font-mono text-gray-900 dark:text-white font-bold">AO06.0040.0000.1234.5678.1018.9</span></p>
                    <p className="text-gray-500">IBAN BFA: <span className="font-mono text-gray-900 dark:text-white font-bold">AO06.0006.0000.9876.5432.1011.2</span></p>
                  </div>
                )}

                {paymentMethod === 'tpa' && (
                  <div className="bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20 text-xs text-blue-700 dark:text-blue-300 flex items-center gap-3">
                    <CreditCard size={24} className="flex-shrink-0" />
                    <span>O garçom trará o terminal TPA à Mesa {order.tableNumber}.</span>
                  </div>
                )}

                {/* Confirm Pay Button */}
                <button
                  type="button"
                  onClick={handleProcessPayment}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-green-500/20 flex items-center justify-center gap-3 transition-all active:scale-95 text-lg"
                >
                  <ShieldCheck size={22} />
                  Confirmar e Pagar {grandTotal.toLocaleString()} Kz
                </button>
              </div>
            ) : (
              /* Receipt State (Comprovativo Digital) */
              <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-gray-800 dark:text-gray-100 text-center">
                <div className="inline-flex p-4 bg-emerald-500/10 text-emerald-500 rounded-full mb-2">
                  <CheckCircle size={48} />
                </div>

                <div>
                  <h4 className="text-2xl font-brand uppercase text-gray-900 dark:text-white">
                    Pagamento Efetuado!
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Muito obrigado por escolher o U.S. Pizza Luanda.
                  </p>
                </div>

                {/* Printable Digital Receipt Ticket */}
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 text-left space-y-4 font-mono text-xs relative">
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-3 text-center">
                    <h5 className="font-bold text-sm text-gray-900 dark:text-white uppercase font-sans">
                      U.S. PIZZA LUANDA
                    </h5>
                    <p className="text-[10px] text-gray-500 font-sans">
                      Maianga, Rua Gamal Abdel Nasser • Luanda
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Comprovativo #{receiptData?.id}
                    </p>
                  </div>

                  <div className="flex justify-between text-[11px] font-sans">
                    <span className="font-bold">Mesa:</span>
                    <span>Mesa {order.tableNumber}</span>
                  </div>

                  <div className="flex justify-between text-[11px] font-sans">
                    <span className="font-bold">Data & Hora:</span>
                    <span>{receiptData?.timestamp}</span>
                  </div>

                  <div className="flex justify-between text-[11px] font-sans">
                    <span className="font-bold">Pagamento:</span>
                    <span className="text-primary font-bold">{order.paymentMethod || 'Confirmado'}</span>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-1.5 font-sans">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-[11px]">
                        <span>
                          {item.quantity}x {item.name}{' '}
                          {item.selectedSize ? `(${item.selectedSize})` : ''}
                        </span>
                        <span>{item.totalItemPrice.toLocaleString()} Kz</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-1 font-sans">
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal:</span>
                      <span>{subtotal.toLocaleString()} Kz</span>
                    </div>
                    {serviceFee > 0 && (
                      <div className="flex justify-between text-gray-500">
                        <span>Serviço (10%):</span>
                        <span>{serviceFee.toLocaleString()} Kz</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-300 dark:border-gray-600">
                      <span>TOTAL PAGO:</span>
                      <span className="text-primary font-black">{grandTotal.toLocaleString()} Kz</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center gap-3">
                    <QrCode size={32} className="text-gray-400" />
                    <span className="text-[9px] text-gray-400 font-sans text-center">
                      Recibo Digital Verificado • U.S. Pizza Luanda
                    </span>
                  </div>
                </div>

                {/* Print / Download buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Printer size={16} /> Imprimir Recibo
                  </button>

                  <button
                    onClick={onClose}
                    className="flex-1 bg-primary hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    Concluir
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TablePaymentModal;
