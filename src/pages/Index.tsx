import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plane, MapPin, Clock, Shield } from 'lucide-react';
import BookingInterface from '@/components/BookingInterface';

const Index = () => {
  const [showBooking, setShowBooking] = useState(false);

  if (showBooking) {
    return <BookingInterface />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAyYy0yLjIxIDAtNCAxLjc5LTQgNHMxLjc5IDQgNCA0IDQtMS43OSA0LTQtMS43OS00LTQtNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm text-accent-foreground px-4 py-2 rounded-full mb-6">
              <Plane className="h-4 w-4" />
              <span className="text-sm font-medium">Future of Urban Mobility</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6">
              Skip the Traffic,
              <br />
              <span className="text-accent">Soar Above</span> Bengaluru
            </h1>
            
            <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
              Experience autonomous flying taxis that arrive directly at your location. 
              Fast, efficient, and hassle-free aerial travel.
            </p>
            
            <Button
              size="lg"
              className="text-lg px-8 py-6 h-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all"
              onClick={() => setShowBooking(true)}
            >
              Book Your Flight Now
            </Button>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Flying Taxis?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your daily commute with cutting-edge aerial transportation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-4">
              <Clock className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Save Time</h3>
            <p className="text-muted-foreground">
              Reduce your commute time by up to 75%. Fly over traffic, not through it.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-4">
              <MapPin className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Point-to-Point</h3>
            <p className="text-muted-foreground">
              Direct aerial routes from your location to destination. No detours, no delays.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-4">
              <Shield className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Safe & Autonomous</h3>
            <p className="text-muted-foreground">
              Advanced AI-powered navigation ensures maximum safety on every flight.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Experience the Future?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Book your first flying taxi ride today and join the aerial revolution
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6 h-auto"
            onClick={() => setShowBooking(true)}
          >
            Start Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
