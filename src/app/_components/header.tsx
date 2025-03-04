'use client';

import { PopoverGroup } from '@headlessui/react';
import { ModeToggle } from './modeToggle';

export default function Header() {
    return (
        <header>
            <nav
                aria-label="Global"
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
            >
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Home</span>
                        <img
                            alt="Logo"
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                            className="h-8 w-auto"
                        />
                    </a>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <a href="#" className="text-sm font-semibold text-gray-900">
                        Home
                    </a>
                </PopoverGroup>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#" className="text-sm font-semibold text-gray-900">
                        <ModeToggle />
                    </a>
                </div>
            </nav>
        </header>
    );
}
