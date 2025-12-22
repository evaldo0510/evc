import React from 'react';

interface ActionButtonsProps {
  onSaveContact: () => void;
  onShare: () => void;
  shareStatus: 'idle' | 'copied';
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSaveContact, onShare, shareStatus }) => {
  return (
    <div className="space-y-3 mt-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      {/* CTAs Principais */}
      <div className="grid grid-cols-2 gap-3">
        <a 
          href="https://wa.me/5511961226754" 
          target="_blank" 
          rel="noreferrer"
          className="bg-green-600/20 border border-green-500/30 p-4 rounded-2xl flex flex-col items-center justify-center transition-all hover:bg-green-600/30 active:scale-95 group"
        >
          <i className="fab fa-whatsapp text-2xl mb-1 text-green-400 whatsapp-pulse group-hover:scale-110 group-active:scale-100 transition-transform"></i>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white">WhatsApp</span>
        </a>
        <button 
          onClick={onSaveContact}
          className="bg-indigo-600 p-4 rounded-2xl flex flex-col items-center justify-center transition-all hover:brightness-125 active:scale-95 shadow-lg shadow-indigo-500/20"
        >
          <i className="fas fa-user-plus text-2xl mb-1 text-white"></i>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white">Salvar</span>
        </button>
      </div>

      {/* Novo Botão de Compartilhamento Proeminente */}
      <button 
        onClick={onShare}
        className="w-full glass-panel group flex items-center justify-center gap-3 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all active:scale-[0.98]"
      >
        <i className={`fas ${shareStatus === 'copied' ? 'fa-check text-green-400' : 'fa-share-nodes text-indigo-400'} text-xl group-hover:scale-110 transition-transform`}></i>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
          {shareStatus === 'copied' ? 'Link Copiado!' : 'Compartilhar Cartão'}
        </span>
      </button>

      {/* Ordem Ideal de Redes Sociais */}
      <div className="grid grid-cols-1 gap-2">
        {/* 1. Instagram Principal */}
        <a 
          href="https://www.instagram.com/oevaldopoeta/" 
          target="_blank" rel="noreferrer"
          className="glass-panel group flex items-center gap-4 p-3 rounded-xl border-l-4 border-l-pink-500 hover:bg-white/5 transition-all"
        >
          <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
            <i className="fab fa-instagram text-xl text-pink-500"></i>
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-white font-bold uppercase tracking-wider">Instagram Principal</p>
            <p className="text-[9px] text-gray-500">@oevaldopoeta</p>
          </div>
          <i className="fas fa-chevron-right text-[10px] text-gray-600 group-hover:translate-x-1 transition-transform"></i>
        </a>

        {/* 2. YouTube */}
        <a 
          href="https://www.youtube.com/@oevaldopoeta" 
          target="_blank" rel="noreferrer"
          className="glass-panel group flex items-center gap-4 p-3 rounded-xl border-l-4 border-l-red-600 hover:bg-white/5 transition-all"
        >
          <div className="w-10 h-10 rounded-lg bg-red-600/10 flex items-center justify-center">
            <i className="fab fa-youtube text-xl text-red-600"></i>
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-white font-bold uppercase tracking-wider">YouTube Oficial</p>
            <p className="text-[9px] text-gray-500">Aulas e Poemas Terapêuticos</p>
          </div>
          <i className="fas fa-chevron-right text-[10px] text-gray-600 group-hover:translate-x-1 transition-transform"></i>
        </a>

        {/* 3. LinkedIn */}
        <a 
          href="https://www.linkedin.com/in/evaldo-santana-b8ba292a9" 
          target="_blank" rel="noreferrer"
          className="glass-panel group flex items-center gap-4 p-3 rounded-xl border-l-4 border-l-blue-600 hover:bg-white/5 transition-all"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
            <i className="fab fa-linkedin text-xl text-blue-600"></i>
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-white font-bold uppercase tracking-wider">LinkedIn Profissional</p>
            <p className="text-[9px] text-gray-500">Conexão e Carreira</p>
          </div>
          <i className="fas fa-chevron-right text-[10px] text-gray-600 group-hover:translate-x-1 transition-transform"></i>
        </a>

        {/* 4. TikTok */}
        <a 
          href="https://www.tiktok.com/@oevaldopoeta" 
          target="_blank" rel="noreferrer"
          className="glass-panel group flex items-center gap-4 p-3 rounded-xl border-l-4 border-l-cyan-400 hover:bg-white/5 transition-all"
        >
          <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center">
            <i className="fab fa-tiktok text-xl text-cyan-400"></i>
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-white font-bold uppercase tracking-wider">TikTok PCH</p>
            <p className="text-[9px] text-gray-500">Pílulas Terapêuticas</p>
          </div>
          <i className="fas fa-chevron-right text-[10px] text-gray-600 group-hover:translate-x-1 transition-transform"></i>
        </a>

        {/* 5. Kwai */}
        <a 
          href="https://www.kwai.com/@oevaldopoeta" 
          target="_blank" rel="noreferrer"
          className="glass-panel group flex items-center gap-4 p-3 rounded-xl border-l-4 border-l-orange-500 hover:bg-white/5 transition-all"
        >
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <i className="fas fa-play text-xl text-orange-500"></i>
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-white font-bold uppercase tracking-wider">Kwai Oficial</p>
            <p className="text-[9px] text-gray-500">Vídeos Rápidos e Impactantes</p>
          </div>
          <i className="fas fa-chevron-right text-[10px] text-gray-600 group-hover:translate-x-1 transition-transform"></i>
        </a>

        {/* Instagram Secundário */}
        <a 
          href="https://www.instagram.com/evaldopoetaoficial/" 
          target="_blank" rel="noreferrer"
          className="flex items-center justify-center gap-2 mt-2 opacity-50 hover:opacity-100 transition-opacity"
        >
          <i className="fab fa-instagram text-[10px] text-white"></i>
          <span className="text-[9px] text-gray-400 uppercase tracking-widest">Instagram Reserva: @evaldopoetaoficial</span>
        </a>
      </div>
    </div>
  );
};

export default ActionButtons;