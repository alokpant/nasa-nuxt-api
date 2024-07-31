# Nuxt 3 Minimal Starter

The app fetches projects from [NASA TechPort API](https://techport.nasa.gov/help/articles/api).

### Tech Stack
Nuxt3 / Pinia / Vitest / Shadcn (Tailwind CSS)

## Setup

Make sure to install the dependencies:

```bash
[npm|pnpm|yarn|bun] install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
pnpm run dev
yarn dev
bun run dev
```

## Test

```bash
npm run test
pnpm run test
yarn test
bun run test
```

## Preview

https://github.com/user-attachments/assets/170334e1-c917-4663-8f57-e23811eb14b6

Here is the layout of the app:

### Main page

+--------------------------------------------------------+
|                  NASA TechPort Projects                |
+--------------------------------------------------------+
| [Header]                                               |
| NASA TechPort Projects                                 |
+--------------------------------------------------------+
| [Filters]                                              |
| - Date Picker: [Last Update Since]               |
| - Items per page: [12] [24] [48]                       |
+--------------------------------------------------------+
| [Pagination]                                           |
| < Previous Page | 1 | 2 | 3 | ... | Next Page >        |
+--------------------------------------------------------+
| [Loading Indicator - if loading]                       |
|                                                        |
| [Project List]                                         |
| - Project 1                                            |
|   - Start Date: YYYY-MM-DD                             |
|   - End Date: YYYY-MM-DD                               |
|                                                        |
| - Project 2                                            |
|   - Start Date: YYYY-MM-DD                             |
|   - End Date: YYYY-MM-DD                               |
|                                                        |
| - ...                                                  |
+--------------------------------------------------------+
| [Pagination]                                           |
| < Previous Page | 1 | 2 | 3 | ... | Next Page >        |
+--------------------------------------------------------+

### Project detail page

+--------------------------------------------------------+
| [List Button]                                          |
| < Back to Projects                                     |
| < Home button                                          |
+--------------------------------------------------------+
| [Header]                                               |
| Project Title                                          |
+--------------------------------------------------------+
| [Project Details]                                      |
| - Description: Detailed description of the project.    |
|                                                        |
| - Organizations                                        |
|   - Lead Organization: Organization Name               |
|   - Supporting Organization: Organization Name         |
|                                                        |
| - Contacts                                             |
|   - Name: Contact Person 1 - Role                      |
|   - Name: Contact Person 2 - Role                      |
|                                                        |
| - Start Date: YYYY-MM-DD                               |
| - End Date: YYYY-MM-DD                                 |
| - Total Views: Number of views                         |
| - Release Status: Status Text (e.g., Released)         |
| - Website: URL                                         |
| - Last Updated: YYYY-MM-DD                             |
| - Benefits: List of Benefits                           |
+--------------------------------------------------------+

### Codesandbox

You can preview it in [Codesandbox](https://codesandbox.io/p/github/alokpant/nasa-nuxt-api/main)
