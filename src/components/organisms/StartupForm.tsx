/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStartup } from "@/redux/startupSlice";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

import styles from "@/styles/components/organisms/_startup-form.module.scss";

export default function AddStartupForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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
    <div className={styles["startup-form"]}>
      <form onSubmit={handleSubmit} className={styles["startup-form__form"]}>
        <Input
          label="Startup Name"
          placeholder="Enter startup name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={status === "error" && !name ? "Startup name is required" : ""}
          required
        />
        <Input
          label="Description"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="secondary"
          className={styles["startup-form__button"]}
          disabled={status === "loading"}
          isLoading={status === "loading"}
        >
          {status === "loading" ? "Adding..." : "Add Startup"}
        </Button>
      </form>

      {status === "success" && (
        <p className={styles["startup-form__success-message"]}>
          Startup added successfully!
        </p>
      )}
      {status === "error" && (
        <p className={styles["startup-form__error-message"]}>
          Error: {errorMessage}
        </p>
      )}
    </div>
  );
}
