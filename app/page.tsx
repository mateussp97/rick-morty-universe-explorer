"use client";

import { useState } from "react";
import { CharacterSearch } from "@/components/character-search";
import { CharacterDetails } from "@/components/character-details";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Character } from "@/lib/queries";

export default function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Rick and Morty Character Search
            </h1>
            <p className="text-muted-foreground text-lg">
              Find your favorite characters from the multiverse
            </p>
          </div>

          <CharacterSearch onCharacterSelect={setSelectedCharacter} />

          {selectedCharacter && (
            <CharacterDetails character={selectedCharacter} />
          )}

          {!selectedCharacter && (
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle>How to use</CardTitle>
                <CardDescription>
                  Search for Rick and Morty characters with ease
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start space-x-2">
                  <span className="text-muted-foreground">•</span>
                  <p className="text-sm">
                    Type at least 2 characters to search
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-muted-foreground">•</span>
                  <p className="text-sm">Click on a character to select it</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-muted-foreground">•</span>
                  <p className="text-sm">
                    Use arrow keys to navigate suggestions
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
