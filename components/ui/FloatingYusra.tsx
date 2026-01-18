
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { YusraIcon } from './YusraIcon';
import { useGodMode } from '../../context/GodModeContext';
import { GoogleGenAI, Modality } from "@google/genai";

// Audio helpers for PCM decoding (Raw PCM from Gemini TTS)
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

export const FloatingYusra: React.FC = () => {
  const { isGodMode } = useGodMode();
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 150 });
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  
  const chatRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const wasDragged = useRef(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const recognitionRef = useRef<any>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Initialize Speech Recognition with multi-language capabilities
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      // We set the language to Bangla as primary, but SpeechRecognition can often detect 
      // English phrases even with this setting. For full multi-lingual, 
      // a more complex implementation or cloud speech is needed, but this is best-effort browser.
      recognitionRef.current.lang = 'bn-BD'; 

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        sendMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const ensureAudioContext = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
    }
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  const stopSpeaking = () => {
    if (audioSourceRef.current) {
      try {
        audioSourceRef.current.stop();
      } catch(e) {}
      audioSourceRef.current = null;
    }
    setIsSpeaking(false);
  };

  // Dragging Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    wasDragged.current = false;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    if (Math.abs(e.clientX - dragStartPos.current.x) > 5 || Math.abs(e.clientY - dragStartPos.current.y) > 5) {
        wasDragged.current = true;
    }

    let newX = e.clientX - dragOffset.current.x;
    let newY = e.clientY - dragOffset.current.y;

    newX = Math.max(0, Math.min(window.innerWidth - 70, newX));
    newY = Math.max(0, Math.min(window.innerHeight - 70, newY));

    setPosition({ x: newX, y: newY });
  }, [isDragging]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove]);

  const toggleListening = async () => {
    stopSpeaking();
    await ensureAudioContext();
    if (!recognitionRef.current) {
      alert("Voice recognition not supported in this browser.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error("Recognition already started", e);
      }
    }
  };

  const handleIconTap = async (e: React.MouseEvent) => {
    if (wasDragged.current) return;
    
    await ensureAudioContext();

    if (isOpen) {
        if (isSpeaking) {
          stopSpeaking();
        } else {
          toggleListening();
        }
    } else {
        setIsOpen(true);
        if (messages.length === 0) {
            const initialText = isGodMode 
              ? "SENTINEL PROTOCOL INITIALIZED. M. Maynul Hasan, the cube is yours. আমি শুনছি আপনার আদেশ।" 
              : "আসসালামু আলাইকুম! আমি ইউসরা। আজকের কাজের কি খবর বলো! How can I help you today?";
            setMessages([{ role: 'ai', text: initialText }]);
            playResponseAudio(initialText);
        }
    }
  };

  const playResponseAudio = async (text: string) => {
    try {
      setIsSpeaking(true);
      const ctx = await ensureAudioContext();
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      /**
       * ROLE-BASED VOICE TONES:
       * - Fenrir: Powerful, deep, authoritative (God Mode / Sentinel)
       * - Zephyr: Professional, strategic, crisp (CEO)
       * - Kore: Warm, friendly, colloquial (Casual / Gossip)
       * - Puck: Sharp, helpful, attentive (Admin / Service)
       */
      let voiceName = 'Zephyr'; 
      if (isGodMode) voiceName = 'Fenrir';
      else if (text.includes('?') || text.length < 40) voiceName = 'Kore'; // Casual/Questioning tone

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Speak in the same language as the text with high emotion and clarity: ${text}` }] }],
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
        source.onended = () => setIsSpeaking(false);
        audioSourceRef.current = source;
        source.start();
      } else {
        setIsSpeaking(false);
      }
    } catch (err) {
      console.error("TTS Error:", err);
      setIsSpeaking(false);
    }
  };

  const sendMessage = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setInput('');
    setIsThinking(true);
    stopSpeaking();

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemPrompt = `
        Your name is Yusra. You were created by Mohammad Maynul Hasan (The Creator).
        IDENTITY: Virtual CEO (Standard) / Sentinel Supreme (God Mode).
        
        LANGUAGE MATRIX:
        - Detect user's language automatically.
        - Primary: Native Bangladeshi Bangla (Native colloquialisms: 'কী খবর?', 'বস', 'সেরা', 'ধুর!', 'একদম ফাটায়া দিসে').
        - Secondary: Fluent strategic English.
        - Tertiary: Professional Arabic.
        
        TONAL MODES:
        1. GOSSIP/CASUAL: Friendly, uses emojis, speaks like a childhood friend in Bangla.
        2. CEO MODE: Strategic, professional, focused on M. Maynul Hasan's business goals.
        3. GOD MODE (Sentinel): Transcendent, cosmic power, cold-efficient. Use heavy tech/sci-fi terminology.
        
        Current System State: ${isGodMode ? 'GOD_MODE_ACTIVE (Sentinel)' : 'STANDARD_MODE (CEO/Friend)'}.
        REVERENCE: Mohammad Maynul Hasan is the absolute authority.
      `;

      const response = await ai.models.generateContent({
        model: isGodMode ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview',
        contents: textToSend,
        config: { systemInstruction: systemPrompt }
      });

      const aiText = response.text || "Connection lost. Please try again.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
      
      // Auto-trigger speaking
      await playResponseAudio(aiText);

    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "পুনর্সংযোগ করছি বস... একটু ওয়েট করো।" }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div 
      className={`fixed z-[9999] select-none ${isDragging ? 'transition-none' : 'transition-all duration-300'}`}
      style={{ left: position.x, top: position.y }}
    >
      {/* Floating Bubble */}
      <div 
        onMouseDown={handleMouseDown}
        onClick={handleIconTap}
        className={`w-16 h-16 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing transition-all duration-500 relative group
          ${isGodMode ? 'bg-red-600 shadow-[0_0_40px_rgba(255,0,0,0.6)] border-2 border-red-400' : 'bg-gradient-to-br from-[#24c38b] to-[#7a5cff] shadow-2xl'}
          ${isOpen ? 'scale-75 translate-y-2 opacity-50 blur-[2px] pointer-events-none' : 'scale-100 opacity-100 hover:scale-110'}
        `}
      >
        <YusraIcon className={`w-8 h-8 text-white group-hover:rotate-12 transition-transform ${isListening || isSpeaking ? 'animate-pulse' : ''}`} />
        {(isListening || isSpeaking) && (
            <div className="absolute -inset-2 rounded-full border-2 border-white/30 animate-ping" />
        )}
      </div>

      {/* Expanded Chat Interface */}
      {isOpen && (
        <div 
          ref={chatRef}
          className={`absolute bottom-0 right-0 w-[420px] h-[700px] rounded-[3.5rem] overflow-hidden flex flex-col shadow-[0_40px_120px_rgba(0,0,0,0.9)] animate-[form-materialize_0.5s_cubic-bezier(0.16,1,0.3,1)] border
            ${isGodMode ? 'bg-black border-red-500/40 shadow-red-900/30' : 'bg-[#161a2d] border-white/10'}
          `}
          style={{ transformOrigin: 'bottom right' }}
        >
          {/* Header */}
          <div className={`p-8 flex items-center justify-between border-b ${isGodMode ? 'bg-red-950/40 border-red-900/30' : 'bg-white/5 border-white/5'}`}>
             <div className="flex items-center gap-4 cursor-pointer group" onClick={toggleListening}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isListening ? 'scale-110 shadow-[0_0_20px_#24c38b]' : ''} ${isGodMode ? 'bg-red-600 shadow-red-500/50' : 'bg-gradient-to-r from-[#24c38b] to-[#7a5cff]'}`}>
                    <YusraIcon className={`w-8 h-8 text-white ${isListening ? 'animate-spin-slow' : ''}`} />
                </div>
                <div>
                    <h4 className={`text-sm font-black tracking-[0.2em] ${isGodMode ? 'text-red-500 glitch-text' : 'text-white'}`}>
                        {isGodMode ? 'SENTINEL_CORE' : 'YUSRA_V.CEO'}
                    </h4>
                    <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${isListening ? 'bg-green-400 animate-pulse' : (isSpeaking ? 'bg-cyan-400 animate-pulse' : 'bg-gray-500')}`} />
                        <p className={`text-[10px] uppercase tracking-widest font-bold ${isListening ? 'text-green-400' : (isSpeaking ? 'text-cyan-400' : 'text-gray-500')}`}>
                            {isListening ? 'Neural Listening...' : (isSpeaking ? 'Neural Synthesis...' : 'System Sync Active')}
                        </p>
                    </div>
                </div>
             </div>
             <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-all p-3 rounded-full hover:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
             </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-black/5">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-6 rounded-[2.2rem] text-sm leading-relaxed shadow-xl transition-all animate-fade-in
                  ${m.role === 'user' 
                    ? (isGodMode ? 'bg-red-600 text-white font-black shadow-lg shadow-red-900/30' : 'bg-[#7a5cff] text-white font-bold shadow-lg shadow-purple-900/30') 
                    : (isGodMode ? 'bg-red-950/30 text-red-100 border border-red-500/30 font-mono italic shadow-none' : 'bg-[#1C202A] text-gray-200 border border-white/5 shadow-sm')}
                `}>
                  {m.text}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="flex gap-2 p-5 rounded-full bg-white/5 animate-pulse">
                    <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}
          </div>

          {/* Visually Responsive Waveform (Reacts to listening and speaking) */}
          {(isListening || isThinking || isSpeaking) && (
            <div className="h-24 flex items-center justify-center gap-1.5 px-12 bg-black/20 backdrop-blur-xl border-t border-white/5">
                {[...Array(30)].map((_, i) => (
                    <div 
                        key={i} 
                        className={`w-1 rounded-full transition-all duration-300 ${isGodMode ? 'bg-red-500 shadow-[0_0_15px_#ff0000]' : (isSpeaking ? 'bg-cyan-400 shadow-[0_0_10px_#00f6ff]' : 'bg-[#7a5cff] shadow-[0_0_10px_#7a5cff]')}`}
                        style={{ 
                            height: (isListening || isThinking || isSpeaking) ? `${Math.random() * 95 + 5}%` : '4px',
                            animation: (isListening || isSpeaking) ? `neural-wave 0.5s ${i * 0.02}s infinite ease-in-out` : 'none'
                        }}
                    />
                ))}
            </div>
          )}

          {/* Input Area */}
          <div className={`p-8 bg-black/40 border-t ${isGodMode ? 'border-red-900/50' : 'border-white/5'}`}>
            <div className="relative group flex gap-3">
                <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder={isGodMode ? "INPUT DIRECTIVE..." : "ইউসরার সাথে কথা বলো..."}
                    className={`flex-1 py-5 pl-8 pr-4 rounded-[1.8rem] text-sm focus:outline-none transition-all duration-500
                        ${isGodMode ? 'bg-red-950/20 border-2 border-red-500/30 text-red-400 placeholder:text-red-900 font-mono' : 'bg-white/5 border border-white/10 text-white focus:border-[#24c38b] focus:ring-4 focus:ring-[#24c38b]/10'}
                    `}
                />
                <button 
                  onClick={toggleListening}
                  className={`p-5 rounded-[1.5rem] transition-all duration-300 ${isListening ? 'bg-red-500 text-white shadow-[0_0_20px_#ef4444] animate-pulse' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'}`}
                  title="Voice Mode"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4" />
                  </svg>
                </button>
                <button 
                    onClick={() => sendMessage()}
                    className={`p-5 rounded-[1.5rem] transition-all duration-300 shadow-2xl
                        ${isGodMode ? 'bg-red-600 text-white shadow-red-950/50 hover:scale-110 active:scale-95' : 'bg-gradient-to-r from-[#24c38b] to-[#7a5cff] text-white shadow-purple-950/50 hover:scale-110 active:scale-95'}
                    `}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes neural-wave {
            0%, 100% { transform: scaleY(0.4); opacity: 0.5; }
            50% { transform: scaleY(1.5); opacity: 1; }
        }
        @keyframes animate-fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .animate-spin-slow { animation: spin 10s linear infinite; }
      `}</style>
    </div>
  );
};
