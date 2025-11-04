"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import {
  SEARCH_CHARACTERS,
  type CharacterSearchResponse,
  type Character,
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
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandLoading } from "cmdk";
import { Button } from "@/components/ui/button";

interface CharacterSearchProps {
  onCharacterSelect: (character: Character | null) => void;
}

export function CharacterSearch({ onCharacterSelect }: CharacterSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const commandRef = useRef<HTMLDivElement>(null);

  // Query with debounce effect
  const { data, isLoading, error } = useQuery({
    queryKey: ["characters", searchTerm],
    queryFn: async () => {
      if (!searchTerm || searchTerm.length < 2)
        return { characters: { results: [] } };
      return graphqlClient.request<CharacterSearchResponse>(SEARCH_CHARACTERS, {
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

  const handleSelectCharacter = (character: Character) => {
    setInputValue(character.name);
    setSelectedCharacter(character);
    setOpen(false);
    onCharacterSelect(character);
  };

  const handleClear = () => {
    setInputValue("");
    setSearchTerm("");
    setSelectedCharacter(null);
    setOpen(false);
    onCharacterSelect(null);
  };

  const results = data?.characters?.results || [];
  const shouldShowResults = inputValue.length >= 2;

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Command
        ref={commandRef}
        className="rounded-lg border shadow-md"
        shouldFilter={false}
      >
        <div className="relative">
          <CommandInput
            placeholder="Search for Rick and Morty characters..."
            value={inputValue}
            onValueChange={handleInputChange}
            onFocus={() => shouldShowResults && setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 200)}
            className="h-12 pr-10"
          />
          {(inputValue || selectedCharacter) && (
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
        <CommandList
          className={cn(
            "transition-all",
            open && shouldShowResults ? "h-auto" : "h-0"
          )}
        >
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

          {!isLoading && !error && shouldShowResults && (
            <>
              {results.length === 0 ? (
                <CommandEmpty>No characters found</CommandEmpty>
              ) : (
                <CommandGroup heading="Characters">
                  {results.map((character) => (
                    <CommandItem
                      key={character.id}
                      value={character.id}
                      onSelect={() => handleSelectCharacter(character)}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={character.image}
                          alt={character.name}
                        />
                        <AvatarFallback>
                          {character.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{character.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {character.species} • {character.status}
                        </div>
                      </div>
                      {selectedCharacter?.id === character.id && (
                        <Check className="h-4 w-4" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>
      </Command>
    </div>
  );
}
