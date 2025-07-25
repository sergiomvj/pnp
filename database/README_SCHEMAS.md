# 📋 Schemas Disponíveis - Status e Recomendações

## 🚨 Resumo dos Problemas Encontrados

1. **Índice GIN com to_tsvector** - Função não marcada como IMMUTABLE
2. **Índice único com DATE()** - Função não marcada como IMMUTABLE
3. **Extensões complexas** - Podem não estar disponíveis

## 📁 Arquivos Disponíveis

### ✅ **RECOMENDADO: `schema_minimal.sql`**
- **Status:** ✅ Garantido para funcionar
- **Conteúdo:** Apenas o essencial
- **Tabelas:** 6 tabelas principais
- **Recursos:** Auth, categorias, artigos, histórico, IA Helena
- **Complexidade:** Baixa, sem funções problemáticas

### ⚠️ **`schema_tested.sql`** 
- **Status:** ⚠️ Corrigido mas pode ter problemas
- **Conteúdo:** Versão intermediária
- **Tabelas:** 10 tabelas
- **Recursos:** Mais completo que minimal
- **Problema:** Ainda pode ter funções IMMUTABLE

### ⚠️ **`schema.sql`**
- **Status:** ⚠️ Versão completa com correções
- **Conteúdo:** Todas as 24 tabelas
- **Recursos:** Sistema completo
- **Problema:** Complexo, mais chance de erros

## 🎯 Estratégia Recomendada

### **Fase 1: Começar com Minimal**
1. Execute `schema_minimal.sql` primeiro
2. Teste o sistema de autenticação
3. Confirme que tudo funciona

### **Fase 2: Expandir Gradualmente**
Após confirmar que o minimal funciona, adicione tabelas extras:

```sql
-- Adicionar bookmarks
CREATE TABLE bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, article_id)
);

-- Adicionar likes
CREATE TABLE likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, article_id)
);
```

### **Fase 3: Recursos Avançados**
Depois que o básico estiver funcionando:
- Índices full-text search
- Gamificação
- Analytics
- Notificações

## 🚀 Próximos Passos

1. **Execute `schema_minimal.sql`** ← **COMECE AQUI**
2. Configure as variáveis de ambiente
3. Teste a autenticação
4. Depois expandimos o banco

## ✅ O que o Schema Minimal Oferece

- ✅ **Sistema de autenticação completo**
- ✅ **Perfis de usuário**
- ✅ **10 categorias pré-configuradas**
- ✅ **Sistema de artigos básico**
- ✅ **Histórico de leitura**
- ✅ **IA Helena (tabelas)**
- ✅ **RLS policies funcionais**
- ✅ **Índices básicos de performance**

**Este é o suficiente para começar e testar todo o sistema de auth!**
