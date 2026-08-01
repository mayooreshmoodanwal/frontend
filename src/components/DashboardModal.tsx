'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getApiUrl } from '@/lib/api';
import {
  Globe,
  CreditCard,
  User,
  LogOut,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  RefreshCw,
  Plus
} from 'lucide-react';

interface WebsiteItem {
  generation_id: string;
  target_name: string;
  sender_name: string;
  relationship: string;
  mood: string;
  status: string;
  is_paid: boolean;
  live_url: string;
  created_at: string;
}

interface TransactionItem {
  generation_id: string;
  target_name: string;
  order_id: string;
  amount: string;
  status: string;
  paid_at: string;
}

interface DashboardData {
  user: {
    full_name: string;
    email: string;
    member_since: string;
  };
  websites: WebsiteItem[];
  transactions: TransactionItem[];
}

export default function DashboardModal() {
  const { isDashboardOpen, closeDashboard, token, logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState<'websites' | 'transactions' | 'profile'>('websites');
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isDashboardOpen && token) {
      setLoading(true);
      setError(null);
      fetch(getApiUrl('/api/user/dashboard'), {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to load dashboard data');
          return res.json();
        })
        .then((d) => setData(d))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [isDashboardOpen, token]);

  if (!isDashboardOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel max-w-4xl w-full h-[650px] rounded-3xl border border-white/10 shadow-2xl relative flex flex-col overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center font-bold text-purple-300">
              {user?.full_name?.charAt(0) || 'U'}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">{user?.full_name}'s Studio</h3>
              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={closeDashboard}
              className="text-slate-400 hover:text-white text-sm"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-4 border-b border-white/10 bg-slate-950/40 flex items-center space-x-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('websites')}
            className={`pb-3 flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === 'websites'
                ? 'border-purple-400 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>My Websites ({data?.websites.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('transactions')}
            className={`pb-3 flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === 'transactions'
                ? 'border-purple-400 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Order History ({data?.transactions.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === 'profile'
                ? 'border-purple-400 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Account Profile</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-2">
              <RefreshCw className="w-6 h-6 animate-spin text-purple-400" />
              <p className="text-xs">Loading studio dashboard...</p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs text-center">
              {error}
            </div>
          ) : (
            <>
              {/* TAB 1: MY WEBSITES */}
              {activeTab === 'websites' && (
                <div>
                  {data?.websites.length === 0 ? (
                    <div className="text-center py-16">
                      <Sparkles className="w-12 h-12 text-purple-400/50 mx-auto mb-3" />
                      <h4 className="text-base font-bold text-white mb-1">No Websites Crafted Yet</h4>
                      <p className="text-xs text-slate-400 mb-6 max-w-sm mx-auto">
                        Fill out our 5-step wizard to design a bespoke birthday experience!
                      </p>
                      <button
                        onClick={() => {
                          closeDashboard();
                          if (typeof window !== 'undefined') {
                            window.dispatchEvent(new CustomEvent('reset-crafting-form'));
                          }
                        }}
                        className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg inline-flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Craft New Website</span>
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {data?.websites.map((site) => (
                        <div
                          key={site.generation_id}
                          className="glass-panel p-5 rounded-2xl border border-white/10 relative hover:border-purple-500/40 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400">
                                {site.relationship}
                              </span>
                              {site.is_paid ? (
                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold flex items-center space-x-1">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>UNLOCKED</span>
                                </span>
                              ) : (
                                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>PREVIEW</span>
                                </span>
                              )}
                            </div>

                            <h4 className="text-xl font-bold text-white mb-1">For {site.target_name}</h4>
                            <p className="text-xs text-slate-400 mb-4">
                              Crafted by {site.sender_name} • {new Date(site.created_at).toLocaleDateString()}
                            </p>
                          </div>

                          <a
                            href={site.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all flex items-center justify-center space-x-2 border border-white/10"
                          >
                            <span>Open Website</span>
                            <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: TRANSACTIONS */}
              {activeTab === 'transactions' && (
                <div>
                  {data?.transactions.length === 0 ? (
                    <div className="text-center py-16 text-slate-400 text-xs">
                      No payment transaction history recorded.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {data?.transactions.map((tx) => (
                        <div
                          key={tx.order_id}
                          className="glass-panel p-4 rounded-xl border border-white/10 flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-bold text-white mb-0.5">Website for {tx.target_name}</div>
                            <div className="text-[11px] font-mono text-slate-400">Order ID: {tx.order_id}</div>
                            <div className="text-[10px] text-slate-500">{new Date(tx.paid_at).toLocaleString()}</div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm font-black text-emerald-400">{tx.amount}</div>
                            <div className="text-[10px] uppercase font-bold text-emerald-300">{tx.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: PROFILE */}
              {activeTab === 'profile' && (
                <div className="max-w-md mx-auto py-6 text-center space-y-6">
                  <div className="w-20 h-20 rounded-3xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center font-black text-2xl text-purple-300 mx-auto">
                    {user?.full_name?.charAt(0) || 'U'}
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-white">{user?.full_name}</h4>
                    <p className="text-xs text-slate-400">{user?.email}</p>
                    <p className="text-[11px] text-purple-400 mt-1">Member since {data?.user.member_since}</p>
                  </div>

                  <button
                    onClick={logout}
                    className="px-6 py-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs border border-rose-500/30 flex items-center justify-center space-x-2 mx-auto"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out of Account</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
