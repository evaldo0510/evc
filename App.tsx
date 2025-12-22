
import React, { useState, useRef } from 'react';
import ActionButtons from './components/ActionButtons';
import AIChat from './components/AIChat';
import { getNearbyClinicalSpaces } from './services/geminiService';

const App: React.FC = () => {
  const [nearbyPlaces, setNearbyPlaces] = useState<any>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');
  const [profileImage, setProfileImage] = useState<string>('https://images.unsplash.com/photo-1611608822650-925c227ef4d2?auto=format&fit=crop&w=512&q=80');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadVCard = () => {
    const vcard = "BEGIN:VCARD\n" +
                  "VERSION:3.0\n" +
                  "FN:Evaldo Poeta\n" +
                  "ORG:Poesia Cognitiva Hipnótica (PCH);\n" +
                  "TITLE:Poeta Terapêutico e Psicanalista Clínico\n" +
                  "TEL;TYPE=CELL:5511961226754\n" +
                  "URL:https://www.instagram.com/oevaldopoeta/\n" +
                  "NOTE:Sou Evaldo Poeta. Transformo dor em linguagem, pensamento em consciência e poesia em caminho de liberdade interior.\n" +
                  "END:VCARD";
    
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "evaldo_poeta.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    alert("Contato de Evaldo Poeta pronto para salvar na sua agenda!");
  };

  const shareCard = async () => {
    const currentUrl = window.location.href;
    const isShareableUrl = currentUrl.startsWith('http');
    
    const shareData: ShareData = {
      title: 'Evaldo Poeta - Cartão Digital',
      text: 'Conheça o trabalho de Evaldo Poeta: Poesia Cognitiva Hipnótica e Psicanálise Clínica.',
      url: isShareableUrl ? currentUrl : undefined
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Erro ao compartilhar:', err);
          copyFallback();
        }
      }
    } else {
      copyFallback();
    }
  };

  const copyFallback = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  const findWellnessSpots = () => {
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const result = await getNearbyClinicalSpaces(latitude, longitude);
          setNearbyPlaces(result);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        setIsLocating(false);
        alert("Ative a localização para encontrar espaços de bem-estar próximos.");
      }
    );
  };

  return (
    <div className="min-h-screen poetic-gradient py-8 px-6 relative flex flex-col items-center">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1920&q=80" 
          className="w-full h-full object-cover grayscale"
          alt="bg-texture"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Share Button Floating Top-Right */}
        <button 
          onClick={shareCard}
          className="absolute top-0 right-0 z-20 w-10 h-10 glass-panel rounded-full flex items-center justify-center text-white/70 hover:text-indigo-400 transition-all hover:scale-110 active:scale-95 shadow-lg"
          title="Compartilhar Cartão"
        >
          <i className={`fas ${shareStatus === 'copied' ? 'fa-check text-green-400' : 'fa-share-nodes'}`}></i>
          {shareStatus === 'copied' && (
            <span className="absolute -bottom-8 right-0 text-[9px] bg-black/80 px-2 py-1 rounded-md text-white whitespace-nowrap animate-bounce">
              Link Copiado!
            </span>
          )}
        </button>

        {/* Header / Profile */}
        <div className="flex flex-col items-center text-center animate-fade-in">
          <div className="relative mb-6 group cursor-pointer" onClick={handleImageClick}>
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/30 to-purple-400/20 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity"></div>
            
            {/* Foto de perfil com funcionalidade de troca */}
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-indigo-500/50 to-purple-500/50 overflow-hidden shadow-2xl">
              <img 
                src={profileImage} 
                alt="Evaldo Poeta"
                className="w-40 h-40 rounded-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              {/* Overlay de Edição */}
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                <i className="fas fa-camera text-white text-2xl mb-1"></i>
                <span className="text-[8px] text-white font-bold uppercase tracking-widest">Alterar Foto</span>
              </div>
            </div>
            
            {/* Badge flutuante de edição para mobile */}
            <div className="absolute bottom-1 right-1 bg-indigo-600 w-8 h-8 rounded-full border-2 border-[#030712] flex items-center justify-center text-white text-xs shadow-lg group-active:scale-90 transition-transform">
              <i className="fas fa-pencil-alt"></i>
            </div>
            
            {/* Input de arquivo oculto */}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageChange}
            />
          </div>

          <h1 className="text-3xl font-bold text-white tracking-tight mb-1 poetic-font">EVALDO POETA</h1>
          <p className="text-indigo-300 text-[10px] font-bold tracking-[0.3em] uppercase mb-2">
            Palavras que libertam. Consciência que desperta.
          </p>
          <p className="text-gray-300 text-[11px] font-semibold tracking-wide uppercase mb-4">
            Poeta Terapêutico | Psicanalista Clínico
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4 backdrop-blur-sm shadow-inner">
            <p className="text-gray-200 text-xs leading-relaxed font-light italic">
              "Sou Evaldo Poeta. Transformo dor em linguagem, pensamento em consciência e poesia em caminho de liberdade interior."
            </p>
          </div>
        </div>

        {/* Action Grid */}
        <ActionButtons 
          onSaveContact={downloadVCard} 
          onShare={shareCard}
          shareStatus={shareStatus}
        />

        {/* AI Assistant */}
        <AIChat />

        {/* Featured Method Section */}
        <div className="mt-6 glass-panel rounded-3xl overflow-hidden group animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-indigo-600/30 rounded-full flex items-center justify-center border border-indigo-500/30">
                <i className="fas fa-brain text-indigo-400"></i>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm poetic-font">Método PCH</h3>
                <p className="text-[10px] text-indigo-300 uppercase tracking-widest font-bold">Poesia Cognitiva Hipnótica</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Uma abordagem inovadora que utiliza a métrica poética e sugestões hipnóticas para o despertar da consciência e cura psíquica.
            </p>
            <button 
              onClick={() => window.open('https://m.youtube.com/@oevaldopoeta', '_blank')}
              className="w-full text-white text-[10px] font-bold uppercase border border-indigo-500/30 bg-indigo-500/5 py-3 rounded-xl hover:bg-indigo-500/20 transition-all tracking-widest"
            >
              Conhecer o Método no YouTube
            </button>
          </div>
        </div>

        {/* Grounding */}
        <div className="mt-6 glass-panel rounded-3xl p-5 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-[10px] font-bold tracking-widest uppercase opacity-70">Espaços Culturais Próximos</h3>
            <button 
              onClick={findWellnessSpots}
              disabled={isLocating}
              className="text-indigo-400 text-[10px] font-bold uppercase border-b border-indigo-400/20 hover:border-indigo-400 transition-all"
            >
              {isLocating ? 'Buscando...' : 'Localizar'}
            </button>
          </div>
          {nearbyPlaces ? (
            <div className="space-y-3">
              <p className="text-gray-300 text-[10px] leading-relaxed italic border-l-2 border-indigo-500/50 pl-3">
                {nearbyPlaces.text}
              </p>
              <div className="flex flex-wrap gap-2">
                {nearbyPlaces.links.map((chunk: any, i: number) => chunk.maps && (
                  <a 
                    key={i} 
                    href={chunk.maps.uri} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[9px] bg-indigo-500/10 text-indigo-300 px-3 py-1.5 rounded-lg border border-indigo-500/20 hover:bg-indigo-600 hover:text-white transition-all"
                  >
                    {chunk.maps.title || 'Ver Mapa'}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-[10px] text-center py-2">
              Descubra espaços de saúde mental e cultura perto de você.
            </p>
          )}
        </div>

        {/* Social Icons */}
        <div className="mt-10 flex justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <a href="https://www.instagram.com/oevaldopoeta/" target="_blank" rel="noreferrer" className="text-white/40 hover:text-pink-500 transition-all hover:scale-125">
            <i className="fab fa-instagram text-xl"></i>
          </a>
          <a href="https://www.youtube.com/@oevaldopoeta" target="_blank" rel="noreferrer" className="text-white/40 hover:text-red-600 transition-all hover:scale-125">
            <i className="fab fa-youtube text-xl"></i>
          </a>
          <a href="https://www.linkedin.com/in/evaldo-santana-b8ba292a9" target="_blank" rel="noreferrer" className="text-white/40 hover:text-blue-600 transition-all hover:scale-125">
            <i className="fab fa-linkedin text-xl"></i>
          </a>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center pb-8 animate-fade-in" style={{ animationDelay: '1s' }}>
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] mb-4">© 2024 Evaldo Poeta • Psicanálise & Arte</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
