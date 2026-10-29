import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { spots } from "@/data/spots";
import { SpotCard } from "@/components/SpotBits";

export const Route = createFileRoute("/spots/")({
  head: () => ({
    meta: [
      { title: "All study spots in Milan — filter by type, area and traits" },
      { name: "description", content: "Filter Milan's best libraries, cafés and coworking spaces by neighborhood, quiet, outlets, coffee and more." },
      { property: "og:title", content: "All study spots — Milan Study Spots" },
      { property: "og:description", content: "Find a place to study in Milan by type, neighborhood and traits." },
    ],
  }),
  component: SpotsIndex,
});

const uniq = (a: string[]) => Array.from(new Set(a)).sort();

function Chips({ label, options, selected, onToggle }: { label: string; options: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="eyebrow mb-2">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = selected.includes(o);
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(o)}
              className={`rounded-full border px-3 py-1.5 text-sm capitalize transition-colors focus-visible:outline-2 focus-visible:outline-ring ${
                on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function SpotsIndex() {
  const types = uniq(spots.map((s) => s.type));
  const hoods = uniq(spots.map((s) => s.neighborhood));
  const traits = uniq(spots.flatMap((s) => s.traits));
  const [t, setT] = useState<string[]>([]);
  const [h, setH] = useState<string[]>([]);
  const [tr, setTr] = useState<string[]>([]);
  const toggle = (set: typeof setT) => (v: string) => set((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));

  const list = useMemo(
    () =>
      spots.filter(
        (s) =>
          (!t.length || t.includes(s.type)) &&
          (!h.length || h.includes(s.neighborhood)) &&
          tr.every((x) => s.traits.includes(x)),
      ),
    [t, h, tr],
  );
  const any = t.length + h.length + tr.length > 0;

  return (
    <main className="mx-auto max-w-6xl px-5">
      <h1 className="py-10 text-4xl md:text-5xl">All spots</h1>
      <div className="space-y-5 rounded-xl border border-border bg-card p-5">
        <Chips label="Type" options={types} selected={t} onToggle={toggle(setT)} />
        <Chips label="Neighborhood" options={hoods} selected={h} onToggle={toggle(setH)} />
        <Chips label="Traits" options={traits} selected={tr} onToggle={toggle(setTr)} />
        {any && (
          <button type="button" onClick={() => { setT([]); setH([]); setTr([]); }} className="text-sm text-primary underline">
            Clear filters
          </button>
        )}
      </div>
      <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">
        {list.length} {list.length === 1 ? "spot" : "spots"}
      </p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => <SpotCard key={s.name} spot={s} />)}
      </div>
      {!list.length && <p className="py-12 text-center text-muted-foreground">Nothing matches every filter — try removing one.</p>}
    </main>
  );
}
