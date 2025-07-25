import React from 'react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  publishedAt: string;
}

interface PopularArticlesProps {
  articles: Article[];
}

const PopularArticles: React.FC<PopularArticlesProps> = ({ articles }) => {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Mais Populares</h2>
        <button className="text-cambridge-blue hover:text-paynes-gray dark:hover:text-sage font-medium transition-colors">
          Ver todos
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <article key={article.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300">
            <div className="aspect-video bg-gradient-to-br from-almond to-sage overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <span className="inline-block bg-cambridge-blue text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
                {article.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-cambridge-blue dark:group-hover:text-sage transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                <span>{article.readTime}</span>
                <span>{article.publishedAt}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PopularArticles;
