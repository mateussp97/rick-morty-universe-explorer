"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import {
  SEARCH_CHARACTERS,
  SEARCH_LOCATIONS,
  SEARCH_EPISODES,
  type Entity,
  type EntityType,
  type SearchResponse,
  type Character,
  type Location,
  type Episode,
} from "@/lib/queries";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, X, MapPin, Film } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandLoading } from "cmdk";
import { Button } from "@/components/ui/button";

interface EntitySearchProps {
  entityType: EntityType;
  onEntitySelect: (entity: Entity | null) => void;
}

const queries = {
  character: SEARCH_CHARACTERS,
  location: SEARCH_LOCATIONS,
  episode: SEARCH_EPISODES,
};

const placeholders = {
  character: "Search for Rick and Morty characters...",
  location: "Search for locations...",
  episode: "Search for episodes...",
};

const groupHeadings = {
  character: "Characters",
  location: "Locations",
  episode: "Episodes",
};

export function EntitySearch({
  entityType,
  onEntitySelect,
}: EntitySearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [open, setOpen] = useState(false);
  const commandRef = useRef<HTMLDivElement>(null);

  // Reset state when entity type changes
  useEffect(() => {
    setInputValue("");
    setSearchTerm("");
    setSelectedEntity(null);
    setOpen(false);
    onEntitySelect(null);
  }, [entityType, onEntitySelect]);

  // Query with debounce effect
  const { data, isLoading, error } = useQuery({
    queryKey: [entityType, searchTerm],
    queryFn: async () => {
      if (!searchTerm || searchTerm.length < 2) {
        return {
          [entityType === "character"
            ? "characters"
            : entityType === "location"
            ? "locations"
            : "episodes"]: { results: [] },
        };
      }
      return graphqlClient.request<SearchResponse>(queries[entityType], {
        name: searchTerm,
      });
    },
    enabled: searchTerm.length >= 2,
  });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value.length >= 2) {
      setOpen(true);
    }
  };

  const handleSelectEntity = (entity: Entity) => {
    setInputValue(entity.name);
    setSelectedEntity(entity);
    setOpen(false);
    onEntitySelect(entity);
  };

  const handleClear = () => {
    setInputValue("");
    setSearchTerm("");
    setSelectedEntity(null);
    setOpen(false);
    onEntitySelect(null);
  };

  // Extract results based on entity type
  const results = data
    ? "characters" in data
      ? data.characters.results
      : "locations" in data
      ? data.locations.results
      : "episodes" in data
      ? data.episodes.results
      : []
    : [];

  const shouldShowResults = inputValue.length >= 2;

  const renderEntityItem = (entity: Entity) => {
    switch (entityType) {
      case "character": {
        const char = entity as Character;
        return (
          <>
            <Avatar className="h-10 w-10">
              <AvatarImage src={char.image} alt={char.name} />
              <AvatarFallback>{char.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-medium">{char.name}</div>
              <div className="text-sm text-muted-foreground">
                {char.species} • {char.status}
              </div>
            </div>
          </>
        );
      }
      case "location": {
        const loc = entity as Location;
        return (
          <>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{loc.name}</div>
              <div className="text-sm text-muted-foreground">
                {loc.type} • {loc.dimension}
              </div>
            </div>
          </>
        );
      }
      case "episode": {
        const ep = entity as Episode;
        return (
          <>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Film className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{ep.name}</div>
              <div className="text-sm text-muted-foreground">
                {ep.episode} • {ep.air_date}
              </div>
            </div>
          </>
        );
      }
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Command
        ref={commandRef}
        className="rounded-lg border shadow-md"
        shouldFilter={false}
      >
        <div className="relative">
          <CommandInput
            placeholder={placeholders[entityType]}
            value={inputValue}
            onValueChange={handleInputChange}
            onFocus={() => shouldShowResults && setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 200)}
            className="h-12 pr-10"
          />
          {(inputValue || selectedEntity) && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </Button>
          )}
        </div>
        {open && shouldShowResults && (
          <CommandList>
            {isLoading && (
              <CommandLoading>
                <div className="p-4 text-sm text-muted-foreground">
                  Searching...
                </div>
              </CommandLoading>
            )}

            {error && (
              <div className="p-4 text-sm text-destructive">
                Error loading results
              </div>
            )}

            {!isLoading && !error && shouldShowResults && searchTerm && (
              <>
                {results.length === 0 ? (
                  <CommandEmpty>
                    No {groupHeadings[entityType].toLowerCase()} found
                  </CommandEmpty>
                ) : (
                  <CommandGroup heading={groupHeadings[entityType]}>
                    {results.map((entity) => (
                      <CommandItem
                        key={entity.id}
                        value={entity.id}
                        onSelect={() => handleSelectEntity(entity)}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        {renderEntityItem(entity)}
                        {selectedEntity?.id === entity.id && (
                          <Check className="h-4 w-4" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        )}
      </Command>
    </div>
  );
}
