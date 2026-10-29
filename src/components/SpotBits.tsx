import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { slugify, type Spot } from "@/data/spots";

export function NoiseDots({ level }: { level: number }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={`Noise level ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`h-2 w-2 rounded-full ${i <= level ? "bg-primary" : "bg-border"}`} />
      ))}
    </span>
  );
}

export function SpotPhoto({ spot, className = "" }: { spot: Spot; className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-secondary ${className}`}>
      {!failed && (
        <img
          src={spot.photo}
          alt={spot.name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {!failed && spot.photoCredit && (
        <span className="absolute bottom-0 right-0 rounded-tl-md bg-background/80 px-2 py-0.5 text-[10px] text-muted-foreground">
          {spot.photoCredit}
        </span>
      )}
      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <span className="eyebrow">Photo coming soon</span>
          <span className="mt-2 font-serif text-2xl italic text-muted-foreground">{spot.neighborhood}</span>
        </div>
      )}
    </div>
  );
}

export function SpotCard({ spot }: { spot: Spot }) {
  return (
    <Link
      to="/spots/$slug"
      params={{ slug: slugify(spot.name) }}
      className="group block overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-ring"
    >
      <SpotPhoto spot={spot} className="aspect-[4/3]" />
      <div className="p-5">
        <div className="eyebrow">
          {spot.type} · {spot.neighborhood}
        </div>
        <h3 className="mt-2 text-xl leading-snug group-hover:text-primary">{spot.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{spot.bestFor}</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <NoiseDots level={spot.noise} />
          <span className="font-medium">{spot.price === "free" ? "Free" : spot.price}</span>
        </div>
      </div>
    </Link>
  );
}

export function SiteHeader() {
  const link = "text-sm hover:text-primary [&.active]:text-primary";
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
      <Link to="/" className="font-serif text-xl">
        Milan <em className="text-primary">Study</em> Spots
      </Link>
      <nav className="flex gap-5">
        <Link to="/spots" className={link}>Spots</Link>
        <Link to="/about" className={link}>About</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 max-w-6xl border-t border-border px-5 py-8 text-sm text-muted-foreground">
      Every spot personally visited. No sponsored listings.
    </footer>
  );
}
