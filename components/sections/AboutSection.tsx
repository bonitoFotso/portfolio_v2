'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Compass, 
  Lightbulb, 
  Target, 
  Heart, 
  ChevronRight 
} from 'lucide-react';

export function AboutSection() {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  
  // Parallax effect for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 12
      } 
    },
  };
  
  // Get the icon for each card
  const getCardIcon = (type: string) => {
    switch (type) {
      case 'journey':
        return <Compass className="h-6 w-6 text-blue-500" />;
      case 'philosophy':
        return <Lightbulb className="h-6 w-6 text-amber-500" />;
      case 'goals':
        return <Target className="h-6 w-6 text-emerald-500" />;
      case 'values':
        return <Heart className="h-6 w-6 text-rose-500" />;
      default:
        return null;
    }
  };
  
  // Get background color class for each card
  const getCardBgClass = (type: string) => {
    switch (type) {
      case 'journey':
        return 'bg-blue-500/5 group-hover:bg-blue-500/10';
      case 'philosophy':
        return 'bg-amber-500/5 group-hover:bg-amber-500/10';
      case 'goals':
        return 'bg-emerald-500/5 group-hover:bg-emerald-500/10';
      case 'values':
        return 'bg-rose-500/5 group-hover:bg-rose-500/10';
      default:
        return 'bg-primary/5 group-hover:bg-primary/10';
    }
  };
  
  // Get border color class for each card
  const getCardBorderClass = (type: string) => {
    switch (type) {
      case 'journey':
        return 'group-hover:border-blue-500/30';
      case 'philosophy':
        return 'group-hover:border-amber-500/30';
      case 'goals':
        return 'group-hover:border-emerald-500/30';
      case 'values':
        return 'group-hover:border-rose-500/30';
      default:
        return 'group-hover:border-primary/30';
    }
  };
  
  // Get the text color for each card title
  const getCardTitleClass = (type: string) => {
    switch (type) {
      case 'journey':
        return 'text-blue-500';
      case 'philosophy':
        return 'text-amber-500';
      case 'goals':
        return 'text-emerald-500';
      case 'values':
        return 'text-rose-500';
      default:
        return 'text-primary';
    }
  };
  
  const values = t('about.valuesList', { returnObjects: true }) as string[];
  
  // Card data
  const cards = [
    {
      type: 'journey',
      title: t('about.journey'),
      content: t('about.journeyText'),
    },
    {
      type: 'philosophy',
      title: t('about.philosophy'),
      content: t('about.philosophyText'),
    },
    {
      type: 'goals',
      title: t('about.goals'),
      content: t('about.goalsText'),
    },
    {
      type: 'values',
      title: t('about.values'),
      content: values,
      isList: true,
    },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-background/20 -z-10" />
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent" />
      
      {/* Decorative elements with parallax effect */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl -z-5" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl -z-5" 
      />
      
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl font-bold mb-2 text-foreground relative inline-block">
            {t('about.title')}
            <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/70 rounded-full"></span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mt-8 leading-relaxed">
            {t('about.intro')}
          </p>
        </motion.div>
        
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12"
        >
          {cards.map((card, index) => (
            <motion.div 
              key={card.type} 
              variants={item}
              className="group"
            >
              <Card className={`h-full transition-all duration-300 border border-border/50 ${getCardBorderClass(card.type)} overflow-hidden hover:shadow-xl hover:shadow-primary/5`}>
                <div className={`h-1.5 w-full ${getCardTitleClass(card.type).replace('text-', 'bg-')} opacity-80`}></div>
                <CardContent className={`p-8 h-full ${getCardBgClass(card.type)} transition-colors duration-300`}>
                  <div className="flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`p-3 rounded-lg ${getCardBgClass(card.type)} transition-colors duration-300`}>
                        {getCardIcon(card.type)}
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold ${getCardTitleClass(card.type)}`}>
                          {card.title}
                        </h3>
                      </div>
                    </div>
                    
                    {card.isList ? (
                      <ul className="space-y-3 flex-grow">
                        {(card.content as string[]).map((item, i) => (
                          <li key={i} className="flex items-start">
                            <ChevronRight className={`h-5 w-5 ${getCardTitleClass(card.type)} shrink-0 mt-0.5`} />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground leading-relaxed flex-grow">
                        {card.content as string}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}