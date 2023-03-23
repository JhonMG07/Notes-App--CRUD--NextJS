"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Navbar() {
  const router = useRouter();

  return (
    <header>
      {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <Link href={"/"}>Task App</Link>
      <div>
        <button onClick={() => router.push("/new")}>Add Task</button>
      </div>
    </header>
  );
}
