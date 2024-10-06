import axios from 'axios'
import { Track, User } from '../types'

const api = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`,
  },
})

export const fetchTopTracks = async (): Promise<Track[]> => {
  try {
    const response = await api.get('/me/top/tracks?limit=5')
    return response.data.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      artist: item.artists[0].name,
    }))
  } catch (error) {
    console.error('Error fetching top tracks:', error)
    return []
  }
}

export const fetchRecentlyPlayed = async (): Promise<Track[]> => {
  try {
    const response = await api.get('/me/player/recently-played?limit=5')
    return response.data.items.map((item: any) => ({
      id: item.track.id,
      name: item.track.name,
      artist: item.track.artists[0].name,
    }))
  } catch (error) {
    console.error('Error fetching recently played tracks:', error)
    return []
  }
}

export const fetchUserProfile = async (): Promise<User> => {
  try {
    const response = await api.get('/me')
    return {
      id: response.data.id,
      name: response.data.display_name,
      age: 0, // Spotify doesn't provide age, so we'll leave it as 0
    }
  } catch (error) {
    console.error('Error fetching user profile:', error)
    throw error
  }
}