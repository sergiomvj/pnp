import React, { useState, useEffect } from 'react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  publishedAt: string;
}

interface HeroSectionProps {
  featuredArticles: Article[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ featuredArticles }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredArticles.length]);

  const currentArticle = featuredArticles[currentSlide];

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
  };

  return (
    <section className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
      <div className="relative">
        {/* Carrossel Container */}
        <div className="grid md:grid-cols-2 gap-0 min-h-[500px]">
          {/* Conteúdo da Esquerda - Títulos e Subtítulos */}
          <div className="flex flex-col justify-center p-8 md:p-12 bg-gradient-to-br from-gray-50 to-white">
            <span className="inline-block bg-paynes-gray text-white px-4 py-2 rounded-full text-sm font-medium mb-4 w-fit">
              {currentArticle.category}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {currentArticle.title}
            </h1>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {currentArticle.excerpt}
            </p>
            
            <div className="flex items-center text-sm text-gray-500 mb-8">
              <span>{currentArticle.readTime}</span>
              <span className="mx-2">•</span>
              <span>{currentArticle.publishedAt}</span>
            </div>

            <button className="bg-cambridge-blue text-white px-8 py-4 rounded-lg hover:bg-paynes-gray transition-colors font-medium w-fit">
              Ler Artigo Completo
            </button>
          </div>

          {/* Imagem da Direita - Largura Total */}
          <div className="relative overflow-hidden">
            <img 
              src={currentArticle.image} 
              alt={currentArticle.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            
            {/* Overlay gradiente para melhor legibilidade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Controles de Navegação */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button 
            onClick={goToPrevious}
            className="ml-4 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center">
          <button 
            onClick={goToNext}
            className="mr-4 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Indicadores de Slide */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {featuredArticles.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-cambridge-blue scale-125' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
