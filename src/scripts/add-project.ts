import { addProject } from './project-manager';
import { Project } from '@/types';

/**
 * Example usage of the project manager
 * 
 * To run this script:
 * 1. Build the project: npm run build
 * 2. Run with Node: node -r tsconfig-paths/register dist/scripts/add-project.js
 */

// Example project data
const newProject: Project = {
  title: 'Portfolio Website',
  description: 'A personal portfolio website built with Next.js, React, and Tailwind CSS. Features a modern design with custom animations and responsive layout.',
  technologies: [
    { name: 'React' },
    { name: 'NextJS' },
    { name: 'TypeScript' },
    { name: 'Tailwind CSS' }
  ],
  sourceCodeUrl: 'https://github.com/yourusername/portfolio',
  image: '/portfolio.png'
};

// Add the project
const success = addProject(newProject);

if (success) {
  console.log('Project added successfully!');
} else {
  console.error('Failed to add project.');
} 