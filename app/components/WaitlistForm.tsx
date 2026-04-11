"use client";

import React, { useState, useEffect } from "react";
import { useUTM } from "@/app/components/UTMCapture";

type Status = "idle" | "loading" | "success" | "already" | "error";

export default function WaitlistForm({ customButtonText }: { customButtonText?: string }) {
  const [hasMounted, setHasMounted] = useState(false);
  const { utm_source, utm_medium, utm_campaign } = useUTM();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState<number | null>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, utm_source, utm_medium, utm_campaign }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setStatus("success");
        setPosition(data.position);
      } else if (response.status === 409) {
        setStatus("already");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Failed to connect to the server.");
    }
  };

  // Prevent hydration mismatch
  if (!hasMounted) {
    return (
      <div className="w-full h-[120px] bg-white/[0.04] border border-white/[0.08] rounded-[10px] animate-pulse" />
    );
  }

  if (status === "success" || status === "already") {
    const isSuccess = status === "success";
    return (
      <div className="border border-emerald-500/20 bg-emerald-500/8 rounded-2xl p-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-emerald-400 font-bold text-lg">✓</span>
        </div>
        <h3 className="text-white font-semibold text-lg leading-tight">
          {isSuccess ? "You're in." : "Already secured."}
        </h3>
        <p className="text-slate-500 text-xs mt-3 leading-relaxed">
          Check your inbox — we&apos;ll reach out before beta opens.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="w-full bg-white/[0.04] border border-white/[0.08] text-[#FFFFFF] placeholder-[#717171] rounded-[10px] px-4 py-3.5 text-sm focus:outline-none focus:border-[#FF0000] focus:ring-[3px] focus:ring-[#FF0000]/15 transition-all duration-200"
        />

        <button
          type="submit"
          disabled={status === "loading" || !email}
          className="w-full bg-[#FF0000] hover:bg-[#CC0000] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 rounded-[10px] transition-all duration-200 hover:shadow-[0_8px_30px_rgba(255,0,0,0.3)] flex items-center justify-center gap-2"
        >
          {status === "loading" ? "Securing your spot..." : (customButtonText || "Reserve My Founding Spot →")}
        </button>

        {status === "error" && (
          <p className="text-red-400 text-xs mt-1 text-center font-medium animate-in slide-in-from-top-1">
            {message}
          </p>
        )}
      </form>
      
      <div className="flex items-center justify-center gap-1.5 text-slate-600 text-[11px] mt-4 font-medium uppercase tracking-wider">
        <span>No credit card</span>
        <span>·</span>
        <span>Cancel anytime</span>
        <span>·</span>
        <span>Beta in 8 weeks</span>
      </div>
    </div>
  );
}
