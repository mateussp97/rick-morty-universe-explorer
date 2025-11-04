import { Episode } from "@/lib/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Film, Calendar } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface EpisodeDetailsProps {
  episode: Episode;
}

export function EpisodeDetails({ episode }: EpisodeDetailsProps) {
  return (
    <Card className="w-full pb-0">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Film className="h-10 w-10" />
          </div>
          <div className="flex-1 space-y-1">
            <CardTitle className="text-2xl">{episode.name}</CardTitle>
            <CardDescription className="flex items-center space-x-4">
              <Badge variant="secondary">{episode.episode}</Badge>
              <span className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{episode.air_date}</span>
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-3 px-6">
            Characters ({episode.characters.length})
          </p>
          {episode.characters.length > 0 ? (
            <ScrollArea className="h-72 px-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pr-4">
                {episode.characters.map((character) => (
                  <div
                    key={character.id}
                    className="flex flex-col items-center text-center space-y-2 p-2 rounded-lg hover:bg-accent transition-colors"
                  >
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={character.image} alt={character.name} />
                      <AvatarFallback>
                        {character.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium line-clamp-2">
                      {character.name}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <p className="text-sm text-muted-foreground px-6">
              No characters data available
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
