# Plano de Execução – Pulse & Perspective

Este checklist detalha as etapas e subetapas de desenvolvimento do projeto conforme o PRD.

---

## Fase 1 – MVP (Semana 1 a 6)


- [x] Layout moderno e responsivo
- [x] [dinamização] Home dinâmica com dados do banco
- [x] Banner editorial com identidade visual
- [x] [dinamização] Banner dinâmico
- [x] Seção de artigos em destaque (hero articles)
- [x] [dinamização] Hero articles dinâmicos
- [x] Grid de artigos mais populares
- [x] [dinamização] Grid dinâmico de populares
- [x] Seção de artigos mais recentes
- [x] [dinamização] Artigos recentes dinâmicos
- [x] Showcase das 10 categorias principais com preview de artigos
- [x] [dinamização] Showcase dinâmico de categorias
- [x] Navegação principal e menu responsivo
- [x] [dinamização] Menu dinâmico
- [x] Footer com links e informações
- [x] [dinamização] Footer dinâmico


- [x] Editor com corretor ortográfico (LanguageTool multi-idiomas)
- [x] Sugestão de imagem via API e IA (resumo automático, busca e seleção)
- [x] Parâmetros de SEO gerados por IA (descrição, keywords, hashtags, negrito nos termos)
- [x] Página de edição/exclusão de artigos (restrição: só edita o que criou, só admin exclui)
- [x] Histórico de edições
- [x] Permissões de edição/exclusão por função
- [x] Envio do artigo só habilitado com imagem e SEO definidos
- [x] Implementação dinâmica dos artigos (mock data)
- [x] Formulário dinâmico de cadastro/edição de artigo


- [x] Página individual de artigo com visual atraente
- [x] Sistema de tags e categorização
- [x] Botão "Expandir com IA Helena"
- [x] Compartilhamento social básico
- [x] Navegação entre artigos (anterior/próximo)
- [x] Tempo estimado de leitura
- [x] Modo escuro/claro
- [x] Implementação dinâmica da leitura de artigos (mock data)

- [x] Sistema de login/registro com Supabase
- [x] Login social com Google
- [x] Perfil básico do usuário (nickname, avatar)
- [x] Histórico de leitura
- [x] Preferências de categorias
- [x] Definição de funções e privilégios
- [x] Implementação dinâmica de perfis e usuários (mock data)
- [x] Formulário dinâmico de cadastro/edição de perfil

### 🤖 IA Helena - Versão Básica
- [x] Chat flutuante em todas as páginas
- [x] Respostas contextuais sobre artigos
- [x] Integração com OpenAI API
- [x] Sistema de logging de conversas

### 🚀 Fase 2 – Beta (Semana 7 a 12)


### 🧠 IA Helena Contextual
- [x] Geração de pautas personalizadas
- [x] Sistema de persona do usuário
- [x] Memória de conversas por usuário
- [x] Sugestões de conteúdo baseadas em perfil

### 📰 Sistema de Clipping Automático
- [x] Integração N8N com fontes RSS
- [x] Curadoria automática via IA
- [x] Resumos editoriais diários
- [x] Envio via WhatsApp (Evolution API)

### 🎮 Gamificação Básica
- [x] Sistema de pontos por ações
- [x] Badges por categorias lidas
- [x] Ranking de leitores
- [x] Conquistas desbloqueáveis

### 👤 Perfil Avançado do Usuário
- [x] Dashboard com estatísticas de leitura
- [x] Avatar editorial personalizado
- [x] Preferências detalhadas por categoria
- [x] Histórico completo de interações
- [x] Artigos Favoritos do Usuário

### 🎙️ Fase 3 – Expansão (Semana 13 a 18)

### 🎧 Sistema de Podcast Interativo
- [x] Player nativo com timeline
- [x] Comentários vinculados a timestamps
- [x] Integração de áudio com artigos
- [x] Sistema de transcrição automática
- [x] Geração de roteiro enriquecido por IA (pesquisa, citações, detalhes)
- [x] Roteiro alternando falas entre voz masculina e feminina
- [x] Integração com ElevenLabs para geração de áudio profissional
- [x] Podcast salvo e disponível para todos os usuários

### 🤖 Helena Avançada
- [x] Memória persistente entre sessões
- [x] Análise de padrões de leitura
- [x] Geração de conteúdo personalizado
- [x] Integração com todas as funcionalidades

### 🌐 Recursos Sociais e Engajamento
- [x] Compartilhamento de trechos como cards
- [x] Stories automáticos para redes sociais
- [x] Sistema de desafios entre usuários
- [x] Comentários e discussões em artigos
- [x] Ranking de artigos com mais Likes e Shares

### 💰 Sistema de Monetização
- [x] Planos Premium definidos
- [x] Gateway de pagamento integrado
- [x] Gestão de assinaturas
- [x] Conteúdo exclusivo para assinantes
- [x] Clube de Vantagens e Prêmios

## 🛠️ Infraestrutura e Administração

### 🔧 Setup Técnico Inicial
- [x] Configuração Vite + React + TypeScript
- [x] Setup TailwindCSS com paleta de cores personalizada
- [x] Estrutura de componentes organizada
- [x] Servidor de desenvolvimento funcionando
- [x] Configuração Supabase (Auth, Database, Storage)


- [x] CMS para publicação de artigos
- [x] Sistema de moderação de conteúdo
- [x] Analytics e métricas editoriais
- [x] Configuração de comportamento da IA Helena
- [x] Gestão de usuários e permissões
- [x] Setup Integração OpenAI API
- [x] Setup N8N para automações
- [x] Setup Meios de Pagamento ( Stripe )
- [x] Configuração Evolution API (WhatsApp)
- [x] Deploy inicial com CI/CD
- [x] Implementação dinâmica do painel admin (mock data)
- [x] Formulários dinâmicos de cadastro/edição para todos os recursos admin

- [x] Cadastro de formatos de ads, localização e custos
- [x] Cadastro de Clientes e Campanhas
- [x] Faturamento
- [x] Documentação técnica completa
- [x] Implementação dinâmica de comercial (mock data)
- [x] Formulários dinâmicos de cadastro/edição de ads, clientes, campanhas, faturamento

### 📊 Qualidade e Testes
- [ ] Testes unitários por funcionalidade
- [ ] Testes de integração entre sistemas
- [ ] Documentação técnica completa
- [ ] Versionamento e deploy automatizado

---

> Checklist baseado no PRD do Pulse & Perspective. Atualize conforme o progresso do projeto.
