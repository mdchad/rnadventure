import Link from "next/link";
import type { Route } from "next";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const tourCategories = [
  { name: "City Tours", href: "/tours?category=City+Tour" },
  { name: "Food Tours", href: "/tours?category=Food+Tour" },
  { name: "Jaulah Masjid", href: "/tours?category=Jaulah+Masjid" },
  { name: "Edutrips", href: "/tours?category=Edutrip" },
];

const quickLinks = [
  { name: "About Us", href: "/" },
  { name: "Contact", href: "/" },
  { name: "Terms of Service", href: "/" },
  { name: "Privacy Policy", href: "/" },
];

export function Footer() {
  return (
    <footer className="bg-venture-black text-white">
      <div className="container-venture py-16 px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Column */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-venture-green">RN</span>Adventure
            </h3>
            <p className="text-gray-400 mb-6">
              Discover Singapore like never before with our expertly curated tours. Create
              unforgettable memories with RNAdventure.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-venture-green transition-colors flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-venture-green transition-colors flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-venture-green transition-colors flex items-center justify-center"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Tours Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tours</h4>
            <ul className="space-y-3">
              {tourCategories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href as Route}
                    className="text-gray-400 hover:text-venture-green transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href as Route}
                    className="text-gray-400 hover:text-venture-green transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to get special offers and tour updates.</p>
            <form className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button className="bg-venture-green text-black hover:bg-venture-hover">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} RNAdventure. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href={"/" as Route}
                className="text-gray-400 hover:text-venture-green transition-colors"
              >
                Terms
              </Link>
              <Link
                href={"/" as Route}
                className="text-gray-400 hover:text-venture-green transition-colors"
              >
                Privacy
              </Link>
              <Link
                href={"/" as Route}
                className="text-gray-400 hover:text-venture-green transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
