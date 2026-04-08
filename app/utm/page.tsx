"use client";

import React, { useState } from "react";

const EXAMPLES = [
  { source: "reddit", medium: "community", campaign: "r_youtubers" },
  { source: "reddit", medium: "community", campaign: "r_passive_income" },
  { source: "twitter", medium: "social", campaign: "launch_post" },
  { source: "youtube", medium: "video", campaign: "channel_tutorial" },
  { source: "producthunt", medium: "launch", campaign: "ph_day1" },
  { source: "indiehackers", medium: "community", campaign: "show_ih" },
];

/**
 * Technical internal tool for generating UTM-tagged URLs.
 */
export default function UTMBuilder() {
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [copied, setCopied] = useState(false);

  const domain = "https://yourdomain.com";
  const params = new URLSearchParams();
  if (source) params.set("utm_source", source);
  if (medium) params.set("utm_medium", medium);
  if (campaign) params.set("utm_campaign", campaign);

  const finalUrl = `${domain}${params.toString() ? "?" + params.toString() : ""}`;

  const handleCopy = () => {
    if (!finalUrl) return;
    navigator.clipboard.writeText(finalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const setExample = (ex: typeof EXAMPLES[0]) => {
    setSource(ex.source);
    setMedium(ex.medium);
    setCampaign(ex.campaign);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans selection:bg-blue-500/30">
      <div className="max-w-2xl mx-auto glass rounded-3xl border-white/5 p-10 shadow-2xl animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase italic">UTM Builder</h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em]">ChannelOS Internal Utility</p>
        </div>
        
        <div className="space-y-6 mb-10">
          {[
            { label: "Source", value: source, setter: setSource, placeholder: "e.g. twitter, reddit" },
            { label: "Medium", value: medium, setter: setMedium, placeholder: "e.g. social, community" },
            { label: "Campaign", value: campaign, setter: setCampaign, placeholder: "e.g. launch_post" }
          ].map((field, i) => (
            <div key={i}>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 pl-1 italic">
                {field.label}
              </label>
              <input
                type="text"
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-5 py-3 rounded-xl bg-slate-900/50 border border-white/5 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all font-medium"
              />
            </div>
          ))}
        </div>

        <div className="mb-10">
          <label className="block text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 pl-1">Quick Presets</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EXAMPLES.map((ex, i) => (
              <button
                key={i}
                onClick={() => setExample(ex)}
                className="text-left text-[11px] p-4 bg-slate-900/40 border border-white/5 rounded-xl hover:bg-slate-800/60 hover:border-white/10 transition-all group overflow-hidden relative"
              >
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-bold text-slate-400 group-hover:text-blue-400 transition-colors">{ex.source}</span>
                  <span className="text-[9px] font-black text-slate-600 group-hover:text-slate-500 transition-colors uppercase tracking-widest">{ex.campaign}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2rem] p-8 shadow-inner border border-white/5">
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 text-center">Generated Campaign URL</label>
          <div className="bg-black/40 p-5 rounded-2xl mb-6 border border-white/5 backdrop-blur-3xl shadow-inner min-h-[80px] flex items-center justify-center text-center">
            <p className="text-blue-400 font-mono text-xs break-all leading-relaxed tracking-tight">
              {finalUrl}
            </p>
          </div>
          <button
            onClick={handleCopy}
            className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.1em] text-sm transition-all transform active:scale-[0.98] shadow-2xl ${
              copied 
                ? 'bg-green-600 text-white shadow-green-900/20' 
                : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-900/20'
            }`}
          >
            {copied ? "✓ Copied!" : "Copy URL"}
          </button>
        </div>
      </div>
      
      <p className="max-w-2xl mx-auto mt-10 text-center text-[10px] font-bold text-slate-600 uppercase tracking-[0.5em]">
        Internal Tool · Unauthorized access is prohibited
      </p>
    </div>
  );
}
