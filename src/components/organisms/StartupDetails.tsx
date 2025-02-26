"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchStartup } from "@/redux/startupSlice";
import LoadingSpinner from "../atoms/LoadingSpinner";
import ErrorMessage from "../molecules/ErrorMessage";
import { voteForStartup } from "@/redux/voteSlice";

export default function StartupDetails() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedStartup, status } = useSelector(
    (state: RootState) => state.startups
  );
  const { status: voteStatus, error } = useSelector(
    (state: RootState) => state.votes
  );

  console.log("selectedStartup", selectedStartup, voteStatus);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchStartup(params.id));
    }
  }, [dispatch, params.id]);

  function handleVote(rating: number) {
    dispatch(voteForStartup({ id: selectedStartup?.id, rating }));
  }

  if (status === "idle" || !selectedStartup) {
    return <LoadingSpinner text="Fetching startup" />;
  }

  if (status === "failed") {
    return <ErrorMessage message="Failed to fetch startup." />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">{selectedStartup?.name}</h1>
      <p className="text-gray-600 mt-2">{selectedStartup?.description}</p>

      <div className="mt-4">
        <span className="text-yellow-500 font-bold">
          ⭐ {selectedStartup?.rating.toFixed(1)} / 5
        </span>
        <p className="text-gray-500">({selectedStartup?.votes} votes)</p>
      </div>
      <div className="mt-4 space-x-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => handleVote(rating)}
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700"
          >
            {rating} ⭐
          </button>
        ))}
      </div>
      {voteStatus !== "idle" && <ErrorMessage message={voteStatus} />}
    </div>
  );
}
