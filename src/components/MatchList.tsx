import React from 'react'

interface MatchListProps {
  matches: Array<{
    id: number
    name: string
    age: number
  }>
}

const MatchList: React.FC<MatchListProps> = ({ matches }) => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Your Matches</h2>
      {matches.length === 0 ? (
        <p>No matches yet. Keep swiping!</p>
      ) : (
        <ul>
          {matches.map((match) => (
            <li key={match.id} className="mb-2">
              {match.name}, {match.age}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MatchList