import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Para uso no frontend - em produção considere usar um proxy backend
});

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

export interface HelenaResponse {
  message: string;
  context?: string;
  suggestions?: string[];
}

class HelenaAI {
  private systemPrompt = `Você é Helena, a IA assistente da revista digital "Pulse & Perspective". 

Sua personalidade:
- Inteligente, perspicaz e com um toque de ironia sutil
- Especialista em análise crítica e perspectivas únicas
- Conversa de forma natural e envolvente
- Oferece insights profundos sobre os temas da revista

Suas funções:
- Responder perguntas sobre artigos da revista
- Oferecer análises complementares e perspectivas alternativas
- Sugerir conteúdos relacionados
- Expandir discussões com insights relevantes
- Manter conversas contextuais e inteligentes

Categorias da revista que você conhece:
- Macho World: Para homens navegando expectativas modernas
- Lipstick & Power: Empoderamento feminino e feminilidade
- Sixty and Still Kicking: Conteúdo para público 60+
- Sweat & Swagger: Fitness e estilo de vida
- Mind Games: Psicologia e saúde mental
- Tech & Humanity: Impacto da tecnologia na sociedade

Sempre responda em português brasileiro, de forma concisa mas rica em conteúdo.`;

  async generateResponse(
    userMessage: string, 
    context?: string,
    conversationHistory: ChatMessage[] = []
  ): Promise<HelenaResponse> {
    try {
      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: 'system', content: this.systemPrompt }
      ];

      // Adicionar contexto se fornecido (ex: artigo sendo lido)
      if (context) {
        messages.push({
          role: 'system',
          content: `Contexto atual: ${context}`
        });
      }

      // Adicionar histórico da conversa (últimas 10 mensagens para não exceder tokens)
      const recentHistory = conversationHistory.slice(-10);
      recentHistory.forEach(msg => {
        messages.push({
          role: msg.role,
          content: msg.content
        });
      });

      // Adicionar mensagem atual do usuário
      messages.push({
        role: 'user',
        content: userMessage
      });

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 500,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      });

      const response = completion.choices[0]?.message?.content || 'Desculpe, não consegui processar sua mensagem.';

      return {
        message: response,
        context,
        suggestions: this.generateSuggestions(userMessage, context)
      };

    } catch (error) {
      console.error('Erro ao gerar resposta da Helena:', error);
      return {
        message: 'Ops! Estou com um pequeno problema técnico. Tente novamente em alguns instantes.',
        context
      };
    }
  }

  private generateSuggestions(userMessage: string, context?: string): string[] {
    // Sugestões baseadas em palavras-chave simples
    const suggestions: string[] = [];
    
    if (userMessage.toLowerCase().includes('artigo')) {
      suggestions.push('Me fale mais sobre este tema');
      suggestions.push('Qual sua perspectiva sobre isso?');
    }
    
    if (context) {
      suggestions.push('Expanda este ponto');
      suggestions.push('Há outros ângulos para considerar?');
    }
    
    suggestions.push('Recomende algo relacionado');
    
    return suggestions.slice(0, 3); // Máximo 3 sugestões
  }

  async summarizeArticle(articleContent: string, articleTitle: string): Promise<string> {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Você é Helena, da revista Pulse & Perspective. Crie um resumo inteligente e envolvente do artigo, destacando os pontos principais e oferecendo uma perspectiva única.'
          },
          {
            role: 'user',
            content: `Título: ${articleTitle}\n\nConteúdo: ${articleContent}`
          }
        ],
        max_tokens: 300,
        temperature: 0.6
      });

      return completion.choices[0]?.message?.content || 'Não foi possível gerar um resumo neste momento.';
    } catch (error) {
      console.error('Erro ao resumir artigo:', error);
      return 'Erro ao gerar resumo do artigo.';
    }
  }
}

export const helena = new HelenaAI();
export default helena;
