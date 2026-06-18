import { useState } from "react";

import { MessageSquare, Send } from "lucide-react";

import { useAskQuestionMutation } from "../../redux/services/knowledgeApi";

const ArticleQuestions = ({ articleId, questions = [] }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    question: "",
  });

  const [askQuestion] = useAskQuestionMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await askQuestion({
        id: articleId,
        ...form,
      }).unwrap();

      setForm({
        name: "",
        email: "",
        question: "",
      });
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
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="text-purple-300" size={24} />

        <h3 className="text-2xl font-bold text-white">Ask a Question</h3>
      </div>

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          className="
          w-full
          p-4
          rounded-xl

          bg-white/5
          border
          border-white/10

          text-white
        "
        />

        <input
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          className="
          w-full
          p-4
          rounded-xl

          bg-white/5
          border
          border-white/10

          text-white
        "
        />

        <textarea
          rows={5}
          placeholder="Ask your question..."
          value={form.question}
          onChange={(e) =>
            setForm({
              ...form,
              question: e.target.value,
            })
          }
          className="
          w-full
          p-4
          rounded-xl

          bg-white/5
          border
          border-white/10

          text-white
        "
        />

        <button
          type="submit"
          className="
  w-full
  md:w-auto

  px-8
  py-4

  rounded-xl

  bg-gradient-to-r
  from-blue-500
  to-purple-600

  hover:from-blue-600
  hover:to-purple-700

  text-white
  font-semibold

  flex
  items-center
  justify-center
  gap-2

  shadow-lg
  shadow-blue-500/20

  hover:shadow-blue-500/40
  hover:-translate-y-1

  transition-all
  duration-300
"
        >
          <Send size={18} />
          Submit Question
        </button>
      </form>

      {/* Answers */}

      {questions.length > 0 && (
        <div className="mt-12 space-y-5">
          {questions.map((item) => (
            <div
              key={item._id}
              className="
              border
              border-white/10

              bg-white/5

              rounded-2xl

              p-5
            "
            >
              <h4 className="font-semibold text-white">{item.question}</h4>

              {item.answer && (
                <div className="mt-3 text-white/70">
                  <strong>AG & Associates:</strong> {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleQuestions;
