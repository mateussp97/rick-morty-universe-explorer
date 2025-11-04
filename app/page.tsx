"use client";

import { useState } from "react";
import { EntitySearch } from "@/components/entity-search";
import { CharacterDetails } from "@/components/character-details";
import { LocationDetails } from "@/components/location-details";
import { EpisodeDetails } from "@/components/episode-details";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Entity,
  EntityType,
  Character,
  Location,
  Episode,
} from "@/lib/queries";
import { Users, MapPin, Film } from "lucide-react";

export default function Home() {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [activeTab, setActiveTab] = useState<EntityType>("character");

  const handleTabChange = (value: string) => {
    setActiveTab(value as EntityType);
    setSelectedEntity(null);
  };

  const renderDetails = () => {
    if (!selectedEntity) return null;

    switch (activeTab) {
      case "character":
        return <CharacterDetails character={selectedEntity as Character} />;
      case "location":
        return <LocationDetails location={selectedEntity as Location} />;
      case "episode":
        return <EpisodeDetails episode={selectedEntity as Episode} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-balance">
              Rick and Morty Universe Explorer
            </h1>
            <p className="text-muted-foreground text-lg text-balance">
              Explore characters, locations, and episodes from the multiverse
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="character"
                className="flex items-center space-x-2"
              >
                <Users className="h-4 w-4" />
                <span>Characters</span>
              </TabsTrigger>
              <TabsTrigger
                value="location"
                className="flex items-center space-x-2"
              >
                <MapPin className="h-4 w-4" />
                <span>Locations</span>
              </TabsTrigger>
              <TabsTrigger
                value="episode"
                className="flex items-center space-x-2"
              >
                <Film className="h-4 w-4" />
                <span>Episodes</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-8 mt-8">
              <EntitySearch
                entityType={activeTab}
                onEntitySelect={setSelectedEntity}
              />

              {renderDetails()}

              {!selectedEntity && (
                <Card className="mx-auto max-w-md">
                  <CardHeader>
                    <CardTitle>How to use</CardTitle>
                    <CardDescription>
                      Search for{" "}
                      {activeTab === "character"
                        ? "characters"
                        : activeTab === "location"
                        ? "locations"
                        : "episodes"}{" "}
                      with ease
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
                      <p className="text-sm">Click on an item to select it</p>
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
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
