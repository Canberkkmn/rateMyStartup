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
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="p-3 border-b">
            <p className="font-semibold">{comment.author}</p>
            <p className="text-gray-600">{comment.content}</p>
            <p className="text-sm text-gray-400">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}
    </div>
  );
}
