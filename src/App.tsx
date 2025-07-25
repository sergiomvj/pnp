import React, { useState, useEffect } from 'react';
import './index.css';
import Header from './components/layout/Header';
import PopularArticles from './components/blog/PopularArticles';
import RecentArticles from './components/blog/RecentArticles';
import CategoriesShowcase from './components/blog/CategoriesShowcase';

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
  }
];

const recentArticles = [
  {
    id: 7,
    title: "O Eterno Dilema do Shape: Entre a Disciplina e a Obsessão",
    excerpt: "Uma reflexão honesta sobre a cultura fitness moderna e a linha tênue entre saúde e neurose.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
    category: "Sweat & Swagger",
    readTime: "8 min",
    publishedAt: "5 horas atrás"
  },
  {
    id: 8,
    title: "Investimentos para Leigos: Quando o Mercado Financeiro Fala Português",
    excerpt: "Desmistificando o mundo dos investimentos sem o jargão financeiro que ninguém entende.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
    category: "Wallet Therapy",
    readTime: "11 min",
    publishedAt: "8 horas atrás"
  }
];

const categories = [
  {
    id: 1,
    name: "Macho World",
    description: "Para homens que ainda estão tentando entender o que se espera deles.",
    icon: "💪",
    color: "bg-gradient-to-r from-blue-500 to-blue-600",
    articles: [
      {
        id: 9,
        title: "O Fim do Homem Provedor?",
        excerpt: "Redefinindo papéis masculinos na sociedade moderna",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
        category: "Macho World",
        readTime: "5 min",
        publishedAt: "1 dia atrás"
      },
      {
        id: 10,
        title: "Chorar é de Homem",
        excerpt: "Quebrando tabus sobre vulnerabilidade masculina",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        category: "Macho World",
        readTime: "6 min",
        publishedAt: "2 dias atrás"
      }
    ]
  },
  {
    id: 2,
    name: "Lipstick Corner",
    description: "Feminilidade com cérebro, sarcasmo e um batom que nunca borra.",
    icon: "💄",
    color: "bg-gradient-to-r from-pink-500 to-red-500",
    articles: [
      {
        id: 11,
        title: "A Arte de Ser Difícil",
        excerpt: "Por que mulheres 'complicadas' incomodam tanto",
        image: "https://images.unsplash.com/photo-1494790108755-2616c78a7ea2?auto=format&fit=crop&w=200&q=80",
        category: "Lipstick Corner",
        readTime: "7 min",
        publishedAt: "1 dia atrás"
      },
      {
        id: 12,
        title: "Salto Alto e Feminismo",
        excerpt: "Pode uma feminista usar salto alto sem contradição?",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
        category: "Lipstick Corner",
        readTime: "8 min",
        publishedAt: "3 dias atrás"
      }
    ]
  },
  {
    id: 3,
    name: "Sixty and Still Kicking",
    description: "A maturidade que não pede licença — ela já sabe onde fica a geladeira.",
    icon: "👴",
    color: "bg-gradient-to-r from-green-500 to-teal-500",
    articles: [
      {
        id: 13,
        title: "Tecnologia Após os 60",
        excerpt: "Adaptando-se ao mundo digital com sabedoria",
        image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=200&q=80",
        category: "Sixty and Still Kicking",
        readTime: "6 min",
        publishedAt: "2 dias atrás"
      },
      {
        id: 14,
        title: "Aposentadoria é Mito",
        excerpt: "Por que parar de trabalhar não é mais uma opção",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
        category: "Sixty and Still Kicking",
        readTime: "9 min",
        publishedAt: "4 dias atrás"
      }
    ]
  },
  {
    id: 4,
    name: "Nerd Brains",
    description: "O universo nerd analisado por quem se orgulha de ter perdido noites em fóruns.",
    icon: "🧠",
    color: "bg-gradient-to-r from-purple-500 to-indigo-500",
    articles: [
      {
        id: 15,
        title: "O Multiverso é Canônico?",
        excerpt: "Debates que importam no universo geek",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=200&q=80",
        category: "Nerd Brains",
        readTime: "12 min",
        publishedAt: "1 dia atrás"
      },
      {
        id: 16,
        title: "IA vs Criatividade Humana",
        excerpt: "O futuro da criação em tempos de ChatGPT",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=200&q=80",
        category: "Nerd Brains",
        readTime: "10 min",
        publishedAt: "3 dias atrás"
      }
    ]
  },
  {
    id: 5,
    name: "Startups & Shenanigans",
    description: "Empreendedorismo sem palco, inovação sem buzzword.",
    icon: "🚀",
    color: "bg-gradient-to-r from-orange-500 to-red-500",
    articles: [
      {
        id: 17,
        title: "Pitch Deck ou Peça de Ficção?",
        excerpt: "Desmistificando apresentações de startups",
        image: "https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=200&q=80",
        category: "Startups & Shenanigans",
        readTime: "8 min",
        publishedAt: "2 dias atrás"
      },
      {
        id: 18,
        title: "Unicórnio ou Cavalo Pintado?",
        excerpt: "A realidade por trás das avaliações bilionárias",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=200&q=80",
        category: "Startups & Shenanigans",
        readTime: "15 min",
        publishedAt: "5 dias atrás"
      }
    ]
  },
  {
    id: 6,
    name: "Sweat & Swagger",
    description: "Suor, luta, vaidade e aquele shape que não veio no Pix.",
    icon: "🏋️",
    color: "bg-gradient-to-r from-red-500 to-pink-500",
    articles: [
      {
        id: 19,
        title: "Ditadura do Tanquinho",
        excerpt: "Fitness além dos padrões irreais de beleza",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=200&q=80",
        category: "Sweat & Swagger",
        readTime: "7 min",
        publishedAt: "1 dia atrás"
      },
      {
        id: 20,
        title: "Artes Marciais e Filosofia",
        excerpt: "Lições de vida que vêm com hematomas",
        image: "https://images.unsplash.com/photo-1555597673-b21adf17c669?auto=format&fit=crop&w=200&q=80",
        category: "Sweat & Swagger",
        readTime: "9 min",
        publishedAt: "4 dias atrás"
      }
    ]
  },
  {
    id: 7,
    name: "Wallet Therapy",
    description: "Dinheiro, investimentos e traumas financeiros com humor e planilha.",
    icon: "💸",
    color: "bg-gradient-to-r from-green-400 to-emerald-500",
    articles: [
      {
        id: 21,
        title: "Reserva de Emergência ou Desculpa?",
        excerpt: "Verdades sobre educação financeira pessoal",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=200&q=80",
        category: "Wallet Therapy",
        readTime: "11 min",
        publishedAt: "2 dias atrás"
      },
      {
        id: 22,
        title: "Crypto: Revolução ou Cassino?",
        excerpt: "Análise realista do mundo das criptomoedas",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=200&q=80",
        category: "Wallet Therapy",
        readTime: "13 min",
        publishedAt: "6 dias atrás"
      }
    ]
  },
  {
    id: 8,
    name: "Update Fever",
    description: "A febre das atualizações que nunca acabam.",
    icon: "💻",
    color: "bg-gradient-to-r from-blue-400 to-cyan-500",
    articles: [
      {
        id: 23,
        title: "iOS vs Android: A Guerra Eterna",
        excerpt: "Por que ainda brigamos por sistemas operacionais",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=200&q=80",
        category: "Update Fever",
        readTime: "6 min",
        publishedAt: "1 dia atrás"
      },
      {
        id: 24,
        title: "Gadgets que Prometem Mudar Sua Vida",
        excerpt: "Spoiler: a maioria só muda sua conta bancária",
        image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=200&q=80",
        category: "Update Fever",
        readTime: "8 min",
        publishedAt: "3 dias atrás"
      }
    ]
  },
  {
    id: 9,
    name: "Modern Love & Old Fights",
    description: "Relacionamentos hétero, com amor, caos e lençóis bagunçados.",
    icon: "❤️‍🔥",
    color: "bg-gradient-to-r from-rose-400 to-pink-500",
    articles: [
      {
        id: 25,
        title: "Apps de Relacionamento são o Novo Bar?",
        excerpt: "Como a tecnologia mudou o jogo do amor",
        image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=200&q=80",
        category: "Modern Love & Old Fights",
        readTime: "10 min",
        publishedAt: "2 dias atrás"
      },
      {
        id: 26,
        title: "A Arte da DR Construtiva",
        excerpt: "Como brigar sem destruir o relacionamento",
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=200&q=80",
        category: "Modern Love & Old Fights",
        readTime: "12 min",
        publishedAt: "5 dias atrás"
      }
    ]
  },
  {
    id: 10,
    name: "The Sideline Report",
    description: "O esporte como ele é: um teatro épico de glória, grana e gritaria.",
    icon: "⚽",
    color: "bg-gradient-to-r from-emerald-500 to-green-600",
    articles: [
      {
        id: 27,
        title: "VAR: Tecnologia ou Teatrinho?",
        excerpt: "Como a tecnologia está mudando o futebol",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=200&q=80",
        category: "The Sideline Report",
        readTime: "7 min",
        publishedAt: "1 dia atrás"
      },
      {
        id: 28,
        title: "Torcida Organizada: Paixão ou Fanatismo?",
        excerpt: "Os limites entre amor ao clube e comportamento tóxico",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=200&q=80",
        category: "The Sideline Report",
        readTime: "9 min",
        publishedAt: "4 dias atrás"
      }
    ]
  }
];

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentSlideData = carouselSlides[currentSlide];

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      {/* Carrossel Principal */}
      <section className="relative overflow-hidden" style={{ height: '600px' }}>
        {/* Imagem de Fundo com Largura Total */}
        <div className="absolute inset-0">
          <img 
            src={currentSlideData.image} 
            alt={currentSlideData.title}
            className="w-full h-full object-cover transition-all duration-1000"
          />
          {/* Overlay escuro para legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>

        {/* Conteúdo à Esquerda */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h2 className="text-6xl font-black mb-6 leading-tight">
              {currentSlideData.title}
            </h2>
            <p className="text-2xl mb-4 font-medium text-blue-100">
              {currentSlideData.subtitle}
            </p>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              {currentSlideData.description}
            </p>
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

      {/* Footer */}
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
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Pulse & Perspective. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
