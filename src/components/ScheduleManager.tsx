import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, Trash2, Radio } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ScheduledEvent {
  id: string;
  title: string;
  type: "predication" | "playlist" | "live";
  time: string;
  day: string;
  duration: string;
}

export const ScheduleManager = () => {
  const [events, setEvents] = useState<ScheduledEvent[]>([
    { id: "1", title: "Prédication du Matin", type: "predication", time: "08:00", day: "Dimanche", duration: "45min" },
    { id: "2", title: "Louanges", type: "playlist", time: "09:00", day: "Dimanche", duration: "30min" },
    { id: "3", title: "Direct de Prière", type: "live", time: "19:00", day: "Mercredi", duration: "60min" },
    { id: "4", title: "Enseignement", type: "predication", time: "18:00", day: "Vendredi", duration: "40min" },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "predication" as const,
    time: "",
    day: "Lundi",
    duration: ""
  });

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.time && newEvent.duration) {
      const event: ScheduledEvent = {
        id: Date.now().toString(),
        ...newEvent
      };
      setEvents([...events, event]);
      setNewEvent({ title: "", type: "predication", time: "", day: "Lundi", duration: "" });
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "predication": return "bg-accent text-accent-foreground";
      case "playlist": return "bg-primary text-primary-foreground";
      case "live": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "predication": return "Prédication";
      case "playlist": return "Playlist";
      case "live": return "Direct";
      default: return type;
    }
  };

  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Programmation</h2>
          <p className="text-muted-foreground">Planifiez vos émissions et prédications</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Programmer un Événement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nouvel Événement</DialogTitle>
              <DialogDescription>
                Programmez une diffusion automatique
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  placeholder="Ex: Prédication du Dimanche"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={newEvent.type}
                  onValueChange={(value) => setNewEvent({ ...newEvent, type: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="predication">Prédication</SelectItem>
                    <SelectItem value="playlist">Playlist</SelectItem>
                    <SelectItem value="live">Direct</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="day">Jour</Label>
                  <Select
                    value={newEvent.day}
                    onValueChange={(value) => setNewEvent({ ...newEvent, day: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map(day => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Heure</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Durée</Label>
                <Input
                  id="duration"
                  placeholder="Ex: 45min"
                  value={newEvent.duration}
                  onChange={(e) => setNewEvent({ ...newEvent, duration: e.target.value })}
                />
              </div>
              <Button onClick={handleAddEvent} className="w-full">
                Ajouter à la Programmation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="gradient-divine border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-accent" />
            Calendrier de Diffusion
          </CardTitle>
          <CardDescription>Tous vos événements programmés</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events.map((event) => (
              <Card key={event.id} className="transition-smooth hover:shadow-divine hover:border-accent/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                        {event.type === "live" ? (
                          <Radio className="h-5 w-5 text-accent" />
                        ) : (
                          <Clock className="h-5 w-5 text-accent" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{event.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {event.day}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{event.time}</span>
                          <span className="text-xs text-muted-foreground">• {event.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeColor(event.type)}>
                        {getTypeLabel(event.type)}
                      </Badge>
                      <Button size="icon" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
