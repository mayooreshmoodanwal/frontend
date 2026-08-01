'use client';

import React, { useState } from 'react';
import IntakeForm from '@/components/IntakeForm';
import ProcessingScreen from '@/components/ProcessingScreen';
import PreviewFrame from '@/components/PreviewFrame';

import { useAuth } from '@/context/AuthContext';

export default function HomeClientWrapper() {
  const { user, openAuthModal } = useAuth();
  const [viewState, setViewState] = useState<'form' | 'processing' | 'preview'>('form');
  const [generationData, setGenerationData] = useState<{ id: string; previewUrl: string; generatedHtml?: string } | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Restore PreviewFrame on payment redirect return
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const orderId = params.get('order_id');
      const genId = params.get('gen_id');

      if (genId || orderId) {
        const targetGenId = genId || (orderId ? orderId.replace('order_wish_', '') : '');
        if (targetGenId) {
          const liveUrl = `https://wishelier-backend.onrender.com/v/${targetGenId}`;
          setGenerationData({ id: targetGenId, previewUrl: liveUrl });
          setViewState('preview');
        }
      }
    }
  }, []);

  const handleStart = () => {
    if (!user) {
      openAuthModal('signin');
      return;
    }
    setViewState('processing');
    setFormError(null);
  };

  const handleSuccess = (id: string, previewUrl: string, generatedHtml?: string) => {
    setGenerationData({ id, previewUrl, generatedHtml });
    setViewState('preview');
  };

  const handleError = (error: string) => {
    setFormError(error);
    setViewState('form');
  };

  return (
    <>
      {viewState === 'form' && (
        <>
          {formError && (
            <div className="max-w-3xl mx-auto px-4 mt-8">
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm font-medium">
                {formError}
              </div>
            </div>
          )}
          <IntakeForm
            onSubmitStart={handleStart}
            onSubmitSuccess={handleSuccess}
            onSubmitError={handleError}
          />
        </>
      )}

      {viewState === 'processing' && <ProcessingScreen />}

      {viewState === 'preview' && generationData && (
        <PreviewFrame
          previewUrl={generationData.previewUrl}
          generationId={generationData.id}
          generatedHtml={generationData.generatedHtml}
        />
      )}
    </>
  );
}
