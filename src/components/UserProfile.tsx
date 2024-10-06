import React from 'react'
import { User } from 'lucide-react'

interface UserProfileProps {
  user: {
    name: string
    age: number
    topArtist: string
    topGenre: string
  }
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="text-center">
      <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
        <User size={64} className="text-gray-600" />
      </div>
      <h2 className="text-2xl font-semibold">{user.name}, {user.age}</h2>
    </div>
  )
}

export default UserProfile