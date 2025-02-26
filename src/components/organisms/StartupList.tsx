"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchStartups, Startup } from "@/redux/startupSlice";
import StartupItem from "@/components/molecules/StartupItem";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import ErrorMessage from "../molecules/ErrorMessage";

import styles from "@/styles/components/organisms/_startup-list.module.scss";

export default function StartupList() {
  const dispatch = useDispatch<AppDispatch>();
  const { startups, status, error } = useSelector(
    (state: RootState) => state.startups
  );
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    dispatch(fetchStartups());
  }, [dispatch]);

  const filteredStartups = startups.filter((startup) =>
    startup.name.toLowerCase().includes(searchTerm)
  );

  const setContent = () => {
    if (status === "loading" || status === "idle") {
      return <LoadingSpinner text="Fetching startups..." />;
    }

    if (status === "failed") {
      return <ErrorMessage message={error || ""} />;
    }

    if (filteredStartups.length === 0) {
      return (
        <p className={styles["startup-list__empty"]}>
          No startups found matching your search.
        </p>
      );
    }

    return filteredStartups.map((startup: Startup) => (
      <StartupItem key={startup.id} startup={startup} />
    ));
  };

  return <ul className={styles["startup-list"]}>{setContent()}</ul>;
}
