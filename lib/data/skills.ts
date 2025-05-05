export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Skill {
  name: string;
  level: SkillLevel;
  icon?: string;
  category: 'frontend' | 'backend' | 'mobile' | 'devops' | 'learning';
}

export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 'advanced', category: 'frontend' },
  { name: 'TypeScript', level: 'advanced', category: 'frontend' },
  { name: 'JavaScript', level: 'advanced', category: 'frontend' },
  { name: 'HTML5', level: 'expert', category: 'frontend' },
  { name: 'CSS3', level: 'advanced', category: 'frontend' },
  { name: 'Tailwind CSS', level: 'advanced', category: 'frontend' },
  { name: 'Redux', level: 'intermediate', category: 'frontend' },
  
  // Backend
  { name: 'Django', level: 'advanced', category: 'backend' },
  { name: 'Python', level: 'advanced', category: 'backend' },
  { name: 'Node.js', level: 'intermediate', category: 'backend' },
  { name: 'Express', level: 'intermediate', category: 'backend' },
  { name: 'SQL', level: 'intermediate', category: 'backend' },
  { name: 'PostgreSQL', level: 'intermediate', category: 'backend' },
  
  // Mobile
  { name: 'Flutter', level: 'advanced', category: 'mobile' },
  { name: 'Dart', level: 'advanced', category: 'mobile' },
  { name: 'React Native', level: 'intermediate', category: 'mobile' },
  
  // DevOps
  { name: 'Docker', level: 'intermediate', category: 'devops' },
  { name: 'Docker Compose', level: 'intermediate', category: 'devops' },
  { name: 'GitHub Actions', level: 'intermediate', category: 'devops' },
  { name: 'Git', level: 'advanced', category: 'devops' },
  
  // Learning
  { name: 'AWS', level: 'beginner', category: 'learning' },
  { name: 'Kubernetes', level: 'beginner', category: 'learning' },
  { name: 'GraphQL', level: 'beginner', category: 'learning' }
];