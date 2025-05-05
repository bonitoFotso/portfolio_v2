'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Calendar, Mail, MessageSquare, Send, User, AtSign, FileText, MapPin, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactSection() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    },
  });

  function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: t('contact.form.success'),
        description: "I'll get back to you soon!",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  }

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section id="contact" className="py-32 relative bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Decorative elements */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />
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
            {t('contact.title')}
            <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/70 rounded-full"></span>
          </h2>
          <p className="max-w-2xl mx-auto mt-8 text-muted-foreground leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info & Social Links Card */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-2 space-y-8"
          >
            <Card className="overflow-hidden border border-border/50 hover:border-primary/20 transition-all duration-300 shadow-lg shadow-primary/5">
              <div className="h-2 w-full bg-gradient-to-r from-primary/80 to-blue-500/80"></div>
              <CardContent className="p-8 space-y-6">
                {/* Contact brief intro */}
                <div className="space-y-2 mb-6">
                  <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <span>{t('contact.getInTouch')}</span>
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Feel free to reach out through any of these channels.
                  </p>
                </div>
                
                <div className="space-y-5">
                  {/* Social links */}
                  <h4 className="text-base font-medium text-foreground/80 border-b border-border/50 pb-2 flex items-center">
                    <span className="inline-block w-1.5 h-5 bg-primary/60 rounded-full mr-2"></span>
                    {t('contact.socials')}
                  </h4>
                  
                  <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-4"
                  >
                    <motion.a 
                      variants={fadeIn}
                      href="https://github.com/yourusername" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/60 transition-colors group"
                    >
                      <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Github className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium group-hover:text-primary transition-colors">GitHub</span>
                        <span className="text-sm text-muted-foreground">@yourusername</span>
                      </div>
                    </motion.a>
                    
                    <motion.a 
                      variants={fadeIn}
                      href="https://linkedin.com/in/yourusername" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/60 transition-colors group"
                    >
                      <div className="p-2 rounded-md bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                        <Linkedin className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium group-hover:text-blue-500 transition-colors">LinkedIn</span>
                        <span className="text-sm text-muted-foreground">Your Name</span>
                      </div>
                    </motion.a>
                    
                    <motion.a 
                      variants={fadeIn}
                      href="mailto:youremail@example.com" 
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/60 transition-colors group"
                    >
                      <div className="p-2 rounded-md bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                        <Mail className="h-5 w-5 text-purple-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium group-hover:text-purple-500 transition-colors">Email</span>
                        <span className="text-sm text-muted-foreground">youremail@example.com</span>
                      </div>
                    </motion.a>
                  </motion.div>
                  
                  {/* Schedule section */}
                  <h4 className="text-base font-medium text-foreground/80 border-b border-border/50 pb-2 mt-6 pt-2 flex items-center">
                    <span className="inline-block w-1.5 h-5 bg-primary/60 rounded-full mr-2"></span>
                    {t('contact.schedule')}
                  </h4>
                  
                  <motion.a 
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    href="https://calendly.com/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/60 transition-colors group"
                  >
                    <div className="p-2 rounded-md bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                      <Calendar className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium group-hover:text-emerald-500 transition-colors">Schedule a Meeting</span>
                      <span className="text-sm text-muted-foreground">via Calendly</span>
                    </div>
                  </motion.a>
                  
                  {/* Additional info */}
                  <div className="pt-5 mt-2 border-t border-border/30">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-2 text-primary/70" />
                      <span>Location, Country</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2 text-primary/70" />
                      <span>Available: Mon-Fri, 9AM - 5PM</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Contact Form Card */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-3"
          >
            <Card className="overflow-hidden border border-border/50 hover:border-primary/20 transition-all duration-300 shadow-lg shadow-primary/5">
              <div className="h-2 w-full bg-gradient-to-r from-primary/80 via-blue-500/60 to-purple-500/60"></div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" />
                  <span>Send Me a Message</span>
                </h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1.5">
                              <User className="h-3.5 w-3.5 text-primary/70" />
                              {t('contact.form.name')}
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Jane Doe" 
                                {...field} 
                                className="bg-muted/40 focus:bg-background transition-colors border-border/50"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1.5">
                              <AtSign className="h-3.5 w-3.5 text-primary/70" />
                              {t('contact.form.email')}
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="jane.doe@example.com" 
                                {...field} 
                                className="bg-muted/40 focus:bg-background transition-colors border-border/50"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5 text-primary/70" />
                            {t('contact.form.subject')}
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Project Inquiry" 
                              {...field} 
                              className="bg-muted/40 focus:bg-background transition-colors border-border/50"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1.5">
                            <MessageSquare className="h-3.5 w-3.5 text-primary/70" />
                            {t('contact.form.message')}
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="I'd like to discuss a project with you..." 
                              className="min-h-[150px] bg-muted/40 focus:bg-background transition-colors border-border/50" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full py-6 text-base group relative overflow-hidden bg-primary hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? 'Sending...' : t('contact.form.submit')}
                        <Send className={`h-4 w-4 ${isSubmitting ? '' : 'group-hover:translate-x-1 transition-transform'}`} />
                      </span>
                      <span className="absolute inset-0 w-0 bg-primary/80 group-hover:w-full transition-all duration-300"></span>
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}