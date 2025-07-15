import React from 'react';
import { Route } from '@/data/routes';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RouteListProps {
  routes: Route[];
  selectedRoute: Route | null;
  onRouteSelect: (route: Route) => void;
}

export function RouteList({ routes, selectedRoute, onRouteSelect }: RouteListProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200';
      case 'medium': return 'bg-amber-500/10 text-amber-700 border-amber-200';
      case 'hard': return 'bg-red-500/10 text-red-700 border-red-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-3">
      {routes.map((route) => (
        <Card
          key={route.id}
          className={cn(
            "p-4 cursor-pointer transition-all duration-200 hover:shadow-md",
            selectedRoute?.id === route.id 
              ? "ring-2 ring-primary shadow-md" 
              : "hover:ring-1 hover:ring-muted-foreground/20"
          )}
          onClick={() => onRouteSelect(route)}
        >
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-base leading-tight">{route.name}</h3>
              <Badge 
                variant="outline" 
                className={cn("text-xs", getDifficultyColor(route.difficulty))}
              >
                {route.difficulty}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {route.description}
            </p>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{route.distance}km</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{route.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{route.elevation}m</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{route.country}</span>
            </div>
          </div>
        </Card>
      ))}
      
      {routes.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">No routes match your current filters.</p>
        </div>
      )}
    </div>
  );
}