import { defineEventHandler, getQuery } from 'h3';
import { format, isBefore, sub } from 'date-fns';

// const projectDetailsCache = new Map();
const REFETCH_INTERVAL = 1000 * 60 * 60; // 1 hour

export default defineEventHandler(async (event) => {
  const { updatedSince, perPage, currentPage, projectsDetails } = parseCookies(event)
  const apiUrl = `${process.env.NASA_API_URL}/projects?updatedSince=${updatedSince}`;
  const response = await fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${process.env.NASA_API_KEY}`
    }
  });

  if (!response.ok) {
    return { error: 'Failed to fetch projects' };
  }

  const result = await response.json();
  const projects = result.projects.slice(Number(currentPage) - 1, Number(perPage))
  // const projects = result.projects
  if (projects.length === 0) {
    return { projectsWithDetails: [], totalCount: 0 };
  }
  
  const projectWithDetails = await Promise.all(projects.map(async (project: { projectId: string; lastUpdated: string;}) => {
    const projectDetails = await getProjectDetails(project);
    return { ...project, ...projectDetails};
  }));

  return { projectsWithDetails: projectWithDetails, totalCount: result.totalCount };
});

async function getProjectDetails(project: any) {
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
  const resultWithLastFetched = { ...result.project, lastFetched: new Date().toISOString() };

  return resultWithLastFetched;
}