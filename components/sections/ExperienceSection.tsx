'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, Building2, Briefcase, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function ExperienceSection() {
  const { t } = useTranslation();

  const experiences = [
    {
      id: 'kes',
      titleKey: 'experience.kes.title',
      dateKey: 'experience.kes.date',
      positionKey: 'experience.kes.position',
      descriptionKey: 'experience.kes.description',
      responsibilitiesKey: 'experience.kes.responsibilities',
      color: 'bg-blue-500/10 text-blue-500 border-blue-500/50',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-500',
    },
    {
      id: 'servitel',
      titleKey: 'experience.servitel.title',
      dateKey: 'experience.servitel.date',
      positionKey: 'experience.servitel.position',
      descriptionKey: 'experience.servitel.description',
      responsibilitiesKey: 'experience.servitel.responsibilities',
      color: 'bg-purple-500/10 text-purple-500 border-purple-500/50',
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-500',
    },
    {
      id: 'innovation',
      titleKey: 'experience.innovation.title',
      dateKey: 'experience.innovation.date',
      positionKey: 'experience.innovation.position',
      descriptionKey: 'experience.innovation.description',
      responsibilitiesKey: 'experience.innovation.responsibilities',
      color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/50',
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-500',
    },
  ];

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
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
  };

  return (
    <section id="experience" className="py-32 relative bg-gradient-to-b from-muted/50 to-background">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      
      <div className="container mx-auto px-4 max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl font-bold mb-2 text-foreground relative inline-block">
            {t('experience.title')}
            <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/70 rounded-full"></span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mt-6">
            My professional journey that shaped my expertise and perspective
          </p>
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* Main timeline line */}
          <div className="absolute left-8 md:left-1/2 top-6 bottom-28 w-1 bg-gradient-to-b from-primary/80 via-primary/50 to-primary/20 rounded-full transform -translate-x-1/2" />
          
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              const responsibilities = t(exp.responsibilitiesKey, { returnObjects: true }) as string[];

              return (
                <motion.div
                  key={exp.id}
                  variants={item}
                  className="relative mb-16 md:mb-24"
                >
                  {/* Timeline connection for desktop */}
                  <div className="hidden md:block">
                    {/* Timeline node */}
                    <div 
                      className={`absolute left-1/2 top-6 w-8 h-8 rounded-full border-4 border-background ${exp.iconBg} transform -translate-x-1/2 z-10 flex items-center justify-center`}
                    >
                      <Briefcase className={`h-3 w-3 ${exp.iconColor}`} />
                    </div>
                    
                    {/* Timeline connector */}
                    <div 
                      className={`absolute top-6 ${
                        isEven ? 'left-[calc(50%+16px)] right-[calc(50%-400px)]' : 'left-[calc(50%-400px)] right-[calc(50%+16px)]'
                      } h-0.5 ${exp.color} transform ${isEven ? '' : '-'} translate-y-1/2`}
                    />
                  </div>

                  {/* Mobile timeline node */}
                  <div className="md:hidden absolute left-8 top-6 w-6 h-6 rounded-full border-2 border-background bg-primary/20 transform -translate-x-1/2 z-10" />

                  {/* Content card */}
                  <div 
                    className={`relative pl-14 md:pl-0 ${
                      isEven 
                        ? 'md:ml-auto md:pl-0 md:pr-0 md:mr-[calc(50%+2rem)]' 
                        : 'md:mr-auto md:pr-0 md:pl-[calc(50%+2rem)]'
                    }`}
                  >
                    <Card className={`border border-border/60 hover:border-primary/30 transition-all duration-300 shadow-lg shadow-primary/5 overflow-hidden group`}>
                      {/* Colored top border */}
                      <div className={`h-1.5 w-full ${exp.color.split(' ')[0]} opacity-80`}></div>
                      
                      <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col gap-4">
                          {/* Header section */}
                          <div className="flex items-start">
                            <div className={`p-3 rounded-lg ${exp.iconBg} mr-4 hidden md:flex`}>
                              <Building2 className={`h-6 w-6 ${exp.iconColor}`} />
                            </div>
                            <div className="space-y-2">
                              <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">{t(exp.titleKey)}</h3>
                              <div className="flex items-center text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span className="text-sm">{t(exp.dateKey)}</span>
                              </div>
                              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${exp.color}`}>
                                {t(exp.positionKey)}
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-muted-foreground leading-relaxed">{t(exp.descriptionKey)}</p>

                          {/* Responsibilities */}
                          <div className="pt-2">
                            <h4 className="font-semibold mb-3 flex items-center">
                              <span className="mr-2">Key Responsibilities</span>
                              <div className="h-px flex-grow bg-border/60"></div>
                            </h4>
                            <ul className="space-y-2">
                              {responsibilities.map((resp, i) => (
                                <li key={i} className="flex items-start">
                                  <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary/70" />
                                  <span className="text-muted-foreground">{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}