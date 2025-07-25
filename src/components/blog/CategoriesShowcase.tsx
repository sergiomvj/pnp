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

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  articles: Article[];
}

interface CategoriesShowcaseProps {
  categories: Category[];
}

const CategoriesShowcase: React.FC<CategoriesShowcaseProps> = ({ categories }) => {
  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Explore Nossas Categorias</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Conteúdo crítico e bem-humorado para mentes inquietas, dividido em universos únicos
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div key={category.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className={`h-3 ${category.color}`}></div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{category.icon}</span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-cambridge-blue dark:group-hover:text-sage transition-colors">
                  {category.name}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {category.description}
              </p>
              
              {/* Artigos da categoria */}
              <div className="space-y-4">
                {category.articles.slice(0, 2).map((article) => (
                  <div key={article.id} className="flex gap-3 group/article cursor-pointer">
                    <div className="w-16 h-12 bg-gradient-to-br from-sage to-almond rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover/article:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm group-hover/article:text-cambridge-blue dark:group-hover/article:text-sage transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-500">{article.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 py-2 text-cambridge-blue hover:text-white hover:bg-cambridge-blue dark:hover:bg-sage border border-cambridge-blue dark:border-sage rounded-lg font-medium transition-all duration-300">
                Ver mais em {category.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesShowcase;
