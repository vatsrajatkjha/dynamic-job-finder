import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterSelect: (filter: string) => void;
  selectedFilter: string;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

import { Briefcase, Users, Building, FileText, Wrench, Calendar, GraduationCap, Users2, Search as SearchIcon } from 'lucide-react';

const filters = [
  { id: 'all', label: 'All', icon: SearchIcon },
  { id: 'people', label: 'People', icon: Users },
  { id: 'jobs', label: 'Jobs', icon: Briefcase },
  { id: 'posts', label: 'Posts', icon: FileText },
  { id: 'companies', label: 'Companies', icon: Building },
  { id: 'services', label: 'Services', icon: Wrench },
  { id: 'groups', label: 'Groups', icon: Users2 },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'courses', label: 'Courses', icon: GraduationCap },
];

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilterSelect,
  selectedFilter,
  isExpanded,
  setIsExpanded,
}) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      setIsExpanded(true);
      setShowFilters(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFilterClick = (filterId: string) => {
    onFilterSelect(filterId);
    // Keep filters visible after selection
  };

  const clearSearch = () => {
    setQuery('');
    setIsExpanded(false);
    setShowFilters(false);
    onSearch('');
    onFilterSelect('all');
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-4xl mx-auto">
      <div className={cn(
        "relative transition-all duration-300",
        isExpanded ? "transform scale-105" : ""
      )}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search for jobs, people, companies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => query && setShowFilters(true)}
            className={cn(
              "w-full pl-12 pr-24 h-12 text-base rounded-xl border-2 transition-all duration-300",
              "bg-card/80 backdrop-blur-md",
              "hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/10",
              "shadow-sm",
              "placeholder:text-muted-foreground/70",
              isExpanded && "shadow-md border-primary/50"
            )}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
            {query && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="default"
              size="sm"
              onClick={handleSearch}
              disabled={!query.trim()}
              className="rounded-lg px-4 h-8 bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 transition-all duration-200"
            >
              <Search className="h-4 w-4 mr-1" />
              <span className="font-medium text-sm">Search</span>
            </Button>
          </div>
        </div>

        {/* Filter Dropdown - Always visible when search is active */}
        {isExpanded && query && (
          <div className="absolute top-full left-0 right-0 mt-3 bg-card/98 backdrop-blur-xl border border-border/60 rounded-2xl shadow-[0_25px_60px_-12px_rgba(0,0,0,0.25)] z-50 animate-fade-in">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20">
                  <Filter className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="text-sm font-bold text-foreground">Filter Results</span>
                  <p className="text-xs text-muted-foreground">Choose a category to refine your search</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-3">
                {filters.map((filter) => {
                  const IconComponent = filter.icon;
                  const isSelected = selectedFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => handleFilterClick(filter.id)}
                      className={cn(
                        "flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group relative overflow-hidden",
                        isSelected
                          ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xl shadow-primary/30 scale-105"
                          : "bg-gradient-to-br from-secondary/80 to-secondary/40 hover:from-secondary hover:to-secondary/60 text-muted-foreground hover:text-foreground border border-border/50 hover:border-border"
                      )}
                    >
                      {isSelected && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl" />
                      )}
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative z-10",
                        isSelected 
                          ? "bg-white/20 shadow-lg" 
                          : "bg-background/80 group-hover:bg-background group-hover:shadow-md"
                      )}>
                        <IconComponent className={cn(
                          "h-6 w-6 transition-all duration-300",
                          isSelected ? "text-white" : "text-primary group-hover:scale-110"
                        )} />
                      </div>
                      <span className={cn(
                        "text-xs font-semibold text-center leading-tight relative z-10 transition-all duration-300",
                        isSelected ? "text-white" : "group-hover:font-bold"
                      )}>
                        {filter.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};