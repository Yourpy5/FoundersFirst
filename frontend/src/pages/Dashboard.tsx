import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { UserProfileProvider } from '../contexts/UserProfileContext';
import { OnboardingModal } from '@/components/dashboard/OnboardingModal';
import { UserOverview } from '../components/dashboard/UserOverview';
import { ProfileCompletion } from '../components/dashboard/ProfileCompletion';
import { JourneyInsights } from '../components/dashboard/JourneyInsights';
import { QuickActions } from '../components/dashboard/QuickActions';

function DashboardContent() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* User Overview */}
          <section className="mb-10">
            <UserOverview />
          </section>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - 2/3 width */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Completion */}
              <ProfileCompletion />
              
              {/* Journey Insights */}
              <JourneyInsights />
            </div>

            {/* Sidebar - 1/3 width */}
            <div>
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Onboarding Modal */}
      <OnboardingModal />
    </div>
  );
}

const Dashboard = () => {
  return (
    <UserProfileProvider>
      <DashboardContent />
    </UserProfileProvider>
  );
};

export default Dashboard;
