import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase, authService, profileService, type UserProfile } from '../services/supabase'

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string, nickname: string) => Promise<any>
  signInWithGoogle: () => Promise<any>
  signOut: () => Promise<any>
  updateProfile: (updates: Partial<UserProfile>) => Promise<any>
  saveReadingSession: (articleId: string, articleTitle: string, category: string, readingTime: number) => Promise<any>
  getReadingHistory: () => Promise<any>
  updateCategoryPreferences: (categories: string[]) => Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Obter sessão inicial
    authService.getCurrentSession().then(({ session }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        loadUserProfile(session.user.id)
      }
      setLoading(false)
    })

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (event === 'SIGNED_IN' && session?.user) {
        await loadUserProfile(session.user.id)
      } else if (event === 'SIGNED_OUT') {
        setProfile(null)
      }

      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadUserProfile = async (userId: string) => {
    const { data: existingProfile } = await profileService.getProfile(userId)
    
    if (existingProfile) {
      setProfile(existingProfile)
    } else {
      // Criar perfil inicial se não existir
      const { data: newProfile } = await profileService.createProfile(userId, {
        nickname: user?.user_metadata?.nickname || user?.email?.split('@')[0] || 'Usuário',
        preferred_categories: [],
        reading_history: []
      })
      if (newProfile) {
        setProfile(newProfile[0])
      }
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    const result = await authService.signIn(email, password)
    setLoading(false)
    return result
  }

  const signUp = async (email: string, password: string, nickname: string) => {
    setLoading(true)
    const result = await authService.signUp(email, password, nickname)
    setLoading(false)
    return result
  }

  const signInWithGoogle = async () => {
    setLoading(true)
    const result = await authService.signInWithGoogle()
    setLoading(false)
    return result
  }

  const signOut = async () => {
    setLoading(true)
    const result = await authService.signOut()
    setProfile(null)
    setLoading(false)
    return result
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: 'Usuário não autenticado' }
    
    const result = await profileService.updateProfile(user.id, updates)
    if (!result.error && profile) {
      setProfile({ ...profile, ...updates })
    }
    return result
  }

  const saveReadingSession = async (articleId: string, articleTitle: string, category: string, readingTime: number) => {
    if (!user) return { error: 'Usuário não autenticado' }
    
    return await profileService.saveReadingSession({
      user_id: user.id,
      article_id: articleId,
      article_title: articleTitle,
      category,
      reading_time_seconds: readingTime
    })
  }

  const getReadingHistory = async () => {
    if (!user) return { error: 'Usuário não autenticado' }
    
    return await profileService.getReadingHistory(user.id)
  }

  const updateCategoryPreferences = async (categories: string[]) => {
    if (!user) return { error: 'Usuário não autenticado' }
    
    const result = await profileService.updateCategoryPreferences(user.id, categories)
    if (!result.error && profile) {
      setProfile({ ...profile, preferred_categories: categories })
    }
    return result
  }

  const value = {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    updateProfile,
    saveReadingSession,
    getReadingHistory,
    updateCategoryPreferences
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
