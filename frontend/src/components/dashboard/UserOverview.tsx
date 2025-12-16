import { motion } from 'framer-motion';
import { Sparkles, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { useUserProfile } from '@/contexts/UserProfileContext';

const stageLabels: Record<string, string> = {
  idea: 'Idea Stage',
  validation: 'Validation',
  prototype: 'Prototype',
  early_revenue: 'Early Revenue',
};

const experienceLabels: Record<string, string> = {
  student: 'Student',
  beginner: 'Beginner',
  professional: 'Working Professional',
  serial_entrepreneur: 'Serial Entrepreneur',
};

export function UserOverview() {
  const { profile } = useUserProfile();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = profile.displayName || 'Entrepreneur';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Background decoration */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-saffron/20 to-accent/10 rounded-full blur-3xl" />
      <div className="absolute -top-5 right-20 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-saffron" />
          <span className="text-sm font-medium text-accent tracking-wide uppercase">
            Your Dashboard
          </span>
        </div>
        
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          {getGreeting()}, {displayName}
        </h1>
        
        <p className="text-muted-foreground text-lg mb-6">
          Here's your entrepreneurship journey overview
        </p>

        {/* Quick Info Pills */}
        <div className="flex flex-wrap gap-3">
          {profile.startupStage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20"
            >
              <Briefcase className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">
                {stageLabels[profile.startupStage]}
              </span>
            </motion.div>
          )}
          
          {profile.experienceLevel && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
            >
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {experienceLabels[profile.experienceLevel]}
              </span>
            </motion.div>
          )}
          
          {profile.location.country && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-saffron/10 border border-saffron/20"
            >
              <MapPin className="w-4 h-4 text-saffron" />
              <span className="text-sm font-medium text-foreground">
                {[profile.location.city, profile.location.state, profile.location.country]
                  .filter(Boolean)
                  .join(', ')}
              </span>
            </motion.div>
          )}
        </div>

        {/* Industry Tags */}
        {profile.industryInterests.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {profile.industryInterests.map(industry => (
              <span
                key={industry}
                className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground"
              >
                {industry}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
