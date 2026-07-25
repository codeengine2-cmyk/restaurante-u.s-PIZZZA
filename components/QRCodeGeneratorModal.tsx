import React from 'react';
import { QrCode, X, Check, ExternalLink, Sparkles, Smartphone, Table, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface QRCodeGeneratorModalProps {
  currentTable: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectTable: (table: string) => void;
}

const QRCodeGeneratorModal: React.FC<QRCodeGeneratorModalProps> = ({
  currentTable,
  isOpen,
  onClose,
  onSelectTable,
}) => {
  const tables = Array.from({ length: 15 }, (_, i) => String(i + 1).padStart(2, '0'));

  const fullTargetUrl = `${window.location.origin}${window.location.pathname}#/mesa/${currentTable}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(fullTargetUrl)}&margin=10`;

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
            className="relative w-full max-w-xl bg-white dark:bg-card-dark rounded-3xl shadow-2xl p-6 sm:p-8 z-10 border border-gray-100 dark:border-gray-800 my-8"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-2">
                Simulador de QR Code da Mesa
              </span>
              <h3 className="text-2xl font-brand text-gray-900 dark:text-white uppercase tracking-tight">
                Escanear QR Code Real
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
                QR Code 100% escaneável com a câmara do seu telemóvel para abrir a Mesa {currentTable}.
              </p>
            </div>

            {/* QR Code Visual Badge Card */}
            <div className="bg-gradient-to-br from-gray-900 via-card-dark to-gray-900 p-6 rounded-3xl text-center text-white border border-primary/30 shadow-2xl mb-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-2xl rounded-full pointer-events-none"></div>

              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-xs font-brand tracking-[0.2em] text-gray-300 uppercase">
                  U.S. PIZZA LUANDA
                </span>
              </div>

              {/* Real Scannable QR Code Image */}
              <div className="w-40 h-40 mx-auto bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center relative">
                <img
                  src={qrImageUrl}
                  alt={`QR Code Mesa ${currentTable}`}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="mt-4">
                <p className="text-2xl font-brand uppercase tracking-wider text-secondary">
                  MESA {currentTable}
                </p>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                  Escaneie agora com o telemóvel para testar ao vivo
                </p>
              </div>
            </div>

            {/* Print Link Action Banner */}
            <div className="mb-6">
              <Link
                to="/imprimir-qrcodes"
                onClick={onClose}
                className="w-full bg-secondary hover:bg-amber-400 text-gray-900 font-black py-3.5 px-4 rounded-2xl shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 transition-all text-xs uppercase tracking-wider"
              >
                <Printer size={16} /> Imprimir Placas de Mesa em Folhas A4/A5
              </Link>
            </div>

            {/* Table Selector Grid */}
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3 text-center">
                Selecione uma Mesa para Testar
              </p>
              <div className="grid grid-cols-5 gap-2 max-h-48 overflow-y-auto p-1">
                {tables.map((tbl) => (
                  <button
                    key={tbl}
                    type="button"
                    onClick={() => {
                      onSelectTable(tbl);
                      onClose();
                    }}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center border ${
                      currentTable === tbl
                        ? 'bg-primary text-white border-primary shadow-md scale-105'
                        : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary/50'
                    }`}
                  >
                    <span>Mesa</span>
                    <span className="text-sm font-black">{tbl}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QRCodeGeneratorModal;
