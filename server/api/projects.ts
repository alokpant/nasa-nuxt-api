import { defineEventHandler, getQuery } from 'h3';

const projectDetailsCache = new Map();
const allProjectsCacheByDate = new Map();


async function getProjectDetails(pid: string) {
  if (projectDetailsCache.has(pid)) {
    return projectDetailsCache.get(pid);
  }

  const apiUrl = `${process.env.NASA_API_URL}/projects/${pid}`;
  const response = await fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${process.env.NASA_API_KEY}`
    }
  });
  if (!response.ok) {
    return { error: 'Failed to fetch projects' };
  }
  const { project } = await response.json();

  projectDetailsCache.set(project.id, project);
  return project;
}

function getProjectsFromCache(page: number, perPage: number) {
  const projects = Array.from(projectDetailsCache.values()).slice(page, perPage);
  return projects;
}

export default defineEventHandler(async (event) => {
  const { page = 1, perPage = 11 } = getQuery(event);
  const UPDATED_SINCE = '2024-05-01'

  const apiUrl = `${process.env.NASA_API_URL}/projects?updated_since=${UPDATED_SINCE}`;
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

  // allProjectsCache.set(page, projects);
  
  const projectWithDetails = await Promise.all(projects.map(async (project: { projectId: string; }) => {
    const projectDetails = await getProjectDetails(project.projectId);
    return { ...project, ...projectDetails };
  }));

  return projectWithDetails;
});
