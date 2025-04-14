import axios from 'axios';

const BASE_URL = 'https://mcp-server.example.com'; // Replace with actual MCP server URL

export async function authenticate(username: string, password: string) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, { username, password });
    return response.data.token; // Return the authentication token
  } catch (error) {
    console.error('Authentication failed:', error);
    throw error;
  }
}

export async function syncAlarms(token: string, alarms: any[]) {
  try {
    const response = await axios.post(
      `${BASE_URL}/alarms/sync`,
      { alarms },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data; // Return the server's response
  } catch (error) {
    console.error('Alarm synchronization failed:', error);
    throw error;
  }
}