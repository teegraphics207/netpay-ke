import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { guideArticles } from "../data/guides";
import { usePageTitle } from "../lib/usePageTitle";

export function ArticlePage() {
  const { slug } = useParams();
  const article = guideArticles.find((a) => a.slug === slug);

  usePageTitle(article ? article.seoTitle : "Article Not Found | NetPay KE");

  if (!article) {
    return <div className="container mx-auto px-4 py-20 text-center text-slate-500">Article not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Link to="/guides" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-8">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Guides
      </Link>
      
      <article>
        <span className="text-slate-400 font-medium text-sm tracking-widest uppercase">{article.date}</span>
        <h1 className="text-3xl md:text-5xl font-extrabold mt-4 mb-8 text-slate-900 leading-tight">
          {article.title}
        </h1>
        <div className="prose prose-slate prose-emerald max-w-none text-slate-600 leading-relaxed text-lg pb-24">
          {article.content}
        </div>
      </article>
    </div>
  );
}
