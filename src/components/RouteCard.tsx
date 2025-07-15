import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Mountain, Ruler } from "lucide-react";
import { Route } from "@/data/routes";

interface RouteCardProps {
  route: Route;
  onViewRoute: (route: Route) => void;
}

const difficultyColors = {
  Easy: "bg-secondary text-secondary-foreground",
  Moderate: "bg-accent text-accent-foreground", 
  Hard: "bg-destructive text-destructive-foreground"
};

export function RouteCard({ route, onViewRoute }: RouteCardProps) {
  return (
    <Card className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
            {route.name}
          </CardTitle>
          <Badge className={difficultyColors[route.difficulty]}>
            {route.difficulty}
          </Badge>
        </div>
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          {route.country}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {route.description}
        </p>
        
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="flex items-center">
            <Ruler className="w-4 h-4 mr-2 text-primary" />
            <span>{route.distance}km</span>
          </div>
          <div className="flex items-center">
            <Mountain className="w-4 h-4 mr-2 text-primary" />
            <span>{route.elevation}m</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            <span>{route.duration}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {route.features.slice(0, 2).map((feature) => (
            <Badge key={feature} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
          {route.features.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{route.features.length - 2} more
            </Badge>
          )}
        </div>
        
        <Button 
          onClick={() => onViewRoute(route)} 
          className="w-full"
          variant="gradient"
        >
          View Route
        </Button>
      </CardContent>
    </Card>
  );
}