'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Upload,
  AlertCircle,
  Image as ImageIcon,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Music,
  Smile,
  Gift,
  Cake,
  Palette,
  User,
  MessageSquare,
} from 'lucide-react';
import { useTheme, THEMES, ThemeName } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useReveal } from '@/hooks/useReveal';
import { getApiUrl } from '@/lib/api';

interface IntakeFormProps {
  onSubmitStart: () => void;
  onSubmitSuccess: (generationId: string, previewUrl: string, generatedHtml?: string) => void;
  onSubmitError: (error: string) => void;
}

export default function IntakeForm({
  onSubmitStart,
  onSubmitSuccess,
  onSubmitError,
}: IntakeFormProps) {
  const { currentTheme, setTheme } = useTheme();
  const { user, openAuthModal } = useAuth();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const sectionRef = useReveal<HTMLDivElement>();

  // Step 1: Recipient & Milestone Info
  const [targetName, setTargetName] = useState('');
  const [nickname, setNickname] = useState('');
  const [senderName, setSenderName] = useState('');
  const [milestoneAge, setMilestoneAge] = useState('25th Birthday');
  const [relationship, setRelationship] = useState('Best Friend');
  const [birthdayDate, setBirthdayDate] = useState('');

  // Step 2: Theme & Tone
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>(currentTheme);
  const [mood, setMood] = useState('Loving');

  // Step 3: Storytelling & Secret Wish
  const [secretWish, setSecretWish] = useState('');
  const [insideJokes, setInsideJokes] = useState('');
  const [spotifyTrack, setSpotifyTrack] = useState('');
  const [favoriteHobbies, setFavoriteHobbies] = useState('');

  // Step 4: Photos & Captions
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [photoCaptions, setPhotoCaptions] = useState<{ [key: number]: string }>({});

  // Step 5: Interactive Surprises
  const [enableVirtualCake, setEnableVirtualCake] = useState(true);
  const [confettiStyle, setConfettiStyle] = useState('Rainbow Sparkles');
  const [scratchCardSecret, setScratchCardSecret] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const totalSteps = 5;

  const moods = [
    { id: 'Loving', label: 'Loving & Tender ❤️', desc: 'Warm, heartfelt & romantic' },
    { id: 'Teasing', label: 'Playful Banter 😜', desc: 'Hilarious inside jokes & roasts' },
    { id: 'Epic', label: 'Epic Cinematic 🔥', desc: 'Hype energy & bold animations' },
    { id: 'Nostalgic', label: 'Retro Nostalgic 🥹', desc: 'Fond memories & vintage feel' },
    { id: 'Elegant', label: 'Classy & Elegant 🥂', desc: 'Luxury champagne aesthetic' },
  ];

  const confettiOptions = [
    'Rainbow Sparkles',
    'Golden Hearts & Stars',
    'Neon Cyber Pulse',
    'Rose Petal Shower',
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    if (files.length < 2 || files.length > 10) {
      setErrorMsg('Please select between 2 and 10 photos.');
      return;
    }
    setErrorMsg(null);
    setSelectedFiles(files);
  };

  const handleCaptionChange = (index: number, caption: string) => {
    setPhotoCaptions((prev) => ({ ...prev, [index]: caption }));
  };

  const validateStep = (step: number): boolean => {
    setErrorMsg(null);
    if (step === 1) {
      if (!targetName.trim() || !senderName.trim()) {
        setErrorMsg("Please enter both the Birthday Person's Name and Your Name.");
        return false;
      }
    }
    if (step === 4) {
      if (selectedFiles.length < 2 || selectedFiles.length > 10) {
        setErrorMsg('Please upload between 2 and 10 photos to build the memory gallery.');
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevStep = () => {
    setErrorMsg(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(4)) return;

    if (!user) {
      openAuthModal('signin');
      return;
    }

    setErrorMsg(null);
    onSubmitStart();

    // Prepare comprehensive context payload
    const fullContextPayload = JSON.stringify({
      nickname,
      milestone_age: milestoneAge,
      birthday_date: birthdayDate,
      secret_wish: secretWish,
      inside_jokes: insideJokes,
      spotify_track: spotifyTrack,
      favorite_hobbies: favoriteHobbies,
      photo_captions: photoCaptions,
      enable_virtual_cake: enableVirtualCake,
      confetti_style: confettiStyle,
      scratch_card_secret: scratchCardSecret,
      theme_palette: selectedTheme,
    });

    const formData = new FormData();
    formData.append('target_name', targetName);
    formData.append('sender_name', senderName);
    formData.append('relationship', relationship);
    formData.append('mood', mood);
    formData.append('context_text', fullContextPayload);

    selectedFiles.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('wishelier_auth_token') : null;
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(getApiUrl('/api/generate-site'), {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ detail: 'Failed to generate website' }));
        throw new Error(errData.detail || 'Generation failed');
      }

      const data = await response.json();
      onSubmitSuccess(data.generation_id, data.preview_url, data.generated_html);
    } catch (err: any) {
      onSubmitError(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div id="create" ref={sectionRef} className="reveal max-w-4xl mx-auto px-4 py-16">
      
      {/* Wizard Header Card */}
      <div className="text-center mb-10">
        <div className="theme-tag mb-3">
          <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
          <span>Interactive 3D Creator Studio</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-2" style={{ color: 'var(--text-main)' }}>
          Design a Bespoke Birthday Experience
        </h2>
        <p className="text-sm max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
          Complete the 5 guided steps below to craft a tailored interactive website.
        </p>
      </div>

      {/* Progress Bar & Step Indicators */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4 px-2">
          {[
            { num: 1, label: 'Recipient' },
            { num: 2, label: 'Aesthetic' },
            { num: 3, label: 'Story & Wish' },
            { num: 4, label: 'Gallery' },
            { num: 5, label: 'Surprises' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => {
                if (s.num < currentStep || validateStep(currentStep)) {
                  setCurrentStep(s.num);
                }
              }}
              className={`flex flex-col items-center space-y-1 text-xs font-semibold transition-all ${
                currentStep === s.num
                  ? 'scale-105'
                  : currentStep > s.num
                  ? 'text-emerald-500'
                  : 'opacity-60'
              }`}
              style={{
                color: currentStep === s.num ? 'var(--accent)' : 'var(--text-muted)',
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center border font-bold transition-all"
                style={{
                  background: currentStep === s.num ? 'var(--accent)' : currentStep > s.num ? 'var(--step-done)' : 'var(--card-inner)',
                  borderColor: currentStep === s.num ? 'var(--accent)' : currentStep > s.num ? 'var(--step-done-border)' : 'var(--border)',
                  color: currentStep === s.num ? '#ffffff' : currentStep > s.num ? 'var(--step-done-border)' : 'var(--text-muted)',
                }}
              >
                {currentStep > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
              </div>
              <span className="hidden sm:inline-block text-[11px]">{s.label}</span>
            </button>
          ))}
        </div>

        <div className="w-full h-2 rounded-full overflow-hidden p-0.5 border border-theme" style={{ background: 'var(--card-inner)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%`, background: 'var(--accent-gradient)' }}
          />
        </div>
      </div>

      {/* Main Glassmorphic Wizard Form Panel */}
      <div className="glass-panel-luxury p-6 sm:p-10 rounded-3xl shadow-2xl border border-theme">
        
        {/* Error Alert Box */}
        {errorMsg && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center space-x-3 text-xs sm:text-sm font-medium">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          {/* STEP 1: Recipient & Milestone Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b border-theme pb-4 mb-6">
                <h3 className="text-xl font-bold flex items-center space-x-2" style={{ color: 'var(--text-main)' }}>
                  <User className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                  <span>Step 1: Recipient & Milestone Details</span>
                </h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Tell us who this special website is being crafted for.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-main)' }}>
                    Birthday Person's Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Lin"
                    value={targetName}
                    onChange={(e) => setTargetName(e.target.value)}
                    className="input-field-hc"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-main)' }}>
                    Nickname / Pet Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Momo / Chief"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="input-field-hc"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-main)' }}>
                    Your Name (Sender) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="input-field-hc"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-main)' }}>
                    Milestone / Celebration Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 25th Birthday / Golden Year"
                    value={milestoneAge}
                    onChange={(e) => setMilestoneAge(e.target.value)}
                    className="input-field-hc"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-main)' }}>
                    Relationship
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="input-field-hc"
                  >
                    <option value="Best Friend">Best Friend 🤝</option>
                    <option value="Partner">Partner / Spouse ❤️</option>
                    <option value="Sibling">Sibling 👯</option>
                    <option value="Parent">Parent 👨‍👩‍👧</option>
                    <option value="Colleague">Colleague / Boss 💼</option>
                    <option value="Soulmate">Soulmate 💫</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-main)' }}>
                    Birthday Date (For Countdown Timer)
                  </label>
                  <input
                    type="date"
                    value={birthdayDate}
                    onChange={(e) => setBirthdayDate(e.target.value)}
                    className="input-field-hc"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Aesthetic Theme & Tone Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b border-theme pb-4 mb-6">
                <h3 className="text-xl font-bold flex items-center space-x-2" style={{ color: 'var(--text-main)' }}>
                  <Palette className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                  <span>Step 2: Handcrafted Theme & Emotional Vibe</span>
                </h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Select the visual aesthetic palette and mood tone for the birthday website.
                </p>
              </div>

              {/* Theme Palette Selection Grid */}
              <div>
                <label className="block text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--text-main)' }}>
                  Choose Aesthetic Theme Palette:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {THEMES.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => {
                        setSelectedTheme(t.id as ThemeName);
                        setTheme(t.id as ThemeName);
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedTheme === t.id
                          ? 'shadow-lg'
                          : 'hover:border-theme'
                      }`}
                      style={{
                        background: selectedTheme === t.id ? 'var(--tag-bg)' : 'var(--card-inner)',
                        borderColor: selectedTheme === t.id ? 'var(--accent)' : 'var(--border)',
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/30"
                            style={{ backgroundColor: t.accentColor }}
                          />
                          <span className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>{t.name}</span>
                        </div>
                        <span className="theme-tag">
                          {t.category}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.tagline}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mood Selection */}
              <div>
                <label className="block text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--text-main)' }}>
                  Emotional Tone / Mood:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {moods.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMood(m.id)}
                      className="p-3 rounded-xl border text-left transition-all"
                      style={{
                        background: mood === m.id ? 'var(--tag-bg)' : 'var(--card-inner)',
                        borderColor: mood === m.id ? 'var(--accent)' : 'var(--border)',
                      }}
                    >
                      <div className="font-bold text-xs mb-0.5" style={{ color: mood === m.id ? 'var(--accent)' : 'var(--text-main)' }}>{m.label}</div>
                      <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{m.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Storytelling & Secret Wish */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-theme pb-4 mb-6">
                <h3 className="text-xl font-bold flex items-center space-x-2" style={{ color: 'var(--text-main)' }}>
                  <MessageSquare className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                  <span>Step 3: Personal Storytelling & Secret Wish</span>
                </h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Add heart and humor with personalized notes and music tracks.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-main)' }}>
                  Secret Birthday Wish / Main Letter *
                </label>
                <textarea
                  rows={4}
                  placeholder="Write a heartfelt or hilarious birthday message that will be featured center stage on their 3D site..."
                  value={secretWish}
                  onChange={(e) => setSecretWish(e.target.value)}
                  className="input-field-hc"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-main)' }}>
                  Key Memories & Inside Jokes
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Loved our 2024 trip to Tokyo, always steals my fries, that legendary concert incident..."
                  value={insideJokes}
                  onChange={(e) => setInsideJokes(e.target.value)}
                  className="input-field-hc"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold mb-2 flex items-center space-x-1.5" style={{ color: 'var(--text-main)' }}>
                    <Music className="w-4 h-4 text-emerald-500" />
                    <span>Favorite Song / Spotify Track</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Coldplay - Yellow or Spotify URL"
                    value={spotifyTrack}
                    onChange={(e) => setSpotifyTrack(e.target.value)}
                    className="input-field-hc"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2 flex items-center space-x-1.5" style={{ color: 'var(--text-main)' }}>
                    <Smile className="w-4 h-4 text-amber-500" />
                    <span>Favorite Hobbies / Passions</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Coffee, Matcha, Photography, Travel"
                    value={favoriteHobbies}
                    onChange={(e) => setFavoriteHobbies(e.target.value)}
                    className="input-field-hc"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Photos & Captions */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b border-theme pb-4 mb-6">
                <h3 className="text-xl font-bold flex items-center space-x-2" style={{ color: 'var(--text-main)' }}>
                  <ImageIcon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                  <span>Step 4: Memory Gallery & Captions</span>
                </h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Upload 2 to 10 photos and add optional captions for each photo.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-main)' }}>
                  Upload Photos (2 to 10 photos) *
                </label>
                <div className="relative border-2 border-dashed rounded-2xl p-6 text-center transition-all" style={{ background: 'var(--card-inner)', borderColor: 'var(--border)' }}>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="w-8 h-8" style={{ color: 'var(--accent)' }} />
                    <div className="text-xs font-bold" style={{ color: 'var(--text-main)' }}>
                      {selectedFiles.length > 0
                        ? `${selectedFiles.length} photos selected`
                        : 'Click or drag photos here to upload'}
                    </div>
                    <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>JPG, PNG, WebP up to 10MB each</div>
                  </div>
                </div>
              </div>

              {/* Photo list with individual caption inputs */}
              {selectedFiles.length > 0 && (
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-main)' }}>
                    Add Photo Captions (Optional):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                    {selectedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl border flex flex-col space-y-2"
                        style={{ background: 'var(--card-inner)', borderColor: 'var(--border)' }}
                      >
                        <div className="flex items-center space-x-2">
                          <ImageIcon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                          <span className="text-xs font-semibold truncate max-w-[180px]" style={{ color: 'var(--text-main)' }}>
                            {file.name}
                          </span>
                        </div>
                        <input
                          type="text"
                          placeholder={`Caption for photo #${idx + 1}...`}
                          value={photoCaptions[idx] || ''}
                          onChange={(e) => handleCaptionChange(idx, e.target.value)}
                          className="input-field-hc text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Interactive Surprises & Submission */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="border-b border-theme pb-4 mb-6">
                <h3 className="text-xl font-bold flex items-center space-x-2" style={{ color: 'var(--text-main)' }}>
                  <Gift className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                  <span>Step 5: Interactive Surprises & Generation</span>
                </h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Toggle special 3D interactive widgets before generating your site.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* 3D Cake Toggle */}
                <div className="p-4 rounded-2xl border flex items-center justify-between" style={{ background: 'var(--card-inner)', borderColor: 'var(--border)' }}>
                  <div className="flex items-center space-x-3">
                    <Cake className="w-6 h-6 text-amber-500" />
                    <div>
                      <div className="text-xs font-bold" style={{ color: 'var(--text-main)' }}>Virtual 3D Cake</div>
                      <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Interactive candle blowing feature</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableVirtualCake}
                    onChange={(e) => setEnableVirtualCake(e.target.checked)}
                    className="w-5 h-5 accent-purple-500 rounded cursor-pointer"
                  />
                </div>

                {/* Confetti Selector */}
                <div className="p-4 rounded-2xl border" style={{ background: 'var(--card-inner)', borderColor: 'var(--border)' }}>
                  <label className="block text-xs font-bold mb-2" style={{ color: 'var(--text-main)' }}>
                    Confetti Burst Style
                  </label>
                  <select
                    value={confettiStyle}
                    onChange={(e) => setConfettiStyle(e.target.value)}
                    className="input-field-hc text-xs"
                  >
                    {confettiOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Secret Scratch Card Message */}
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-main)' }}>
                  Secret Scratch Card Message (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Look under your bed for your actual gift! 🎁"
                  value={scratchCardSecret}
                  onChange={(e) => setScratchCardSecret(e.target.value)}
                  className="input-field-hc"
                />
              </div>

              {/* Final Summary Card */}
              <div className="p-4 rounded-2xl border text-xs space-y-1" style={{ background: 'var(--tag-bg)', borderColor: 'var(--border)' }}>
                <div className="font-bold" style={{ color: 'var(--text-main)' }}>Ready to Build:</div>
                <div style={{ color: 'var(--text-muted)' }}>Recipient: <span className="font-semibold" style={{ color: 'var(--accent)' }}>{targetName || 'Maya'}</span> from <span className="font-semibold" style={{ color: 'var(--accent)' }}>{senderName || 'Alex'}</span></div>
                <div style={{ color: 'var(--text-muted)' }}>Theme: <span className="font-semibold" style={{ color: 'var(--accent)' }}>{THEMES.find(t=>t.id===selectedTheme)?.name}</span> • Photos: <span className="font-semibold" style={{ color: 'var(--accent)' }}>{selectedFiles.length} uploaded</span></div>
              </div>

            </div>
          )}

          {/* Navigation Controls Row */}
          <div className="mt-8 pt-6 border-t border-theme flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-5 py-3 rounded-xl glass-panel-luxury font-semibold text-xs flex items-center space-x-1.5"
                style={{ color: 'var(--text-main)' }}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : <div />}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-3 rounded-xl text-white font-bold text-xs hover:opacity-90 transition-all flex items-center space-x-1.5 shadow-lg"
                style={{ background: 'var(--accent-gradient)' }}
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-4 rounded-2xl text-white font-bold text-sm hover:opacity-95 transition-all shadow-xl flex items-center space-x-2"
                style={{ background: 'var(--accent-gradient)' }}
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Generate Bespoke 3D Website</span>
              </button>
            )}
          </div>

        </form>
      </div>

    </div>
  );
}
