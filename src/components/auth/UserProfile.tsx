import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

interface UserProfileProps {
  isOpen: boolean
  onClose: () => void
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { user, profile, updateProfile, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'history'>('profile')
  const [nickname, setNickname] = useState(profile?.nickname || '')
  const [bio, setBio] = useState(profile?.bio || '')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  if (!isOpen || !user) return null

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const result = await updateProfile({
        nickname: nickname.trim(),
        bio: bio.trim()
      })

      if (result.error) {
        setMessage(result.error.message)
      } else {
        setMessage('Perfil atualizado com sucesso!')
      }
    } catch (err) {
      setMessage('Erro ao atualizar perfil')
    }

    setLoading(false)
  }

  const handleSignOut = async () => {
    await signOut()
    onClose()
  }

  const categories = [
    'Política Nacional',
    'Economia',
    'Sociedade',
    'Tecnologia',
    'Cultura',
    'Esportes',
    'Saúde',
    'Educação',
    'Meio Ambiente',
    'Internacional'
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Meu Perfil
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'profile'
                ? 'text-cambridge-blue border-b-2 border-cambridge-blue'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Perfil
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'preferences'
                ? 'text-cambridge-blue border-b-2 border-cambridge-blue'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Preferências
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'history'
                ? 'text-cambridge-blue border-b-2 border-cambridge-blue'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Histórico
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {message && (
                <div className={`px-4 py-3 rounded-lg ${
                  message.includes('sucesso') 
                    ? 'bg-green-100 dark:bg-green-900/20 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400' 
                    : 'bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400'
                }`}>
                  {message}
                </div>
              )}

              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-cambridge-blue rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {profile?.nickname?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {profile?.nickname || 'Usuário'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nome de usuário
                  </label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cambridge-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Como você gostaria de ser chamado?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cambridge-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Conte um pouco sobre você..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-cambridge-blue hover:bg-paynes-gray disabled:opacity-50 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </form>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleSignOut}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
                >
                  Sair da Conta
                </button>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Categorias de Interesse
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Selecione as categorias que mais te interessam para personalizar sua experiência.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-cambridge-blue focus:ring-cambridge-blue"
                        defaultChecked={false}
                      />
                      <span className="text-gray-700 dark:text-gray-300">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Notificações
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-700 dark:text-gray-300">Novos artigos</span>
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-cambridge-blue focus:ring-cambridge-blue"
                      defaultChecked
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-700 dark:text-gray-300">Newsletter semanal</span>
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-cambridge-blue focus:ring-cambridge-blue"
                      defaultChecked
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-700 dark:text-gray-300">Comentários em meus artigos</span>
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-cambridge-blue focus:ring-cambridge-blue"
                      defaultChecked
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Artigos Lidos Recentemente
                </h3>
                <div className="space-y-4">
                  {/* Mock reading history - will be replaced with real data */}
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-16 h-16 bg-cambridge-blue rounded-lg"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        Exemplo de Artigo Lido
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Lido em 15 de dezembro de 2024
                      </p>
                      <span className="inline-block px-2 py-1 text-xs bg-cambridge-blue text-white rounded mt-2">
                        Política Nacional
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    <p>Seu histórico de leitura aparecerá aqui conforme você explora os artigos.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
