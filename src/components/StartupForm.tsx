"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStartup } from "@/redux/startupSlice";

export default function AddStartupForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/startups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error("Failed to add startup");
      }

      const newStartup = await response.json();
      dispatch(addStartup(newStartup));
      setStatus("success");
      setName("");
      setDescription("");
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred");
      setStatus("error");
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add a Startup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Startup Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Adding..." : "Add Startup"}
        </button>
      </form>

      {status === "success" && (
        <p className="mt-4 text-green-600">Startup added successfully!</p>
      )}

      {status === "error" && (
        <p className="mt-4 text-red-600">Error: {errorMessage}</p>
      )}
    </div>
  );
}
