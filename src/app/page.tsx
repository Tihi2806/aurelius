"use client";

import { MosaicGrid } from "@/components/mosaic/MosaicGrid";

export default function GatewayPage() {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#0d0d0d]">
      <header className="mosaic-header">
        <h1>Choose your experience</h1>
      </header>
      <MosaicGrid />
    </div>
  );
}
