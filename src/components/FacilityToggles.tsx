import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Store, Wrench, Users } from "lucide-react";

interface FacilityTogglesProps {
  facilities: {
    equipment: boolean;
    repair: boolean;
    club: boolean;
  };
  onToggle: (type: 'equipment' | 'repair' | 'club', enabled: boolean) => void;
}

const facilityConfig = {
  equipment: {
    label: 'Cycling Equipment Stores',
    icon: Store,
    description: 'Bike shops and equipment retailers'
  },
  repair: {
    label: 'Bike Repair Services',
    icon: Wrench,
    description: 'Professional repair and maintenance'
  },
  club: {
    label: 'Bike Clubs & Communities',
    icon: Users,
    description: 'Local cycling groups and clubs'
  }
};

export function FacilityToggles({ facilities, onToggle }: FacilityTogglesProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Map Facilities</CardTitle>
        <p className="text-sm text-muted-foreground">
          Toggle facilities to show on the map
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {Object.entries(facilityConfig).map(([type, config]) => {
          const Icon = config.icon;
          return (
            <div key={type} className="flex items-start space-x-3">
              <div className="flex items-center space-x-2 flex-1">
                <Icon className="w-5 h-5 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <label 
                    htmlFor={`facility-${type}`}
                    className="text-sm font-medium cursor-pointer block"
                  >
                    {config.label}
                  </label>
                  <p className="text-xs text-muted-foreground">
                    {config.description}
                  </p>
                </div>
              </div>
              <Switch
                id={`facility-${type}`}
                checked={facilities[type as keyof FacilityTogglesProps['facilities']]}
                onCheckedChange={(checked) => onToggle(type as 'equipment' | 'repair' | 'club', checked)}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}