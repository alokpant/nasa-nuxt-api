// tests/server/api/projects.spec.ts

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { H3Event, parseCookies, defineEventHandler } from 'h3';
import projectsHandler, { getProjectDetails } from '@/server/api/projects';
import { ProjectDetail } from '@/types/ProjectDetail';

// Mock environment variables
const MOCK_API_KEY = 'test-api-key';
const MOCK_API_URL = 'https://mock-url';
vi.stubEnv('NASA_API_URL', MOCK_API_URL);
vi.stubEnv('NASA_API_KEY', MOCK_API_KEY);

// Mock fetch
global.fetch = vi.fn();
const mockedFetch = fetch as vi.Mock;

// Mock parseCookies
vi.mock('h3', () => ({
  parseCookies: vi.fn(),
  defineEventHandler: vi.fn((handler) => handler),
}));

const mockParseCookies = parseCookies as vi.Mock;
const mockDefineEventHandler = defineEventHandler as vi.Mock;
const mockEvent = {
  context: {
    req: {
      headers: {
        cookie: 'updatedSince=2023-07-01; perPage=10; currentPage=1',
      },
    },
  },
} as unknown as H3Event;

const MOCK_COOKIE_DATA = {
  updatedSince: '2023-07-01',
  perPage: '10',
  currentPage: '1',
}

const MOCK_PROJECTS = [
  {
    projectId: '1',
    title: 'Project 1',
  },
  {
    projectId: '2',
    title: 'Project 2',
  },
] as ProjectDetail[];

const MOCK_PROJECT_DETAIL = {
  projectId: '1',
  title: 'Project 1 Detail',
};

const MOCK_PROJECT_2_DETAIL = {
  projectId: '2',
  title: 'Project 2 Detail',
};

describe('projectsHandler', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockDefineEventHandler.mockImplementation((handler) => handler);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch projects and project details successfully', async () => {
    mockParseCookies.mockReturnValue(MOCK_COOKIE_DATA);

    // mock projects api call
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ projects: MOCK_PROJECTS, totalCount: 2 }),
    });

    // mock projects/:id api call
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ project: MOCK_PROJECT_DETAIL }),
    });

    // mock projects/:id api call
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ project: MOCK_PROJECT_2_DETAIL }),
    });

    const response = await projectsHandler(mockEvent);

    expect(mockedFetch).toHaveBeenCalledWith(
      `${MOCK_API_URL}/projects?updatedSince=2023-07-01`,
      {
        headers: {
          Authorization: `Bearer ${MOCK_API_KEY}`,
        },
      }
    );

    expect(response).toEqual({
      projectsWithDetails: [
        { ...MOCK_PROJECTS[0], ...MOCK_PROJECT_DETAIL, lastFetched: expect.any(String) },
        { ...MOCK_PROJECTS[1], ...MOCK_PROJECT_2_DETAIL, lastFetched: expect.any(String) },
      ],
      totalCount: 2,
    });
  });

  it('should handle fetch project failure', async () => {
    mockParseCookies.mockReturnValue(MOCK_COOKIE_DATA);

    mockedFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(projectsHandler(mockEvent)).rejects.toThrow('Failed to fetch projects');
  });

  it('should handle fetch project details failure', async () => {
    mockParseCookies.mockReturnValue(MOCK_COOKIE_DATA);

    // mock projects api call
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ projects: MOCK_PROJECTS, totalCount: 2 }),
    });

    // mock projects/:id api call
    mockedFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(projectsHandler(mockEvent))
      .rejects
      .toThrow('Failed to fetch project: 1');
  });
});

describe('getProjectDetails', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch project details successfully', async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ project: MOCK_PROJECT_DETAIL }),
    });

    const result = await getProjectDetails(MOCK_PROJECTS[0]);

    expect(mockedFetch).toHaveBeenCalledWith(
      `${MOCK_API_URL}/projects/1`,
      {
        headers: {
          Authorization: `Bearer ${MOCK_API_KEY}`,
        },
      }
    );

    expect(result).toEqual({
      ...MOCK_PROJECT_DETAIL,
      lastFetched: expect.any(String),
    });
  });

  it('should handle when project details is empty', async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ project: [] }),
    });

    const result = await getProjectDetails(MOCK_PROJECTS[0]);

    expect(result).toEqual({
      lastFetched: expect.any(String),
    });
  });

  it('should handle fetch project details failure', async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(
      getProjectDetails(MOCK_PROJECTS[0])
    ).rejects.toThrow('Failed to fetch project: 1');
  });
});
