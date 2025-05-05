'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { skills, SkillLevel } from '@/lib/data/skills';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Code, Server, Smartphone, Cloud, BookOpen, MoveRight } from 'lucide-react';

export function SkillsSection() {
  const { t } = useTranslation();
  
  // Enhanced skill level calculation for more visual differentiation
  const getLevelPercentage = (level: SkillLevel): number => {
    switch (level) {
      case 'beginner':
        return 30;
      case 'intermediate':
        return 55;
      case 'advanced':
        return 80;
      case 'expert':
        return 95;
      default:
        return 0;
    }
  };
  
  // Get appropriate icon for category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend':
        return <Code className="h-5 w-5" />;
      case 'backend':
        return <Server className="h-5 w-5" />;
      case 'mobile':
        return <Smartphone className="h-5 w-5" />;
      case 'devops':
        return <Cloud className="h-5 w-5" />;
      case 'learning':
        return <BookOpen className="h-5 w-5" />;
      default:
        return <Code className="h-5 w-5" />;
    }
  };
  
  // Enhanced badge styling with colors
  const getBadgeClass = (level: SkillLevel) => {
    switch (level) {
      case 'beginner':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
      case 'intermediate':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/30';
      case 'advanced':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/30';
      case 'expert':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/30';
    }
  };
  
  // Get progress bar color based on skill level
  const getProgressColor = (level: SkillLevel) => {
    switch (level) {
      case 'beginner':
        return 'bg-blue-500';
      case 'intermediate':
        return 'bg-purple-500';
      case 'advanced':
        return 'bg-amber-500';
      case 'expert':
        return 'bg-emerald-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getSkillsByCategory = (category: string) => {
    return skills.filter((skill) => skill.category === category);
  };
  
  // Get tab button style based on category
  const getTabStyle = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-500';
      case 'backend':
        return 'data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500';
      case 'mobile':
        return 'data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-500';
      case 'devops':
        return 'data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-500';
      case 'learning':
        return 'data-[state=active]:bg-indigo-500/10 data-[state=active]:text-indigo-500';
      default:
        return 'data-[state=active]:bg-primary/10 data-[state=active]:text-primary';
    }
  };
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
  };

  return (
    <section id="skills" className="py-32 relative bg-gradient-to-b from-muted/50 via-muted/30 to-background">
      {/* Decorative elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent" />
      
      <div className="container mx-auto px-4 max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold mb-2 text-foreground relative inline-block">
            {t('skills.title')}
            <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/70 rounded-full"></span>
          </h2>
          <p className="max-w-3xl mx-auto mt-6 text-muted-foreground text-lg">
            The technologies and tools I work with to build exceptional digital experiences
          </p>
        </motion.div>
        
        <Tabs defaultValue="frontend" className="w-full">
          {/* Enhanced Tab List */}
          <div className="flex justify-center mb-12">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 bg-muted/40 p-1 rounded-xl">
              {['frontend', 'backend', 'mobile', 'devops', 'learning'].map((category) => (
                <TabsTrigger 
                  key={category}
                  value={category} 
                  className={`flex items-center gap-2 py-3 px-4 ${getTabStyle(category)}`}
                >
                  {getCategoryIcon(category)}
                  <span className="hidden sm:inline">{t(`skills.${category}`)}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {/* Tab Content */}
          {['frontend', 'backend', 'mobile', 'devops', 'learning'].map((category) => (
            <TabsContent key={category} value={category} className="focus-visible:outline-none focus-visible:ring-0">
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {getSkillsByCategory(category).map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={item}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-card rounded-xl shadow-lg shadow-primary/5 border border-border/50 hover:border-primary/20 transition-all duration-300 overflow-hidden group"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{skill.name}</h3>
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getBadgeClass(skill.level)}`}>
                            {t(`skills.level.${skill.level}`)}
                          </div>
                        </div>
                        {/* Skill icon can be added here if available */}
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-muted/50">
                          <MoveRight className={`h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ${getBadgeClass(skill.level).split(' ')[1]}`} />
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-xs font-medium text-muted-foreground mb-1">
                          <span>Proficiency</span>
                          <span>{getLevelPercentage(skill.level)}%</span>
                        </div>
                        <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${getLevelPercentage(skill.level)}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className={`h-full rounded-full ${getProgressColor(skill.level)}`}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}