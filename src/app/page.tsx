import { HydrateClient } from "LA/trpc/server";

export default async function Home() {

  return (
    <HydrateClient>
      <main>
        <div>
          Home
        </div>
      </main>
    </HydrateClient>
  );
}
