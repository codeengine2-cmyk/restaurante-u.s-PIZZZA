import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Tandy from './pages/Tandy';
import Offers from './pages/Offers';
import Checkout from './pages/Checkout';
import TableMenu from './pages/TableMenu';
import PrintQRCodes from './pages/PrintQRCodes';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <HashRouter>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/tandy" element={<Tandy />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/mesa" element={<TableMenu />} />
              <Route path="/mesa/:tableId" element={<TableMenu />} />
              <Route path="/imprimir-qrcodes" element={<PrintQRCodes />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </CartProvider>
    </HashRouter>
  );
}

export default App;