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

const filters = [
  { id: 'all', label: 'All', icon: '🔍' },
  { id: 'jobs', label: 'Jobs', icon: '💼' },
  { id: 'people', label: 'People', icon: '👥' },
  { id: 'companies', label: 'Companies', icon: '🏢' },
  { id: 'posts', label: 'Posts', icon: '📝' },
  { id: 'courses', label: 'Courses', icon: '🎓' },
  { id: 'events', label: 'Events', icon: '📅' },
  { id: 'services', label: 'Services', icon: '⚙️' },
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
              "w-full pl-12 pr-24 h-14 text-lg rounded-xl border-2 transition-all duration-300",
              "bg-background/80 backdrop-blur-sm",
              "hover:border-primary/30 focus:border-primary focus:ring-4 focus:ring-primary/20",
              "shadow-[0_8px_25px_-8px_hsl(220_8.9%_46.1%/0.15)]",
              isExpanded && "shadow-[0_12px_35px_-8px_hsl(220_100%_50%/0.25)]"
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
              variant="search"
              size="default"
              onClick={handleSearch}
              disabled={!query.trim()}
              className="rounded-lg px-6"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Filter Dropdown */}
        {showFilters && query && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-[0_12px_35px_-8px_hsl(220_8.9%_46.1%/0.25)] z-50 animate-fade-in">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Filter by</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={selectedFilter === filter.id ? "default" : "filter"}
                    size="sm"
                    onClick={() => handleFilterClick(filter.id)}
                    className="justify-start h-10 text-left"
                  >
                    <span className="mr-2">{filter.icon}</span>
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};