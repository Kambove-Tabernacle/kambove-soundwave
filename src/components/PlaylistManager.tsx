import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Music, Plus, Play, Trash2, Edit, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  album?: string;
}

interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
  isActive: boolean;
}

export const PlaylistManager = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: "1",
      name: "Louanges du Dimanche",
      isActive: true,
      tracks: [
        { id: "t1", title: "Amazing Grace", artist: "Chœur KT", duration: "3:45" },
        { id: "t2", title: "How Great Thou Art", artist: "Chœur KT", duration: "4:12" },
        { id: "t3", title: "Holy Holy Holy", artist: "Soliste", duration: "3:30" },
      ]
    },
    {
      id: "2",
      name: "Prières du Soir",
      isActive: false,
      tracks: [
        { id: "t4", title: "Bénédiction", artist: "Pasteur", duration: "2:15" },
        { id: "t5", title: "Méditation", artist: "Instrumental", duration: "5:00" },
      ]
    }
  ]);

  const [newPlaylistName, setNewPlaylistName] = useState("");

  const handleAddPlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        name: newPlaylistName,
        tracks: [],
        isActive: false
      };
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName("");
    }
  };

  const togglePlaylistActive = (id: string) => {
    setPlaylists(playlists.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Playlists</h2>
          <p className="text-muted-foreground">Organisez votre programmation musicale</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nouvelle Playlist
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer une Nouvelle Playlist</DialogTitle>
              <DialogDescription>
                Donnez un nom à votre nouvelle playlist de diffusion
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de la Playlist</Label>
                <Input
                  id="name"
                  placeholder="Ex: Louanges du Matin"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                />
              </div>
              <Button onClick={handleAddPlaylist} className="w-full">
                Créer la Playlist
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {playlists.map((playlist) => (
          <Card key={playlist.id} className="transition-smooth hover:shadow-divine hover:border-accent/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Music className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle>{playlist.name}</CardTitle>
                    <CardDescription>{playlist.tracks.length} piste(s)</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {playlist.isActive && (
                    <Badge className="bg-accent text-accent-foreground">En Lecture</Badge>
                  )}
                  <Button
                    size="icon"
                    variant={playlist.isActive ? "default" : "outline"}
                    onClick={() => togglePlaylistActive(playlist.id)}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] w-full rounded-md border border-border/50 p-4">
                <div className="space-y-2">
                  {playlist.tracks.map((track) => (
                    <div
                      key={track.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-card hover:bg-muted/50 transition-smooth"
                    >
                      <div className="flex items-center gap-3">
                        <Music className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{track.title}</p>
                          <p className="text-xs text-muted-foreground">{track.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {track.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
