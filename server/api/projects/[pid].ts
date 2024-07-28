import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const { pid } = event.context.params;
  const apiUrl = `${process.env.NASA_API_URL}/projects/${pid}`;
  const response = await fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${process.env.NASA_API_KEY}`
    }
  });
  if (!response.ok) {
    return { error: 'Failed to fetch projects' };
  }
  const data = await response.json();
  return data.project;
});
