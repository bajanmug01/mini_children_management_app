'use client'

import ChildrenList from "./_components/children/childrenList";
import Header from "./_components/header";

export default function Home() {

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <ChildrenList />
      </main>
    </>
  );
}
