# Plano de Execução – Pulse & Perspective

Este checklist detalha as etapas e subetapas de desenvolvimento do projeto conforme o PRD.

---

## Fase 1 – MVP (Semana 1 a 6)

### 🏠 Home (Página Inicial)
- [x] Layout moderno e responsivo
- [x] Banner editorial com identidade visual
- [x] Seção de artigos em destaque (hero articles)
- [x] Grid de artigos mais populares
- [x] Seção de artigos mais recentes
- [x] Showcase das 10 categorias principais com preview de artigos
- [x] Navegação principal e menu responsivo
- [x] Footer com links e informações

### 📖 Sistema de Leitura de Artigos
- [x] Página individual de artigo com visual atraente
- [x] Sistema de tags e categorização
- [x] Botão "Expandir com IA Helena"
- [x] Compartilhamento social básico
- [x] Navegação entre artigos (anterior/próximo)
- [x] Tempo estimado de leitura
- [x] Modo escuro/claro

### 🔐 Autenticação e Perfil
- [x] Sistema de login/registro com Supabase
- [x] Login social com Google
- [x] Perfil básico do usuário (nickname, avatar)
- [x] Histórico de leitura
- [x] Preferências de categorias

### 🤖 IA Helena - Versão Básica
- [ ] Chat flutuante em todas as páginas
- [ ] Respostas contextuais sobre artigos
- [ ] Integração com OpenAI API
- [x] Sistema de logging de conversas
### 🚀 Fase 2 – Beta (Semana 7 a 12)

### 🧠 IA Helena Contextual
- [ ] Geração de pautas personalizadas
- [ ] Sistema de persona do usuário
- [x] Memória de conversas por usuário
- [ ] Sugestões de conteúdo baseadas em perfil

### 📰 Sistema de Clipping Automático
- [ ] Integração N8N com fontes RSS
- [ ] Curadoria automática via IA
- [ ] Resumos editoriais diários
- [ ] Envio via WhatsApp (Evolution API)

### 🎮 Gamificação Básica
- [x] Sistema de pontos por ações
- [x] Badges por categorias lidas
- [ ] Ranking de leitores
- [x] Conquistas desbloqueáveis

### 👤 Perfil Avançado do Usuário
- [x] Dashboard com estatísticas de leitura
- [x] Avatar editorial personalizado
- [x] Preferências detalhadas por categoria
- [x] Histórico completo de interações

### 🎙️ Fase 3 – Expansão (Semana 13 a 18)

### 🎧 Sistema de Podcast Interativo
- [ ] Player nativo com timeline
- [ ] Comentários vinculados a timestamps
- [ ] Integração de áudio com artigos
- [ ] Sistema de transcrição automática

### 🤖 Helena Avançada
- [ ] Memória persistente entre sessões
- [ ] Análise de padrões de leitura
- [ ] Geração de conteúdo personalizado
- [ ] Integração com todas as funcionalidades

### 🌐 Recursos Sociais e Engajamento
- [ ] Compartilhamento de trechos como cards
- [ ] Stories automáticos para redes sociais
- [ ] Sistema de desafios entre usuários
- [ ] Comentários e discussões em artigos

### 💰 Sistema de Monetização
- [ ] Planos Premium definidos
- [ ] Gateway de pagamento integrado
- [ ] Gestão de assinaturas
- [ ] Conteúdo exclusivo para assinantes

## 🛠️ Infraestrutura e Administração

### 🔧 Setup Técnico Inicial
- [x] Configuração Vite + React + TypeScript
- [x] Setup TailwindCSS com paleta de cores personalizada
- [x] Estrutura de componentes organizada
- [x] Servidor de desenvolvimento funcionando
- [x] Configuração Supabase (Auth, Database, Storage)
- [ ] Integração OpenAI API
- [ ] Setup N8N para automações
- [ ] Configuração Evolution API (WhatsApp)
- [ ] Deploy inicial com CI/CD

### 🎛️ Painel Administrativo
- [ ] CMS para publicação de artigos
- [ ] Sistema de moderação de conteúdo
- [ ] Analytics e métricas editoriais
- [ ] Configuração de comportamento da IA Helena
- [ ] Gestão de usuários e permissões

### 📊 Qualidade e Testes
- [ ] Testes unitários por funcionalidade
- [ ] Testes de integração entre sistemas
- [ ] Documentação técnica completa
- [ ] Versionamento e deploy automatizado

---

> Checklist baseado no PRD do Pulse & Perspective. Atualize conforme o progresso do projeto.
