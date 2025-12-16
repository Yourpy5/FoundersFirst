import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Map, 
  BookOpen, 
  Building2, 
  Bookmark, 
  ArrowRight,
  Sparkles 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const actions = [
  {
    id: 'ai-bot',
    title: 'AI Entrepreneur Bot',
    description: 'Get personalized guidance and answers to your startup questions',
    icon: Bot,
    href: '/ai-bot',
    color: 'primary',
    gradient: 'from-primary/20 to-primary/5',
    featured: true,
  },
  {
    id: 'roadmap',
    title: 'Personalized Roadmap',
    description: 'View your customized startup journey plan',
    icon: Map,
    href: '/ai-bot',
    color: 'accent',
    gradient: 'from-accent/20 to-accent/5',
    featured: false,
  },
  {
    id: 'knowledge',
    title: 'Knowledge Base',
    description: 'Access curated resources and learning materials',
    icon: BookOpen,
    href: '/knowledge',
    color: 'saffron',
    gradient: 'from-saffron/20 to-saffron/5',
    featured: false,
  },
  {
    id: 'schemes',
    title: 'Government Schemes',
    description: 'Explore policies and funding opportunities',
    icon: Building2,
    href: '/schemes',
    color: 'green',
    gradient: 'from-green-500/20 to-green-500/5',
    featured: false,
  },
  {
    id: 'bookmarks',
    title: 'Saved Items',
    description: 'Access your bookmarked resources and recommendations',
    icon: Bookmark,
    href: '/knowledge',
    color: 'purple',
    gradient: 'from-purple-500/20 to-purple-500/5',
    featured: false,
  },
];

const iconColors: Record<string, string> = {
  primary: 'text-primary bg-primary/10',
  accent: 'text-accent bg-accent/10',
  saffron: 'text-saffron bg-saffron/10',
  green: 'text-green-600 bg-green-500/10',
  purple: 'text-purple-600 bg-purple-500/10',
};

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-accent" />
        <h2 className="font-display text-xl font-semibold text-foreground">
          Quick Actions
        </h2>
      </div>

      <div className="grid gap-4">
        {/* Featured Action - AI Bot */}
        <Link to={actions[0].href}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={cn(
              'glass-card p-6 relative overflow-hidden group cursor-pointer indian-border',
              'hover:shadow-elevated transition-all duration-300'
            )}
          >
            <div className={cn(
              'absolute inset-0 bg-gradient-to-br opacity-50',
              actions[0].gradient
            )} />
            
            <div className="relative flex items-start gap-4">
              <div className={cn(
                'w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0',
                iconColors[actions[0].color]
              )}>
                <Bot className="w-7 h-7" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {actions[0].title}
                  </h3>
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-accent/20 text-accent">
                    Featured
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  {actions[0].description}
                </p>
              </div>
              
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
            </div>
          </motion.div>
        </Link>

        {/* Other Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
          {actions.slice(1).map((action, index) => (
            <Link key={action.id} to={action.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'glass-card p-5 relative overflow-hidden group cursor-pointer',
                  'hover:shadow-elevated transition-all duration-300'
                )}
              >
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-30 group-hover:opacity-50 transition-opacity',
                  action.gradient
                )} />
                
                <div className="relative">
                  <div className={cn(
                    'w-11 h-11 rounded-xl flex items-center justify-center mb-3',
                    iconColors[action.color]
                  )}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {action.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
