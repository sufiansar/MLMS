"use client";

import { Link } from "react-router";
import { ModeToggle } from "@/components/theme/mode-toggle";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full sticky top-0 z-50 bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/">
          <span className="text-xl font-bold text-blue-600 hover:text-green-600">
            MLMS
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/books" className="hover:text-green-600 transition">
            All Books
          </Link>
          <Link to="/create-book" className="hover:text-green-600 transition">
            Add Book
          </Link>
          <Link to="borrow-summary" className="hover:text-green-600 transition">
            Borrow Summary
          </Link>
          <ModeToggle />
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-4 mt-6 ml-4">
                <SheetClose asChild>
                  <Link to="/" className="hover:text-green-600 transition">
                    All Books
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/create-book"
                    className="hover:text-green-600 transition"
                  >
                    Add Book
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/borrow-summary"
                    className="hover:text-green-600 transition"
                  >
                    Borrow Summary
                  </Link>
                </SheetClose>
                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
