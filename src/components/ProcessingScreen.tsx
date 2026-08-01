'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, Sparkles, Code2, Palette, Cpu, Cloud } from 'lucide-react';

export default function ProcessingScreen() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: 'Uploading Photos', desc: 'Resizing and optimizing photos on ImageKit CDN...', icon: Cloud },
    { title: 'Stage 1: AI Interpreter', desc: 'Claude vision analyzing photo moods & color palette...', icon: Palette },
    { title: 'Stage 2: Creative Director', desc: 'Writing personalized poem, jokes & bespoke headlines...', icon: Sparkles },
    { title: 'Stage 3: Code Synthesis', desc: 'Generating 3D React Three Fiber & Tailwind code...', icon: Code2 },
    { title: 'Cloudflare Deployment', desc: 'Publishing live preview to global edge network...', icon: Cpu },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 4500);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="glass-panel p-10 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Animated background glow */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-brand-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />

        <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center mx-auto mb-6">
          <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">Building Your Bespoke 3D Website</h3>
        <p className="text-slate-400 text-sm mb-8">
          Our Claude 3.7 AI agents are actively writing custom code and crafting poetry for your recipient.
        </p>

        {/* Progress steps */}
        <div className="space-y-4 text-left">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isDone = idx < activeStep;
            const isCurrent = idx === activeStep;

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all flex items-center space-x-4 ${
                  isCurrent
                    ? 'border-brand-500/50 bg-brand-500/10 text-white shadow-lg'
                    : isDone
                    ? 'border-slate-800 bg-slate-900/40 text-slate-400 opacity-80'
                    : 'border-slate-800/40 bg-slate-950/20 text-slate-600'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isCurrent
                      ? 'bg-brand-500 text-white'
                      : isDone
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-800 text-slate-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{step.title}</div>
                  <div className="text-xs text-slate-400 truncate">{step.desc}</div>
                </div>
                {isCurrent && <Loader2 className="w-4 h-4 animate-spin text-brand-400" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
