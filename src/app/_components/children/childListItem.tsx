'use client';

import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

interface ChildProps {
    id: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
}

const calculateAge = (dateOfBirth: Date): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};

export function ChildListItem({ id, firstName, middleName, lastName, dateOfBirth, gender }: ChildProps) {
    const age = calculateAge(dateOfBirth);

    return (
        <li>
            <Link href={`/child/${id}`} className="grid grid-cols-3 items-center gap-x-6 p-5 hover:bg-gray-100 transition">
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
            </Link>
        </li>
    );
}
