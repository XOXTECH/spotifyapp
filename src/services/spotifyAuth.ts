import axios from 'axios';

const CLIENT_ID = 'f182c0c85529440688f00fe703582ef3';
const CLIENT_SECRET = 'bd4439a986c34fa6b3fff1028b004788';
const REDIRECT_URI = 'http://localhost:5173/callback'; // Update this if your Vite dev server uses a different port

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

export const getAuthUrl = () => {
  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-read-recently-played',
  ];
  return `${SPOTIFY_AUTH_URL}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(scopes.join(' '))}`;
};

export const getAccessToken = async (code: string): Promise<string> => {
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', REDIRECT_URI);

  const response = await axios.post(SPOTIFY_TOKEN_URL, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
    },
  });

  return response.data.access_token;
};
