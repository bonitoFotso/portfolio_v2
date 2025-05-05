export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  challenges: string[];
  solutions: string[];
  impact: string;
  demoUrl?: string;
  codeUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'qr-code-generator',
    title: 'QR Code Generator',
    description: 'An application for generating QR codes for equipment identification and tracking.',
    technologies: ['React', 'TypeScript', 'Django', 'PostgreSQL', 'Docker'],
    images: [
      'https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/230554/pexels-photo-230554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    challenges: [
      'Generating unique QR codes for each equipment item',
      'Ensuring QR codes remain scannable at different sizes',
      'Managing large amounts of equipment data'
    ],
    solutions: [
      'Implemented a robust ID generation system ensuring uniqueness',
      'Optimized QR code parameters for maximum scannability',
      'Created an efficient database schema with proper indexing'
    ],
    impact: 'Reduced equipment tracking time by 75% and eliminated manual data entry errors.',
    demoUrl: 'https://example.com/qr-demo',
    codeUrl: 'https://github.com/example/qr-generator'
  },
  {
    id: 'certificate-generator',
    title: 'Training Certificate Generator',
    description: 'An application for automatically generating professional training certificates.',
    technologies: ['Django', 'Python', 'JavaScript', 'HTML5', 'CSS3'],
    images: [
      'https://images.pexels.com/photos/5926389/pexels-photo-5926389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6393013/pexels-photo-6393013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    challenges: [
      'Generating high-quality PDF certificates',
      'Managing different certificate templates',
      'Handling variable participant data',
      'Ensuring security and authenticity'
    ],
    solutions: [
      'Used ReportLab for high-quality PDF generation',
      'Developed a template system for easy customization',
      'Created a flexible data input system',
      'Implemented digital signatures for authentication'
    ],
    impact: 'Reduced certificate generation time from 15 minutes to under 30 seconds per certificate.',
    demoUrl: 'https://example.com/cert-demo',
    codeUrl: 'https://github.com/example/cert-generator'
  },
  {
    id: 'training-management',
    title: 'Training Management System',
    description: 'A comprehensive system for managing training sessions, participants, and resources.',
    technologies: ['React', 'Django Rest Framework', 'PostgreSQL', 'Docker', 'GitHub Actions'],
    images: [
      'https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    challenges: [
      'Managing complex relationships between trainings, sessions, and participants',
      'Handling scheduling conflicts',
      'Supporting various training formats',
      'Generating comprehensive reports'
    ],
    solutions: [
      'Designed a flexible database schema with proper relationships',
      'Implemented a conflict detection algorithm',
      'Created adaptable training templates for different formats',
      'Developed a powerful reporting module'
    ],
    impact: 'Increased training capacity by 40% while reducing administrative overhead by 60%.',
    demoUrl: 'https://example.com/tms-demo',
    codeUrl: 'https://github.com/example/training-management'
  },
  {
    id: 'helpdesk-task-manager',
    title: 'Helpdesk Task Manager',
    description: 'A task management application for IT helpdesk teams to track and resolve issues efficiently.',
    technologies: ['Django', 'JavaScript', 'Bootstrap', 'PostgreSQL'],
    images: [
      'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    challenges: [
      'Managing task prioritization',
      'Tracking task status across multiple technicians',
      'Providing real-time updates to stakeholders',
      'Generating meaningful metrics and reports'
    ],
    solutions: [
      'Implemented a smart prioritization algorithm',
      'Created a robust status tracking system',
      'Used WebSockets for real-time notifications',
      'Developed comprehensive analytics dashboard'
    ],
    impact: 'Reduced average resolution time by 35% and improved customer satisfaction scores by 45%.',
    demoUrl: 'https://example.com/helpdesk-demo',
    codeUrl: 'https://github.com/example/helpdesk-manager'
  }
];