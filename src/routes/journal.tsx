import { Link, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/uchi/Nav";
import { ArrowRight, ArrowUpRight, Clock, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import heroCeramics from "@/assets/hero-ceramics.jpg";
import collectionZen from "@/assets/collection-zen.jpg";
import collectionEarth from "@/assets/collection-earth.jpg";
import collectionNordic from "@/assets/collection-nordic.jpg";
import productBowl from "@/assets/product-bowl.jpg";
import productVase from "@/assets/product-vase.jpg";
import productChair from "@/assets/product-chair.jpg";

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
    id: 1,
    title: "The Art of Wood-Firing",
    subtitle: "Why ancient kiln techniques still define our craft",
    date: "May 2026",
    readTime: "7 min read",
    excerpt: "Why we still fire our ceramics in a traditional Tokoname kiln — and what it means for every piece you bring home. Each firing is a collaboration between maker and flame.",
    tag: "Process",
    featured: true,
    image: heroCeramics,
    body: `Wood-firing is one of the oldest ceramic techniques in the world, and we haven't abandoned it because we're romantics — we've kept it because nothing else produces the same result.\n\nOur kiln in Bangalore reaches 1300°C over a 36-hour firing. During that time, ash from the wood floats through the kiln and settles on the pieces, melting into a natural glaze where it lands. Every mark is unpredictable. Every piece is irreproducible.\n\nThis is what we mean when we say 'finished by fire'. The kiln is the final maker.`,
  },
  {
    id: 2,
    title: "Designing for Quiet Rooms",
    subtitle: "Light, shadow, and negative space",
    date: "April 2026",
    readTime: "5 min read",
    excerpt: "How we think about light, shadow, and negative space when designing furniture for modern Indian homes. Less is not emptiness — it is breath.",
    tag: "Design",
    featured: false,
    image: collectionZen,
    body: `The hardest part of designing a quiet room isn't choosing what goes in — it's choosing what stays out.\n\nWe spend weeks removing details from a design before we're satisfied. A table leg that's 2mm thinner. A shelf edge that's barely chamfered, not rounded. These decisions are invisible, but they accumulate into something you feel without being able to name.\n\nLight is the material we design with most. A piece should earn its shadow.`,
  },
  {
    id: 3,
    title: "Meet the Makers",
    subtitle: "A day inside our ceramics studio",
    date: "March 2026",
    readTime: "9 min read",
    excerpt: "A day in the life of our ceramics team — from wedging clay to the final glaze inspection. Nine people, one shared obsession with beauty.",
    tag: "Studio",
    featured: false,
    image: productBowl,
    body: `The studio opens at 7am. By the time the light comes through the east windows, Priya is already at the wheel, and Rajan has the first batch of clay wedged and resting.\n\nThere are nine of us. We make ceramics, but what we're really making is time — time slowed down, time made visible in the turning of a bowl or the compression of a rim.\n\nEvery piece passes through at least four pairs of hands before it reaches yours.`,
  },
  {
    id: 4,
    title: "Sustainability in Every Kiln Load",
    subtitle: "Our path toward closed-loop production",
    date: "February 2026",
    readTime: "6 min read",
    excerpt: "Our journey toward closed-loop production and what we've learned along the way. Reducing waste is not just responsible — it makes better ceramics.",
    tag: "Sustainability",
    featured: false,
    image: collectionEarth,
    body: `In our first year, we wasted nearly 30% of every kiln load. Pieces that cracked, glazes that ran wrong, forms that warped in the heat.\n\nWe kept every broken shard. Ground some back into slip. Used others as kiln furniture. Turned a few into mosaic pieces for the studio floor.\n\nWaste, we learned, is a design problem. Now our discard rate is under 8%. We're not done — the next goal is closing the clay loop entirely.`,
  },
  {
    id: 5,
    title: "The Language of Clay",
    subtitle: "What texture tells us about honesty in making",
    date: "January 2026",
    readTime: "4 min read",
    excerpt: "Clay remembers everything — every fingerprint, every breath, every moment of doubt. We stopped trying to erase the evidence of making.",
    tag: "Process",
    featured: false,
    image: productVase,
    body: `There's a Japanese concept called 'te-no-ato' — the trace of the hand. It refers to the marks left by the maker that remain in the finished work.\n\nFor years, we tried to remove these. Perfect, even surfaces. No irregularities. We wanted our pieces to look machine-made in the best possible way.\n\nThen we stopped. The te-no-ato is the proof that a human made this. It's not a flaw — it's the whole point.`,
  },
  {
    id: 6,
    title: "A Home Worth Keeping",
    subtitle: "On buying fewer, better things",
    date: "December 2025",
    readTime: "5 min read",
    excerpt: "We live in an age of endless options and very little permanence. This is a letter to the idea of lasting — objects, relationships, rooms.",
    tag: "Design",
    featured: false,
    image: collectionNordic,
    body: `We've been thinking about what it means to keep something.\n\nNot in a collector's sense — not the obsessive cataloguing or the fear of use. But the quiet commitment of a bowl you wash every morning, a chair you've sat in for a decade, a lamp that has lit three different homes.\n\nThese objects accumulate time. They become more themselves with use. Buy one. Keep it.`,
  },
];

const tags = ["All", "Process", "Design", "Studio", "Sustainability"] as const;
type Tag = (typeof tags)[number];
type Post = (typeof posts)[number];

const tagColors: Record<string, string> = {
  Process: "bg-clay/15 text-clay border-clay/20",
  Design: "bg-sand text-bark/70 border-border",
  Studio: "bg-cream text-bark/70 border-border",
  Sustainability: "bg-[oklch(0.48_0.10_140)]/10 text-[oklch(0.38_0.08_140)] border-[oklch(0.48_0.10_140)]/20",
};

function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function JournalPage() {
  const [activeTag, setActiveTag] = useState<Tag>("All");
  const [openPost, setOpenPost] = useState<Post | null>(null);
  useScrollReveal();

  const featured = posts.find((p) => p.featured)!;
  const rest = posts.filter((p) => !p.featured && (activeTag === "All" || p.tag === activeTag));

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <JournalHero />
      <FeaturedPost post={featured} onRead={() => setOpenPost(featured)} />
      <PostsGrid posts={rest} activeTag={activeTag} setActiveTag={setActiveTag} onRead={setOpenPost} />
      <PullQuote />
      <PhotoStrip />
      <JournalNewsletter />
      <JournalFooter />
      {openPost && <PostModal post={openPost} onClose={() => setOpenPost(null)} />}
    </div>
  );
}

/* ── HERO ── */
function JournalHero() {
  return (
    <section className="relative min-h-[80vh] text-ivory flex items-end overflow-hidden">
      <img
        src={heroCeramics}
        alt="Ceramic pieces in the studio"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bark via-bark/70 to-bark/30" />
      <div className="absolute inset-0 grain opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px] w-full px-6 lg:px-10 pb-20 pt-48">
        <div className="max-w-4xl">
          <div className="reveal inline-flex items-center gap-2 rounded-full bg-ivory/10 backdrop-blur border border-ivory/20 px-4 py-1.5 text-[10px] tracking-[0.3em] uppercase text-ivory/70 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-clay animate-pulse" />
            The Uchi Journal
          </div>
          <h1 className="reveal reveal-delay-1 font-serif text-[clamp(3.5rem,8vw,7rem)] leading-[0.92] text-balance">
            Slow notes from
            <span className="block italic font-light text-clay-soft"> the studio.</span>
          </h1>
          <p className="reveal reveal-delay-2 mt-8 max-w-lg text-ivory/70 text-lg leading-relaxed">
            Kiln stories, design thinking, and the quiet rituals of craft — once a month, straight from our workshop floor.
          </p>
        </div>
        <div className="reveal reveal-delay-3 mt-16 flex items-center gap-8 text-ivory/50 text-sm">
          <span>{posts.length} stories</span>
          <span className="w-px h-4 bg-ivory/20" />
          <span>Published monthly</span>
          <span className="w-px h-4 bg-ivory/20" />
          <span>Est. 2026</span>
        </div>
      </div>
    </section>
  );
}

/* ── FEATURED POST ── */
function FeaturedPost({ post, onRead }: { post: Post; onRead: () => void }) {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div data-reveal="" className="flex items-center gap-3 mb-10">
          <span className="text-[10px] tracking-[0.35em] uppercase text-clay">Featured Story</span>
          <span className="flex-1 h-px bg-border" />
        </div>

        <article
          onClick={onRead}
          className="group grid lg:grid-cols-2 gap-0 rounded-[2rem] overflow-hidden bg-bark text-ivory shadow-premium cursor-pointer"
        >
          <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover img-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bark/70 via-bark/20 to-transparent" />
            <div className="absolute top-8 left-8">
              <span className="px-3 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase bg-ivory/15 backdrop-blur border border-ivory/20 text-ivory">
                {post.tag}
              </span>
            </div>
          </div>

          <div className="p-10 lg:p-16 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-ivory/50 text-xs">
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-ivory/30" />
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </div>
            <h2 className="mt-5 font-serif text-4xl lg:text-5xl leading-tight text-balance group-hover:text-clay-soft transition-colors duration-500">
              {post.title}
            </h2>
            <p className="mt-3 text-ivory/60 font-light text-lg">{post.subtitle}</p>
            <p className="mt-6 text-ivory/70 leading-relaxed">{post.excerpt}</p>
            <div className="mt-10">
              <span className="inline-flex items-center gap-3 rounded-full bg-clay text-ivory pl-7 pr-2 py-2 text-sm font-medium magnetic group-hover:bg-clay-deep transition-colors">
                Read Full Story
                <span className="grid place-items-center w-10 h-10 rounded-full bg-clay-deep group-hover:bg-bark/40 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ── POSTS GRID ── */
function PostsGrid({
  posts: filteredPosts, activeTag, setActiveTag, onRead,
}: { posts: Post[]; activeTag: Tag; setActiveTag: (t: Tag) => void; onRead: (p: Post) => void }) {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div data-reveal="" className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-clay">All Stories</p>
            <h2 className="mt-2 font-serif text-4xl lg:text-5xl">More from the studio.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`px-4 py-2 rounded-full text-xs tracking-wide border transition-all duration-300 ${
                  activeTag === t
                    ? "bg-bark text-ivory border-bark"
                    : "border-border text-muted-foreground hover:border-clay hover:text-clay"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="py-24 text-center font-serif text-2xl text-muted-foreground">
            No stories in this category yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredPosts.map((post, i) => (
              <PostCard key={post.id} post={post} delay={i + 1} onRead={() => onRead(post)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PostCard({ post, delay, onRead }: { post: Post; delay: number; onRead: () => void }) {
  return (
    <article
      data-reveal=""
      data-delay={String(delay)}
      onClick={onRead}
      className="group lift bg-ivory rounded-[1.5rem] overflow-hidden border border-border/60 hover:border-clay/20 transition-colors cursor-pointer"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover img-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bark/50 via-transparent to-transparent" />
        <div className="absolute top-5 left-5">
          <span className={`px-2.5 py-1 rounded-full text-[9px] tracking-[0.2em] uppercase border backdrop-blur-sm bg-ivory/80 text-bark border-border/60`}>
            {post.tag}
          </span>
        </div>
      </div>

      <div className="p-7">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <Clock className="w-3 h-3" />
          <span>{post.readTime}</span>
        </div>
        <h3 className="mt-4 font-serif text-2xl leading-snug group-hover:text-clay transition-colors duration-300">
          {post.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground font-light">{post.subtitle}</p>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
        <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-5">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-clay group-hover:gap-3 transition-all duration-300">
            Read story <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <div className="w-7 h-7 rounded-full border border-border grid place-items-center text-muted-foreground group-hover:bg-clay group-hover:text-ivory group-hover:border-clay transition-all duration-300">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── POST MODAL ── */
function PostModal({ post, onClose }: { post: Post; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-bark/80 backdrop-blur-sm p-0 sm:p-6 fade-scale-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full sm:max-w-2xl max-h-[92vh] bg-ivory rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden flex flex-col shadow-premium">
        {/* Image header */}
        <div className="relative h-64 shrink-0 overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bark/70 to-transparent" />
          <div className="absolute bottom-6 left-8 right-14">
            <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] tracking-[0.2em] uppercase bg-ivory/90 text-bark border border-border/60 mb-3`}>
              {post.tag}
            </span>
            <h2 className="font-serif text-3xl text-ivory leading-tight">{post.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-bark/60 backdrop-blur text-ivory grid place-items-center hover:bg-bark transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 py-7">
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-6">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </div>
          <p className="font-serif text-xl text-muted-foreground italic mb-6">{post.subtitle}</p>
          <div className="space-y-5">
            {post.body.split("\n\n").map((para, i) => (
              <p key={i} className="text-foreground leading-relaxed">{para}</p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-border px-8 py-5 flex items-center justify-between bg-cream">
          <Link
            to="/products"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-sm font-medium text-clay hover:gap-3 transition-all"
          >
            Shop the Collection <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={onClose}
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── PULL QUOTE ── */
function PullQuote() {
  return (
    <section className="py-28 lg:py-40 bg-bark text-ivory relative overflow-hidden">
      <img
        src={collectionZen}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-bark/75" />
      <div className="absolute inset-0 grain opacity-15" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="font-serif text-[8rem] leading-none text-clay/20 select-none block -mb-10">"</span>
        <blockquote data-reveal="" className="font-serif text-3xl lg:text-5xl leading-[1.2] text-balance text-ivory/90">
          The quietest objects carry the most meaning. We make things to be held, not displayed.
        </blockquote>
        <div data-reveal="" data-delay="1" className="mt-10 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-clay/50" />
          <span className="text-sm text-ivory/50 tracking-widest uppercase">Uchi Studio, 2026</span>
          <span className="h-px w-12 bg-clay/50" />
        </div>
      </div>
    </section>
  );
}

/* ── PHOTO STRIP ── */
function PhotoStrip() {
  const images = [
    { src: productChair, alt: "Handcrafted wooden chair" },
    { src: collectionEarth, alt: "Earth & clay collection" },
    { src: productBowl, alt: "Ceramic bowl from the studio" },
    { src: collectionNordic, alt: "Nordic warmth collection" },
  ];
  return (
    <section className="py-16 bg-cream overflow-hidden">
      <div data-reveal="" className="mx-auto max-w-[1400px] px-6 lg:px-10 mb-8 flex items-center justify-between">
        <p className="text-[10px] tracking-[0.35em] uppercase text-clay">From the Studio</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-clay transition-colors"
        >
          View all products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="flex gap-4 px-6 lg:px-10 max-w-[1400px] mx-auto">
        {images.map(({ src, alt }, i) => (
          <Link
            key={i}
            to="/products"
            data-reveal=""
            data-delay={String(i + 1)}
            className="group relative flex-1 aspect-[3/4] rounded-2xl overflow-hidden min-w-0 shrink-0"
          >
            <img src={src} alt={alt} className="w-full h-full object-cover img-zoom" />
            <div className="absolute inset-0 bg-bark/0 group-hover:bg-bark/20 transition-all duration-500" />
            <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="inline-flex items-center gap-1.5 text-xs text-ivory font-medium">
                Shop <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ── NEWSLETTER ── */
function JournalNewsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <p data-reveal="" className="text-[10px] tracking-[0.35em] uppercase text-clay">Stay Close</p>
          <h2 data-reveal="" data-delay="1" className="mt-4 font-serif text-4xl lg:text-6xl text-balance">
            Once a month. Nothing more.
          </h2>
          <p data-reveal="" data-delay="2" className="mt-5 text-muted-foreground text-lg leading-relaxed">
            A single email with a new story, a new piece, or a quiet idea from our workshop floor.
          </p>
          <form
            data-reveal=""
            data-delay="3"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) {
                setDone(true);
                toast.success("Welcome to the Uchi letter!");
              }
            }}
            className="mt-10 flex flex-col sm:flex-row gap-2 p-2 bg-cream border border-border rounded-full shadow-soft"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-6 py-3 outline-none text-sm"
            />
            <button
              type="submit"
              className="magnetic rounded-full bg-bark text-ivory px-8 py-3 text-sm font-medium hover:bg-clay transition-colors"
            >
              {done ? "You're in ✓" : "Subscribe"}
            </button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function JournalFooter() {
  return (
    <footer className="bg-cream border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-10 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Uchi Studio. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-clay transition">Home</Link>
          <Link to="/products" className="hover:text-clay transition">Products</Link>
          <Link to="/contact" className="hover:text-clay transition">Contact</Link>
          <Link to="/privacy" className="hover:text-clay transition">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
