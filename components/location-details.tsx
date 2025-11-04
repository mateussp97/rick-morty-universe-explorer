import { Location } from "@/lib/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LocationDetailsProps {
  location: Location;
}

export function LocationDetails({ location }: LocationDetailsProps) {
  return (
    <Card className="w-full pb-0">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="h-10 w-10" />
          </div>
          <div className="flex-1 space-y-1">
            <CardTitle className="text-2xl">{location.name}</CardTitle>
            <CardDescription>
              <span>{location.type}</span>
              {location.dimension && location.dimension !== "unknown" && (
                <span> • {location.dimension}</span>
              )}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-3 px-6 pb-6">
            Residents ({location.residents.length})
          </p>
          {location.residents.length > 0 ? (
            <ScrollArea className="h-72 px-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pr-4">
                {location.residents.map((resident) => (
                  <div
                    key={resident.id}
                    className="flex flex-col items-center text-center space-y-2 p-2 rounded-lg hover:bg-accent transition-colors"
                  >
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={resident.image} alt={resident.name} />
                      <AvatarFallback>{resident.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium line-clamp-2">
                      {resident.name}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <p className="text-sm text-muted-foreground px-6 pb-6">
              No known residents
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
