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
  const setContent = () => {
    if (comments.length <= 0) {
      return <p className={styles["comment-list__empty"]}>No comments yet.</p>;
    }

    return comments.map((comment) => (
      <div key={comment.id} className={styles["comment-list__item"]}>
        <p className={styles["comment-list__author"]}>{comment.author}</p>
        <p className={styles["comment-list__content"]}>{comment.content}</p>
        <p className={styles["comment-list__date"]}>
          {new Date(comment.createdAt).toLocaleString()}
        </p>
      </div>
    ));
  };

  return (
    <div className={styles["comment-list"]}>
      <h2 className={styles["comment-list__title"]}>Comments</h2>
      {setContent()}
    </div>
  );
}
