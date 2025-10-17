"use client";
import Link from "next/link";

import { DarkModeSwitch } from "@/components/shared/dark-mode/dark-mode-switch";
import FullscreenButton from "@/components/shared/full-screen-button/full-screen-button";
import SidebarToggler from "@/components/shared/sidebar-toggler/sidebar-toggler";
import useAuth from "@/hooks/use-auth";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { UserMenu } from "../user-menu/user-menu";
export default function Navbar() {
  const { data: session } = useAuth();
  const userEmail = session?.user?.email.split("@")[0] || "N/A";
  const designation = "admin";

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Home", route: "/" },
    { name: "Categories", route: "/categories" },
    { name: "Products", route: "/products" },
  ];

  return (
    <header className="sticky top-0 z-10 flex w-full border-b border-border bg-muted">
      <div className="flex flex-grow items-center justify-between px-4 py-3 shadow-2 ">
        <div className="flex flex-row items-center justify-between gap-4 w-full max-w-fit pl-4">
          <div className="">
            <Link href={"/"} className="flex items-center justify-center gap-1">
              <div className="font-semibold text-xl text-primary/85 min-w-fit">
                Product Manager
              </div>
            </Link>
          </div>
          <div className="hidden md:flex justify-center items-center gap-3">
            <SidebarToggler />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1 lg:gap-4">
          {/* <!-- Dark Mode Toggler --> */}
          <DarkModeSwitch />

          <FullscreenButton />
          <UserMenu name={userEmail} designation={designation} />
        </div>

        {/* Mobile burger */}
        <motion.button
          className="md:hidden flex items-center"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="h-6 w-6 text-gray-900" />
        </motion.button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 pt-24 px-6 bg-white md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-6 w-6 text-gray-900" />
            </motion.button>

            <nav className="flex flex-col space-y-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.route}
                  className="text-base font-medium text-gray-900"
                  onClick={toggleMenu}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  {item.name}
                </motion.a>
              ))}

              <motion.a
                className="inline-flex items-center justify-center w-full px-5 py-3 text-base text-white bg-destructive rounded-full  mt-6"
                onClick={toggleMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5 }}
              >
                Logout
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
