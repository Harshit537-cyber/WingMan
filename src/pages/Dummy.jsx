import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Loader2, 
  ShieldCheck, 
  Film, 
  CheckCircle2, 
  Zap, 
  X,
  AlertCircle
} from 'lucide-react';

const VideoProcessing = ({ onComplete, onCancel }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Analyzing video quality...");

  // Simulate Video Analysis Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    const statusUpdates = [
      { p: 20, s: "Checking video duration..." },
      { p: 50, s: "Optimizing for mobile streaming..." },
      { p: 80, s: "Finalizing metadata..." },
      { p: 100, s: "Verification Successful!" }
    ];

    statusUpdates.forEach(update => {
      if (progress >= update.p) setStatus(update.s);
    });

    if (progress === 100) {
      setTimeout(onComplete, 800); // Move to next screen
    }

    return () => clearInterval(timer);
  }, [progress, onComplete]);

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white font-sans flex flex-col overflow-hidden">
      
      {/* --- HEADER --- */}
      <header className="p-4 flex items-center justify-between">
        <button onClick={onCancel} className="p-2.5 bg-[#1a1a1c] rounded-2xl border border-gray-800 text-gray-400">
          <X size={20} />
        </button>
        <div className="flex items-center gap-2">
           <ShieldCheck size={16} className="text-purple-500" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Security Scan</span>
        </div>
      </header>

      {/* --- MAIN PROCESSING AREA --- */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        
        {/* Animated Visualizer */}
        <div className="relative mb-12">
          {/* Outer Glowing Ring */}
          <div className="absolute inset-0 bg-[#4ade80]/10 rounded-full blur-3xl animate-pulse"></div>
          
          {/* Rotating Progress Ring */}
          <div className="relative w-48 h-48 flex items-center justify-center">
             <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96" cy="96" r="80"
                  stroke="currentColor" strokeWidth="4" fill="transparent"
                  className="text-gray-900"
                />
                <circle
                  cx="96" cy="96" r="80"
                  stroke="currentColor" strokeWidth="6" fill="transparent"
                  strokeDasharray={2 * Math.PI * 80}
                  strokeDashoffset={2 * Math.PI * 80 * (1 - progress / 100)}
                  className="text-[#4ade80] transition-all duration-300 ease-out"
                />
             </svg>
             
             {/* Center Icon */}
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="p-5 bg-[#1a1a1c] rounded-[2rem] border border-gray-800 shadow-2xl">
                   {progress < 100 ? (
                     <Film size={32} className="text-purple-500 animate-pulse" />
                   ) : (
                     <CheckCircle2 size={32} className="text-[#4ade80] animate-in zoom-in" />
                   )}
                </div>
                <p className="mt-3 text-lg font-black font-mono">{progress}%</p>
             </div>
          </div>
        </div>

        {/* Status Text */}
        <div className="space-y-3">
          <h2 className="text-xl font-black tracking-tight">{status}</h2>
          <div className="flex items-center justify-center gap-2 text-gray-600">
             {progress < 100 ? (
               <Loader2 size={14} className="animate-spin" />
             ) : (
               <Zap size={14} className="text-[#4ade80] fill-[#4ade80]" />
             )}
             <p className="text-[10px] font-black uppercase tracking-widest">
               System: v2.4 Optimization
             </p>
          </div>
        </div>

      </div>

      {/* --- FOOTER: LIVE LOGS --- */}
      <div className="p-8 bg-[#1a1a1c]/30 border-t border-gray-800/50">
         <div className="bg-black/40 p-4 rounded-2xl border border-white/5 font-mono text-[9px] space-y-2">
            <p className="text-gray-500 flex justify-between">
               <span>[INFO] RESOLUTION_CHECK:</span>
               <span className="text-[#4ade80]">1080x1920 (OK)</span>
            </p>
            <p className="text-gray-500 flex justify-between">
               <span>[INFO] DURATION_LIMIT:</span>
               <span className="text-[#4ade80]">00:45s (OK)</span>
            </p>
            <p className="text-gray-500 flex justify-between">
               <span>[INFO] AUDIO_FREQ:</span>
               <span className="text-[#4ade80]">44.1kHz (OK)</span>
            </p>
         </div>
         
         <div className="mt-6 flex items-start gap-3 opacity-60">
            <AlertCircle size={14} className="text-purple-400 shrink-0" />
            <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
               Please do not close the app or switch tabs while we optimize your short for the best student viewing experience.
            </p>
         </div>
      </div>

    </div>
  );
};

export default VideoProcessing;