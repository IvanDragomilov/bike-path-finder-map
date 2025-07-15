import { useState, useMemo } from "react";
import { RouteCard } from "@/components/RouteCard";
import { RouteFilters } from "@/components/RouteFilters";
import { FacilityToggles } from "@/components/FacilityToggles";
import { Map } from "@/components/Map";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { routes, facilities, Route } from "@/data/routes";
import { Bike, Menu, X } from "lucide-react";

interface Filters {
  country: string;
  difficulty: string;
}

const Index = () => {
  const [filters, setFilters] = useState<Filters>({ country: 'all', difficulty: 'all' });
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [facilityVisibility, setFacilityVisibility] = useState({
    equipment: true,
    repair: true,
    club: false
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Filter routes based on current filters
  const filteredRoutes = useMemo(() => {
    return routes.filter(route => {
      const matchesCountry = filters.country === 'all' || route.country === filters.country;
      const matchesDifficulty = filters.difficulty === 'all' || route.difficulty === filters.difficulty;
      return matchesCountry && matchesDifficulty;
    });
  }, [filters]);

  const handleViewRoute = (route: Route) => {
    setSelectedRoute(route);
  };

  const handleFacilityToggle = (type: 'equipment' | 'repair' | 'club', enabled: boolean) => {
    setFacilityVisibility(prev => ({ ...prev, [type]: enabled }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-4 lg:hidden"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-primary rounded-lg">
                  <Bike className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">CycleRoutes</h1>
                  <p className="text-sm text-muted-foreground hidden sm:block">Discover amazing cycling adventures</p>
                </div>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{filteredRoutes.length} routes found</span>
              {selectedRoute && (
                <span className="text-primary font-medium">
                  Viewing: {selectedRoute.name}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          fixed lg:relative lg:translate-x-0 z-40 lg:z-0
          w-80 h-[calc(100vh-4rem)] bg-background border-r
          transform transition-transform duration-200 ease-in-out
          overflow-y-auto
        `}>
          <div className="p-6 space-y-6">
            {/* Filters */}
            <RouteFilters 
              filters={filters} 
              onFiltersChange={setFilters} 
            />
            
            {/* Facility Toggles */}
            <FacilityToggles 
              facilities={facilityVisibility}
              onToggle={handleFacilityToggle}
            />
            
            {/* Routes List */}
            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-4">
                Routes ({filteredRoutes.length})
              </h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredRoutes.map((route) => (
                  <RouteCard
                    key={route.id}
                    route={route}
                    onViewRoute={handleViewRoute}
                  />
                ))}
                {filteredRoutes.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bike className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No routes match your filters</p>
                    <Button 
                      variant="ghost" 
                      onClick={() => setFilters({ country: 'all', difficulty: 'all' })}
                      className="mt-2"
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content - Map */}
        <main className="flex-1 h-[calc(100vh-4rem)]">
          <Map
            selectedRoute={selectedRoute}
            facilities={facilities}
            facilityVisibility={facilityVisibility}
          />
        </main>
      </div>
    </div>
  );
};

export default Index;