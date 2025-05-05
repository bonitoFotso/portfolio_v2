'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, BookOpen, Award, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function EducationSection() {
  const { t } = useTranslation();
  
  const educationItems = [
    {
      id: 'bachelor',
      titleKey: 'education.degree.bachelor.title',
      schoolKey: 'education.degree.bachelor.school',
      dateKey: 'education.degree.bachelor.date',
      color: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-500',
      icon: BookOpen
    },
    {
      id: 'bts',
      titleKey: 'education.degree.bts.title',
      schoolKey: 'education.degree.bts.school',
      dateKey: 'education.degree.bts.date',
      color: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-500',
      icon: Award
    },
    {
      id: 'bac',
      titleKey: 'education.degree.bac.title',
      schoolKey: 'education.degree.bac.school',
      dateKey: 'education.degree.bac.date',
      color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-500',
      icon: GraduationCap
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section id="education" className="py-28 relative bg-gradient-to-t from-muted/30 to-background">
      {/* Decorative elements */}
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-background to-transparent" />
      
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold mb-2 text-foreground relative inline-block">
            {t('education.title')}
            <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/70 rounded-full"></span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mt-6">
            Academic qualifications that built my foundation
          </p>
        </motion.div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Main timeline line */}
          <div className="absolute left-8 md:left-16 top-8 bottom-0 w-0.5 bg-gradient-to-b from-primary/70 via-primary/40 to-primary/10 rounded-full" />
          
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            {educationItems.map((item, index) => {
              const Icon = item.icon;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100,
                    damping: 12
                  }}
                  viewport={{ once: true }}
                  className="relative pl-16 md:pl-28"
                >
                  {/* Timeline node */}
                  <div className={`absolute left-8 md:left-16 top-8 w-8 h-8 rounded-full ${item.iconBg} border-4 border-background transform -translate-x-1/2 z-10 flex items-center justify-center`}>
                    <div className={`w-2 h-2 rounded-full ${item.iconColor.replace('text-', 'bg-')}`}></div>
                  </div>
                  
                  {/* Education Card */}
                  <Card className="relative group border border-border/60 hover:border-primary/30 transition-all duration-300 shadow-lg shadow-primary/5 overflow-hidden">
                    {/* Colored side border */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${item.color.split(' ')[0]} opacity-80`}></div>
                    
                    <CardContent className="p-6 pl-8">
                      <div className="flex flex-col space-y-3">
                        {/* Degree title and date */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                            {t(item.titleKey)}
                          </h3>
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${item.color}`}>
                            <Calendar className="h-3.5 w-3.5 mr-1.5" />
                            <span>{t(item.dateKey)}</span>
                          </div>
                        </div>
                        
                        {/* School name with icon */}
                        <div className="flex items-center space-x-2 mt-1">
                          <div className={`p-2 rounded-md ${item.iconBg}`}>
                            <Icon className={`h-5 w-5 ${item.iconColor}`} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">{t(item.schoolKey)}</span>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5 mr-1" />
                              <span>Location placeholder</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Optional achievements section - can be added if needed */}
                        {/*
                        <div className="pt-2 mt-2 border-t border-border/40">
                          <h4 className="text-sm font-semibold mb-2">Notable Achievements:</h4>
                          <ul className="space-y-1">
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              <span className="text-sm text-muted-foreground">Achievement placeholder</span>
                            </li>
                          </ul>
                        </div>
                        */}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}