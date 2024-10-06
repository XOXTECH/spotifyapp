import React from 'react'
import { Mic, Music } from 'lucide-react'
import { Track } from '../types'

interface MusicPreferencesProps {
  topTracks: Track[]
  recentTracks: Track[]
}

const MusicPreferences: React.FC<MusicPreferencesProps> = ({ topTracks, recentTracks }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Music Preferences</h3>
      <div className="mb-4">
        <h4 className="font-medium flex items-center">
          <Mic className="mr-2" /> Top Tracks
        </h4>
        <ul className="list-disc list-inside">
          {topTracks.slice(0, 3).map(track => (
            <li key={track.id}>{track.name} - {track.artist}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-medium flex items-center">
          <Music className="mr-2" /> Recently Played
        </h4>
        <ul className="list-disc list-inside">
          {recentTracks.slice(0, 3).map(track => (
            <li key={track.id}>{track.name} - {track.artist}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MusicPreferences