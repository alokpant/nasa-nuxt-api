import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  console.log('Fetching projects');
  console.log(event);
  const { page = 1, limit = 10 } = getQuery(event);
  const UPDATED_SINCE = '2024-05-01'

  const apiUrl = `https://techport.nasa.gov/api/projects?updated_since=${UPDATED_SINCE}&page=${page}&limit=${limit}`;
  const response = await fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${process.env.NASA_API_KEY}`
    }
  });
  if (!response.ok) {
    return { error: 'Failed to fetch projects' };
  }
  const data = await response.json();

  console.log('data', data)
  return data.projects;
});