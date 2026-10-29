import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — who curates Milan Study Spots" },
      { name: "description", content: "Curated by Ahmed, an MSc Mechanical Engineering student at Politecnico di Milano. Every spot visited personally, no sponsorships." },
      { property: "og:title", content: "About Milan Study Spots" },
      { property: "og:description", content: "One student, every spot visited in person, no sponsorships." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <div className="eyebrow">About</div>
      <h1 className="mt-4 text-4xl leading-tight md:text-5xl">One student, a lot of espresso, and a notebook.</h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed">
        <p>
          I'm Ahmed, an MSc Mechanical Engineering student at Politecnico di Milano. Like everyone
          here, I've spent too many afternoons walking between full libraries looking for a free desk.
        </p>
        <p>This guide is the list I wish I'd had in my first semester.</p>
      </div>
      <h2 className="mt-12 text-2xl">The method</h2>
      <ul className="mt-4 space-y-3 text-lg">
        <li>— Every spot is visited in person, for a real study session.</li>
        <li>— No sponsorships, no paid placements, no affiliate links.</li>
        <li>— Hours change; details marked "verify" are being re-checked.</li>
      </ul>
    </main>
  );
}
