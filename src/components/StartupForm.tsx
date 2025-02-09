"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingButton from "./LoadingButton";
import ErrorMessage from "./ErrorMessage";

export default function StartupForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/startups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });

      if (!res.ok) {
        throw new Error("Failed to create startup.");
      }

      setName("");
      setDescription("");
      router.push("/");
    } catch (err) {
      setError("Error adding startup. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <ErrorMessage message={error} />}
      <div>
        <label className="block text-gray-700">Startup Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Description</label>
        <textarea
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <LoadingButton
        text="Add Startup"
        loadingText="Adding..."
        isLoading={loading}
      />
    </form>
  );
}
