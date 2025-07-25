import { createClient } from '@supabase/supabase-js'

// Configurações do Supabase - Substitua pelos valores reais do seu projeto
const supabaseUrl = 'https://your-project-ref.supabase.co'
const supabaseAnonKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para TypeScript
export interface User {
  id: string
  email: string
  nickname?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  nickname: string
  avatar_url?: string
  bio?: string
  preferred_categories: string[]
  reading_history: string[]
  created_at: string
  updated_at: string
}

export interface ReadingSession {
  id: string
  user_id: string
  article_id: string
  article_title: string
  category: string
  read_at: string
  reading_time_seconds: number
}

// Funções de autenticação
export const authService = {
  // Login com email/senha
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // Registro com email/senha
  async signUp(email: string, password: string, nickname: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname: nickname,
        }
      }
    })
    return { data, error }
  },

  // Login com Google
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    return { data, error }
  },

  // Logout
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Obter usuário atual
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Obter sessão atual
  async getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  }
}

// Funções de perfil
export const profileService = {
  // Criar perfil do usuário
  async createProfile(userId: string, profileData: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([{
        user_id: userId,
        ...profileData
      }])
    return { data, error }
  },

  // Obter perfil do usuário
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()
    return { data, error }
  },

  // Atualizar perfil
  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
    return { data, error }
  },

  // Salvar sessão de leitura
  async saveReadingSession(sessionData: Omit<ReadingSession, 'id' | 'read_at'>) {
    const { data, error } = await supabase
      .from('reading_sessions')
      .insert([{
        ...sessionData,
        read_at: new Date().toISOString()
      }])
    return { data, error }
  },

  // Obter histórico de leitura
  async getReadingHistory(userId: string, limit = 50) {
    const { data, error } = await supabase
      .from('reading_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('read_at', { ascending: false })
      .limit(limit)
    return { data, error }
  },

  // Atualizar preferências de categorias
  async updateCategoryPreferences(userId: string, categories: string[]) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        preferred_categories: categories,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
    return { data, error }
  }
}
