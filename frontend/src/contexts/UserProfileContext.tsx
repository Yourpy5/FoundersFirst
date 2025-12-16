import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  experienceLevel: 'student' | 'beginner' | 'professional' | 'serial_entrepreneur' | '';
  educationLevel: string;
  location: {
    country: string;
    state: string;
    city: string;
  };
  industryInterests: string[];
  startupStage: 'idea' | 'validation' | 'prototype' | 'early_revenue' | '';
  onboardingCompleted: boolean;
  createdAt: Date;
}

interface UserProfileContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  completionPercentage: number;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  stats: {
    aiInteractions: number;
    savedSchemes: number;
    savedResources: number;
    roadmapProgress: number;
  };
}

const defaultProfile: UserProfile = {
  id: '1',
  displayName: '',
  email: 'user@example.com',
  experienceLevel: '',
  educationLevel: '',
  location: { country: '', state: '', city: '' },
  industryInterests: [],
  startupStage: '',
  onboardingCompleted: false,
  createdAt: new Date(),
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? { ...defaultProfile, ...JSON.parse(saved) } : defaultProfile;
  });
  
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [stats] = useState({
    aiInteractions: 12,
    savedSchemes: 5,
    savedResources: 8,
    roadmapProgress: 35,
  });

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    // Show onboarding if profile is incomplete and not previously completed
    if (!profile.onboardingCompleted && !profile.displayName) {
      const timer = setTimeout(() => setIsOnboardingOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, [profile.onboardingCompleted, profile.displayName]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const calculateCompletion = (): number => {
    const fields = [
      { value: profile.displayName, weight: 20 },
      { value: profile.experienceLevel, weight: 15 },
      { value: profile.educationLevel, weight: 10 },
      { value: profile.location.country, weight: 10 },
      { value: profile.location.state, weight: 5 },
      { value: profile.location.city, weight: 5 },
      { value: profile.industryInterests.length > 0, weight: 20 },
      { value: profile.startupStage, weight: 15 },
    ];

    return fields.reduce((acc, field) => {
      return acc + (field.value ? field.weight : 0);
    }, 0);
  };

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        updateProfile,
        completionPercentage: calculateCompletion(),
        isOnboardingOpen,
        setIsOnboardingOpen,
        stats,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
}
