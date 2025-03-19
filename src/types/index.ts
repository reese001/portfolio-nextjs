export interface Technology {
  name: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: Technology[];
  sourceCodeUrl: string;
  image: string;
} 