export interface Anime {
  id?: string;
  malId?: number;
  title?: {
    romaji?: string;
    english?: string;
    native?: string;
    userPreferred?: string;
  };
  image?: string;
  trailer?: {
    id?: string;
    site?: string;
    thumbnail?: string;
  };
  episodeId?: string;
  episodeNumber?: number;
  episodeTitle?: string;
  description?: string;
  status?: string;
  cover?: string;
  rating?: number;
  releaseDate?: number;
  color?: string;
  genres?: Array<string>;
  totalEpisodes?: number;
  duration?: number;
  type?: string;
}

export interface AnimeInfo {
  id: string;
  title?: {
    romaji?: string;
    english?: string;
    native?: string;
  };
  malId?: number;
  synonyms?: string[];
  isLicensed?: boolean;
  isAdult?: boolean;
  countryOfOrigin?: string;
  trailer?: {
    id?: string;
    site?: string;
    thumbnail?: string;
  };
  image?: string;
  popularity?: number;
  color?: string;
  cover?: string;
  description?: string;
  status?: string;
  releaseDate?: number;
  startDate?: {
    year?: number;
    month?: number;
    day?: number;
  };
  endDate?: {
    year?: number;
    month?: number;
    day?: number;
  };
  nextAiringEpisode?: {
    airingTime?: number;
    timeUntilAiring?: number;
    episode?: number;
  };
  totalEpisodes?: number;
  currentEpisode?: number;
  rating?: number;
  duration?: number;
  genres?: string[];
  season?: string;
  studios?: string[];
  episodes?: Episode[] | [];
  relations?: Relation[];
  characters?: Character[];
  recommendations?: Recommendation[]
}

export interface Episode {
  id: string;
  title: string | null;
  description: string | null;
  number: number;
  image: string;
  airDate: string | null;
}

export interface Recommendation {
  id: string;
  malId: string;
  title: {
    romaji: string;
    english: string | null;
    native: string;
    userPreferred: string;
  };
  status: string;
  episodes: number;
  image: string;
  cover: string;
  rating: number;
  type: string;
}


export interface Character {
  id: number;
  role: string;
  name: {
    first: string;
    last: string;
    full: string;
    native: string;
    userPreferred: string;
  };
  image: string;
  voiceActors: VoiceActor[];
}

interface VoiceActor {
  id: number;
  language: string;
  name: {
    first: string;
    last: string;
    full: string;
    native: string | null;
    userPreferred: string;
  };
  image: string;
}


export interface Relation {
  id: number;
  relationType: string;
  malId: number;
  title: {
    romaji: string;
    english: string | null;
    native: string;
    userPreferred: string;
  };
  status: string;
  episodes: number | null;
  image: string;
  color: string;
  type: string;
  cover: string;
  rating: number;
}


export interface RecentAnime {
  id?: string;
  malId?: number;
  title: {
    romaji?: string;
    english?: string;
    native?: string;
    userPreferred?: string;
  };
  image: string;
  rating?: number;
  color?: string;
  episodeId?: string;
  episodeTitle?: string;
  episodeNumber: number;
  genres?: Array<string>;
  type?: string;
}

export interface EpisodeList {
  id: string,
  episodeNum: string
}

export interface PopularAnime {
  id?: string | null;
  malId?: number | null;
  title: {
    romaji?: string;
    english?: string;
    native?: string;
    userPreferred?: string;
  };
  image?: string | null;
  trailer?: any | null;
  description?: string | null;
  status?: string | null;
  cover?: string | null;
  rating?: number | null;
  releaseDate?: number | null;
  color?: string | null;
  genres?: any[] | null;
  totalEpisodes?: number | null;
  duration?: number | null;
  type?: string | null;
}


export interface ApiCallResult<T> {
  currentPage: number;
  hasNextPage: boolean;
  perPage: number;
  results: T[];
}
