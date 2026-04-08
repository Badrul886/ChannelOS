"use client";

import { Suspense, useRef } from "react";
import WaitlistForm from "@/app/components/WaitlistForm";

export default function LandingPage() {
  const finalCtaRef = useRef<HTMLDivElement>(null);

  const scrollToCTA = () => {
    finalCtaRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#080B11] text-[#94A3B8] selection:bg-blue-500/30 antialiased font-inter overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 h-[56px] bg-[#080B11]/85 backdrop-blur-md border-b border-white/5 z-50">
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold text-sm tracking-tighter">C</span>
            </div>
            <span className="text-white font-semibold text-sm ml-2.5 tracking-tight">ChannelOS</span>
          </div>
          <button 
            onClick={scrollToCTA}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors active:scale-95"
          >
            Get Early Access
          </button>
        </div>
      </nav>

      <main>
        {/* SECTION A — HERO */}
        <section className="relative min-h-[calc(100vh-56px)] mt-[56px] flex flex-col items-center justify-center px-6 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-radial-gradient from-blue-500/12 to-transparent opacity-100 filter blur-[80px] pointer-events-none z-0" 
               style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)' }} />
          <div className="absolute top-[60%] left-0 right-0 h-[1px] bg-white opacity-[0.03] pointer-events-none z-0" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10 py-20">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 border border-blue-500/25 bg-blue-500/8 rounded-full px-4 py-1.5 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400"></span>
              </span>
              <span className="text-blue-400 text-xs font-medium tracking-tight">
                Waitlist open · 200 founding member spots
              </span>
            </div>
            
            <h1 className="text-[clamp(40px,6vw,72px)] font-extrabold text-[#F1F5F9] tracking-[-0.03em] leading-[1.05] mb-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              Your YouTube portfolio, <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#93C5FD]">
                one command center
              </span>
              <span className="text-blue-500 animate-pulse ml-1 font-light">|</span>
            </h1>
            
            <p className="max-w-lg mx-auto text-base md:text-lg text-slate-400 leading-relaxed mt-6 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Stop logging into six tabs to figure out which channel needs you today. ChannelOS watches all your channels, finds what&apos;s broken, and tells you exactly what to make next.
            </p>
            
            <div className="max-w-sm mx-auto mb-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              <Suspense fallback={<div className="h-[120px] w-full bg-white/[0.04] border border-white/[0.08] rounded-[10px] animate-pulse" />}>
                <WaitlistForm />
              </Suspense>
            </div>
            
            {/* Social Numbers Row */}
            <div className="flex items-center justify-center gap-8 flex-wrap mt-14 pt-8 border-t border-white/5 animate-in fade-in duration-1000 delay-500">
              {[
                { val: "200", label: "founding spots total" },
                { val: "8 wks", label: "to beta access" },
                { val: "5 min", label: "to connect all channels" }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-8 group">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-white tabular-nums tracking-tight">{stat.val}</span>
                    <span className="text-xs text-slate-600 mt-1 uppercase tracking-wider font-semibold">{stat.label}</span>
                  </div>
                  {i < 2 && <div className="hidden md:block w-[1px] h-8 bg-white/5" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION B — THE BEFORE STATE */}
        <section className="max-w-5xl mx-auto px-6 py-[120px]">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="text-xs font-semibold tracking-widest uppercase text-blue-500 mb-4">
              If you run multiple channels, you know this.
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              You built a YouTube business. <br className="hidden md:block" />
              Your tools still think you have one channel.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { e: "🗂️", t: "Your tracking spreadsheet made sense when you had two channels. Now it has seventeen tabs, three broken formulas, and you stopped updating it six weeks ago." },
              { e: "📊", t: "You open YouTube Studio, check one channel, open another tab for the next one, and by the time you've checked all five you've forgotten what you saw in the first." },
              { e: "🎯", t: "You know one of your channels is underperforming. You just don't know which one — or why — without spending forty minutes manually comparing numbers." },
              { e: "💸", t: "You can't answer the simplest question: how much did all your channels make last month — combined. You have to open four dashboards and do math in your head." }
            ].map((card, i) => (
              <div key={i} className="bg-[#0F1319] border border-white/[0.06] rounded-2xl p-7 text-left hover:border-white/[0.12] transition-all duration-300 group">
                <div className="w-[38px] h-[38px] rounded-xl bg-white/[0.04] flex items-center justify-center text-xl mb-5 group-hover:bg-blue-500/10 transition-colors">
                  {card.e}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed font-medium">
                  {card.t}
                </p>
              </div>
            ))}
            <div className="md:col-span-2 bg-[#0F1319] border border-white/[0.06] rounded-2xl p-7 text-left hover:border-white/[0.12] transition-all duration-300 group">
              <div className="w-[38px] h-[38px] rounded-xl bg-white/[0.04] flex items-center justify-center text-xl mb-5 group-hover:bg-blue-500/10 transition-colors">
                🔁
              </div>
              <p className="text-slate-300 text-sm leading-relaxed font-medium">
                Every Monday you open six tabs, look at six different dashboards, absorb six different sets of numbers, and still finish the session not knowing which channel to focus on or what to make next. So you just make what you feel like.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION C — PRODUCT EXPLANATION */}
        <section className="max-w-5xl mx-auto px-6 py-[120px]">
          <div className="text-center mb-16">
            <div className="text-xs font-semibold tracking-widest uppercase text-blue-500 mb-4">How it works</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Three things. That&apos;s it.</h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto">
              No 47-feature onboarding. No week-long setup. Connect your channels, see your portfolio, act on what matters.
            </p>
          </div>
          
          <div className="space-y-[120px]">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="text-xs font-mono text-blue-500/60 font-medium mb-3">01</div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Connect every channel in 60 seconds.</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Link all your YouTube channels through Google OAuth. No passwords stored. No CSV uploads. No manual data entry. We pull everything directly from YouTube&apos;s API — subscribers, views, revenue, watch time — for every channel simultaneously.
                </p>
              </div>
              <div className="flex-1 w-full bg-[#0F1319] border border-white/[0.06] rounded-2xl p-5 aspect-[4/3] flex flex-col justify-center overflow-hidden">
                <div className="space-y-1">
                  {[
                    { n: "Finance Decoded", s: "247K subscribers", c: "bg-blue-500" },
                    { n: "Stoic Daily", s: "182K subscribers", c: "bg-violet-500" },
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
              <div className="flex-1">
                <div className="text-xs font-mono text-blue-500/60 font-medium mb-3">02</div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">See your entire portfolio in one view.</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  One screen. Every channel. Combined revenue, total views, subscriber growth, watch time — rolled up into a single number and broken down side by side. Know instantly which channel is growing, which is stalling, and which needs you today.
                </p>
              </div>
              <div className="flex-1 w-full bg-[#0F1319] border border-white/[0.06] rounded-2xl p-6 aspect-[4/3] flex flex-col justify-center gap-6 overflow-hidden">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
                    <div className="text-slate-600 text-[10px] font-bold uppercase tracking-widest mb-1">Combined Revenue</div>
                    <div className="text-white text-2xl font-bold tabular-nums">$4,820</div>
                    <div className="text-emerald-400 text-[10px] font-bold mt-1.5">+12% vs last month</div>
                  </div>
                  <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
                    <div className="text-slate-600 text-[10px] font-bold uppercase tracking-widest mb-1">Total Views</div>
                    <div className="text-white text-2xl font-bold tabular-nums">2.4M</div>
                    <div className="text-emerald-400 text-[10px] font-bold mt-1.5">+8%</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { n: "Channel 1", w: "w-[85%]", c: "bg-blue-500" },
                    { n: "Channel 2", w: "w-[62%]", c: "bg-violet-500" },
                    { n: "Channel 3", w: "w-[44%]", c: "bg-emerald-500" },
                    { n: "Channel 4", w: "w-[31%]", c: "bg-orange-500" }
                  ].map((b, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${b.c}`} />
                      <div className="text-white text-[10px] font-medium w-16 truncate">{b.n}</div>
                      <div className="flex-1 bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                        <div className={`${b.c} ${b.w} h-full rounded-full`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="text-xs font-mono text-blue-500/60 font-medium mb-3">03</div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Get told exactly what to do next.</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  ChannelOS doesn&apos;t just show you data — it reads your data and generates a prioritized action. This week: which channel needs attention, what&apos;s actually causing the drop, and what type of video to make next based on what has worked. Stop guessing. Start acting.
                </p>
              </div>
              <div className="flex-1 w-full bg-[#0F1319] border border-white/[0.06] rounded-2xl p-6 aspect-[4/3] flex items-center justify-center overflow-hidden">
                <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-5 w-full max-w-[320px] shadow-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px]">⚡</div>
                    <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">This week&apos;s focus</span>
                  </div>
                  <div className="text-white font-bold text-sm mb-4 leading-tight">Finance Decoded needs your attention.</div>
                  <div className="space-y-4">
                    {[
                      "CTR dropped 24% over the last 3 uploads. Your thumbnails stopped using numbers — your top 5 videos all had numbers.",
                      "Watch time is healthy at 68% retention. The content isn't the issue. The packaging is.",
                      "Recommended next video: a listicle format with a specific number in the thumbnail and title. This format has a 3.2x higher CTR."
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="text-blue-400 text-xs mt-0.5">→</span>
                        <p className="text-slate-300 text-[11px] leading-snug">{f}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION D — SOCIAL PROOF */}
        <section className="max-w-5xl mx-auto px-6 py-[120px]">
          <div className="text-center mb-16">
            <div className="text-xs font-semibold tracking-widest uppercase text-blue-500 mb-4">Operator research</div>
            <h2 className="text-3xl font-bold text-white mb-4">We spent 3 months reading every complaint before writing one line of code.</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              166 Reddit threads. 5 years of the same problem. Operators building Notion templates just to manage 4 channels. Here is what they said.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
            {[
              { q: "I bounced between TubeBuddy, Notion, and Stripe reports and nothing connected. I just needed one number.", a: "Multi-channel operator · r/SaaS" },
              { q: "I built a whole Airtable system to track 4 channels. I haven't updated it in a month. It's completely useless now.", a: "YouTube portfolio operator · r/Notion" },
              { q: "YouTube Studio tells me what happened. It never tells me what to do next.", a: "Creator · r/indiehackers" }
            ].map((quote, i) => (
              <div key={i} className="bg-[#0F1319] border border-white/[0.06] rounded-2xl p-7 flex flex-col hover:border-white/[0.12] transition-all">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="w-1.5 h-1.5 rounded-full bg-blue-500" />
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl font-bold text-white tabular-nums tracking-tighter">166</span>
                <span className="text-slate-600 text-xs font-bold uppercase tracking-widest mt-2 px-2">Reddit threads analyzed</span>
              </div>
              <div className="flex flex-col items-center text-center border-y md:border-y-0 md:border-x border-white/[0.06] py-6 md:py-0 px-4">
                <span className="text-4xl font-bold text-white tabular-nums tracking-tighter">5 yrs</span>
                <span className="text-slate-600 text-xs font-bold uppercase tracking-widest mt-2">Unsolved pain points</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl font-bold text-white tabular-nums tracking-tighter">0</span>
                <span className="text-slate-600 text-xs font-bold uppercase tracking-widest mt-2 px-2">Tools that actually solved it</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION E — PRICING */}
        <section className="max-w-5xl mx-auto px-6 py-[120px]">
          <div className="text-center mb-16">
            <div className="text-xs font-semibold tracking-widest uppercase text-blue-500 mb-4">Founding member pricing</div>
            <h2 className="text-3xl font-bold text-white mb-3">Lock in your price today. Keep it forever.</h2>
            <div className="text-slate-400 text-sm mb-10 max-w-xl mx-auto">
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
                    ? 'bg-blue-600/8 border-blue-500/40 ring-1 ring-blue-500/20' 
                    : 'bg-[#0F1319] border-white/[0.06] hover:border-white/[0.12]'
                } transition-all duration-300`}
              >
                {tier.h && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-5 py-1.5 rounded-full whitespace-nowrap uppercase tracking-widest shadow-xl shadow-blue-500/20">
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
                      <div className="w-4 h-4 rounded-full bg-blue-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-400 text-[9px]">✓</span>
                      </div>
                      <span className="text-slate-400 text-sm leading-tight font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={scrollToCTA}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                    tier.h 
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/20' 
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
            <div className="space-y-8">
              {[
                { q: "When will beta launch?", a: "Approximately 8 weeks from now. Waitlist members get access before anyone else — founding tier first." },
                { q: "Do you store my YouTube credentials?", a: "Never. All channel connections use YouTube's official OAuth 2.0 flow — the same system Google uses everywhere. We receive a read-only access token. Your password never touches our servers." },
                { q: "I only have 2 channels. Should I join?", a: "Yes. If you're building a portfolio, you want the infrastructure ready before you need it. Founding pricing won't be available after launch." }
              ].map((faq, i) => (
                <div key={i} className="border-b border-white/[0.05] pb-8 last:border-0 opacity-80 hover:opacity-100 transition-opacity">
                  <h4 className="text-white text-sm font-bold mb-3 tracking-tight">{faq.q}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION F — FINAL CTA */}
        <section ref={finalCtaRef} className="relative py-[140px] px-6 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-60 filter blur-[100px] bg-blue-500/10 pointer-events-none" />
          
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <div className="text-xs font-semibold tracking-widest uppercase text-blue-500 mb-8">Join the waitlist</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-[1.1] tracking-tighter">
              Stop guessing which channel needs you today.
            </h2>
            <p className="text-slate-400 text-base mb-12 max-w-md mx-auto leading-relaxed font-medium">
              Connect all your YouTube channels. See what&apos;s working. Know what to make next. This is what managing a portfolio should feel like.
            </p>
            
            <div className="max-w-sm mx-auto">
              <Suspense fallback={<div className="h-[120px] w-full bg-white/[0.04] border border-white/[0.08] rounded-[10px] animate-pulse" />}>
                <WaitlistForm />
              </Suspense>
            </div>
            
            <div className="flex justify-center gap-8 flex-wrap mt-10">
              {[
                { e: "🔒", t: "No password stored" },
                { e: "⚡", t: "5 minute setup" },
                { e: "🎯", t: "Cancel anytime" }
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
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center font-bold text-white text-[10px]">C</div>
            <span className="text-slate-700 text-xs font-bold ml-2.5 uppercase tracking-widest">ChannelOS</span>
            <span className="text-slate-800 text-xs font-bold mx-3">·</span>
            <span className="text-slate-800 text-[10px] font-bold uppercase tracking-widest">© 2026</span>
          </div>
          
          <div className="flex items-center gap-4 text-slate-700 text-[10px] font-bold uppercase tracking-widest">
            <span>Built for YouTube portfolio operators</span>
            <span className="text-slate-800 text-[14px]">·</span>
            <span className="text-slate-400">Early access</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
