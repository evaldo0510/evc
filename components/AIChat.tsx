
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const PoeticLoader: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const messages = [
    "Mergulhando no inconsciente...",
    "Tecendo palavras de cura...",
    "Onde o silêncio encontra a fala...",
    "Despertando a consciência..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-start gap-3 mt-2">
      <div className="flex items-center gap-4">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-indigo-500/20 rounded-full ripple-effect"></div>
          <div className="absolute inset-0 bg-indigo-500/15 rounded-full ripple-effect ripple-2"></div>
          <div className="absolute inset-0 bg-indigo-500/10 rounded-full ripple-effect ripple-3"></div>
          <i className="fas fa-feather-pointed text-indigo-400 text-xs relative z-10 animate-bounce"></i>
        </div>
        <span className="text-indigo-300 italic animate-pulse transition-all duration-1000">
          {messages[msgIndex]}
        </span>
      </div>
    </div>
  );
};

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Bem-vindo ao refúgio do silêncio e da palavra. Sou o Oráculo PCH. Como as estrofes da sua vida podem se transformar em cura e liberdade hoje?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await getGeminiResponse(input, history);
      
      const assistantMsg: ChatMessage = { 
        role: 'assistant', 
        content: response || "O silêncio às vezes diz muito, mas tive um erro técnico. Tente novamente.", 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[400px] glass-panel rounded-3xl overflow-hidden mt-6 animate-fade-in shadow-2xl" style={{ animationDelay: '0.4s' }}>
      <div className="bg-indigo-600/60 px-4 py-3 flex items-center justify-between border-b border-white/10">
        <h3 className="text-white font-bold text-[10px] tracking-widest flex items-center gap-2 uppercase">
          <i className="fas fa-feather-pointed text-indigo-300"></i> Oráculo Poético PCH
        </h3>
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 text-[11px] scroll-smooth"
      >
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/5'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && <PoeticLoader />}
      </div>

      <div className="p-3 border-t border-white/5 bg-black/30 flex gap-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Busque um insight terapêutico..."
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white text-[11px] focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-lg shadow-indigo-500/20"
        >
          <i className="fas fa-paper-plane text-xs"></i>
        </button>
      </div>
    </div>
  );
};

export default AIChat;
