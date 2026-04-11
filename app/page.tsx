"use client";

import { Suspense, useRef, useState } from "react";
import WaitlistForm from "@/app/components/WaitlistForm";

function FAQItem({ q, a, isOpen, onClick }: { q: string, a: string, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-white/[0.05] last:border-0 overflow-hidden">
      <button 
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group transition-all"
      >
        <h4 className={`text-sm font-bold tracking-tight transition-colors ${isOpen ? 'text-red-500' : 'text-white'}`}>
          {q}
        </h4>
        <div className={`w-5 h-5 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-45 border-red-500/30 bg-red-500/10' : ''}`}>
          <span className={`text-xs ${isOpen ? 'text-red-500' : 'text-slate-600'}`}>+</span>
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-slate-500 text-sm leading-relaxed font-medium">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const finalCtaRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const scrollToCTA = () => {
    finalCtaRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#AAAAAA] selection:bg-red-500/30 antialiased font-inter overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 h-[56px] bg-[#0F0F0F]/85 backdrop-blur-md border-b border-white/5 z-50">
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF0000] to-[#CC0000] flex items-center justify-center shadow-lg shadow-red-500/20">
              <span className="text-white font-bold text-sm tracking-tighter">C</span>
            </div>
            <span className="text-white font-semibold text-sm ml-2.5 tracking-tight">ChannelOS</span>
          </div>
          <button 
            onClick={scrollToCTA}
            className="bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors active:scale-95"
          >
            Manage My Channels →
          </button>
        </div>
      </nav>

      <main>
        {/* SECTION A — HERO */}
        <section className="relative min-h-[calc(100vh-56px)] mt-[56px] flex flex-col items-center justify-center px-6 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-radial-gradient from-red-600/10 to-transparent opacity-100 filter blur-[80px] pointer-events-none z-0" 
               style={{ background: 'radial-gradient(circle, rgba(255,0,0,0.08) 0%, transparent 70%)' }} />
          
          <div className="max-w-4xl mx-auto text-center relative z-10 py-20">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 border border-red-600/25 bg-red-600/8 rounded-full px-4 py-1.5 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="text-red-500 text-xs font-medium tracking-tight">
                Built for operators running 3+ YouTube channels
              </span>
            </div>
            
            <h1 className="text-[clamp(40px,6vw,72px)] font-extrabold text-[#FFFFFF] tracking-[-0.03em] leading-[1.05] mb-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              One dashboard for all <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF0000] to-[#FF4D4D]">
                your YouTube channels.
              </span>
            </h1>
            
            <p className="max-w-xl mx-auto text-base md:text-lg text-slate-400 leading-relaxed mt-6 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Stop opening six YouTube Studio tabs to figure out which channel needs you today. 
              ChannelOS shows every channel&apos;s views, subs, revenue, and watch time in one place — then 
              tells you exactly which video to make next.
            </p>
            
            <div className="max-w-sm mx-auto mb-14 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              <Suspense fallback={<div className="h-[120px] w-full bg-white/[0.04] border border-white/[0.08] rounded-[10px] animate-pulse" />}>
                <WaitlistForm customButtonText="Get Early Access to ChannelOS →" />
              </Suspense>
            </div>
            
            {/* Social Numbers Row */}
            <div className="flex items-center justify-center gap-8 flex-wrap mt-14 pt-8 border-t border-white/5 animate-in fade-in duration-1000 delay-500">
              {[
                { val: "3+", label: "channels connected per operator" },
                { val: "$0", label: "to join the waitlist" },
                { val: "5 min", label: "to see your full portfolio" }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-8 group">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-white tabular-nums tracking-tight">{stat.val}</span>
                    <span className="text-[10px] text-slate-600 mt-1 uppercase tracking-wider font-bold max-w-[140px] leading-tight">{stat.label}</span>
                  </div>
                  {i < 2 && <div className="hidden md:block w-[1px] h-8 bg-white/5" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* METRICS BAR */}
        <div className="border-y border-white/[0.06] bg-white/[0.02] py-5">
          <div className="max-w-5xl mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
            <div className="text-slate-600 text-xs font-medium uppercase tracking-widest text-center md:text-left">
              What ChannelOS tracks across all your channels
            </div>
            <div className="flex items-center justify-center md:justify-end gap-6 flex-wrap">
              {["Views", "Subscribers", "Watch Time", "Revenue / RPM", "CTR", "Top Videos"].map((metric, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                  <div className="w-1.5 h-1.5 rounded-sm bg-red-600" />
                  {metric}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION B — THE BEFORE STATE */}
        <section className="bg-[#1E1E1E] border-b border-white/5 px-6 py-[100px]">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="text-xs font-semibold tracking-widest uppercase text-red-500 mb-4">
                The reality of running multiple YouTube channels
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                YouTube Studio was built for one channel. <br className="hidden md:block" />
                You&apos;re running a portfolio.
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { e: "🗂️", t: "Your tracking spreadsheet made sense when you had two channels. Now you have five niches, seventeen tabs, three broken formulas, and you stopped updating it six weeks ago." },
                { e: "📊", t: "You open YouTube Studio for Channel 1, check the views, open a new tab for Channel 2, check those views, open another tab for Channel 3 — and by the time you've gone through all of them you've forgotten what you saw in the first one." },
                { e: "🎯", t: "One of your channels is bleeding subscribers this month. You just don't know which one — or whether it's the thumbnails, the niche, the upload frequency, or the algorithm — without spending forty minutes pulling numbers manually." },
                { e: "💸", t: "Someone asks what your channels made last month. You have to open YouTube Studio, switch accounts four times, find the revenue tab on each one, and do math in your head. There is no combined number anywhere." }
              ].map((card, i) => (
                <div key={i} className="bg-[#0F0F0F] border border-white/[0.06] rounded-2xl p-7 text-left hover:border-white/[0.12] transition-all duration-300 group">
                  <div className="w-[38px] h-[38px] rounded-xl bg-white/[0.04] flex items-center justify-center text-xl mb-5 group-hover:bg-red-500/10 transition-colors">
                    {card.e}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed font-medium">
                    {card.t}
                  </p>
                </div>
              ))}
              <div className="md:col-span-2 bg-[#0F0F0F] border border-white/[0.06] rounded-2xl p-7 text-left hover:border-white/[0.12] transition-all duration-300 group">
                <div className="w-[38px] h-[38px] rounded-xl bg-white/[0.04] flex items-center justify-center text-xl mb-5 group-hover:bg-red-500/10 transition-colors">
                  🔁
                </div>
                <p className="text-slate-300 text-sm leading-relaxed font-medium">
                  Every Monday you open six YouTube Studio tabs, stare at six different graphs, try to remember which channel was up last week, give up, and just make a video for whichever channel feels right. That is not a strategy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION C — PRODUCT EXPLANATION */}
        <section className="bg-[#0F0F0F] px-6 py-[100px]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-xs font-semibold tracking-widest uppercase text-red-500 mb-4">How it works</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Three things. That&apos;s it.</h2>
              <p className="text-slate-400 text-base max-w-xl mx-auto">
                No 47-feature onboarding. No week-long setup. Connect your channels, see your portfolio, act on what matters.
              </p>
            </div>
          
            <div className="space-y-[120px]">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <div className="text-xs font-mono text-red-500/60 font-medium mb-3">01</div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Connect every channel in 60 seconds.</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Connect every YouTube channel you run through one Google OAuth login. No passwords stored. ChannelOS pulls views, subscribers, watch time, revenue, and CTR from YouTube&apos;s official API — for every channel, all at once.
                  </p>
                </div>
                <div className="flex-1 w-full bg-[#1E1E1E] border border-white/[0.06] rounded-2xl p-5 aspect-[4/3] flex flex-col justify-center overflow-hidden shadow-2xl">
                  <div className="space-y-1">
                    {[
                      { n: "Finance Decoded", s: "247K subscribers", c: "bg-red-500" },
                      { n: "Stoic Daily", s: "182K subscribers", c: "bg-red-500" },
                      { n: "History Vault", s: "94K subscribers", c: "bg-emerald-500" },
                      { n: "Tech Simplified", s: "410K subscribers", c: "bg-orange-500" }
                    ].map((ch, i) => (
                      <div key={i} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-5 h-5 rounded-full ${ch.c}`} />
                          <div>
                            <div className="text-white text-xs font-semibold tracking-tight">{ch.n}</div>
                            <div className="text-slate-600 text-[10px] mt-0.5">{ch.s}</div>
                          </div>
                        </div>
                        <div className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">Connected</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                <div className="flex-1 text-right md:text-left">
                  <div className="text-xs font-mono text-red-500/60 font-medium mb-3">02</div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Every channel&apos;s numbers. One screen.</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    See subscribers, views, RPM, and revenue for all your channels side by side. Know your combined monthly revenue without opening a single YouTube Studio tab. Spot which niche is growing and which is stalling — in seconds.
                  </p>
                </div>
                <div className="flex-1 w-full bg-[#1E1E1E] border border-white/[0.06] rounded-2xl p-6 aspect-[4/3] flex flex-col justify-center overflow-hidden shadow-2xl">
                  {/* Mini YouTube Table */}
                  <div className="flex justify-between text-slate-600 text-[10px] uppercase tracking-wide pb-2 border-b border-white/[0.05] mb-2 font-bold">
                    <span>Channel</span>
                    <div className="flex gap-6">
                      <span className="w-10 text-right">Subs</span>
                      <span className="w-10 text-right">Views</span>
                      <span className="w-12 text-right">Revenue</span>
                    </div>
                  </div>
                  
                  <div className="space-y-0 text-white">
                    {[
                      { n: "Finance Decoded", s: "247K", v: "1.2M", r: "$1,840", c: "bg-red-600" },
                      { n: "Stoic Daily", s: "89K", v: "430K", r: "$620", c: "bg-slate-500" },
                      { n: "History Vault", s: "412K", v: "2.1M", r: "$2,190", c: "bg-amber-500" },
                      { n: "Tech Simplified", s: "34K", v: "98K", r: "$210", c: "bg-red-500/50" }
                    ].map((row, i) => (row.v !== "" && (
                      <div key={i} className="flex justify-between items-center py-2.5 border-b border-white/[0.04]">
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-md ${row.c}`} />
                          <span className="text-white text-xs font-medium truncate w-[80px] md:w-auto">{row.n}</span>
                        </div>
                        <div className="flex gap-6">
                          <span className="w-10 text-right text-slate-300 text-xs font-mono tabular-nums">{row.s}</span>
                          <span className="w-10 text-right text-slate-300 text-xs font-mono tabular-nums">{row.v}</span>
                          <span className="w-12 text-right text-emerald-400 text-xs font-mono tabular-nums font-medium">{row.r}</span>
                        </div>
                      </div>
                    )))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 mt-1">
                    <span className="text-slate-500 text-[10px] uppercase tracking-wide font-bold">Combined</span>
                    <div className="flex gap-6">
                      <span className="w-10 text-right text-white text-xs font-bold font-mono">782K</span>
                      <span className="w-10 text-right text-white text-xs font-bold font-mono">3.8M</span>
                      <span className="w-12 text-right text-emerald-400 text-xs font-bold font-mono">$4,860</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <div className="text-xs font-mono text-red-500/60 font-medium mb-3">03</div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Find out which channel to work on — and what video to make.</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    ChannelOS reads your channel data and produces one clear action: which channel needs your attention this week, what is actually causing a drop in views or subs, and what video format has historically performed best on that channel. Data tells you. You execute.
                  </p>
                </div>
                <div className="flex-1 w-full bg-[#1E1E1E] border border-white/[0.06] rounded-2xl p-6 aspect-[4/3] flex items-center justify-center overflow-hidden shadow-2xl">
                  <div className="bg-red-600/10 border border-red-500/20 rounded-xl p-5 w-full max-w-[320px] shadow-2xl">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-[10px]">⚡</div>
                      <span className="text-red-400 text-[10px] font-bold uppercase tracking-widest">Priority Insight</span>
                    </div>
                    <div className="text-white font-bold text-sm mb-4 leading-tight">Finance Decoded needs attention.</div>
                    <div className="space-y-4">
                      {[
                        "CTR dropped 24% over the last 3 uploads.",
                        "Thumbnail style shift detected.",
                        "Revert to 'High-Contrast' thumbnail layout."
                      ].map((f, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <span className="text-red-400 text-xs">→</span>
                          <p className="text-slate-300 text-[11px] leading-snug">{f}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION D — SOCIAL PROOF */}
        <section className="bg-[#1E1E1E] border-y border-white/5 px-6 py-[100px]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-xs font-semibold tracking-widest uppercase text-red-500 mb-4">Operator research</div>
              <h2 className="text-3xl font-bold text-white mb-4">Real words from real YouTube channel operators.</h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                We read 166 threads from multi-channel YouTube operators across Reddit before writing one line of code. This is the problem they described.
              </p>
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
              {[
                { q: "I bounced between TubeBuddy, Notion, and Stripe reports and nothing connected. I just needed one number.", a: "Multi-channel operator · r/SaaS" },
                { q: "I built a whole Airtable system to track 4 channels. I haven't updated it in a month. It's completely useless now.", a: "YouTube portfolio operator · r/Notion" },
                { q: "YouTube Studio tells me what happened. It never tells me what to do next.", a: "Creator · r/indiehackers" }
              ].map((quote, i) => (
                <div key={i} className="bg-[#0F0F0F] border border-white/[0.06] rounded-2xl p-7 flex flex-col hover:border-white/[0.12] transition-all">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed italic flex-1 mb-6">
                    &ldquo;{quote.q}&rdquo;
                  </p>
                  <div className="border-t border-white/[0.06] pt-4">
                    <div className="text-slate-600 text-[10px] font-bold uppercase tracking-wider">— {quote.a}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-10 max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                <div>
                  <span className="text-4xl font-bold text-white tabular-nums tracking-tighter">166</span>
                  <span className="block text-slate-600 text-[10px] font-bold uppercase tracking-widest mt-2 px-2">Reddit threads analyzed</span>
                </div>
                <div className="border-y md:border-y-0 md:border-x border-white/[0.06] py-6 md:py-0 px-4">
                  <span className="text-4xl font-bold text-white tabular-nums tracking-tighter">5 yrs</span>
                  <span className="block text-slate-600 text-[10px] font-bold uppercase tracking-widest mt-2">Unsolved pain points</span>
                </div>
                <div>
                  <span className="text-4xl font-bold text-white tabular-nums tracking-tighter">0</span>
                  <span className="block text-slate-600 text-[10px] font-bold uppercase tracking-widest mt-2 px-2">Tools that actually solved it</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION E — PRICING & FAQ */}
        <section className="bg-[#0F0F0F] px-6 py-[100px]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-xs font-semibold tracking-widest uppercase text-red-500 mb-4">Founding member pricing</div>
              <h2 className="text-3xl font-bold text-white mb-3">Lock in your price today. Keep it forever.</h2>
              <div className="text-slate-400 text-sm mb-10 max-w-xl mx-auto line-clamp-2 md:line-clamp-none">
                Founding members pay launch pricing permanently. When we raise prices — and we will — your rate does not change. Ever.
              </div>
              <div className="inline-flex items-center gap-2 bg-amber-500/8 border border-amber-500/20 rounded-full px-5 py-2 text-amber-500 text-[10px] font-bold uppercase tracking-widest">
                ⚡ 200 founding spots total. First come, first served.
              </div>
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
              {[
                {
                  n: "Solo Operator", p: "19", c: "Up to 3 channels",
                  f: ["Unified portfolio dashboard", "Combined revenue tracking", "Cross-channel views comparison", "Weekly digest email"]
                },
                {
                  n: "Portfolio Pro", p: "49", c: "Up to 10 channels", h: "Most popular",
                  f: ["Everything in Solo", "AI-powered next video recommendations", "Channel health scoring", "What is underperforming and why", "Priority beta access"]
                },
                {
                  n: "Agency", p: "99", c: "Unlimited channels",
                  f: ["Everything in Portfolio Pro", "Client-facing performance reports", "Team member access", "White-label exports"]
                }
              ].map((tier, i) => (
                <div 
                  key={i} 
                  className={`rounded-2xl p-8 border relative flex flex-col ${
                    tier.h 
                      ? 'bg-red-600/8 border-red-500/40 ring-1 ring-red-500/20' 
                      : 'bg-[#1E1E1E] border-white/[0.06] hover:border-white/[0.12]'
                  } transition-all duration-300`}
                >
                  {tier.h && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-bold px-5 py-1.5 rounded-full whitespace-nowrap uppercase tracking-widest shadow-xl shadow-red-500/20">
                      {tier.h}
                    </div>
                  )}
                  
                  <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-6">{tier.n}</div>
                  <div className="flex items-end gap-1.5 mb-1">
                    <span className="text-5xl font-bold text-white tabular-nums tracking-tighter">${tier.p}</span>
                    <span className="text-slate-500 text-lg mb-1">/mo</span>
                  </div>
                  <div className="text-slate-600 text-[10px] font-bold mb-8 uppercase tracking-widest">Permanent Founding Rate</div>
                  
                  <div className="border-t border-white/5 mb-8" />
                  
                  <div className="text-white text-sm font-bold mb-6 tracking-tight">{tier.c}</div>
                  
                  <ul className="space-y-4 flex-1 mb-10">
                    {tier.f.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full bg-red-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-red-400 text-[9px]">✓</span>
                        </div>
                        <span className="text-slate-400 text-sm leading-tight font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={scrollToCTA}
                    className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                      tier.h 
                        ? 'bg-red-600 hover:bg-red-500 text-white shadow-xl shadow-red-500/20' 
                        : 'bg-white/[0.06] hover:bg-white/[0.12] text-white'
                    }`}
                  >
                    Join waitlist {tier.h && "→"}
                  </button>
                </div>
              ))}
            </div>

            <div className="max-w-xl mx-auto border-t border-white/5 pt-16">
              <h3 className="text-white font-bold text-center text-sm uppercase tracking-widest mb-10">Common questions</h3>
              <div className="space-y-0">
                {[
                  { q: "When will beta launch?", a: "Approximately 8 weeks from now. Waitlist members get access before anyone else — founding tier first." },
                  { q: "Do you store my YouTube credentials?", a: "Never. All channel connections use YouTube's official OAuth 2.0 flow — the same system Google uses everywhere. We receive a read-only access token. Your password never touches our servers." },
                  { q: "I only have 2 channels. Should I join?", a: "Yes. If you're building a portfolio, you want the infrastructure ready before you need it. Founding pricing won't be available after launch." }
                ].map((faq, i) => (
                  <FAQItem 
                    key={i} 
                    q={faq.q} 
                    a={faq.a} 
                    isOpen={openIndex === i} 
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION F — FINAL CTA */}
        <section ref={finalCtaRef} className="relative bg-[#1E1E1E] border-t border-white/5 py-[100px] px-6 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-60 filter blur-[100px] bg-red-500/10 pointer-events-none" />
          
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <div className="text-xs font-semibold tracking-widest uppercase text-red-500 mb-8">Join the waitlist</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-[1.1] tracking-tighter">
              All your YouTube channels. <br className="hidden md:block" />
              One place. Finally.
            </h2>
            <p className="text-slate-400 text-base mb-12 max-w-md mx-auto leading-relaxed font-medium">
              Connect your channels. See combined views, subs, and revenue. Know which video to make next. ChannelOS is the dashboard YouTube never built for operators.
            </p>
            
            <div className="max-w-sm mx-auto">
              <Suspense fallback={<div className="h-[120px] w-full bg-white/[0.04] border border-white/[0.08] rounded-[10px] animate-pulse" />}>
                <WaitlistForm customButtonText="Get Early Access to ChannelOS →" />
              </Suspense>
            </div>
            
            <div className="flex justify-center gap-8 flex-wrap mt-10">
              {[
                { e: "📺", t: "Works with all your YouTube channels" },
                { e: "🔒", t: "Read-only YouTube API access" },
                { e: "⚡", t: "See your portfolio in 5 minutes" }
              ].map((sig, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-600 text-[11px] font-bold uppercase tracking-wider">
                  <span>{sig.e}</span>
                  <span>{sig.t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.05] py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#FF0000] to-[#CC0000] flex items-center justify-center font-bold text-white text-[10px]">C</div>
            <span className="text-slate-700 text-xs font-bold ml-2.5 uppercase tracking-widest">ChannelOS</span>
            <span className="text-slate-800 text-xs font-bold mx-3">·</span>
            <span className="text-slate-800 text-[10px] font-bold uppercase tracking-widest">© 2026</span>
          </div>
          
          <div className="flex items-center gap-4 text-slate-700 text-[10px] font-bold uppercase tracking-widest text-center md:text-right">
            <span>The dashboard YouTube never built for multi-channel operators</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
