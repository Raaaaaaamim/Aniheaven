export interface animeType {
  _id?: string;
  HiAnimeId: string;
  name: string;
  poster: string;
  jname: string;
  duration?: string;
  type?: string;
  rating?: string;
  episodes: {
    sub: number;
    dub: number;
  };
  startFrom?: number;
}
