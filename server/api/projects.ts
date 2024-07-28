import { defineEventHandler, getQuery } from 'h3';
import { format, isBefore, sub } from 'date-fns';

const projectDetailsCache = new Map();
const REFETCH_INTERVAL = 1000 * 60 * 60; // 1 hour

export default defineEventHandler(async (event) => {
  const { page = 1, perPage = 11 } = getQuery(event);
  const UPDATED_SINCE = '2024-07-16'

  console.log('api called')
  const apiUrl = `${process.env.NASA_API_URL}/projects?updatedSince=${UPDATED_SINCE}`;
  console.log('api called')
  const response = await fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${process.env.NASA_API_KEY}`
    }
  });
  if (!response.ok) {
    return { error: 'Failed to fetch projects' };
  }
  const data = await response.json();
  const projects = data.projects.slice(page, perPage)

  if (projects.length === 0) {
    return { error: 'No projects found' };
  }
  
  const projectWithDetails = await Promise.all(projects.map(async (project: { projectId: string; lastUpdated: string;}) => {
    const projectDetails = await getProjectDetails(project);
    return { ...project, ...projectDetails};
  }));

  return projectWithDetails;
});

async function getProjectDetails(project: any) {
  const cacheKey = format(new Date(project.lastUpdated), 'yyyy-MM-dd');
  const cacheKeyForProjectDetails = `${project.projectId}-${cacheKey}`;

  if (projectDetailsCache.has(cacheKeyForProjectDetails)) {
    const projectDetails = projectDetailsCache.get(cacheKeyForProjectDetails);

    // if projectDetails is older than REFETCH_INTERVAL, delete it from cache
    if (isBefore(projectDetails.lastFetched, sub(new Date(), { hours: REFETCH_INTERVAL }))) {
      return projectDetailsCache.get(cacheKeyForProjectDetails);
    }    
  }

  const apiUrl = `${process.env.NASA_API_URL}/projects/${project.projectId}`;
  const response = await fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${process.env.NASA_API_KEY}`
    }
  });
  if (!response.ok) {
    return { error: 'Failed to fetch projects' };
  }
  const result = await response.json();
  const resultWithLastFetched = { ...result, lastFetched: new Date().toISOString() };
  projectDetailsCache.set(cacheKeyForProjectDetails, resultWithLastFetched.project);

  return resultWithLastFetched.project;
}