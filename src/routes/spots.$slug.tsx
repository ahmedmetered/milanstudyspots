import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getSpot } from "@/data/spots";
import { NoiseDots, SpotPhoto } from "@/components/SpotBits";

export const Route = createFileRoute("/spots/$slug")({
  loader: ({ params }) => {
    const spot = getSpot(params.slug);
    if (!spot) throw notFound();
    return { spot };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Spot not found — Milan Study Spots" }, { name: "robots", content: "noindex" }] };
    const { spot } = loaderData;
    const title = `${spot.name} — study spot in ${spot.neighborhood}, Milan`;
    return {
      meta: [
        { title },
        { name: "description", content: spot.bestFor },
        { property: "og:title", content: title },
        { property: "og:description", content: spot.bestFor },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="text-3xl">We haven't visited that one yet.</h1>
      <Link to="/spots" className="mt-6 inline-block text-primary underline">See all spots</Link>
    </main>
  ),
  component: SpotPage,
});

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-border py-3">
      <dt className="eyebrow pt-0.5">{label}</dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
}

function SpotPage() {
  const { spot } = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-4xl px-5">
      <Link to="/spots" className="text-sm text-muted-foreground hover:text-primary">← All spots</Link>
      <div className="eyebrow mt-8">{spot.type} · {spot.neighborhood}</div>
      <h1 className="mt-3 text-4xl leading-tight md:text-5xl">{spot.name}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{spot.bestFor}</p>
      <SpotPhoto spot={spot} className="mt-8 aspect-[16/9] rounded-xl" />
      <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <blockquote className="rounded-xl bg-accent p-6 text-accent-foreground">
          <div className="eyebrow">Insider tip</div>
          <p className="mt-3 font-serif text-xl italic leading-relaxed">“{spot.insider}”</p>
        </blockquote>
        <dl>
          <Row label="Noise"><NoiseDots level={spot.noise} /></Row>
          <Row label="Price">{spot.price === "free" ? "Free" : spot.price}</Row>
          <Row label="Outlets">{spot.traits.includes("outlets") ? "Yes" : "Not noted"}</Row>
          <Row label="Hours">{spot.hours}</Row>
          <Row label="Address">{spot.address}</Row>
          <Row label="Traits"><span className="capitalize">{spot.traits.join(" · ")}</span></Row>
        </dl>
      </div>
    </main>
  );
}
