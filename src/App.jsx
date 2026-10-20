import React, { useState } from 'react';
import {
  Search, Lock, Globe, Plus, X, RotateCw, ArrowLeft, ArrowRight,
  Home, Settings, Bookmark, History, Sparkles, Send, CheckCircle2, ShieldCheck
} from 'lucide-react';

// ==========================================
// 1. مكون شعار SVG الرسمي لمتصفح NV.1
// ==========================================
const NV1Logo = ({ className = "w-8 h-8", size = 512 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={size}
    height={size}
    className={className}
  >
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#065F46"/>
        <stop offset="50%" stopColor="#10B981"/>
        <stop offset="100%" stopColor="#A3E635"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.3" cy="0.25" r="0.8">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35"/>
        <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0"/>
      </radialGradient>
      <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45"/>
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="letter" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF"/>
        <stop offset="100%" stopColor="#ECFDF5"/>
      </linearGradient>
      <radialGradient id="dot" cx="0.35" cy="0.35" r="0.7">
        <stop offset="0%" stopColor="#FEF3C7"/>
        <stop offset="45%" stopColor="#FBBF24"/>
        <stop offset="100%" stopColor="#F59E0B"/>
      </radialGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#022C22" floodOpacity="0.35"/>
      </filter>
      <filter id="dotShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#B45309" floodOpacity="0.45"/>
      </filter>
      <clipPath id="tile">
        <rect x="16" y="16" width="480" height="480" rx="116" ry="116"/>
      </clipPath>
    </defs>
    <rect x="16" y="16" width="480" height="480" rx="116" ry="116" fill="url(#bg)"/>
    <g clipPath="url(#tile)">
      <rect x="16" y="16" width="480" height="480" fill="url(#glow)"/>
      <ellipse cx="256" cy="-40" rx="330" ry="210" fill="url(#sheen)"/>
      <circle cx="256" cy="262" r="182" fill="none" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="3"/>
      <circle cx="256" cy="262" r="150" fill="none" stroke="#FFFFFF" strokeOpacity="0.10" strokeWidth="2" strokeDasharray="4 10"/>
    </g>
    <g filter="url(#shadow)">
      <path d="M 150 372 L 150 140 L 362 372 L 362 140" fill="none" stroke="url(#letter)" strokeWidth="50" strokeLinejoin="round" strokeLinecap="round"/>
    </g>
    <path d="M 150 140 L 150 200" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" opacity="0.6"/>
    <g filter="url(#dotShadow)">
      <circle cx="398" cy="394" r="40" fill="url(#dot)"/>
    </g>
    <circle cx="398" cy="394" r="40" fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2"/>
    <text x="398" y="407" fontFamily="Arial, Helvetica, sans-serif" fontSize="40" fontWeight="800" textAnchor="middle" fill="#022C22">1</text>
  </svg>
);

// ==========================================
// 2. قاموس الترجمة متعدد اللغات
// ==========================================
const translations = {
  ar: {
    searchPlaceholder: "ابحث باستخدام NV.1 أو أدخل رابط الموقع...",
    newTab: "تبويب جديد",
    account: "حساب NV.1",
    sync: "المزامنة مفعلة",
    bookmarks: "الإشارات المرجعية",
    history: "السجل",
    dir: "rtl"
  },
  fr: {
    searchPlaceholder: "Rechercher avec NV.1 ou entrer une URL...",
    newTab: "Nouvel onglet",
    account: "Compte NV.1",
    sync: "Synchronisation active",
    bookmarks: "Favoris",
    history: "Historique",
    dir: "ltr"
  },
  en: {
    searchPlaceholder: "Search with NV.1 or enter address...",
    newTab: "New Tab",
    account: "NV.1 Account",
    sync: "Sync Enabled",
    bookmarks: "Bookmarks",
    history: "History",
    dir: "ltr"
  }
};

// ==========================================
// 3. المكون الرئيسي للتطبيق
// ==========================================
export default function NV1Browser() {
  const [lang, setLang] = useState('fr');
  const [themeMode] = useState('dark');
  const [tabs, setTabs] = useState([
    { id: 1, title: 'NV.1 Home', url: 'nv1://home' }
  ]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [inputUrl, setInputUrl] = useState('nv1://home');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [user] = useState({ name: 'Maitine Yassine', email: 'm.yassine@nv1.app' });
  const [shieldsCount] = useState(142);

  const t = translations[lang] || translations.fr;
  const activeTab = tabs.find(tab => tab.id === activeTabId) || tabs[0];
  const isDark = themeMode === 'dark';

  const handleNavigate = (e) => {
    e.preventDefault();
    let url = inputUrl.trim();
    if (!url) return;
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('nv1://')) {
      if (url.includes('.') && !url.includes(' ')) {
        url = `https://${url}`;
      } else {
        url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
      }
    }
    setTabs(tabs.map(tab => tab.id === activeTabId ? { ...tab, url, title: url.replace(/^https?:\/\//, '').split('/')[0] } : tab));
  };

  const createTab = () => {
    const newId = Date.now();
    const newTab = { id: newId, title: t.newTab, url: 'nv1://home' };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
    setInputUrl('nv1://home');
  };

  const closeTab = (id, e) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const filtered = tabs.filter(tab => tab.id !== id);
    setTabs(filtered);
    if (activeTabId === id) {
      setActiveTabId(filtered[filtered.length - 1].id);
      setInputUrl(filtered[filtered.length - 1].url);
    }
  };

  return (
    <div className={`h-screen w-screen flex flex-col font-sans select-none overflow-hidden ${isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-100 text-zinc-900'}`} dir={t.dir}>

      {/* شريط العنوان والتبويبات العلوي */}
      <div className={`flex items-center px-2 pt-2 gap-2 border-b ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-200 border-zinc-300'}`}>
        <div className="flex items-center gap-2 px-2 py-1 cursor-pointer" onClick={() => { setInputUrl('nv1://home'); handleNavigate({ preventDefault: () => {} }); }}>
          <NV1Logo className="w-7 h-7 hover:scale-105 transition-transform" />
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-emerald-500 to-lime-400 bg-clip-text text-transparent">NV.1</span>
        </div>

        {/* قائمة التبويبات المتعددة */}
        <div className="flex items-center gap-1 overflow-x-auto flex-1 no-scrollbar">
          {tabs.map(tab => (
            <div
              key={tab.id}
              onClick={() => { setActiveTabId(tab.id); setInputUrl(tab.url); }}
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-t-lg max-w-[200px] min-w-[120px] text-xs cursor-pointer border-t border-x transition-all ${
                tab.id === activeTabId
                  ? isDark ? 'bg-zinc-950 border-zinc-800 text-emerald-400 font-medium' : 'bg-zinc-100 border-zinc-300 text-emerald-700 font-medium'
                  : isDark ? 'bg-zinc-900/50 border-transparent text-zinc-400' : 'bg-zinc-200/50 border-transparent text-zinc-600'
              }`}
            >
              <Globe className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate flex-1">{tab.title}</span>
              <button onClick={(e) => closeTab(tab.id, e)} className="opacity-0 group-hover:opacity-100 hover:bg-zinc-500/20 rounded p-0.5">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          <button onClick={createTab} className="p-1.5 rounded-lg hover:bg-emerald-500/20 text-emerald-500 transition-colors" title={t.newTab}>
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* تحديد اللغة والحساب */}
        <div className="flex items-center gap-2 px-2">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-zinc-800 text-zinc-200 text-xs rounded px-2 py-1 outline-none border border-zinc-700 cursor-pointer">
            <option value="fr">FR</option>
            <option value="ar">AR</option>
            <option value="en">EN</option>
          </select>
          <button onClick={() => setIsAccountOpen(true)} className="flex items-center gap-1.5 p-1 rounded-full hover:bg-emerald-500/10 border border-emerald-500/30">
            <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
              {user.name.charAt(0)}
            </div>
          </button>
        </div>
      </div>

      {/* شريط الأدوات والبحث (Omnibox) */}
      <div className={`flex items-center gap-2 px-3 py-2 border-b ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'}`}>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg hover:bg-zinc-500/10"><ArrowLeft className="w-4 h-4" /></button>
          <button className="p-1.5 rounded-lg hover:bg-zinc-500/10"><ArrowRight className="w-4 h-4" /></button>
          <button className="p-1.5 rounded-lg hover:bg-zinc-500/10"><RotateCw className="w-4 h-4" /></button>
          <button className="p-1.5 rounded-lg hover:bg-zinc-500/10" onClick={() => { setInputUrl('nv1://home'); handleNavigate({ preventDefault: () => {} }); }}>
            <Home className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleNavigate} className="flex-1">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
            isDark ? 'bg-zinc-900 border-zinc-800 focus-within:border-emerald-500' : 'bg-zinc-100 border-zinc-300 focus-within:border-emerald-600'
          }`}>
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-transparent text-sm focus:outline-none"
            />
            <div className="flex items-center gap-1 text-xs text-emerald-500 font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{shieldsCount}</span>
            </div>
          </div>
        </form>

        <div className="flex items-center gap-1">
          <button onClick={() => setIsAiOpen(!isAiOpen)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${isAiOpen ? 'bg-emerald-500 text-zinc-950' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>NV.1 AI</span>
          </button>
        </div>
      </div>

      {/* منطقة عرض صفحات الويب أو صفحة البداية */}
      <div className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 h-full overflow-y-auto">
          {activeTab.url === 'nv1://home' ? (
            <div className="min-h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-6 group cursor-pointer">
                <NV1Logo size={140} className="w-32 h-32 drop-shadow-[0_10px_25px_rgba(16,185,129,0.3)] transform group-hover:scale-105 transition-all duration-300" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-400 bg-clip-text text-transparent">
                NV.1 Browser
              </h1>
              <p className="text-zinc-400 text-sm max-w-md mb-8">
                Le navigateur nouvelle génération ultra-rapide, sécurisé et intelligent.
              </p>

              <form onSubmit={handleNavigate} className="w-full max-w-xl">
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-xl bg-zinc-900 border-zinc-800 focus-within:border-emerald-500">
                  <Search className="w-5 h-5 text-emerald-500" />
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-transparent text-base focus:outline-none"
                  />
                  <button type="submit" className="p-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 rounded-xl transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <iframe src={activeTab.url} className="w-full h-full border-none" title={activeTab.title} />
          )}
        </div>

        {/* لوحة مساعد الذكاء الاصطناعي الجانبية */}
        {isAiOpen && (
          <div className="w-80 h-full border-l flex flex-col bg-zinc-900 border-zinc-800">
            <div className="p-3 border-b flex items-center justify-between border-zinc-800">
              <div className="flex items-center gap-2">
                <NV1Logo size={24} className="w-5 h-5" />
                <span className="font-bold text-sm text-emerald-400">Assistant NV.1 AI</span>
              </div>
              <button onClick={() => setIsAiOpen(false)}><X className="w-4 h-4 text-zinc-400" /></button>
            </div>
            <div className="flex-1 p-4 text-xs space-y-3 overflow-y-auto">
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                Bonjour ! Je suis l'assistant NV.1. Comment puis-je vous aider ?
              </div>
            </div>
            <div className="p-3 border-t border-zinc-800 flex gap-2">
              <input type="text" placeholder="Écrire un message..." className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-emerald-500" />
              <button className="p-2 bg-emerald-500 text-zinc-950 rounded-lg"><Send className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        )}
      </div>

      {/* النافذة المنبثقة لإدارة الحساب */}
      {isAccountOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md rounded-2xl p-6 border shadow-2xl bg-zinc-900 border-zinc-800">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <NV1Logo size={32} className="w-7 h-7" />
                <h3 className="font-bold text-lg">{t.account}</h3>
              </div>
              <button onClick={() => setIsAccountOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white text-lg font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold">{user.name}</h4>
                <p className="text-xs text-zinc-400">{user.email}</p>
                <span className="text-[10px] text-emerald-400 font-semibold mt-1 inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {t.sync}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
