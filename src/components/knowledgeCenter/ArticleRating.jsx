import { useState } from "react";
import { Star } from "lucide-react";

import { useRateArticleMutation } from "../../redux/services/knowledgeApi";

const ArticleRating = ({ articleId, currentRating = 0 }) => {
  const [selected, setSelected] = useState(0);

  const [rateArticle, { isLoading }] = useRateArticleMutation();

  const handleRate = async (rating) => {
    try {
      setSelected(rating);

      await rateArticle({
        id: articleId,
        rating,
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
      <h3 className="text-2xl font-bold text-white">Rate this Article</h3>

      <p className="text-white/60 mt-2">
        Help us improve our knowledge content.
      </p>

      <div className="flex gap-2 mt-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            disabled={isLoading}
            onClick={() => handleRate(star)}
          >
            <Star
              size={32}
              className={
                star <= (selected || currentRating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-white/30"
              }
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ArticleRating;
