import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { routes } from "@/data/routes";

interface Filters {
  country: string;
  difficulty: string;
}

interface RouteFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function RouteFilters({ filters, onFiltersChange }: RouteFiltersProps) {
  const countries = [...new Set(routes.map(route => route.country))].sort();
  const difficulties = ['Easy', 'Moderate', 'Hard'];
  
  const hasActiveFilters = filters.country !== 'all' || filters.difficulty !== 'all';
  
  const clearFilters = () => {
    onFiltersChange({ country: 'all', difficulty: 'all' });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Filter className="w-5 h-5 mr-2 text-primary" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Country</label>
          <Select
            value={filters.country}
            onValueChange={(value) => onFiltersChange({ ...filters, country: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Difficulty</label>
          <Select
            value={filters.difficulty}
            onValueChange={(value) => onFiltersChange({ ...filters, difficulty: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {hasActiveFilters && (
          <div className="pt-2">
            <div className="text-sm font-medium mb-2">Active Filters:</div>
            <div className="flex flex-wrap gap-2">
              {filters.country !== 'all' && (
                <Badge variant="secondary" className="text-xs">
                  {filters.country}
                </Badge>
              )}
              {filters.difficulty !== 'all' && (
                <Badge variant="secondary" className="text-xs">
                  {filters.difficulty}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}