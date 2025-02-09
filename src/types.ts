export interface Track {
    id: string;
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string }>;
    };
    duration_ms: number;
    preview_url: string;
  }
  export interface MusicGridProps {
    tracks: Track[];
    onTrackPlay: (track: Track) => void;
    onToggleFavorite: (track: Track) => void;
    favorites: Track[];
  }
  export interface MusicCardProps {
    track: Track;
    isFavorite: boolean;
    onToggleFavorite: (track: Track) => void;
    onPlay: (track: Track) => void;
  }
  
  export interface PageProps {
    onTrackPlay: (track: Track) => void;
    favorites: Track[];
    onToggleFavorite: (track: Track) => void;
  }
  export interface MusicPlayerProps {
    currentTrack: Track | null;
    isPlaying: boolean;
    isLiked: boolean;
    onPlayPause: () => void;
    onNext: () => void;
    onPrevious: () => void;
    onLike: () => void;
    onAddToPlaylist: () => void;
    onSeek: (time: number) => void;
    onVolumeChange: (volume: number) => void;
  }