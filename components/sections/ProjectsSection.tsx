'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { projects } from '@/lib/data/projects';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Code, Image, ArrowRight, ChevronRight, Github, Globe, Award, Lightbulb, Puzzle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';

export function ProjectsSection() {
  const { t } = useTranslation();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7,
        type: "spring",
        stiffness: 100,
        damping: 12
      } 
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  // Function to determine the badge color based on the technology type
  const getTechBadgeClass = (tech: string) => {
    // Frontend technologies
    if (['React', 'Vue', 'Angular', 'CSS', 'HTML', 'JavaScript', 'TypeScript', 'Tailwind', 'SASS'].includes(tech)) {
      return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
    }
    // Backend technologies
    else if (['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Firebase', 'Python', 'Django', 'Flask', 'SQL'].includes(tech)) {
      return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30';
    }
    // Mobile technologies
    else if (['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic'].includes(tech)) {
      return 'bg-purple-500/10 text-purple-500 border-purple-500/30';
    }
    // DevOps/Cloud
    else if (['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'Google Cloud', 'Azure'].includes(tech)) {
      return 'bg-amber-500/10 text-amber-500 border-amber-500/30';
    }
    // Default
    return 'bg-slate-500/10 text-slate-500 border-slate-500/30';
  };

  // Progress indicator for carousel
  const CarouselProgress = ({ total, current }: { total: number; current: number }) => {
    return (
      <div className="flex items-center justify-center space-x-2 mt-4">
        {Array.from({ length: total }).map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === current ? 'w-6 bg-primary' : 'w-2 bg-primary/30'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="projects" className="py-32 relative bg-gradient-to-t from-muted/30 to-background">
      {/* Decorative elements */}
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
      
      <div className="container mx-auto px-4 max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl font-bold mb-2 text-foreground relative inline-block">
            {t('projects.title')}
            <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/70 rounded-full"></span>
          </h2>
          <p className="max-w-3xl mx-auto mt-6 text-lg text-muted-foreground">
            A showcase of my recent work, solving real-world problems with innovative solutions
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-32"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={item}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-12 items-center`}
              onViewportEnter={() => setActiveProjectIndex(index)}
            >
              {/* Project Images Carousel */}
              <div className="w-full lg:w-1/2">
                <div className="relative overflow-hidden rounded-xl shadow-xl">
                  <Card className="bg-card/30 backdrop-blur-sm border-border/50">
                    <CardContent className="p-1">
                      <Carousel className="w-full">
                        <CarouselContent>
                          {project.images.map((image, i) => (
                            <CarouselItem key={i}>
                              <AspectRatio ratio={16 / 9}>
                                <img
                                  src={image}
                                  alt={`${project.title} screenshot ${i + 1}`}
                                  className="h-full w-full object-cover rounded-lg"
                                />
                              </AspectRatio>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                        <CarouselPrevious className="h-8 w-8 opacity-70 hover:opacity-100" />
                        <CarouselNext className="h-8 w-8 opacity-70 hover:opacity-100" />
                      </Carousel>
                      
                      {/* Image counter */}
                      <div className="absolute bottom-4 right-4 bg-background/80 text-foreground px-2 py-1 rounded-md text-xs backdrop-blur-sm z-10">
                        {/* Here you would need to track the current image index */}
                        <span>1/{project.images.length}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Progress dots */}
                  <CarouselProgress total={project.images.length} current={0} />
                </div>
              </div>

              {/* Project Description Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-2">
                  <motion.div 
                    initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="inline-flex items-center gap-2 text-primary/70 mb-2"
                  >
                    <span className="h-px w-6 bg-primary/50"></span>
                    <span className="text-sm font-medium uppercase tracking-wider">Featured Project</span>
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Technology Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTechBadgeClass(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Challenges, Solutions, Impact Tabs */}
                <Card className="mt-6 border border-border/50 bg-card/50 backdrop-blur-sm">
                  <Tabs defaultValue="challenges" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 p-1 bg-muted/50 rounded-t-lg">
                      <TabsTrigger 
                        value="challenges" 
                        className="data-[state=active]:bg-background data-[state=active]:text-foreground flex items-center gap-1.5"
                      >
                        <Puzzle className="h-3.5 w-3.5" />
                        <span>{t('projects.challenges')}</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="solutions" 
                        className="data-[state=active]:bg-background data-[state=active]:text-foreground flex items-center gap-1.5"
                      >
                        <Lightbulb className="h-3.5 w-3.5" />
                        <span>{t('projects.solutions')}</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="impact" 
                        className="data-[state=active]:bg-background data-[state=active]:text-foreground flex items-center gap-1.5"
                      >
                        <Zap className="h-3.5 w-3.5" />
                        <span>{t('projects.impact')}</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <CardContent className="p-4">
                      <TabsContent value="challenges" className="h-48 overflow-y-auto pr-2 focus-visible:outline-none">
                        <ul className="space-y-3 text-muted-foreground">
                          {project.challenges.map((challenge, i) => (
                            <li key={i} className="flex items-start">
                              <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                      <TabsContent value="solutions" className="h-48 overflow-y-auto pr-2 focus-visible:outline-none">
                        <ul className="space-y-3 text-muted-foreground">
                          {project.solutions.map((solution, i) => (
                            <li key={i} className="flex items-start">
                              <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span>{solution}</span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                      <TabsContent value="impact" className="h-48 overflow-y-auto pr-2 focus-visible:outline-none">
                        <div className="flex items-start space-x-3">
                          <Award className="h-5 w-5 text-primary shrink-0 mt-1" />
                          <p className="text-muted-foreground">{project.impact}</p>
                        </div>
                      </TabsContent>
                    </CardContent>
                  </Tabs>
                </Card>

                {/* Project Links */}
                <div className="flex gap-4 pt-4">
                  {project.demoUrl && (
                    <Button 
                      asChild 
                      variant="default" 
                      className="rounded-full px-6 group"
                    >
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Globe size={16} />
                        <span>{t('projects.viewDemo')}</span>
                        <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </a>
                    </Button>
                  )}
                  {project.codeUrl && (
                    <Button 
                      asChild 
                      variant="outline" 
                      className="rounded-full px-6 group"
                    >
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github size={16} />
                        <span>{t('projects.viewCode')}</span>
                        <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}