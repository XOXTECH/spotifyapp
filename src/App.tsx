import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Music } from 'lucide-react'
import UserProfile from './components/UserProfile'
import MatchList from './components/MatchList'
import MusicPreferences from './components/MusicPreferences'
import SpotifyLogin from './components/SpotifyLogin'
import AIMatchmaker from './components/AIMatchmaker'
import Callback from './components/Callback'
import { fetchTopTracks, fetchRecentlyPlayed, fetchUserProfile } from './services/spotifyApi'
import { User, Track } from './types'

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [potentialMatches, setPotentialMatches] = useState<User[]>([])
  const [matches, setMatches] = useState<User[]>([])
  const [topTracks, setTopTracks] = useState<Track[]>([])
  const [recentTracks, setRecentTracks] = useState<Track[]>([])

  useEffect(() => {
    const token = localStorage.getItem('spotify_access_token')
    if (token) {
      fetchUserProfile().then(setCurrentUser)
      fetchTopTracks().then(setTopTracks)
      fetchRecentlyPlayed().then(setRecentTracks)
      // In a real app, we'd fetch potential matches from a backend
      setPotentialMatches([
        { id: 2, name: 'Alice', age: 28 },
        { id: 3, name: 'Bob', age: 32 },
        { id: 4, name: 'Charlie', age: 25 },
      ])
    }
  }, [])

  const handleMatch = (match: User) => {
    setMatches([...matches, match])
    setPotentialMatches(potentialMatches.filter(u => u.id !== match.id))
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-white mb-8 flex items-center">
          <Music className="mr-2" /> MelodyMatch
        </h1>
        <Routes>
          <Route path="/callback" element={<Callback />} />
          <Route path="/" element={
            !currentUser ? (
              <SpotifyLogin />
            ) : (
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <UserProfile user={currentUser} />
                <MusicPreferences topTracks={topTracks} recentTracks={recentTracks} />
                <AIMatchmaker
                  currentUser={currentUser}
                  potentialMatches={potentialMatches}
                  onMatch={handleMatch}
                  topTracks={topTracks}
                  recentTracks={recentTracks}
                />
              </div>
            )
          } />
        </Routes>
        <MatchList matches={matches} />
      </div>
    </Router>
  )
}

export default App