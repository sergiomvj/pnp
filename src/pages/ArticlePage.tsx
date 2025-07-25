import React from 'react';

interface Article {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: string;
  tags: string[];
}

interface ArticlePageProps {
  article?: Article;
}

const mockArticle: Article = {
  id: 1,
  title: "O Futuro da Ironia: Como o Sarcasmo Virou Linguagem Universal",
  content: `
    <p>Vivemos numa era onde a ironia se tornou não apenas uma figura de linguagem, mas sim a linguagem universal da comunicação moderna. Desde as redes sociais até conversas casuais, o sarcasmo permeia nossas interações de uma forma que seria impensável há algumas décadas.</p>
    
    <h2>A Revolução Digital do Sarcasmo</h2>
    <p>Com o advento das redes sociais, a ironia encontrou seu habitat natural. Memes, tweets e posts tornaram-se veículos perfeitos para expressar críticas sociais através do humor ácido. O que antes era reservado para conversas entre amigos íntimos, agora é broadcast para milhões.</p>
    
    <p>Mas essa transformação não é apenas uma questão de meio de comunicação. É uma mudança fundamental na forma como processamos e expressamos nossas frustrações com o mundo ao nosso redor.</p>
    
    <h2>O Sarcasmo Como Mecanismo de Defesa</h2>
    <p>Em um mundo cada vez mais polarizado e complexo, a ironia oferece uma forma de lidar com contradições sem precisar tomar posições definitivas. É o equivalente intelectual do dar de ombros – reconhecemos os problemas, mas os envolvemos em uma camada protetora de humor.</p>
    
    <p>Essa tendência reflete não apenas nossa sofisticação comunicativa, mas também nossa crescente desconfiança em relação a discursos absolutos. O sarcasmo se torna, então, uma ferramenta de navegação em águas ideológicas turbulentas.</p>
    
    <h2>Consequências Imprevistas</h2>
    <p>No entanto, quando a ironia se torna dominante, corremos o risco de perder a capacidade de comunicação direta e sincera. As gerações mais jovens, criadas nesse ambiente, às vezes têm dificuldade para expressar emoções genuínas sem o filtro do sarcasmo.</p>
    
    <p>É como se tivéssemos desenvolvido uma linguagem sofisticada para evitar vulnerabilidade, mas no processo, perdemos parte de nossa capacidade de conexão autêntica.</p>
  `,
  excerpt: "Uma análise profunda sobre como a ironia se tornou a forma predominante de comunicação na era digital, transformando não apenas nossas conversas, mas nossa forma de ver o mundo.",
  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
  category: "Nerd Brains",
  readTime: "8 min",
  publishedAt: "2 horas atrás",
  author: "Dr. Sarcástico",
  tags: ["Comunicação", "Sociedade", "Digital", "Ironia", "Linguagem"]
};

const ArticlePage: React.FC<ArticlePageProps> = ({ article = mockArticle }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header simples para a página de artigo */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button className="text-cambridge-blue hover:text-paynes-gray font-medium">
              ← Voltar
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-cambridge-blue transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
              <button className="p-2 text-gray-500 hover:text-cambridge-blue transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cabeçalho do Artigo */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Imagem principal */}
          <div className="aspect-video bg-gradient-to-br from-cambridge-blue to-sage overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 lg:p-12">
            {/* Metadados */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-block bg-paynes-gray text-white px-4 py-2 rounded-full text-sm font-medium">
                {article.category}
              </span>
              <span className="text-gray-500 text-sm">{article.readTime}</span>
              <span className="text-gray-500 text-sm">•</span>
              <span className="text-gray-500 text-sm">{article.publishedAt}</span>
              <span className="text-gray-500 text-sm">•</span>
              <span className="text-gray-500 text-sm">Por {article.author}</span>
            </div>

            {/* Título */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-cambridge-blue hover:text-white transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Botão Expandir com IA Helena */}
            <div className="bg-gradient-to-r from-cambridge-blue-2 to-sage rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">🤖 Expandir com IA Helena</h3>
                  <p className="text-white opacity-90 text-sm">
                    Quer uma análise mais profunda? Helena pode expandir este artigo com insights personalizados.
                  </p>
                </div>
                <button className="bg-white text-cambridge-blue px-6 py-3 rounded-lg font-bold hover:bg-almond transition-colors">
                  Perguntar à Helena
                </button>
              </div>
            </div>

            {/* Conteúdo do Artigo */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-cambridge-blue"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Compartilhamento Social */}
            <div className="border-t border-gray-200 pt-8 mt-12">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Compartilhe este artigo</h3>
              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Facebook
                </button>
                <button className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                  Twitter
                </button>
                <button className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors">
                  LinkedIn
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  WhatsApp
                </button>
              </div>
            </div>

            {/* Navegação entre artigos */}
            <div className="border-t border-gray-200 pt-8 mt-12">
              <div className="flex justify-between items-center">
                <button className="flex items-center text-cambridge-blue hover:text-paynes-gray font-medium transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Artigo anterior
                </button>
                <button className="flex items-center text-cambridge-blue hover:text-paynes-gray font-medium transition-colors">
                  Próximo artigo
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Chat flutuante da Helena (placeholder) */}
        <div className="fixed bottom-6 right-6 z-50">
          <button className="bg-cambridge-blue text-white p-4 rounded-full shadow-lg hover:bg-paynes-gray transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
};

export default ArticlePage;
