'use client'

import Link from "next/link";
import ChildrenList from "./_components/children/childrenList";
import { Button } from "LA/components/ui/button";

export default function Home() {

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-6">
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
        <ChildrenList />
      </main>
    </>
  );
}
