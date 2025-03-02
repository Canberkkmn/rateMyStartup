"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchStartup } from "@/redux/startupSlice";
import LoadingSpinner from "../atoms/LoadingSpinner";
import ErrorMessage from "../molecules/ErrorMessage";
import { voteForStartup } from "@/redux/voteSlice";

import styles from "@/styles/components/organisms/_startup-details.module.scss";

export default function StartupDetails() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedStartup, status } = useSelector(
    (state: RootState) => state.startups
  );
  const { status: voteStatus } = useSelector((state: RootState) => state.votes);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchStartup(params.id));
    }
  }, [dispatch, params.id]);

  function handleVote(rating: number) {
    dispatch(voteForStartup({ id: selectedStartup?.id, rating }));
  }

  if (status === "idle" || !selectedStartup) {
    return (
      <LoadingSpinner
        text="Fetching startup"
        aria-live="polite"
        aria-busy="true"
      />
    );
  }

  if (status === "failed") {
    return <ErrorMessage message="Failed to fetch startup." />;
  }

  return (
    <section
      className={styles["startup-details"]}
      role="region"
      aria-labelledby="startup-title"
      aria-live="polite"
    >
      <h1 id="startup-title" className={styles["startup-details__title"]}>
        {selectedStartup?.name}
      </h1>
      <p className={styles["startup-details__description"]}>
        {selectedStartup?.description}
      </p>

      <div
        className={styles["startup-details__rating"]}
        aria-describedby="rating-info"
      >
        <span className={styles["startup-details__stars"]} id="rating-info">
          ⭐ {selectedStartup?.rating.toFixed(1)} / 5
        </span>
        <p className={styles["startup-details__votes"]}>
          ({selectedStartup?.votes} votes)
        </p>
      </div>

      <div className={styles["startup-details__buttons"]}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => handleVote(rating)}
            className={styles["startup-details__button"]}
            aria-label={`Rate ${selectedStartup?.name} ${rating} stars`}
          >
            {rating} ⭐
          </button>
        ))}
      </div>

      {voteStatus !== "idle" && <ErrorMessage message={voteStatus} />}
    </section>
  );
}
