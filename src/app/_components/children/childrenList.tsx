'use client';

import Link from "next/link";
import { ChildListItem } from "./childListItem";
import { Button } from "LA/components/ui/button";

const childrenData = [
    { id: "1", firstName: "Leslie", middleName: "Marie", lastName: "Alexander", age: 5, gender: "Female" },
    { id: "2", firstName: "Michael", lastName: "Schmidt", age: 4, gender: "Male" },
    { id: "3", firstName: "Anna", middleName: "Sophia", lastName: "Müller", age: 6, gender: "Female" },
];

export default function ChildrenList() {
    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Kindergarten Children</h2>
                    <p className="text-sm text-gray-500">
                        Here you can find a list of all kindergarten children along with their personal details.
                    </p>
                </div>
                <Link href="/add-child">
                    <Button variant="default">+ Add Child</Button>
                </Link>
            </div>

            <div className="shadow-md rounded-lg overflow-hidden">
                <ul role="list" className="divide-y divide-gray-200">
                    {childrenData.map((child, index) => (
                        <ChildListItem key={index} {...child} />
                    ))}
                </ul>
            </div>
        </div>
    );
}
