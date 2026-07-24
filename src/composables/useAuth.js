import { onMounted, ref } from 'vue'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'

const session = ref(null)
const authReady = ref(false)
let listenerAttached = false

export function useAuth() {
  onMounted(async () => {
    if (!isSupabaseConfigured) {
      authReady.value = true
      return
    }

    if (!listenerAttached) {
      listenerAttached = true
      const { data } = await supabase.auth.getSession()
      session.value = data.session
      authReady.value = true

      supabase.auth.onAuthStateChange((_event, newSession) => {
        session.value = newSession
      })
    }
  })

  const signIn = async (email, password) => {
    if (!isSupabaseConfigured) return { error: 'Supabase non configure (voir .env)' }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { error: error.message }
    session.value = data.session
    return { error: null }
  }

  const signOut = async () => {
    if (!isSupabaseConfigured) return
    await supabase.auth.signOut()
    session.value = null
  }

  return { session, authReady, signIn, signOut, isSupabaseConfigured }
}
