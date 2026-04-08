"use client";

import React, { createContext, useContext, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface UTMData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

const UTMContext = createContext<UTMData>({
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
});

export const useUTM = () => useContext(UTMContext);

function UTMTracker({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [utm, setUtm] = useState<UTMData>({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
  });

  useEffect(() => {
    // Only access searchParams on the client
    const source = searchParams.get("utm_source") || "";
    const medium = searchParams.get("utm_medium") || "";
    const campaign = searchParams.get("utm_campaign") || "";

    setUtm({
      utm_source: source,
      utm_medium: medium,
      utm_campaign: campaign,
    });
  }, [searchParams]);

  return <UTMContext.Provider value={utm}>{children}</UTMContext.Provider>;
}

export default function UTMCapture({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <UTMTracker>{children}</UTMTracker>
    </Suspense>
  );
}
