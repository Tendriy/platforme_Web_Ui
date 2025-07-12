import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuth = create(
  persist(
    (set) => ({
      token: null,
      user: null,

      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),

      login: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),

      isAuthenticated: () => {
        const state = useAuth.getState()
        return !!state.token
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
)

export default useAuth
