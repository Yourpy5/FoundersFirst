import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Check, User, Briefcase, MapPin, Lightbulb, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUserProfile } from '@/contexts/UserProfileContext';
import { cn } from '@/lib/utils';

const steps = [
  { id: 'name', title: 'Your Name', icon: User },
  { id: 'experience', title: 'Experience', icon: Briefcase },
  { id: 'location', title: 'Location', icon: MapPin },
  { id: 'interests', title: 'Interests', icon: Lightbulb },
  { id: 'stage', title: 'Startup Stage', icon: Rocket },
];

const experienceLevels = [
  { value: 'student', label: 'Student', desc: 'Currently studying' },
  { value: 'beginner', label: 'Beginner', desc: 'New to entrepreneurship' },
  { value: 'professional', label: 'Working Professional', desc: 'Have industry experience' },
  { value: 'serial_entrepreneur', label: 'Serial Entrepreneur', desc: 'Built businesses before' },
];

const educationLevels = ['High School', 'Undergraduate', 'Graduate', 'Post Graduate', 'PhD', 'Other'];

const industries = [
  'Technology', 'Healthcare', 'Fintech', 'E-commerce', 'Education',
  'Agriculture', 'Manufacturing', 'Real Estate', 'Food & Beverage', 'Media',
];

const startupStages = [
  { value: 'idea', label: 'Idea Stage', desc: 'Just have an idea' },
  { value: 'validation', label: 'Validation', desc: 'Testing the market' },
  { value: 'prototype', label: 'Prototype', desc: 'Building MVP' },
  { value: 'early_revenue', label: 'Early Revenue', desc: 'Getting first customers' },
];

export function OnboardingModal() {
  const { profile, updateProfile, isOnboardingOpen, setIsOnboardingOpen } = useUserProfile();
  const [currentStep, setCurrentStep] = useState(0);
  const [localData, setLocalData] = useState({
    displayName: profile.displayName,
    experienceLevel: profile.experienceLevel,
    educationLevel: profile.educationLevel,
    location: { ...profile.location },
    industryInterests: [...profile.industryInterests],
    startupStage: profile.startupStage,
  });

  const handleNext = () => {
    // Save current step data
    updateProfile(localData);
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    updateProfile({ ...localData, onboardingCompleted: true });
    setIsOnboardingOpen(false);
  };

  const handleSkip = () => {
    setIsOnboardingOpen(false);
  };

  const toggleIndustry = (industry: string) => {
    setLocalData(prev => ({
      ...prev,
      industryInterests: prev.industryInterests.includes(industry)
        ? prev.industryInterests.filter(i => i !== industry)
        : [...prev.industryInterests, industry],
    }));
  };

  if (!isOnboardingOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-2xl bg-card rounded-3xl shadow-elevated overflow-hidden"
        >
          {/* Decorative corner */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-saffron/10 to-accent/5 rounded-full blur-3xl" />
          
          {/* Header */}
          <div className="relative px-8 pt-8 pb-4">
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
            
            <p className="text-sm text-accent font-medium tracking-wide uppercase mb-1">
              Complete Your Profile
            </p>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              {steps[currentStep].title}
            </h2>

            {/* Progress Steps */}
            <div className="flex items-center gap-2 mt-6">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-2">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
                      index < currentStep
                        ? 'bg-accent text-accent-foreground'
                        : index === currentStep
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {index < currentStep ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        'w-8 h-0.5 transition-colors duration-300',
                        index < currentStep ? 'bg-accent' : 'bg-muted'
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-6 min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">What should we call you?</p>
                    <Input
                      placeholder="Enter your display name"
                      value={localData.displayName}
                      onChange={e => setLocalData(prev => ({ ...prev, displayName: e.target.value }))}
                      className="h-12 rounded-xl text-lg"
                    />
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground mb-4">What's your experience level?</p>
                    <div className="grid grid-cols-2 gap-3">
                      {experienceLevels.map(level => (
                        <button
                          key={level.value}
                          onClick={() => setLocalData(prev => ({ ...prev, experienceLevel: level.value as any }))}
                          className={cn(
                            'p-4 rounded-xl text-left border-2 transition-all duration-200',
                            localData.experienceLevel === level.value
                              ? 'border-accent bg-accent/5'
                              : 'border-border hover:border-accent/50'
                          )}
                        >
                          <p className="font-medium text-foreground">{level.label}</p>
                          <p className="text-sm text-muted-foreground">{level.desc}</p>
                        </button>
                      ))}
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">Education Level</p>
                      <div className="flex flex-wrap gap-2">
                        {educationLevels.map(edu => (
                          <button
                            key={edu}
                            onClick={() => setLocalData(prev => ({ ...prev, educationLevel: edu }))}
                            className={cn(
                              'px-3 py-1.5 rounded-full text-sm border transition-all duration-200',
                              localData.educationLevel === edu
                                ? 'border-accent bg-accent/10 text-accent'
                                : 'border-border hover:border-accent/50'
                            )}
                          >
                            {edu}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">Where are you based?</p>
                    <div className="space-y-3">
                      <Input
                        placeholder="Country"
                        value={localData.location.country}
                        onChange={e => setLocalData(prev => ({
                          ...prev,
                          location: { ...prev.location, country: e.target.value }
                        }))}
                        className="h-12 rounded-xl"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="State / Province"
                          value={localData.location.state}
                          onChange={e => setLocalData(prev => ({
                            ...prev,
                            location: { ...prev.location, state: e.target.value }
                          }))}
                          className="h-12 rounded-xl"
                        />
                        <Input
                          placeholder="City"
                          value={localData.location.city}
                          onChange={e => setLocalData(prev => ({
                            ...prev,
                            location: { ...prev.location, city: e.target.value }
                          }))}
                          className="h-12 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">Select your industry interests (choose multiple)</p>
                    <div className="flex flex-wrap gap-2">
                      {industries.map(industry => (
                        <button
                          key={industry}
                          onClick={() => toggleIndustry(industry)}
                          className={cn(
                            'px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all duration-200',
                            localData.industryInterests.includes(industry)
                              ? 'border-accent bg-accent/10 text-accent'
                              : 'border-border hover:border-accent/50 text-foreground'
                          )}
                        >
                          {industry}
                        </button>
                      ))}
                    </div>
                    {localData.industryInterests.length > 0 && (
                      <p className="text-sm text-accent">
                        Selected: {localData.industryInterests.join(', ')}
                      </p>
                    )}
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">What stage is your startup at?</p>
                    <div className="grid grid-cols-2 gap-3">
                      {startupStages.map(stage => (
                        <button
                          key={stage.value}
                          onClick={() => setLocalData(prev => ({ ...prev, startupStage: stage.value as any }))}
                          className={cn(
                            'p-4 rounded-xl text-left border-2 transition-all duration-200',
                            localData.startupStage === stage.value
                              ? 'border-accent bg-accent/5'
                              : 'border-border hover:border-accent/50'
                          )}
                        >
                          <p className="font-medium text-foreground">{stage.label}</p>
                          <p className="text-sm text-muted-foreground">{stage.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-muted/30 flex items-center justify-between">
            <button
              onClick={handleSkip}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip for now
            </button>
            <div className="flex items-center gap-3">
              {currentStep > 0 && (
                <Button variant="outline" onClick={handleBack} className="rounded-xl">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
              )}
              <Button onClick={handleNext} className="rounded-xl btn-indian">
                {currentStep === steps.length - 1 ? 'Complete' : 'Continue'}
                {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
