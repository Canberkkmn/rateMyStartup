"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Input from "@/components/atoms/Input";

import styles from "@/styles/components/molecules/_search-input.module.scss";

const SearchInput: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }

    router.replace(`?${params.toString()}`);
  }, [searchTerm, router]);

  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearchTerm("");
    }
  }, [searchParams]);

  return (
    <div className={styles["search-input"]}>
      <Input
        type="text"
        placeholder="Search startups..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        id="search"
        name="search"
        aria-label="Search for startups"
        aria-live="polite"
      />
    </div>
  );
};

export default SearchInput;
