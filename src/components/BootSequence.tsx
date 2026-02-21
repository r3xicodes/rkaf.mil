/**
 * ============================================
 * RKAF SECURE COMMAND NETWORK - BOOT SEQUENCE
 * ============================================
 * Military-style tactical boot animation
 */

import { useState, useEffect } from 'react';
import { Shield, Radio, Lock } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const bootSteps = [
    { text: 'Initializing Secure Command Network...', delay: 0 },
    { text: 'Loading system modules...', delay: 400 },
    { text: 'Authenticating system integrity...', delay: 800 },
    { text: 'Verifying cryptographic signatures...', delay: 1200 },
    { text: 'Accessing Kalmar Central Air Command...', delay: 1600 },
    { text: 'Establishing secure connection...', delay: 2000 },
  ];

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Step animation
    bootSteps.forEach((bootStep, index) => {
      setTimeout(() => {
        setStep(index);
      }, bootStep.delay);
    });

    // Complete boot
    setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0f1a] flex flex-col items-center justify-center">
      {/* Radar sweep background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: `
              radial-gradient(circle, transparent 30%, rgba(191, 161, 90, 0.03) 31%, transparent 32%),
              radial-gradient(circle, transparent 50%, rgba(191, 161, 90, 0.03) 51%, transparent 52%),
              radial-gradient(circle, transparent 70%, rgba(191, 161, 90, 0.03) 71%, transparent 72%)
            `,
          }}
        />
        {/* Rotating sweep line */}
        <div 
          className="absolute top-1/2 left-1/2 w-[400px] h-[2px] origin-left"
          style={{
            background: 'linear-gradient(90deg, rgba(191, 161, 90, 0.5), transparent)',
            animation: 'radar-sweep 2s linear infinite',
            transform: 'translateY(-50%)',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* RKAF Emblem */}
        <div className="relative mb-8">
          <div className="w-32 h-32 border-2 border-[#BFA15A]/50 flex items-center justify-center relative">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#BFA15A]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#BFA15A]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#BFA15A]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#BFA15A]" />
            
            {/* Center shield */}
            <Shield className="w-16 h-16 text-[#BFA15A]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-bold text-[#0a0f1a]">RK</span>
            </div>
          </div>
          
          {/* Status indicators */}
          <div className="absolute -right-4 top-0 flex flex-col gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-[#BFA15A]/50 rounded-full" />
            <div className="w-2 h-2 bg-[#BFA15A]/30 rounded-full" />
          </div>
        </div>

        {/* Title */}
        <h1 className="font-display text-2xl md:text-3xl font-bold text-[#F4F6FA] tracking-wider mb-2">
          SECURE COMMAND NETWORK
        </h1>
        <p className="font-mono text-sm text-[#BFA15A] tracking-[0.3em] mb-8">
          ROYAL KALMAR AIR FORCE
        </p>

        {/* Boot status */}
        <div className="w-80 space-y-3">
          {bootSteps.map((bootStep, index) => (
            <div 
              key={index}
              className={`flex items-center gap-3 transition-all duration-300 ${
                index <= step ? 'opacity-100' : 'opacity-30'
              }`}
            >
              <div className={`w-4 h-4 flex items-center justify-center ${
                index < step ? 'text-green-500' : index === step ? 'text-[#BFA15A]' : 'text-[#4B5563]'
              }`}>
                {index < step ? (
                  <Lock className="w-3 h-3" />
                ) : index === step ? (
                  <Radio className="w-3 h-3 animate-pulse" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-current" />
                )}
              </div>
              <span className={`font-mono text-xs ${
                index <= step ? 'text-[#A9B3C2]' : 'text-[#4B5563]'
              }`}>
                {bootStep.text}
              </span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-80 mt-8">
          <div className="h-1 bg-[#1F2937] overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#BFA15A] to-[#d4b76a] transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-mono text-xs text-[#6B7280]">SYSTEM BOOT</span>
            <span className="font-mono text-xs text-[#BFA15A]">{progress}%</span>
          </div>
        </div>

        {/* Version */}
        <p className="absolute bottom-8 font-mono text-xs text-[#4B5563]">
          RKAF-SCN v3.0.0 • BUILD 2026.02.21
        </p>
      </div>

      <style>{`
        @keyframes radar-sweep {
          from { transform: translateY(-50%) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
