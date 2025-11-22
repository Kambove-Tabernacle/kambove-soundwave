import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Radio, Music, Calendar, Users, Play, Pause, Volume2 } from "lucide-react";
import { useState } from "react";

export const Dashboard = () => {
  const [isLive, setIsLive] = useState(true);
  const [currentTrack] = useState({
    title: "Amazing Grace",
    artist: "Chœur de Kambove Tabernacle",
    duration: "3:45"
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Status Card */}
      <Card className="gradient-divine border-accent/20 shadow-divine">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Radio className="h-6 w-6 text-accent animate-pulse" />
              Statut de la Diffusion
            </CardTitle>
            <Badge variant={isLive ? "default" : "secondary"} className="text-sm px-4 py-1">
              {isLive ? "En Direct" : "Hors Ligne"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border/50">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Music className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{currentTrack.title}</p>
                  <p className="text-sm text-muted-foreground">{currentTrack.artist}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" onClick={() => setIsLive(!isLive)}>
                  {isLive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button size="icon" variant="outline">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-card rounded-lg border border-border/50">
                <p className="text-2xl font-bold text-accent">247</p>
                <p className="text-sm text-muted-foreground">Auditeurs</p>
              </div>
              <div className="text-center p-3 bg-card rounded-lg border border-border/50">
                <p className="text-2xl font-bold text-accent">24/7</p>
                <p className="text-sm text-muted-foreground">Diffusion</p>
              </div>
              <div className="text-center p-3 bg-card rounded-lg border border-border/50">
                <p className="text-2xl font-bold text-accent">99%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-smooth hover:shadow-divine hover:border-accent/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Playlists Actives</CardTitle>
            <Music className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 depuis hier</p>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-divine hover:border-accent/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prédications Programmées</CardTitle>
            <Calendar className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Cette semaine</p>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-divine hover:border-accent/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Membres Actifs</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Opérateurs radio</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
