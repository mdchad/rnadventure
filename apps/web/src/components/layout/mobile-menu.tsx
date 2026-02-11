"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";

const tourCategories = [
  { name: "City Tours", href: "/tours?category=City+Tour" },
  { name: "Food Tours", href: "/tours?category=Food+Tour" },
  { name: "Jaulah Masjid", href: "/tours?category=Jaulah+Masjid" },
  { name: "Edutrips", href: "/tours?category=Edutrip" },
];

interface MobileMenuProps {
  user?: {
    name: string;
    email: string;
  } | null;
}

export function MobileMenu({ user }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [toursOpen, setToursOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>
            <span className="text-venture-green">RN</span>Adventure
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-4 mt-8">
          {/* Home Link */}
          <Link
            href="/"
            className="text-lg font-medium hover:text-venture-green transition-colors"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          {/* Tours Collapsible */}
          <Collapsible open={toursOpen} onOpenChange={setToursOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-medium hover:text-venture-green transition-colors">
              Tours
              <ChevronDown
                className={`h-4 w-4 transition-transform ${toursOpen ? "rotate-180" : ""}`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 ml-4 flex flex-col gap-3">
              <Link
                href="/tours"
                className="text-gray-600 hover:text-venture-green transition-colors"
                onClick={() => setOpen(false)}
              >
                All Tours
              </Link>
              {tourCategories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-gray-600 hover:text-venture-green transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* About Link */}
          <Link
            href="/about"
            className="text-lg font-medium hover:text-venture-green transition-colors"
            onClick={() => setOpen(false)}
          >
            About
          </Link>

          {/* Contact Link */}
          <Link
            href="/contact"
            className="text-lg font-medium hover:text-venture-green transition-colors"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>

          {/* User Section */}
          <div className="border-t pt-4 mt-4">
            {user ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-venture-green flex items-center justify-center text-black font-semibold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-venture-green transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/bookings"
                  className="text-gray-600 hover:text-venture-green transition-colors"
                  onClick={() => setOpen(false)}
                >
                  My Bookings
                </Link>
                <form action="/api/auth/sign-out" method="POST">
                  <button
                    type="submit"
                    className="text-left text-gray-600 hover:text-venture-green transition-colors w-full"
                  >
                    Logout
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Button asChild variant="outline" className="w-full" onClick={() => setOpen(false)}>
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-venture-green text-black hover:bg-venture-hover"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-auto pt-6">
            <Button
              asChild
              className="w-full bg-venture-green text-black hover:bg-venture-hover"
              onClick={() => setOpen(false)}
            >
              <Link href="/tours">Book a Tour</Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
