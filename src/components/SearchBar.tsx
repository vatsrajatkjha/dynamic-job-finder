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
    setShowFilters(false);
  };

  const clearSearch = () => {
    setQuery('');
    setIsExpanded(false);
    setShowFilters(false);
    onSearch('');
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
              "w-full pl-12 pr-28 h-16 text-lg rounded-2xl border-2 transition-all duration-300",
              "bg-card/80 backdrop-blur-md",
              "hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/15",
              "shadow-[0_10px_40px_-12px_rgba(0,0,0,0.1)]",
              "placeholder:text-muted-foreground/70",
              isExpanded && "shadow-[0_20px_60px_-12px_hsl(var(--primary)/0.15)] border-primary/50"
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
              size="default"
              onClick={handleSearch}
              disabled={!query.trim()}
              className="rounded-xl px-8 h-12 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-200 hover:scale-105"
            >
              <Search className="h-5 w-5 mr-2" />
              <span className="font-semibold">Search</span>
            </Button>
          </div>
        </div>

        {/* Filter Dropdown */}
        {showFilters && query && (
          <div className="absolute top-full left-0 right-0 mt-3 bg-card/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] z-50 animate-fade-in">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Filter className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">Choose a filter</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4">
                {filters.map((filter) => {
                  const IconComponent = filter.icon;
                  const isSelected = selectedFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => handleFilterClick(filter.id)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 hover:scale-105 group",
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                          : "bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                        isSelected 
                          ? "bg-white/20" 
                          : "bg-white/10 group-hover:bg-white/20"
                      )}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-medium text-center leading-tight">
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