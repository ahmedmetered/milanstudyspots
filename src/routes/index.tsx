import { createFileRoute, Link } from "@tanstack/react-router";
import { featuredSpots, spots } from "@/data/spots";
import { SpotCard } from "@/components/SpotBits";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Milan Study Spots — a student's guide to where to work" },
      { name: "description", content: "Libraries, cafés and campus rooms in Milan, personally visited by a Politecnico student. No sponsored listings." },
      { property: "og:title", content: "Milan Study Spots" },
      { property: "og:description", content: "A curated, personally visited guide to the best places to study in Milan." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="mx-auto max-w-6xl px-5">
      <section className="py-16 md:py-24">
        <div className="eyebrow">A paper guide, on screen</div>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.1] md:text-6xl">
          Where to spend a good <em className="text-primary">four hours</em> of focus in Milan.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Every spot here is personally visited by a student who studies in this city. No sponsored
          listings, no paid placements — just honest notes on noise, outlets and coffee.
        </p>
        <Link
          to="/spots"
          className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Browse all {spots.length} spots →
        </Link>
      </section>
      <section>
        <h2 className="mb-6 text-2xl">Start here</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredSpots.map((s) => (
            <SpotCard key={s.name} spot={s} />
          ))}
        </div>
      </section>
    </main>
  );
}
