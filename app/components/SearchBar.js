"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim().toLowerCase() === "dashboard") {
      router.push("/dashboard");
    } else {
      router.push(`/${query.trim()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="p-2 rounded bg-gray-700 text-white focus:outline-none"
      />
      <button type="submit" className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700">Search</button>
    </form>
  );
}
