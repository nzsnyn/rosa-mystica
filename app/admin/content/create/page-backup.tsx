"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateContentPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Content</h1>
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={() => router.push("/admin/content")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back to Content
        </button>
      </div>
    </div>
  );
}
