import { motion } from 'framer-motion';
import { TrendingUp, MessageSquare, Bookmark, FileText, Map } from 'lucide-react';
import { useUserProfile } from '@/contexts/UserProfileContext';

const journeySteps = [
  { id: 'idea', label: 'Idea', position: 0 },
  { id: 'validation', label: 'Validation', position: 25 },
  { id: 'prototype', label: 'Prototype', position: 50 },
  { id: 'launch', label: 'Launch', position: 75 },
  { id: 'growth', label: 'Growth', position: 100 },
];

export function JourneyInsights() {
  const { stats, profile } = useUserProfile();

  const getCurrentPosition = () => {
    const stageMap: Record<string, number> = {
      idea: 12,
      validation: 35,
      prototype: 55,
      early_revenue: 75,
    };
    return stageMap[profile.startupStage] || 0;
  };

  const currentPosition = getCurrentPosition();

  const statCards = [
    {
      icon: MessageSquare,
      label: 'AI Interactions',
      value: stats.aiInteractions,
      color: 'primary',
      bgColor: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      icon: Bookmark,
      label: 'Saved Schemes',
      value: stats.savedSchemes,
      color: 'accent',
      bgColor: 'bg-accent/10',
      iconColor: 'text-accent',
    },
    {
      icon: FileText,
      label: 'Saved Resources',
      value: stats.savedResources,
      color: 'saffron',
      bgColor: 'bg-saffron/10',
      iconColor: 'text-saffron',
    },
    {
      icon: Map,
      label: 'Roadmap Progress',
      value: `${stats.roadmapProgress}%`,
      color: 'green',
      bgColor: 'bg-green-500/10',
      iconColor: 'text-green-600',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="glass-card p-4 hover:shadow-elevated transition-shadow duration-300"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Journey Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6 indian-border"
      >
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-accent" />
          <h3 className="font-display text-lg font-semibold text-foreground">
            Your Startup Journey
          </h3>
        </div>

        {/* Progress Track */}
        <div className="relative">
          {/* Background Track */}
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${currentPosition}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
              className="h-full rounded-full bg-gradient-to-r from-accent via-saffron to-primary"
            />
          </div>

          {/* Current Position Marker */}
          {currentPosition > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${currentPosition}%`, transform: `translateX(-50%) translateY(-50%)` }}
            >
              <div className="w-5 h-5 rounded-full bg-accent border-4 border-card shadow-lg" />
            </motion.div>
          )}

          {/* Step Markers */}
          <div className="flex justify-between mt-3">
            {journeySteps.map((step, index) => (
              <div
                key={step.id}
                className={`text-center ${index === 0 ? 'text-left' : index === journeySteps.length - 1 ? 'text-right' : ''}`}
              >
                <div
                  className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                    step.position <= currentPosition
                      ? 'bg-accent'
                      : 'bg-muted'
                  }`}
                />
                <span
                  className={`text-xs font-medium ${
                    step.position <= currentPosition
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Message */}
        <p className="text-sm text-muted-foreground mt-6 text-center">
          {currentPosition > 0
            ? `You're making great progress! Keep building your startup.`
            : `Set your startup stage to see your journey progress.`}
        </p>
      </motion.div>
    </motion.div>
  );
}
