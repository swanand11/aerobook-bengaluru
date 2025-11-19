import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, MapPin, Navigation, Plane, Clock } from 'lucide-react';
import { LatLng } from 'leaflet';

interface TaxiTier {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  pricePerKm: number;
  capacity: number;
}

interface BookingConfirmationProps {
  pickup: LatLng;
  destination: LatLng;
  tier: TaxiTier;
  fare: number;
  distance: number;
  onNewBooking: () => void;
}

const BookingConfirmation = ({
  pickup,
  destination,
  tier,
  fare,
  distance,
  onNewBooking,
}: BookingConfirmationProps) => {
  const estimatedTime = Math.round((distance / 100) * 60); // Rough estimate: 100km/h average

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 space-y-6">
        {/* Success Icon */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-4">
            <CheckCircle2 className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">Your flying taxi is on its way</p>
        </div>

        {/* Booking Details */}
        <div className="space-y-4 pt-6 border-t border-border">
          <div className="grid grid-cols-2 gap-4">
            {/* Pickup */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Pickup Location</span>
              </div>
              <p className="text-sm font-medium text-foreground pl-6">
                {pickup.lat.toFixed(4)}, {pickup.lng.toFixed(4)}
              </p>
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Navigation className="h-4 w-4" />
                <span>Destination</span>
              </div>
              <p className="text-sm font-medium text-foreground pl-6">
                {destination.lat.toFixed(4)}, {destination.lng.toFixed(4)}
              </p>
            </div>

            {/* Taxi Tier */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Plane className="h-4 w-4" />
                <span>Taxi Tier</span>
              </div>
              <p className="text-sm font-medium text-foreground pl-6">{tier.name}</p>
            </div>

            {/* Estimated Time */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Est. Travel Time</span>
              </div>
              <p className="text-sm font-medium text-foreground pl-6">{estimatedTime} minutes</p>
            </div>
          </div>

          {/* Distance and Fare */}
          <div className="pt-4 border-t border-border space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Distance</span>
              <span className="font-medium text-foreground">{distance.toFixed(2)} km</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span className="text-foreground">Total Fare</span>
              <span className="text-accent">₹{fare}</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
          <p className="text-sm text-muted-foreground text-center">
            Your autonomous flying taxi will arrive at the pickup location shortly. 
            Please ensure the landing zone is clear.
          </p>
        </div>

        {/* Action Button */}
        <Button size="lg" className="w-full" onClick={onNewBooking}>
          Book Another Flight
        </Button>
      </Card>
    </div>
  );
};

export default BookingConfirmation;
