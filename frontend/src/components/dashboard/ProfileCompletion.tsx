import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { useUserProfile } from '@/contexts/UserProfileContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ProfileCompletion() {
  const { completionPercentage, setIsOnboardingOpen, profile } = useUserProfile();
  
  const getStatusMessage = () => {
    if (completionPercentage === 100) {
      return "Your profile is complete! Enjoy personalized recommendations.";
    }
    if (completionPercentage >= 80) {
      return "Almost there! Just a few more details to unlock full personalization.";
    }
    if (completionPercentage >= 50) {
      return "Good progress! Complete your profile for better recommendations.";
    }
    return "Complete your profile to get personalized guidance.";
  };

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card p-6 indian-border"
    >
      <div className="flex items-start gap-6">
        {/* Circular Progress */}
        <div className="relative flex-shrink-0">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="hsl(var(--accent))"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ strokeDasharray: circumference }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-foreground">{completionPercentage}%</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {completionPercentage === 100 ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-accent" />
            )}
            <h3 className="font-display text-lg font-semibold text-foreground">
              Profile Completion
            </h3>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            {getStatusMessage()}
          </p>

          {/* Missing Fields */}
          {completionPercentage < 100 && (
            <div className="space-y-2 mb-4">
              {!profile.displayName && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-accent/50" />
                  Add your display name
                </div>
              )}
              {!profile.experienceLevel && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-accent/50" />
                  Select your experience level
                </div>
              )}
              {!profile.startupStage && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-accent/50" />
                  Set your startup stage
                </div>
              )}
              {profile.industryInterests.length === 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-accent/50" />
                  Choose your industry interests
                </div>
              )}
            </div>
          )}

          {completionPercentage < 100 && (
            <Button
              onClick={() => setIsOnboardingOpen(true)}
              variant="saffron"
              size="sm"
              className="rounded-xl"
            >
              Complete Profile
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
