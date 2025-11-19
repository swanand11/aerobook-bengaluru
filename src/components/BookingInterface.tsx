import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon, LatLng } from 'leaflet';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Plane, Check } from 'lucide-react';
import { toast } from 'sonner';
import TaxiTierCard from './TaxiTierCard';
import BookingConfirmation from './BookingConfirmation';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface TaxiTier {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  pricePerKm: number;
  capacity: number;
}

const taxiTiers: TaxiTier[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Comfortable and efficient',
    basePrice: 150,
    pricePerKm: 25,
    capacity: 2,
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Extra comfort and speed',
    basePrice: 250,
    pricePerKm: 35,
    capacity: 3,
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'First-class aerial experience',
    basePrice: 500,
    pricePerKm: 50,
    capacity: 4,
  },
];

// Bengaluru coordinates
const BENGALURU_CENTER: [number, number] = [12.9716, 77.5946];

function LocationMarker({ onLocationSelect }: { onLocationSelect: (latlng: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
}

const BookingInterface = () => {
  const [pickupLocation, setPickupLocation] = useState<LatLng | null>(null);
  const [destination, setDestination] = useState<LatLng | null>(null);
  const [selectedTier, setSelectedTier] = useState<TaxiTier | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [fare, setFare] = useState<number>(0);
  const [step, setStep] = useState<'pickup' | 'destination' | 'tier' | 'confirm'>('pickup');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLocationSelect = (latlng: LatLng) => {
    if (step === 'pickup') {
      setPickupLocation(latlng);
      setStep('destination');
      toast.success('Pickup location set');
    } else if (step === 'destination') {
      setDestination(latlng);
      setStep('tier');
      toast.success('Destination set');
    }
  };

  useEffect(() => {
    if (pickupLocation && destination) {
      const calculatedDistance = pickupLocation.distanceTo(destination) / 1000; // Convert to km
      setDistance(calculatedDistance);
    }
  }, [pickupLocation, destination]);

  useEffect(() => {
    if (selectedTier && distance > 0) {
      const calculatedFare = selectedTier.basePrice + (distance * selectedTier.pricePerKm);
      setFare(Math.round(calculatedFare));
    }
  }, [selectedTier, distance]);

  const handleTierSelect = (tier: TaxiTier) => {
    setSelectedTier(tier);
    setStep('confirm');
  };

  const handleConfirmBooking = () => {
    setShowConfirmation(true);
    toast.success('Booking confirmed!');
  };

  const handleNewBooking = () => {
    setPickupLocation(null);
    setDestination(null);
    setSelectedTier(null);
    setDistance(0);
    setFare(0);
    setStep('pickup');
    setShowConfirmation(false);
  };

  if (showConfirmation && pickupLocation && destination && selectedTier) {
    return (
      <BookingConfirmation
        pickup={pickupLocation}
        destination={destination}
        tier={selectedTier}
        fare={fare}
        distance={distance}
        onNewBooking={handleNewBooking}
      />
    );
  }

  return (
    <div className="flex h-screen">
      {/* Map Section */}
      <div className="flex-1 relative">
        <MapContainer
          center={BENGALURU_CENTER}
          zoom={12}
          className="h-full w-full"
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker onLocationSelect={handleLocationSelect} />
          
          {pickupLocation && (
            <Marker position={pickupLocation}>
              <Popup>Pickup Location</Popup>
            </Marker>
          )}
          
          {destination && (
            <Marker position={destination}>
              <Popup>Destination</Popup>
            </Marker>
          )}
        </MapContainer>

        {/* Step Indicator Overlay */}
        <div className="absolute top-6 left-6 z-[1000]">
          <Card className="p-4 bg-card/95 backdrop-blur-sm border-border shadow-lg">
            <div className="flex items-center gap-3">
              {step === 'pickup' && (
                <>
                  <MapPin className="h-5 w-5 text-accent animate-pulse" />
                  <span className="font-medium">Select pickup location on map</span>
                </>
              )}
              {step === 'destination' && (
                <>
                  <Navigation className="h-5 w-5 text-accent animate-pulse" />
                  <span className="font-medium">Select destination on map</span>
                </>
              )}
              {step === 'tier' && (
                <>
                  <Plane className="h-5 w-5 text-accent" />
                  <span className="font-medium">Choose your taxi tier</span>
                </>
              )}
              {step === 'confirm' && (
                <>
                  <Check className="h-5 w-5 text-accent" />
                  <span className="font-medium">Review and confirm</span>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Sidebar Section */}
      <div className="w-[400px] bg-card border-l border-border overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Book Your Flight</h2>
            <p className="text-muted-foreground">Skip the traffic, soar above Bengaluru</p>
          </div>

          {/* Location Summary */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className={`mt-1 rounded-full p-2 ${pickupLocation ? 'bg-accent/20' : 'bg-muted'}`}>
                <MapPin className={`h-4 w-4 ${pickupLocation ? 'text-accent' : 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Pickup</p>
                <p className="text-xs text-muted-foreground">
                  {pickupLocation ? `${pickupLocation.lat.toFixed(4)}, ${pickupLocation.lng.toFixed(4)}` : 'Not set'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className={`mt-1 rounded-full p-2 ${destination ? 'bg-accent/20' : 'bg-muted'}`}>
                <Navigation className={`h-4 w-4 ${destination ? 'text-accent' : 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Destination</p>
                <p className="text-xs text-muted-foreground">
                  {destination ? `${destination.lat.toFixed(4)}, ${destination.lng.toFixed(4)}` : 'Not set'}
                </p>
              </div>
            </div>

            {distance > 0 && (
              <div className="pt-2 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Distance: <span className="font-semibold text-foreground">{distance.toFixed(2)} km</span>
                </p>
              </div>
            )}
          </div>

          {/* Taxi Tiers */}
          {(step === 'tier' || step === 'confirm') && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Select Taxi Tier</h3>
              {taxiTiers.map((tier) => (
                <TaxiTierCard
                  key={tier.id}
                  tier={tier}
                  selected={selectedTier?.id === tier.id}
                  onSelect={() => handleTierSelect(tier)}
                />
              ))}
            </div>
          )}

          {/* Fare Display and Confirm Button */}
          {step === 'confirm' && selectedTier && (
            <div className="space-y-4">
              <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-sm text-muted-foreground mb-1">Total Fare</p>
                <p className="text-3xl font-bold text-accent">₹{fare}</p>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handleConfirmBooking}
              >
                Confirm Booking
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingInterface;
