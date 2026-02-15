"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";

const tourCategories = [
  { name: "City Tours", href: "/tours?category=City+Tour" },
  { name: "Food Tours", href: "/tours?category=Food+Tour" },
  { name: "Jaulah Masjid", href: "/tours?category=Jaulah+Masjid" },
  { name: "Edutrips", href: "/tours?category=Edutrip" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [toursOpen, setToursOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu className="h-6 w-6" />
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

          {/* CTA */}
          <div className="mt-auto pt-6">
            <Link
              href="/tours"
              className="block w-full bg-venture-green text-venture-black hover:bg-venture-hover font-semibold py-3 px-4 rounded-lg text-center transition-colors"
              onClick={() => setOpen(false)}
            >
              Book a Tour With Us
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
