'use client';

import Link from "next/link";
import { PopoverGroup } from '@headlessui/react';
import { ModeToggle } from "./modeToggle";

export default function Header() {
    return (
        <header>
            <nav
                aria-label="Global"
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
            >
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Home</span>
                        <img
                            alt="Logo"
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                            className="h-8 w-auto"
                        />
                    </Link>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <Link href="/" className="text-sm font-semibold text-gray-900">
                        Home
                    </Link>
                </PopoverGroup>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <ModeToggle />
                </div>
            </nav>
        </header>
    );
}
