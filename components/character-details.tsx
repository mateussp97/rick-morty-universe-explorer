import { Character } from "@/lib/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface CharacterDetailsProps {
  character: Character;
}

export function CharacterDetails({ character }: CharacterDetailsProps) {
  const statusColor =
    {
      Alive: "bg-green-500",
      Dead: "bg-red-500",
      unknown: "bg-gray-500",
    }[character.status] || "bg-gray-500";

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={character.image} alt={character.name} />
            <AvatarFallback>{character.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <CardTitle className="text-2xl">{character.name}</CardTitle>
            <CardDescription className="flex items-center space-x-2">
              <span
                className={`inline-block w-2 h-2 rounded-full ${statusColor}`}
              />
              <span>
                {character.status} - {character.species}
              </span>
              {character.type && <span>({character.type})</span>}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Gender</p>
            <p className="text-sm">{character.gender}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Origin</p>
            <p className="text-sm">{character.origin.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Last Known Location
            </p>
            <p className="text-sm">{character.location.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Episodes
            </p>
            <p className="text-sm">{character.episode.length} appearances</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Featured Episodes
          </p>
          <div className="flex flex-wrap gap-1">
            {character.episode.slice(0, 5).map((ep) => (
              <Badge key={ep.id} variant="secondary" className="text-xs">
                {ep.episode}
              </Badge>
            ))}
            {character.episode.length > 5 && (
              <Badge variant="outline" className="text-xs">
                +{character.episode.length - 5} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
