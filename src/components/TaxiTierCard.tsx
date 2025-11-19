import { Card } from '@/components/ui/card';
import { Users, Check } from 'lucide-react';

interface TaxiTier {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  pricePerKm: number;
  capacity: number;
}

interface TaxiTierCardProps {
  tier: TaxiTier;
  selected: boolean;
  onSelect: () => void;
}

const TaxiTierCard = ({ tier, selected, onSelect }: TaxiTierCardProps) => {
  return (
    <Card
      className={`p-4 cursor-pointer transition-all hover:shadow-md ${
        selected ? 'border-accent bg-accent/5 shadow-lg' : 'border-border hover:border-accent/50'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-foreground">{tier.name}</h4>
            {selected && <Check className="h-4 w-4 text-accent" />}
          </div>
          <p className="text-sm text-muted-foreground mb-3">{tier.description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{tier.capacity} passengers</span>
            </div>
            <div>
              <span>₹{tier.pricePerKm}/km</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Base</p>
          <p className="text-lg font-bold text-foreground">₹{tier.basePrice}</p>
        </div>
      </div>
    </Card>
  );
};

export default TaxiTierCard;
