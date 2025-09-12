'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Types
interface Child {
  id: string
  name: string
  age: number
  avatar: string
  progress: {
    overallProgress: number
    lettersMastered: number
    numbersCompleted: number
    gamesPlayed: number
    assessmentScores: number[]
  }
  createdAt: string
}

interface Parent {
  id: string
  name: string
  email: string
  children: Child[]
}

interface AuthContextType {
  isAuthenticated: boolean
  currentParent: Parent | null
  selectedChild: Child | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  addChild: (child: Omit<Child, 'id' | 'createdAt'>) => void
  selectChild: (childId: string) => void
  updateChildProgress: (childId: string, progress: Partial<Child['progress']>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock data for demo
const mockParents: Parent[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'parent@demo.com',
    children: [
      {
        id: 'child-1',
        name: 'Emma',
        age: 8,
        avatar: '👧',
        progress: {
          overallProgress: 85,
          lettersMastered: 26,
          numbersCompleted: 10,
          gamesPlayed: 12,
          assessmentScores: [75, 80, 85, 90]
        },
        createdAt: '2024-01-15'
      },
      {
        id: 'child-2',
        name: 'Alex',
        age: 6,
        avatar: '👦',
        progress: {
          overallProgress: 65,
          lettersMastered: 18,
          numbersCompleted: 8,
          gamesPlayed: 8,
          assessmentScores: [60, 65, 70]
        },
        createdAt: '2024-02-01'
      }
    ]
  }
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentParent, setCurrentParent] = useState<Parent | null>(null)
  const [selectedChild, setSelectedChild] = useState<Child | null>(null)

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('dyslexia-auth')
    if (savedAuth) {
      const { parentId, childId } = JSON.parse(savedAuth)
      const parent = mockParents.find(p => p.id === parentId)
      if (parent) {
        setCurrentParent(parent)
        setIsAuthenticated(true)
        
        if (childId) {
          const child = parent.children.find(c => c.id === childId)
          if (child) {
            setSelectedChild(child)
          }
        } else if (parent.children.length > 0) {
          setSelectedChild(parent.children[0])
        }
      }
    }
  }, [])

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    if (isAuthenticated && currentParent) {
      localStorage.setItem('dyslexia-auth', JSON.stringify({
        parentId: currentParent.id,
        childId: selectedChild?.id
      }))
    }
  }, [isAuthenticated, currentParent, selectedChild])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would be an API call
    const parent = mockParents.find(p => p.email === email)
    if (parent && password === 'demo123') {
      setCurrentParent(parent)
      setIsAuthenticated(true)
      if (parent.children.length > 0) {
        setSelectedChild(parent.children[0])
      }
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setCurrentParent(null)
    setSelectedChild(null)
    localStorage.removeItem('dyslexia-auth')
  }

  const addChild = (childData: Omit<Child, 'id' | 'createdAt'>) => {
    if (!currentParent) return
    
    const newChild: Child = {
      ...childData,
      id: `child-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    }
    
    const updatedParent = {
      ...currentParent,
      children: [...currentParent.children, newChild]
    }
    
    setCurrentParent(updatedParent)
    
    // Update mock data
    const parentIndex = mockParents.findIndex(p => p.id === currentParent.id)
    if (parentIndex !== -1) {
      mockParents[parentIndex] = updatedParent
    }
  }

  const selectChild = (childId: string) => {
    if (!currentParent) return
    const child = currentParent.children.find(c => c.id === childId)
    if (child) {
      setSelectedChild(child)
    }
  }

  const updateChildProgress = (childId: string, progressUpdate: Partial<Child['progress']>) => {
    if (!currentParent) return
    
    const updatedChildren = currentParent.children.map(child => 
      child.id === childId 
        ? { ...child, progress: { ...child.progress, ...progressUpdate } }
        : child
    )
    
    const updatedParent = { ...currentParent, children: updatedChildren }
    setCurrentParent(updatedParent)
    
    // Update selected child if it's the one being updated
    if (selectedChild?.id === childId) {
      setSelectedChild(updatedChildren.find(c => c.id === childId) || null)
    }
    
    // Update mock data
    const parentIndex = mockParents.findIndex(p => p.id === currentParent.id)
    if (parentIndex !== -1) {
      mockParents[parentIndex] = updatedParent
    }
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      currentParent,
      selectedChild,
      login,
      logout,
      addChild,
      selectChild,
      updateChildProgress
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}