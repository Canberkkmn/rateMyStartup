"use client";

import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchStartups } from "@/redux/startupSlice";
import StartupItem from "./StartupItem";

export default function StartupList() {
  const dispatch = useDispatch<AppDispatch>();
  const { startups, status, error } = useSelector(
    (state: RootState) => state.startups
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStartups());
    }
  }, [dispatch, status]);

  const setContent = () => {
    if (status === "loading") {
      return <p className="text-gray-500">No startups found.</p>;
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
