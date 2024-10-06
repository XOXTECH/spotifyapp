import React, { useState, useEffect } from 'react'
import { User, Track } from '../types'
import { Heart, X } from 'lucide-react'

interface AIMatchmakerProps {
  currentUser: User
  potentialMatches: User[]
  onMatch: (match: User) => void
  topTracks: Track[]
  recentTracks: Track[]
}

const AIMatchmaker: React.FC<AIMatchmakerProps> = ({
  currentUser,
  potentialMatches,
  onMatch,
  topTracks,
  recentTracks,
}) => {
  const [currentMatch, setCurrentMatch] = useState<User | null>(null)
  const [matchDescription, setMatchDescription] = useState<string>('')

  useEffect(() => {
    if (potentialMatches.length > 0) {
      setCurrentMatch(potentialMatches[0])
      generateMatchDescription(potentialMatches[0])
    }
  }, [potentialMatches])

  const generateMatchDescription = (match: User) => {
    // In a real app, this would call a GPT-4 API
    // For demo purposes, we'll generate a simple description
    const description = `Based on your top tracks and recently played songs, we think ${match.name} could be a great match! You both seem to enjoy similar genres and artists.`
    setMatchDescription(description)
  }

  const handleLike = () => {
    if (currentMatch) {
      onMatch(currentMatch)
      nextMatch()
    }
  }

  const handleDislike = () => {
    nextMatch()
  }

  const nextMatch = () => {
    const nextPotentialMatch = potentialMatches.find(m => m.id !== currentMatch?.id)
    if (nextPotentialMatch) {
      setCurrentMatch(nextPotentialMatch)
      generateMatchDescription(nextPotentialMatch)
    } else {
      setCurrentMatch(null)
    }
  }

  if (!currentMatch) {
    return <p>No more potential matches at the moment.</p>
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">AI Matchmaker Suggests:</h3>
      <p className="mb-4">{currentMatch.name}, {currentMatch.age}</p>
      <p className="mb-4 text-sm">{matchDescription}</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleDislike}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
        >
          <X />
        </button>
        <button
          onClick={handleLike}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
        >
          <Heart />
        </button>
      </div>
    </div>
  )
}

export default AIMatchmaker