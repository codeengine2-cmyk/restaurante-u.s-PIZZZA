import React, { useState } from 'react';
import { Star, Heart, Check, X, MessageSquare, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TableRating } from '../types';

interface TableRatingModalProps {
  tableNumber: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmitRating: (rating: TableRating) => void;
}

const TableRatingModal: React.FC<TableRatingModalProps> = ({
  tableNumber,
  isOpen,
  onClose,
  onSubmitRating,
}) => {
  const [foodRating, setFoodRating] = useState(5);
  const [serviceRating, setServiceRating] = useState(5);
  const [ambianceRating, setAmbianceRating] = useState(5);
  const [waitTimeRating, setWaitTimeRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitRating({
      food: foodRating,
      service: serviceRating,
      ambiance: ambianceRating,
      waitTime: waitTimeRating,
      comment,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  const renderStarSelector = (
    label: string,
    value: number,
    onChange: (v: number) => void
  ) => {
    return (
      <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{label}</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              className="p-1 hover:scale-125 transition-transform"
            >
              <Star
                size={20}
                className={
                  star <= value
                    ? 'text-secondary fill-secondary'
                    : 'text-gray-300 dark:text-gray-700'
                }
              />
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-card-dark rounded-3xl shadow-2xl p-6 sm:p-8 z-10 border border-gray-100 dark:border-gray-800"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full"
            >
              <X size={20} />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center">
                  <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest rounded-full mb-2">
                    Mesa {tableNumber} • Sua Opinião
                  </span>
                  <h3 className="text-2xl font-brand text-gray-900 dark:text-white uppercase tracking-tight">
                    Avalie sua Experiência
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Sua avaliação nos ajuda a manter a excelência no U.S. Pizza Luanda.
                  </p>
                </div>

                <div className="space-y-1">
                  {renderStarSelector('Qualidade da Comida', foodRating, setFoodRating)}
                  {renderStarSelector('Atendimento do Garçom', serviceRating, setServiceRating)}
                  {renderStarSelector('Ambiente do Restaurante', ambianceRating, setAmbianceRating)}
                  {renderStarSelector('Tempo de Espera', waitTimeRating, setWaitTimeRating)}
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2 block flex items-center gap-1.5">
                    <MessageSquare size={14} /> Comentário ou Sugestão
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Conte-nos o que mais gostou ou como podemos melhorar..."
                    rows={3}
                    className="w-full bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl p-3 text-xs outline-none focus:border-primary transition-colors text-gray-900 dark:text-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-red-700 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-95 text-sm uppercase tracking-wider"
                >
                  <Sparkles size={18} /> Enviar Avaliação
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <Heart size={36} className="fill-current" />
                </div>
                <h3 className="text-2xl font-brand text-gray-900 dark:text-white uppercase">
                  Muito Obrigado!
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                  Sua avaliação da Mesa {tableNumber} foi registada com sucesso. Esperamos vê-lo novamente em breve!
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TableRatingModal;
