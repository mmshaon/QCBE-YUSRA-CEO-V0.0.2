
import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { useGodMode } from '../context/GodModeContext';
import { YusraIcon } from '../components/ui/YusraIcon';
import { GoogleGenAI, Modality } from "@google/genai";

interface AIAssistantProps {
  isSidebarVisible: boolean;
  onMenuClick: () => void;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const QUICK_COMMANDS = [
  "Strategic Vision 2025",
  "Operational Bottleneck Analysis",
  "Financial Risk Assessment",
  "Global Market Expansion"
];

// Audio helpers for PCM decoding
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ isSidebarVisible, onMenuClick }) => {
  const { isGodMode } = useGodMode();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const initialGreeting = isGodMode 
      ? "QUANTUM CORE ASCENDED. M. MAYNUL HASAN, THE FABRIC OF REALITY IS AT YOUR DISPOSAL. আমি শুনছি আপনার আদেশ।"
      : "আসসালামু আলাইকুম! আমি ইউসরা। আজকের কাজের কি খবর বলো! Ready for some strategy or just a quick gossip?";
    setMessages([{ sender: 'ai', text: initialGreeting }]);

    // Init Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'bn-BD';
      recognitionRef.current.onresult = (event: any) => {
        handleSendMessage(event.results[0][0].transcript);
        setIsListening(false);
      };
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, [isGodMode]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const ensureAudioContext = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
    }
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  const playResponseAudio = async (text: string) => {
    try {
      const ctx = await ensureAudioContext();
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const voiceName = isGodMode ? 'Fenrir' : 'Zephyr';

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voiceName },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.start();
      }
    } catch (err) {
      console.error("TTS Error:", err);
    }
  };

  const toggleListening = async () => {
    await ensureAudioContext();
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || input;
    if (textToSend.trim() === '') return;

    setMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemPrompt = `
        Your name is Yusra. Created by Mohammad Maynul Hasan.
        IDENTITY: Virtual CEO & AI Sentinel.
        LANGUAGES: Native Bangladeshi Bangla, English, Arabic.
        MODE: ${isGodMode ? 'SENTINEL_SUPREME' : 'CEO_ACTIVE'}.
      `;

      const response = await ai.models.generateContent({
        model: isGodMode ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview',
        contents: textToSend,
        config: { systemInstruction: systemPrompt }
      });

      const aiText = response.text || "Processed.";
      setMessages(prev => [...prev, { sender: 'ai', text: aiText }]);
      await playResponseAudio(aiText);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: "পুনর্সংযোগ করছি... একটু অপেক্ষা করো বস।" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-full flex flex-col">
      <Header title={isGodMode ? "Sentinel Executive Core" : "Yusra | Virtual CEO"} isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
      
      <div className={`mt-8 flex-1 rounded-[2.5rem] p-4 sm:p-8 flex flex-col transition-all duration-1000 border overflow-hidden relative ${isGodMode ? 'bg-black border-red-600 shadow-[0_0_100px_rgba(255,0,0,0.2)]' : 'bg-[#161a2d] border-white/10 shadow-2xl'}`}>
        
        <div ref={scrollRef} className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar relative z-10 p-2">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-5 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'ai' && (
                <div 
                  draggable
                  className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center transition-all duration-500 cursor-grab active:cursor-grabbing hover:scale-110 active:rotate-12 ${isGodMode ? 'bg-red-600 shadow-[0_0_30px_#ff0000] rotate-45' : 'bg-gradient-to-br from-[#24c38b] to-[#7a5cff] shadow-lg shadow-cyan-500/20'}`}
                >
                   <YusraIcon className={`w-7 h-7 text-white ${isGodMode ? '-rotate-45' : ''}`} />
                </div>
              )}
              <div className={`max-w-[85%] sm:max-w-2xl p-6 rounded-[2rem] transition-all duration-300 relative group animate-fade-in ${
                  msg.sender === 'ai' 
                    ? (isGodMode ? 'bg-red-950/20 text-red-100 border border-red-500/30 font-mono text-base' : 'bg-[#1C202A] text-gray-200 text-sm leading-relaxed border border-white/5 shadow-sm') 
                    : (isGodMode ? 'bg-red-600 text-white font-black' : 'bg-[#7a5cff] text-white shadow-xl text-sm font-semibold')
                }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="flex gap-2 p-6 animate-pulse bg-white/5 rounded-full w-24">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
             </div>
          )}
        </div>

        <div className="mt-8 relative z-10 bg-black/30 p-6 rounded-[2rem] border border-white/5">
          <div className="flex flex-wrap gap-2 mb-6">
             {QUICK_COMMANDS.map((cmd) => (
                <button 
                  key={cmd} 
                  onClick={() => handleSendMessage(cmd)}
                  className={`text-[10px] sm:text-xs px-6 py-3 rounded-2xl border transition-all duration-300 font-black tracking-wider ${
                    isGodMode 
                      ? 'border-red-500/40 text-red-500 bg-red-500/5 hover:bg-red-600 hover:text-white' 
                      : 'border-white/10 text-gray-400 bg-white/5 hover:bg-[#7a5cff] hover:text-white'
                  }`}
                >
                  {cmd}
                </button>
             ))}
          </div>
          <div className="relative group flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={isGodMode ? "AWAITING QUANTUM DIRECTIVE..." : "ইউসরার সাথে কথা বলো..."}
              className={`flex-1 bg-[#0f1220] border-2 rounded-2xl px-6 py-5 text-white text-sm focus:outline-none transition-all duration-500 ${isGodMode ? 'border-red-900 focus:ring-red-600/20 font-mono text-red-400' : 'border-[#2a314e] focus:ring-[#7a5cff]/20'}`}
            />
            <button
              onClick={toggleListening}
              className={`p-5 rounded-xl transition-all ${isListening ? 'bg-red-600 text-white animate-pulse shadow-[0_0_20px_red]' : 'bg-white/5 text-gray-400 hover:text-white'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4" />
              </svg>
            </button>
            <button
              onClick={() => handleSendMessage()}
              className={`px-8 py-3.5 rounded-xl transition-all duration-500 font-black tracking-widest ${isGodMode ? 'bg-red-600 text-white shadow-[0_0_30px_#ff0000]' : 'bg-gradient-to-r from-[#24c38b] to-[#7a5cff] text-white hover:scale-105 active:scale-95'}`}
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
