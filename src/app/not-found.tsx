'use client';

import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";

export default function NotFoundPage(): JSX.Element {
  const router = useRouter();

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Oops, the page wasn't found...</p>
      <Button onClick={() => router.push('/')}>To Main</Button>
    </div>
  );
}
