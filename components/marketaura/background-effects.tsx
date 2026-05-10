"use client"

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gold orb */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full animate-float opacity-30"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.16 80 / 0.4) 0%, transparent 70%)",
        }}
      />
      
      {/* Silver orb */}
      <div
        className="absolute top-1/3 -left-32 w-80 h-80 rounded-full animate-float-delayed opacity-25"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.02 260 / 0.4) 0%, transparent 70%)",
        }}
      />
      
      {/* Electric blue orb */}
      <div
        className="absolute bottom-20 right-1/4 w-72 h-72 rounded-full animate-float-slow opacity-20"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.22 230 / 0.3) 0%, transparent 70%)",
        }}
      />
      
      {/* Emerald accent */}
      <div
        className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full animate-float opacity-15"
        style={{
          background: "radial-gradient(circle, oklch(0.68 0.20 155 / 0.3) 0%, transparent 70%)",
        }}
      />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(0.78 0.16 80) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.78 0.16 80) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  )
}
