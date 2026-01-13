
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Gallery from './components/Gallery';
import AIStudio from './components/AIStudio';
import Login from './components/Login';
import ChatAssistant from './components/ChatAssistant';
import AdminPanel from './components/AdminPanel';
import { AppSection, Design, AuthState, ShopProfile } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  // Added timing and bankDetails to satisfy ShopProfile interface requirements
  const [shopProfile, setShopProfile] = useState<ShopProfile>({
    name: 'KB Steel & Furniture',
    address: 'Tech City Industrial Zone, Plot 45, Manufacturing Sector',
    phone: '+92 300 1234567',
    whatsapp: '923001234567',
    timing: '9:00 AM - 9:00 PM (Mon-Sat)',
    bankDetails: {
      bankName: 'HBL / Meezan Bank',
      accountTitle: 'Hamza Ali Khan',
      accountNumber: 'PK00MEZN000123456789'
    }
  });
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    phoneNumber: null,
    email: null,
    location: null,
    isAdmin: false
  });

  const ADMIN_EMAIL = 'hamza.alikhan.779@gmail.com';

  const loadShopData = () => {
    const saved = localStorage.getItem('kb_shop_profile');
    if (saved) setShopProfile(JSON.parse(saved));
  };

  useEffect(() => {
    loadShopData();
    window.addEventListener('shopDataUpdated', loadShopData);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setAuthState(prev => ({
            ...prev,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          }));
        },
        (error) => console.warn("Location permission denied", error)
      );
    }
    return () => window.removeEventListener('shopDataUpdated', loadShopData);
  }, []);

  const handleSelectDesign = (design: Design) => {
    if (!authState.isAuthenticated) {
      setActiveSection(AppSection.LOGIN);
      return;
    }
    setSelectedDesign(design);
    setActiveSection(AppSection.STUDIO);
  };

  const handleStartStudio = () => {
    if (!authState.isAuthenticated) {
      setActiveSection(AppSection.LOGIN);
      return;
    }
    setSelectedDesign(null);
    setActiveSection(AppSection.STUDIO);
  };

  const handleOpenChat = () => {
    setActiveSection(AppSection.CHAT);
  };

  const handleOpenLogin = () => {
    setActiveSection(AppSection.LOGIN);
  };

  const handleLogin = (phoneNumber: string) => {
    const isAdmin = phoneNumber === '000';
    setAuthState(prev => ({
      ...prev,
      isAuthenticated: true,
      phoneNumber,
      email: null,
      isAdmin: prev.isAdmin || isAdmin
    }));
    setActiveSection(isAdmin ? AppSection.ADMIN : AppSection.HOME);
  };

  const handleSocialLogin = (email: string) => {
    const isAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
    setAuthState(prev => ({
      ...prev,
      isAuthenticated: true,
      phoneNumber: null,
      email,
      isAdmin
    }));
    setActiveSection(isAdmin ? AppSection.ADMIN : AppSection.HOME);
  };

  const renderSection = () => {
    switch (activeSection) {
      case AppSection.HOME:
        return <Home onStart={handleStartStudio} onOpenChat={handleOpenChat} onOpenLogin={handleOpenLogin} setActiveSection={setActiveSection} />;
      case AppSection.GALLERY:
        return <Gallery onSelectDesign={handleSelectDesign} customerPhone={authState.phoneNumber || ''} />;
      case AppSection.STUDIO:
        return <AIStudio initialDesign={selectedDesign} customerPhone={authState.phoneNumber || ''} />;
      case AppSection.CHAT:
        return <ChatAssistant />;
      case AppSection.ADMIN:
        return <AdminPanel />;
      case AppSection.LOGIN:
        return <Login onLogin={handleLogin} onSocialLogin={handleSocialLogin} />;
      case AppSection.ABOUT:
        return (
          <div className="py-24 px-8 max-w-6xl mx-auto">
            <h2 className="text-5xl font-oswald font-bold uppercase mb-12 text-center">Visit <span className="text-amber-500">{shopProfile.name}</span></h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-8">
                <div className="bg-slate-800 p-8 rounded-[2rem] border border-slate-700 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full"></div>
                  <h3 className="text-amber-500 font-bold uppercase text-xs tracking-widest mb-4">Official Workshop</h3>
                  <p className="text-2xl font-oswald font-medium leading-tight mb-6">
                    {shopProfile.address}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-slate-700">
                      <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                        <i className="fa-solid fa-phone"></i>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Call Us</p>
                        <p className="text-lg font-bold">{shopProfile.phone}</p>
                      </div>
                    </div>
                    
                    <a 
                      href={`https://wa.me/${shopProfile.whatsapp}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-4 bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20 group hover:border-emerald-500 transition-all"
                    >
                      <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                        <i className="fa-brands fa-whatsapp text-2xl"></i>
                      </div>
                      <div>
                        <p className="text-[10px] text-emerald-500 uppercase font-black tracking-widest">Order on WhatsApp</p>
                        <p className="text-lg font-bold text-emerald-400 group-hover:underline">Start Chatting Now</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white p-8 rounded-[2rem] flex flex-col items-center justify-center text-slate-900 text-center shadow-2xl relative">
                  <div className="absolute -top-4 -right-4 bg-amber-500 text-slate-900 font-black px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest shadow-lg">Scan to Share</div>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}&color=0f172a`} 
                    alt="QR Code" 
                    className="w-48 h-48 mb-6"
                  />
                  <h4 className="text-xl font-oswald font-bold uppercase">Customer App Link</h4>
                  <p className="text-xs text-slate-500 font-medium max-w-xs mt-2">
                    Apne dousron ko ye QR code dikhayain taake wo bhi KB Furniture ke designs dekh sakain.
                  </p>
                  <div className="mt-6 flex gap-2 w-full">
                     <button 
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      }}
                      className="flex-grow bg-slate-100 hover:bg-slate-200 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                     >
                       Copy Link
                     </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Home onStart={handleStartStudio} onOpenChat={handleOpenChat} onOpenLogin={handleOpenLogin} setActiveSection={setActiveSection} />;
    }
  };

  return (
    <Layout 
      activeSection={activeSection} 
      setActiveSection={(s) => { setActiveSection(s); setSelectedDesign(null); }}
      authState={authState}
    >
      {renderSection()}
    </Layout>
  );
};

export default App;
