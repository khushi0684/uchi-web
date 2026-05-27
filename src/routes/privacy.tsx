import { Link, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/uchi/Nav";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Uchi" },
      { name: "description", content: "Uchi privacy policy." },
      { property: "og:title", content: "Privacy Policy — Uchi" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <section className="pt-32 pb-20 bg-cream">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-clay">Policies</p>
          <h1 className="mt-4 font-serif text-5xl lg:text-7xl text-balance">Privacy Policy.</h1>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 space-y-12">
          <div>
            <h2 className="font-serif text-2xl">1. Information We Collect</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We collect information you provide directly to us, such as your name, email address, shipping address,
              and payment information when you make a purchase or sign up for our newsletter.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl">2. How We Use Your Information</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We use your information to process orders, communicate with you, improve our products and services,
              and send you marketing communications if you have opted in.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl">3. Sharing Your Information</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We do not sell your personal information. We may share your information with trusted third-party
              service providers who assist us in operating our business, such as payment processors and shipping carriers.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl">4. Your Rights</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              You have the right to access, correct, or delete your personal information. You may also opt out of
              marketing communications at any time by clicking the unsubscribe link in our emails.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl">5. Contact Us</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              If you have any questions about this privacy policy, please contact us at help@uchicart.com.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-cream border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-12 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Uchi. All rights reserved.</p>
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
