import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession()
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching session:', error)
        }
        if (mounted) {
          setSession(data?.session ?? null)
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error('Error fetching session:', error)
        if (mounted) {
          setLoading(false)
        }
      })
 
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setSession(session)
      }
    })
 
    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!session) {
    return <Navigate to="/login" />
  }

  return children
}