# Project Data Management

This directory contains JSON data files used by the portfolio website.

## Projects Data

The `projects.json` file contains an array of project objects with the following structure:

```typescript
interface Project {
  title: string;        // Project title
  description: string;  // Project description
  technologies: {       // Technologies used in the project
    name: string;       // Technology name (React, NextJS, etc.)
  }[];
  sourceCodeUrl: string; // URL to source code repository
  image: string;         // Path to project image (relative to public folder)
}
```

## Managing Projects

You can manage projects using the utility functions in `src/scripts/project-manager.ts`:

1. **Adding a new project:**

```typescript
import { addProject } from '@/scripts/project-manager';

const newProject = {
  title: "My New Project",
  description: "Description of the project",
  technologies: [
    { name: "React" },
    { name: "TypeScript" }
  ],
  sourceCodeUrl: "https://github.com/yourusername/project",
  image: "/project-image.png"
};

addProject(newProject);
```

2. **Updating an existing project:**

```typescript
import { updateProject } from '@/scripts/project-manager';

updateProject("My Project Title", {
  description: "Updated description",
  sourceCodeUrl: "https://github.com/yourusername/new-repo"
});
```

3. **Deleting a project:**

```typescript
import { deleteProject } from '@/scripts/project-manager';

deleteProject("My Project Title");
```

4. **Getting all projects:**

```typescript
import { getProjects } from '@/scripts/project-manager';

const allProjects = getProjects();
console.log(allProjects);
```

## Running Scripts

To run utility scripts:

1. Build the project: `npm run build`
2. Run with Node: `node -r tsconfig-paths/register dist/scripts/your-script.js`

There's an example script at `src/scripts/add-project.ts` that shows how to add a new project. 