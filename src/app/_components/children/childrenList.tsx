'use client';

import { ChildListItem } from "./childListItem";
import { LoadingSpinner } from "../loadingSpinner";
import { api } from "LA/trpc/react";

export default function ChildrenList() {

    const { data, isLoading } = api.child.getAll.useQuery();

    if (isLoading) return <LoadingSpinner />

    if (!data) return <div>something went wrong!</div>

    if (data.length === 0) {
        return (
            <div className="text-center text-gray-500 font-semibold py-6">
                No data found in the database!
            </div>
        );
    }

    return (
        <div className="shadow-md rounded-lg overflow-hidden">
            <ul role="list" className="divide-y divide-gray-200">
                <li className="grid grid-cols-3 font-semibold bg-gray-100 text-gray-700 p-5 border-b border-gray-300">
                    <div className="flex min-w-0 gap-x-4">
                        <p className="flex gap-4 w-64 truncate">Name</p>
                    </div>
                    <div className="flex gap-16">
                        <span>Age</span>
                        <span>Gender</span>
                    </div>
                </li>


                {data.map((child, index) => (
                    <ChildListItem key={index} {...child} />
                ))}
            </ul>
        </div>
    );
}
