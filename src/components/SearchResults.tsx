import React from 'react';
import { JobCard } from './JobCard';
import { PostCard } from './PostCard';
import { CompanyCard } from './CompanyCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface SearchResultsProps {
  query: string;
  filter: string;
  results: {
    jobs: any[];
    posts: any[];
    companies: any[];
    people: any[];
  };
}

export const SearchResults: React.FC<SearchResultsProps> = ({ query, filter, results }) => {
  const getFilteredResults = () => {
    switch (filter) {
      case 'jobs':
        return { jobs: results.jobs };
      case 'posts':
        return { posts: results.posts };
      case 'companies':
        return { companies: results.companies };
      case 'people':
        return { people: results.people };
      default:
        return results;
    }
  };

  const filteredResults = getFilteredResults();
  const totalResults = Object.values(filteredResults).reduce((acc, arr) => acc + arr.length, 0);

  if (totalResults === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/10 to-job-secondary/10 flex items-center justify-center">
          <span className="text-2xl">🔍</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">No results found</h3>
        <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">
            Search results for "{query}"
          </h2>
          <Badge variant="secondary" className="text-sm">
            {totalResults} results
          </Badge>
        </div>
      </div>

      <Tabs defaultValue={filter === 'all' ? 'jobs' : filter} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {filteredResults.jobs && (
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              💼 Jobs ({results.jobs.length})
            </TabsTrigger>
          )}
          {filteredResults.companies && (
            <TabsTrigger value="companies" className="flex items-center gap-2">
              🏢 Companies ({results.companies.length})
            </TabsTrigger>
          )}
          {filteredResults.posts && (
            <TabsTrigger value="posts" className="flex items-center gap-2">
              📝 Posts ({results.posts.length})
            </TabsTrigger>
          )}
          {filteredResults.people && (
            <TabsTrigger value="people" className="flex items-center gap-2">
              👥 People ({results.people.length})
            </TabsTrigger>
          )}
        </TabsList>

        {filteredResults.jobs && (
          <TabsContent value="jobs" className="space-y-4">
            <div className="grid gap-4">
              {results.jobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </TabsContent>
        )}

        {filteredResults.companies && (
          <TabsContent value="companies" className="space-y-4">
            <div className="grid gap-4">
              {results.companies.map((company) => (
                <CompanyCard key={company.id} {...company} />
              ))}
            </div>
          </TabsContent>
        )}

        {filteredResults.posts && (
          <TabsContent value="posts" className="space-y-4">
            <div className="grid gap-4">
              {results.posts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>
          </TabsContent>
        )}

        {filteredResults.people && (
          <TabsContent value="people" className="space-y-4">
            <div className="grid gap-4">
              {results.people.map((person) => (
                <div key={person.id} className="p-6 border rounded-lg hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-job-secondary/10 flex items-center justify-center">
                      <span className="text-xl">👤</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{person.name}</h3>
                      <p className="text-muted-foreground">{person.title}</p>
                      <p className="text-sm text-muted-foreground">{person.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};