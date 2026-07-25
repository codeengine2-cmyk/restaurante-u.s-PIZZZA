import React, { useState } from 'react';
import { QrCode, Printer, Table, Check, Sparkles, ExternalLink, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrintQRCodes: React.FC = () => {
  // Determine current base URL
  const defaultBaseUrl = `${window.location.origin}${window.location.pathname}#/mesa/`;
  const [baseUrl, setBaseUrl] = useState<string>(defaultBaseUrl);
  const [selectedTables, setSelectedTables] = useState<string[]>(['01', '02', '03', '08']);
  const [cardSize, setCardSize] = useState<'a4' | 'a5'>('a5');

  const allTables = Array.from({ length: 15 }, (_, i) => String(i + 1).padStart(2, '0'));

  const toggleTable = (tbl: string) => {
    if (selectedTables.includes(tbl)) {
      setSelectedTables(selectedTables.filter(t => t !== tbl));
    } else {
      setSelectedTables([...selectedTables, tbl]);
    }
  };

  const selectAll = () => setSelectedTables(allTables);
  const selectTwoTables = () => setSelectedTables(['01', '02']);

  const getTableUrl = (tbl: string) => {
    return `${baseUrl}${tbl}`;
  };

  const getQRImageUrl = (tbl: string) => {
    const fullUrl = getTableUrl(tbl);
    // Request SVG format for 100% crisp vector quality when printing/saving to PDF
    return `https://api.qrserver.com/v1/create-qr-code/?size=600x600&format=svg&data=${encodeURIComponent(fullUrl)}&margin=10`;
  };

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gray-100 dark:bg-background-dark text-gray-900 dark:text-gray-100 print:pt-0 print:pb-0 print:bg-white">
      
      {/* Screen Only Control Header (Hidden when printing) */}
      <div className="print:hidden max-w-5xl mx-auto px-4 sm:px-6 mb-8">
        <div className="bg-white dark:bg-card-dark rounded-3xl p-6 shadow-xl border border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
            <div>
              <Link to="/mesa/08" className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline mb-2">
                <ArrowLeft size={14} /> Voltar ao Cardápio de Mesa
              </Link>
              <h1 className="text-3xl font-brand uppercase tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
                <QrCode size={32} className="text-primary" /> Placas QR Code para Impressão PDF
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Imprima ou salve em PDF estas placas para colocar nas mesas do restaurante em alta definição vectorizada.
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="bg-primary hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-xl shadow-primary/20 flex items-center gap-2 text-sm uppercase tracking-wider transition-all active:scale-95"
            >
              <Printer size={18} /> Imprimir / Salvar em PDF
            </button>
          </div>

          {/* Dica para Impressão de Alta Qualidade */}
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 mb-6 text-xs text-amber-900 dark:text-amber-200">
            <p className="font-bold mb-1 flex items-center gap-1.5 text-sm">
              <Sparkles size={16} className="text-amber-600 dark:text-amber-400" />
              Como gerar um PDF perfeito em alta qualidade:
            </p>
            <ol className="list-decimal list-inside space-y-1 font-medium text-[11px] text-amber-800 dark:text-amber-300">
              <li>Clique no botão vermelho acima <strong>"Imprimir / Salvar em PDF"</strong>.</li>
              <li>Na janela que abrir, no campo <em>Destino</em>, selecione <strong>"Salvar como PDF"</strong>.</li>
              <li>Em <em>Mais definições</em>, marque a opção <strong>"Gráficos de segundo plano"</strong> (para manter as cores vermelhas e fundo).</li>
              <li>Defina as margens como <strong>"Nenhuma"</strong> ou <strong>"Mínimas"</strong>.</li>
            </ol>
          </div>

          {/* Settings Grid */}
          <div className="space-y-4 text-xs">
            {/* Custom URL Input if needed */}
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                URL de Destino para os QR Codes:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-2.5 font-mono text-xs outline-none focus:border-primary text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setBaseUrl(defaultBaseUrl)}
                  className="bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-xl text-[11px] font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1 hover:bg-gray-300"
                >
                  <RefreshCw size={12} /> Restaurar Padrão
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                Ao escanear, o telemóvel do cliente abrirá automaticamente <code className="text-primary font-bold">{getTableUrl('01')}</code>
              </p>
            </div>

            {/* Layout Options */}
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Formato da Placa:
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setCardSize('a5')}
                  className={`px-4 py-2 rounded-xl font-bold transition-all border text-xs flex items-center gap-2 ${
                    cardSize === 'a5'
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700'
                  }`}
                >
                  2 Placas por Folha A4 (Tamanho A5)
                </button>
                <button
                  onClick={() => setCardSize('a4')}
                  className={`px-4 py-2 rounded-xl font-bold transition-all border text-xs flex items-center gap-2 ${
                    cardSize === 'a4'
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700'
                  }`}
                >
                  1 Placa Grande por Folha (Tamanho A4)
                </button>
              </div>
            </div>

            {/* Tables selection */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-bold text-gray-700 dark:text-gray-300">
                  Selecione as Mesas para Imprimir ({selectedTables.length} selecionadas):
                </label>
                <div className="flex gap-2 text-[10px] font-bold">
                  <button onClick={selectTwoTables} className="text-primary hover:underline">
                    Apenas Mesa 01 e 02 (Teste Rápido)
                  </button>
                  <span>•</span>
                  <button onClick={selectAll} className="text-primary hover:underline">
                    Todas as 15 Mesas
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {allTables.map((tbl) => {
                  const isSelected = selectedTables.includes(tbl);
                  return (
                    <button
                      key={tbl}
                      onClick={() => toggleTable(tbl)}
                      className={`px-3.5 py-1.5 rounded-xl font-bold transition-all border ${
                        isSelected
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      Mesa {tbl}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Area - Tabletop Cards */}
      <div className="max-w-5xl mx-auto px-4 print:max-w-none print:px-0">
        <div
          className={`grid gap-8 print:gap-8 ${
            cardSize === 'a4'
              ? 'grid-cols-1 print:grid-cols-1'
              : 'grid-cols-1 md:grid-cols-2 print:grid-cols-2'
          }`}
        >
          {selectedTables.map((tbl) => {
            const qrUrl = getQRImageUrl(tbl);
            const targetUrl = getTableUrl(tbl);

            return (
              <div
                key={tbl}
                className="bg-white text-gray-900 border-4 border-gray-900 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-between text-center relative overflow-hidden print-card print:shadow-none print:border-4 print:border-black print:rounded-2xl print:p-6 print:m-0"
                style={{
                  minHeight: cardSize === 'a4' ? '650px' : '450px',
                  pageBreakInside: 'avoid',
                  breakInside: 'avoid',
                }}
              >
                {/* Decorative Top Banner */}
                <div className="w-full bg-primary text-white py-3 px-6 -mt-8 -mx-8 mb-6 rounded-t-2xl font-brand uppercase tracking-widest text-lg flex items-center justify-between print:-mt-6 print:-mx-6 print:mb-4 print:bg-primary print:text-white">
                  <span className="font-bold">U.S. PIZZA LUANDA</span>
                  <span className="text-xs bg-black/30 px-3 py-1 rounded-full font-sans font-bold text-white">
                    CARDÁPIO DIGITAL
                  </span>
                </div>

                {/* Table Number */}
                <div className="mb-2">
                  <span className="text-xs font-black uppercase tracking-[0.25em] text-gray-500 block">
                    SEJA BEM-VINDO À
                  </span>
                  <h2 className="text-5xl font-brand uppercase tracking-tight text-primary font-black mt-1">
                    MESA {tbl}
                  </h2>
                </div>

                {/* Vector Crisp QR Code Image */}
                <div className="my-4 p-4 bg-white rounded-2xl border-2 border-gray-900 shadow-md inline-block relative print:border-2 print:border-black">
                  <img
                    src={qrUrl}
                    alt={`QR Code Vector Mesa ${tbl}`}
                    className={`object-contain mx-auto ${
                      cardSize === 'a4'
                        ? 'w-64 h-64 print:w-72 print:h-72'
                        : 'w-48 h-48 print:w-48 print:h-48'
                    }`}
                  />
                </div>

                {/* Instructions */}
                <div className="space-y-1.5 max-w-xs mx-auto">
                  <p className="text-sm font-black uppercase text-gray-900">
                    COMO FAZER O SEU PEDIDO:
                  </p>
                  <ol className="text-xs text-gray-800 font-bold space-y-1 text-left list-decimal list-inside">
                    <li>Aponte a câmara do seu telemóvel para o QR Code</li>
                    <li>Escolha os seus pratos e personalize os ingredientes</li>
                    <li>Envie diretamente para a cozinha e acompanhe!</li>
                  </ol>
                </div>

                {/* Footer Tagline */}
                <div className="mt-6 pt-4 border-t border-gray-300 w-full text-[11px] font-extrabold text-gray-600 uppercase tracking-wider flex justify-between items-center print:mt-4 print:pt-2">
                  <span>Wi-Fi Grátis no Local</span>
                  <span className="text-primary font-black">#USPizzaLuanda</span>
                </div>

                {/* Test Link Button (Screen Only) */}
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="print:hidden mt-3 text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-bold"
                >
                  <ExternalLink size={12} /> Testar Abrir Mesa {tbl} no Navegador
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Print Specific CSS Overrides */}
      <style>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          html, body {
            background: white !important;
            color: black !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          nav, footer {
            display: none !important;
          }
          @page {
            size: A4 portrait;
            margin: 8mm;
          }
          .print-card {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PrintQRCodes;
