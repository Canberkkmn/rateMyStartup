"use client";

import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchStartups } from "@/redux/startupSlice";
import StartupItem from "./StartupItem";
import LoadingSpinner from "./atoms/LoadingSpinner";

export default function StartupList() {
  const dispatch = useDispatch<AppDispatch>();
  const { startups, status, error } = useSelector(
    (state: RootState) => state.startups
  );

  useEffect(() => {
    dispatch(fetchStartups());
  }, [dispatch]);

  const setContent = () => {
    if (status === "loading") {
      return <LoadingSpinner text="Fetching startups..." />;
    }

    if (status === "failed") {
      return <p className="text-red-500">{error}</p>;
    }

    return startups.map((startup) => (
      <StartupItem key={startup.id} startup={startup} />
    ));
  };

  return <ul className="space-y-4">{setContent()}</ul>;
}
