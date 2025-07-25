import React, { useState, useEffect } from 'react';
import './index.css';
import Header from './components/layout/Header';
import PopularArticles from './components/blog/PopularArticles';
import RecentArticles from './components/blog/RecentArticles';
import CategoriesShowcase from './components/blog/CategoriesShowcase';
import HelenaChat from './components/chat/HelenaChat';
import SetupPage from './pages/SetupPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// Dados de exemplo para a revista
const carouselSlides = [
  {
    id: 1,
    title: "Bem-vindo ao Pulse & Perspective",
    subtitle: "A revista eletrônica para mentes inquietas e corações cansados de conteúdo raso",
    description: "Aqui, cada tema relevante é tratado com inteligência crítica, ironia afiada e uma pitada de humor inteligente.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1920&q=80",
    buttonText: "Explore Agora"
  },
  {
    id: 2,
    title: "Análises Profundas & Perspectivas Únicas",
    subtitle: "Conteúdo que desafia o senso comum e estimula o pensamento crítico",
    description: "Mergulhe em artigos que vão além da superfície, oferecendo insights valiosos sobre os assuntos que realmente importam.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1920&q=80",
    buttonText: "Comece a Ler"
  },
  {
    id: 3,
    title: "Para Mentes Inquietas",
    subtitle: "Onde curiosidade encontra conhecimento de qualidade",
    description: "Descubra artigos cuidadosamente selecionados que alimentam sua sede de conhecimento e expandem seus horizontes.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1920&q=80",
    buttonText: "Descubra Mais"
  }
];


const popularArticles = [
  {
    id: 4,
    title: "A Revolução Silenciosa dos 60+: Quando a Maturidade Encontra a Rebeldia",
    excerpt: "Uma geração que não aceita mais ser ignorada está redefinindo o que significa envelhecer no século XXI.",
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=600&q=80",
    category: "Sixty and Still Kicking",
    readTime: "7 min",
    publishedAt: "1 dia atrás"
  },
  {
    id: 5,
    title: "Lipstick e Poder: A Nova Feminilidade Sem Pedidos de Desculpa",
    excerpt: "Como uma geração de mulheres está redefinindo elegância, força e feminilidade nos próprios termos.",
    image: "https://images.unsplash.com/photo-1494790108755-2616c78a7ea2?auto=format&fit=crop&w=600&q=80",
    category: "Lipstick Corner",
    readTime: "9 min",
    publishedAt: "2 dias atrás"
  },
  {
    id: 6,
    title: "Crypto, NFTs e o Futuro: Navegando no Hype Sem Perder a Sanidade",
    excerpt: "Decifrando o mundo das criptomoedas entre promessas revolucionárias e realidade de mercado.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80",
    category: "Update Fever",
    readTime: "12 min",
    publishedAt: "3 dias atrás"
  },
  {
    id: 7,
    title: "O Futuro do Trabalho: Home Office, IA e Novas Carreiras",
    excerpt: "Como a tecnologia está mudando o mercado de trabalho e o que esperar das próximas décadas.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    category: "Update Fever",
    readTime: "10 min",
    publishedAt: "6 horas atrás"
  },
  {
    id: 8,
    title: "Café, Livros e Minimalismo: O Novo Luxo Urbano",
    excerpt: "Por que menos é mais para a geração que busca propósito e não só posses.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    category: "Nerd Brains",
    readTime: "6 min",
    publishedAt: "3 horas atrás"
  },
  {
    id: 9,
    title: "A Reinvenção do Masculino: Entre a Força e a Vulnerabilidade",
    excerpt: "Novos olhares sobre masculinidade e saúde mental.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    category: "Macho World",
    readTime: "8 min",
    publishedAt: "2 horas atrás"
  }
];


const recentArticles = [
  {
    id: 10,
    title: "O Eterno Dilema do Shape: Entre a Disciplina e a Obsessão",
    excerpt: "Uma reflexão honesta sobre a cultura fitness moderna e a linha tênue entre saúde e neurose.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
    category: "Sweat & Swagger",
    readTime: "8 min",
    publishedAt: "5 horas atrás"
  },
  {
    id: 11,
    title: "Investimentos para Leigos: Quando o Mercado Financeiro Fala Português",
    excerpt: "Desmistificando o mundo dos investimentos sem o jargão financeiro que ninguém entende.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
    category: "Wallet Therapy",
    readTime: "11 min",
    publishedAt: "8 horas atrás"
  },
  {
    id: 12,
    title: "Como a Geração Z Está Mudando o Consumo de Mídia",
    excerpt: "Novos hábitos, plataformas e o impacto na publicidade digital.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    category: "Update Fever",
    readTime: "7 min",
    publishedAt: "1 hora atrás"
  },
  {
    id: 13,
    title: "Saúde Mental em Alta: O Novo Tabu das Redes Sociais",
    excerpt: "Por que falar de ansiedade e burnout virou pauta obrigatória.",
    image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
    category: "Nerd Brains",
    readTime: "9 min",
    publishedAt: "30 minutos atrás"
  },
  {
    id: 14,
    title: "O Poder do Storytelling nas Marcas Modernas",
    excerpt: "Como contar boas histórias virou diferencial competitivo.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    category: "Wallet Therapy",
    readTime: "10 min",
    publishedAt: "10 minutos atrás"
  }
];

const categories = [
  {
    id: 1,
    name: "Macho World",
    description: "Para homens que ainda estão tentando entender o que se espera deles.",
    icon: "💪",
    color: "bg-gradient-to-r from-blue-500 to-blue-600",
    articles: []
  },
  {
    id: 2,
    name: "Lipstick Corner",
    description: "Feminilidade com cérebro, sarcasmo e um batom que nunca borra.",
    icon: "💄",
    color: "bg-gradient-to-r from-pink-500 to-pink-600",
    articles: []
  },
  {
    id: 3,
    name: "Nerd Brains",
    description: "Para quem acha que cultura pop, ciência e tecnologia são o novo sexy.",
    icon: "🧠",
    color: "bg-gradient-to-r from-green-500 to-green-600",
    articles: []
  }
];

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentSlideData = carouselSlides[currentSlide];

  const goToSlide = (index: number) => setCurrentSlide(index);
  const goToPrevious = () => setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Carrossel Principal */}
                <section className="relative overflow-hidden" style={{ height: '600px' }}>
                  <div className="absolute inset-0">
                    <img
                      src={currentSlideData.image}
                      alt={currentSlideData.title}
                      className="w-full h-full object-cover transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
                  </div>
                  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <div className="max-w-2xl text-white">
                      <h2 className="text-6xl font-black mb-6 leading-tight">{currentSlideData.title}</h2>
                      <p className="text-2xl mb-4 font-medium text-blue-100">{currentSlideData.subtitle}</p>
                      <p className="text-xl mb-8 opacity-90 leading-relaxed">{currentSlideData.description}</p>
                      <button className="bg-cambridge-blue text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-paynes-gray transition-colors shadow-lg">
                        {currentSlideData.buttonText}
                      </button>
                    </div>
                  </div>
                  {/* Controles de Navegação */}
                  <div className="absolute inset-y-0 left-0 flex items-center z-20">
                    <button
                      onClick={goToPrevious}
                      className="ml-6 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full backdrop-blur-sm transition-all hover:scale-110"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center z-20">
                    <button
                      onClick={goToNext}
                      className="mr-6 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full backdrop-blur-sm transition-all hover:scale-110"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  {/* Indicadores de Slide */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
                    {carouselSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-4 h-4 rounded-full transition-all backdrop-blur-sm ${
                          index === currentSlide
                            ? 'bg-cambridge-blue scale-125 shadow-lg'
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </section>
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                  <PopularArticles articles={popularArticles} />
                  <RecentArticles articles={recentArticles} />
                  <CategoriesShowcase categories={categories} />
                </main>
                <HelenaChat />
                <footer className="bg-paynes-gray dark:bg-gray-800 text-white py-12 transition-colors duration-300">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                      <div className="col-span-2">
                        <h3 className="text-2xl font-bold mb-4">Pulse & Perspective</h3>
                        <p className="text-gray-300 dark:text-gray-400 mb-4">
                          Conteúdo inteligente, crítico e bem-humorado para quem pensa, questiona e ri de si mesmo.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Categorias</h4>
                        <ul className="space-y-2 text-gray-300 dark:text-gray-400">
                          <li><a href="#" className="hover:text-white dark:hover:text-sage transition-colors">Macho World</a></li>
                          <li><a href="#" className="hover:text-white dark:hover:text-sage transition-colors">Lipstick Corner</a></li>
                          <li><a href="#" className="hover:text-white dark:hover:text-sage transition-colors">Nerd Brains</a></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Contato</h4>
                        {/* ...restante do footer... */}
                      </div>
                    </div>
                  </div>
                </footer>
              </>
            }
          />
          <Route path="/setup" element={<SetupPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;