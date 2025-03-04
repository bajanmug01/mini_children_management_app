'use client';

import { ChevronRightIcon } from "@heroicons/react/24/solid";

interface ChildProps {
    firstName: string;
    middleName?: string;
    lastName: string;
    age: number;
    gender: string;
}

export function ChildListItem({ firstName, middleName, lastName, age, gender }: ChildProps) {
    return (
        <li>
            <a href="#" className="grid grid-cols-3 items-center gap-x-6 p-5 hover:bg-gray-100 transition">
                <div className="flex min-w-0 gap-x-4">
                    <div className="flex gap-4 w-64 truncate">
                        <p className="text-sm font-semibold text-gray-900">{firstName}</p>
                        {middleName && <p className="text-sm font-semibold text-gray-900">{middleName}</p>}
                        <p className="text-sm font-semibold text-gray-900">{lastName}</p>
                    </div>
                </div>

                <div className="flex gap-8">
                    <p className="text-xs text-gray-500">{age} years old</p>
                    <p className="text-xs text-gray-500">{gender}</p>
                </div>

                <ChevronRightIcon className="w-6 h-6 text-gray-400 justify-self-end" />
            </a>
        </li>
    );
}
