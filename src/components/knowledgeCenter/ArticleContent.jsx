import parse from "html-react-parser";

const ArticleContent = ({ content }) => {
  console.log(content);
  return (
    <div
      className="
     rounded-[36px]
     border
     border-white/10
     bg-white/[0.04]
     backdrop-blur-2xl
     p-8
     md:p-12
   "
    >
      <article
        className="
prose
prose-invert
prose-xl
max-w-none

```
      prose-headings:text-white
      prose-headings:font-bold
      prose-headings:tracking-tight

      prose-h1:text-4xl
      prose-h1:mb-8

      prose-h2:text-3xl
      prose-h2:mt-12
      prose-h2:mb-6

      prose-h3:text-2xl
      prose-h3:mt-8
      prose-h3:mb-4

      prose-p:text-white/85
      prose-p:leading-8

      prose-strong:text-white

      prose-li:text-white/80
      prose-li:leading-8

      prose-ul:my-6
      prose-ol:my-6

      prose-a:text-cyan-400
      prose-a:no-underline
      hover:prose-a:text-cyan-300

      prose-blockquote:border-l-4
      prose-blockquote:border-cyan-500
      prose-blockquote:bg-white/5
      prose-blockquote:rounded-r-xl
      prose-blockquote:py-2
      prose-blockquote:px-6
      prose-blockquote:text-white

      prose-img:rounded-3xl
      prose-img:shadow-2xl

      prose-code:text-cyan-400
    "
      >
        {parse(content || "")}
      </article>
    </div>
  );
};

export default ArticleContent;
