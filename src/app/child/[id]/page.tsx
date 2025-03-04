'use client';

import { useParams } from "next/navigation";

export default function ChildDetailsPage() {
    const { id } = useParams();

    return (
        <main className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900">Child Details</h1>
            <p className="text-sm text-gray-500">Showing details for child ID: {id}</p>

            {/* TODO: Fetch child data from API or DB and display */}
            {/* TODO: Make it possible to go back to list (return button)*/}
            {/* TODO: Make it possible to edit information and safe it to db */}
        </main>
    );
}
