import { ThumbsUp, ThumbsDown } from "lucide-react";

import { useMarkHelpfulMutation } from "../../redux/services/knowledgeApi";

const ArticleHelpful = ({ articleId, helpfulCount, notHelpfulCount }) => {
  const [markHelpful] = useMarkHelpfulMutation();

  const submitVote = async (helpful) => {
    try {
      await markHelpful({
        id: articleId,
        helpful,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="
      rounded-[32px]
      border
      border-white/10
      bg-white/[0.04]
      backdrop-blur-2xl
      p-8
    "
    >
      <h3 className="text-xl font-bold text-white">
        Was this article helpful?
      </h3>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => submitVote(true)}
          className="
          flex items-center gap-2

          px-6 py-3

          rounded-xl

          bg-green-500/10
          border border-green-500/20

          text-green-300
        "
        >
          <ThumbsUp size={18} />
          Helpful ({helpfulCount})
        </button>

        <button
          onClick={() => submitVote(false)}
          className="
          flex items-center gap-2

          px-6 py-3

          rounded-xl

          bg-red-500/10
          border border-red-500/20

          text-red-300
        "
        >
          <ThumbsDown size={18} />
          Not Helpful ({notHelpfulCount})
        </button>
      </div>
    </div>
  );
};

export default ArticleHelpful;
