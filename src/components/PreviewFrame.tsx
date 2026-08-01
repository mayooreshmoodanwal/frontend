'use client';

import React, { useState } from 'react';
import {
  Lock,
  CheckCircle2,
  Sparkles,
  CreditCard,
  Copy,
  Check,
  Share2,
  QrCode,
  ShieldCheck,
  Zap,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

import { getApiUrl } from '@/lib/api';

interface PreviewFrameProps {
  previewUrl: string;
  generationId: string;
  generatedHtml?: string;
}

export default function PreviewFrame({
  previewUrl,
  generationId,
  generatedHtml,
}: PreviewFrameProps) {
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const price = "₹29";

  // Check URL params for Cashfree payment return status
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const status = params.get('payment_status');
      const orderId = params.get('order_id');
      const genId = params.get('gen_id');

      if (orderId) {
        setPaymentProcessing(true);
        fetch(getApiUrl('/api/verify-payment'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ generation_id: generationId, order_id: orderId }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.is_paid) {
              setIsPaid(true);
            }
          })
          .catch((err) => console.error('Verification failed:', err))
          .finally(() => setPaymentProcessing(false));
      }
    }
  }, [generationId]);

  // Build watermarked HTML for anti-piracy preview
  const watermarkedHtml = React.useMemo(() => {
    if (!generatedHtml) return null;
    const watermarkStyle = `
      <style>
        .wishelier-watermark {
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) rotate(-25deg) !important;
          font-size: 2.5rem !important;
          font-weight: 900 !important;
          color: rgba(236, 72, 153, 0.25) !important;
          letter-spacing: 0.15em !important;
          text-transform: uppercase !important;
          pointer-events: none !important;
          z-index: 999999 !important;
          user-select: none !important;
          white-space: nowrap !important;
          font-family: sans-serif !important;
          text-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
        }
        body { user-select: none !important; -webkit-user-select: none !important; }
      </style>
      <div class="wishelier-watermark">Protected Preview • Unlock at Wishelier.in</div>
    `;
    return generatedHtml.replace('</body>', `${watermarkStyle}</body>`);
  }, [generatedHtml]);

  const handleOpenPayment = () => {
    setShowPaymentModal(true);
    setPaymentError(null);
  };

  const handleInitiateCashfreePayment = async () => {
    setPaymentProcessing(true);
    setPaymentError(null);

    try {
      const res = await fetch(getApiUrl('/api/create-payment-session'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ generation_id: generationId }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ detail: 'Failed to create payment session' }));
        throw new Error(errData.detail || 'Payment initialization failed');
      }

      const data = await res.json();
      const sessionId = data.payment_session_id;

      // Load Cashfree SDK dynamically if not present
      if (!(window as any).Cashfree) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      const cashfree = (window as any).Cashfree({ mode: 'production' });
      cashfree.checkout({
        paymentSessionId: sessionId,
        redirectTarget: '_self',
      });
    } catch (err: any) {
      console.error('Payment error:', err);
      setPaymentError(err.message || 'Payment initiation failed. Please try again.');
      setPaymentProcessing(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(previewUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`✨ I created a bespoke 3D birthday experience for you! Check it out here: ${previewUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header Info */}
      <div className="text-center mb-8">
        {isPaid ? (
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            <span>Website Live & Payment Confirmed!</span>
          </div>
        ) : (
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Interactive 3D Preview Ready</span>
          </div>
        )}

        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
          {isPaid ? '🎉 Your Bespoke Website is Live!' : 'Interactive 3D Experience Preview'}
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          {isPaid
            ? 'Your website is published globally on Cloudflare Pages. Share the link below with your special person!'
            : `Preview your customized 3D birthday experience below. Complete the ${price} payment to unlock your permanent shareable link.`}
        </p>
      </div>

      {/* Frame Container */}
      <div className="relative glass-panel rounded-3xl border border-white/10 shadow-2xl overflow-hidden mb-8">
        {/* Browser Mock Navigation Bar */}
        <div className="h-11 bg-slate-900 border-b border-white/10 flex items-center px-4 justify-between select-none">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>

          {/* Address Bar - Hidden before payment, Revealed after payment */}
          <div className="flex items-center space-x-2 bg-slate-950/80 border border-white/10 px-4 py-1 rounded-full max-w-md w-full justify-center">
            {isPaid ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-xs font-mono text-emerald-300 truncate">{previewUrl}</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="text-xs font-mono text-slate-400 truncate">
                  wishelier.in/preview/protected-{generationId.slice(0, 8)}
                </span>
              </>
            )}
          </div>

          <div className="w-12 text-right">
            {isPaid && (
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center justify-end space-x-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Iframe View Box */}
        <div className="relative h-[650px] w-full bg-slate-950">
          {isPaid ? (
            <iframe
              src={previewUrl}
              title="Generated Birthday Website"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
            />
          ) : watermarkedHtml ? (
            <iframe
              srcDoc={watermarkedHtml}
              title="Generated Birthday Website Preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
            <iframe
              src={previewUrl}
              title="Generated Birthday Website Preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
            />
          )}

          {/* Watermark Banner Overlay before payment */}
          {!isPaid && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-purple-500/40 px-6 py-2.5 rounded-full shadow-2xl flex items-center space-x-2 text-xs font-semibold text-purple-200 pointer-events-none backdrop-blur-md">
              <Lock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Protected Preview • Pay {price} to unlock live shareable link</span>
            </div>
          )}
        </div>
      </div>

      {/* Payment CTA Card or Unlocked Share Card */}
      {!isPaid ? (
        <div className="glass-panel p-8 rounded-3xl border border-purple-500/30 text-center max-w-xl mx-auto shadow-2xl bg-gradient-to-b from-slate-900/90 to-purple-950/40">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 p-[2px] mx-auto mb-4">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Claim Your Live 3D Website</h3>
          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
            Unlock your high-speed custom website hosted permanently on Cloudflare Pages. Shareable via WhatsApp, Instagram, or QR code.
          </p>

          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="text-3xl font-black text-white">{price}</div>
            <div className="text-xs text-slate-400 line-through">₹299</div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
              90% OFF Special
            </span>
          </div>

          <button
            onClick={handleOpenPayment}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-extrabold text-lg hover:opacity-95 transition-all shadow-xl shadow-purple-600/30 flex items-center justify-center space-x-2"
          >
            <CreditCard className="w-5 h-5" />
            <span>Unlock Live Shareable Link • {price}</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      ) : (
        /* Unlocked Share Card */
        <div className="glass-panel p-8 rounded-3xl border border-emerald-500/40 text-center max-w-xl mx-auto shadow-2xl bg-gradient-to-b from-slate-900/90 to-emerald-950/30">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Share Your Gift Now!</h3>
          <p className="text-slate-300 text-sm mb-6">
            Your live website is published and ready to make their birthday unforgettable.
          </p>

          <div className="flex items-center space-x-2 bg-slate-950 p-2.5 rounded-2xl border border-white/10 mb-6">
            <input
              type="text"
              readOnly
              value={previewUrl}
              className="bg-transparent text-xs font-mono text-emerald-300 px-3 w-full outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center space-x-1.5 shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleShareWhatsApp}
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20"
            >
              <Share2 className="w-4 h-4" />
              <span>Share via WhatsApp</span>
            </button>
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all flex items-center justify-center space-x-2 border border-white/10"
            >
              <ExternalLink className="w-4 h-4 text-purple-400" />
              <span>Open Fullsite</span>
            </a>
          </div>
        </div>
      )}

      {/* Payment Gateway Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel max-w-md w-full p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-3">
                <CreditCard className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-1">Instant Checkout</h4>
              <p className="text-xs text-slate-400">Wishelier 3D Web Studio • Order #{generationId.slice(0, 8)}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 mb-6 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">3D Birthday Website Pass</div>
                <div className="text-[11px] text-slate-400">Includes global Cloudflare hosting</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-purple-300">{price}</div>
                <div className="text-[10px] text-emerald-400 font-bold">One-time payment</div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Payment Method</div>
              <div className="p-3 rounded-xl bg-white/5 border border-purple-500/40 flex items-center justify-between text-xs font-medium text-white cursor-pointer">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>UPI / GPay / PhonePe / Paytm</span>
                </div>
                <span className="w-4 h-4 rounded-full border-2 border-purple-400 bg-purple-400 flex items-center justify-center text-[10px]">✓</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-medium text-slate-400">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-slate-400" />
                  <span>Credit / Debit Card / NetBanking</span>
                </div>
              </div>
            </div>

            {paymentError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                {paymentError}
              </div>
            )}

            <button
              onClick={handleInitiateCashfreePayment}
              disabled={paymentProcessing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm hover:opacity-95 transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center space-x-2"
            >
              {paymentProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Connecting to Cashfree Gateway...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Proceed to Pay {price} via Cashfree PG</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
