import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Link href="/register">
        <Button > Register </Button>
      </Link>
    </div>
  );
}
