import { Link, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/uchi/Nav";
import { ArrowRight, BookOpen } from "lucide-react";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Uchi Studio" },
      { name: "description", content: "Stories from the studio, kiln notes, and quiet living inspiration." },
      { property: "og:title", content: "Journal — Uchi Studio" },
      { property: "og:description", content: "Slow notes from the studio." },
    ],
  }),
  component: JournalPage,
});

const posts = [
  {
    title: "The Art of Wood-Firing",
    date: "May 2026",
    excerpt: "Why we still fire our ceramics in a traditional Tokoname kiln — and what it means for every piece you bring home.",
    tag: "Process",
  },
  {
    title: "Designing for Quiet Rooms",
    date: "April 2026",
    excerpt: "How we think about light, shadow, and negative space when designing furniture for modern Indian homes.",
    tag: "Design",
  },
  {
    title: "Meet the Makers",
    date: "March 2026",
    excerpt: "A day in the life of our ceramics team — from wedging clay to the final glaze inspection.",
    tag: "Studio",
  },
  {
    title: "Sustainability in Every Kiln Load",
    date: "February 2026",
    excerpt: "Our journey toward closed-loop production and what we’ve learned along the way.",
    tag: "Sustainability",
  },
];

function JournalPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <section className="pt-32 pb-20 bg-cream">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-clay">The Journal</p>
          <h1 className="mt-4 font-serif text-5xl lg:text-7xl text-balance">Slow notes from the studio.</h1>
          <p className="mt-6 max-w-xl mx-auto text-muted-foreground leading-relaxed">
            New pieces, kiln stories, and quiet rituals — once a month, straight from our workshop.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.title}
                className="group lift bg-ivory rounded-3xl p-8 border border-border/60 hover:border-clay/30 transition-colors"
              >
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="px-2.5 py-1 rounded-full bg-cream border border-border">{post.tag}</span>
                  <span>{post.date}</span>
                </div>
                <h2 className="mt-5 font-serif text-2xl lg:text-3xl leading-tight group-hover:text-clay transition-colors">
                  {post.title}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{post.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium group-hover:text-clay transition-colors">
                  Read more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-cream border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-12 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Uchi Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-clay transition">Privacy</Link>
            <Link to="/terms" className="hover:text-clay transition">Terms</Link>
            <Link to="/cookies" className="hover:text-clay transition">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
