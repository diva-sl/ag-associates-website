import { BookOpen } from "lucide-react";

const CategoryTabs = ({
  categories = [],
  activeCategory = "all",
  onChange,
}) => {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      shadow-sm
      p-3
      overflow-x-auto
    "
    >
      <div className="flex gap-3 min-w-max">
        {/* All */}

        <button
          onClick={() => onChange("all")}
          className={`
            flex
            items-center
            gap-2
            px-5
            py-3
            rounded-2xl
            whitespace-nowrap
            transition-all
            font-medium

            ${
              activeCategory === "all"
                ? `
                bg-gradient-to-r
                from-[#511D43]
                to-[#901E3E]
                text-white
                shadow-lg
              `
                : `
                bg-slate-100
                text-slate-700
                hover:bg-slate-200
              `
            }
          `}
        >
          <BookOpen size={18} />
          All Articles
        </button>

        {/* Dynamic Categories */}

        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => onChange(category.slug)}
            className={`
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-2xl
              whitespace-nowrap
              transition-all
              font-medium

              ${
                activeCategory === category.slug
                  ? `
                  bg-gradient-to-r
                  from-[#511D43]
                  to-[#901E3E]
                  text-white
                  shadow-lg
                `
                  : `
                  bg-slate-100
                  text-slate-700
                  hover:bg-slate-200
                `
              }
            `}
          >
            <span>{category.name}</span>

            {category.postCount > 0 && (
              <span
                className={`
                  px-2
                  py-0.5
                  rounded-full
                  text-xs

                  ${
                    activeCategory === category.slug
                      ? "bg-white/20"
                      : "bg-slate-200"
                  }
                `}
              >
                {category.postCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
