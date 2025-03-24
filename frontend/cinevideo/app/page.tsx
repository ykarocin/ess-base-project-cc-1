// app/page.tsx
"use client";
import Login from "./pages/Login";
import { useRouter } from "next/navigation";

export default function Home() {
  return <Login />;
}