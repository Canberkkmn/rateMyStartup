import styles from "@/styles/components/organisms/_comment-list.module.scss";

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  const formattedDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));

  return (
    <section
      className={styles["comment-list"]}
      aria-labelledby="comments-title"
    >
      <h2 id="comments-title" className={styles["comment-list__title"]}>
        Comments
      </h2>
      {comments.length === 0 ? (
        <p className={styles["comment-list__empty"]} role="status">
          No comments yet.
        </p>
      ) : (
        <ul className={styles["comment-list__items"]} aria-live="polite">
          {comments.map((comment) => (
            <li key={comment.id} className={styles["comment-list__item"]}>
              <p className={styles["comment-list__author"]}>
                <strong>{comment.author}</strong>
              </p>
              <p className={styles["comment-list__content"]}>
                {comment.content}
              </p>
              <p className={styles["comment-list__date"]}>
                {formattedDate(comment.createdAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
