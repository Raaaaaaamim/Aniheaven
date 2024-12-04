type Anime = {
    id: string | null;
    name: string | null;
    jname: string | null;
    poster: string | null;
    duration: string | null;
    type: string | null;
    rating: string | null;
    episodes: {
        sub: number | null;
        dub: number | null;
    };
};
type CommonAnimeProps = "id" | "name" | "poster";
type Top10Anime = Pick<Anime, CommonAnimeProps | "episodes"> & {
    rank: number | null;
    jname: string | null;
};
type Top10AnimeTimePeriod = "day" | "week" | "month";
type MostPopularAnime = Pick<Anime, CommonAnimeProps | "episodes" | "type"> & {
    jname: string | null;
};
type SpotlightAnime = MostPopularAnime & Pick<Top10Anime, "rank"> & {
    description: string | null;
    otherInfo: string[];
};
type TrendingAnime = Pick<Anime, CommonAnimeProps | "jname"> & Pick<Top10Anime, "rank">;
type LatestEpisodeAnime = Anime;
type TopUpcomingAnime = Anime;
type TopAiringAnime = MostPopularAnime;
type MostFavoriteAnime = MostPopularAnime;
type LatestCompletedAnime = MostPopularAnime;
type AnimeGeneralAboutInfo = Pick<Anime, CommonAnimeProps> & Pick<SpotlightAnime, "description"> & {
    anilistId: number | null;
    malId: number | null;
    stats: {
        quality: string | null;
    } & Pick<Anime, "duration" | "episodes" | "rating" | "type">;
    promotionalVideos: AnimePromotionalVideo[];
    charactersVoiceActors: AnimeCharactersAndVoiceActors[];
};
type RecommendedAnime = Anime;
type RelatedAnime = MostPopularAnime;
type Season = Pick<Anime, CommonAnimeProps> & {
    isCurrent: boolean;
    title: string | null;
};
type AnimePromotionalVideo = {
    title: string | undefined;
    source: string | undefined;
    thumbnail: string | undefined;
};
type AnimeCharactersAndVoiceActors = {
    character: AnimeCharacter;
    voiceActor: AnimeCharacter;
};
type AnimeCharacter = {
    id: string;
    poster: string;
    name: string;
    cast: string;
};
type AnimeSearchSuggestion = Omit<MostPopularAnime, "episodes" | "type"> & {
    moreInfo: string[];
};
type AnimeEpisode = Pick<Season, "title"> & {
    episodeId: string | null;
    number: number;
    isFiller: boolean;
};
type SubEpisode = {
    serverName: string;
    serverId: number | null;
};
type DubEpisode = SubEpisode;
type RawEpisode = SubEpisode;
type AnimeCategories = "most-favorite" | "most-popular" | "subbed-anime" | "dubbed-anime" | "recently-updated" | "recently-added" | "top-upcoming" | "top-airing" | "movie" | "special" | "ova" | "ona" | "tv" | "completed";
type AnimeServers = "hd-1" | "hd-2" | "megacloud" | "streamsb" | "streamtape";
declare enum Servers {
    VidStreaming = "hd-1",
    MegaCloud = "megacloud",
    StreamSB = "streamsb",
    StreamTape = "streamtape",
    VidCloud = "hd-2",
    AsianLoad = "asianload",
    GogoCDN = "gogocdn",
    MixDrop = "mixdrop",
    UpCloud = "upcloud",
    VizCloud = "vizcloud",
    MyCloud = "mycloud",
    Filemoon = "filemoon"
}

type ScrapedAnimeCategory = {
    animes: Anime[];
    genres: string[];
    top10Animes: {
        today: Top10Anime[];
        week: Top10Anime[];
        month: Top10Anime[];
    };
    category: string;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
};
type CommonAnimeScrapeTypes = "animes" | "totalPages" | "hasNextPage" | "currentPage";

type ScrapedHomePage = Pick<ScrapedAnimeCategory, "genres" | "top10Animes"> & {
    spotlightAnimes: SpotlightAnime[];
    trendingAnimes: TrendingAnime[];
    latestEpisodeAnimes: LatestEpisodeAnime[];
    topUpcomingAnimes: TopUpcomingAnime[];
    topAiringAnimes: TopAiringAnime[];
    mostPopularAnimes: MostPopularAnime[];
    mostFavoriteAnimes: MostFavoriteAnime[];
    latestCompletedAnimes: LatestCompletedAnime[];
};

type EstimatedSchedule = {
    id: string | null;
    time: string | null;
    name: string | null;
    jname: string | null;
    airingTimestamp: number;
    secondsUntilAiring: number;
    episode: number;
};
type ScrapedEstimatedSchedule = {
    scheduledAnimes: EstimatedSchedule[];
};

type ScrapedEpisodeServers = {
    sub: SubEpisode[];
    dub: DubEpisode[];
    raw: RawEpisode[];
    episodeNo: number;
    episodeId: string;
};

type ScrapedAnimeSearchSuggestion = {
    suggestions: AnimeSearchSuggestion[];
};

type AnimeSearchQueryParams = {
    q?: string;
    page?: string;
    type?: string;
    status?: string;
    rated?: string;
    score?: string;
    season?: string;
    language?: string;
    start_date?: string;
    end_date?: string;
    sort?: string;
    genres?: string;
};
type SearchFilters = Omit<AnimeSearchQueryParams, "q" | "page">;
type FilterKeys = Partial<keyof Omit<SearchFilters, "start_date" | "end_date">>;

type ScrapedAnimeSearchResult = Pick<ScrapedAnimeCategory, CommonAnimeScrapeTypes> & {
    mostPopularAnimes: MostPopularAnime[];
    searchQuery: string;
    searchFilters: SearchFilters;
};

type ScrapedProducerAnime = Omit<ScrapedAnimeCategory, "genres" | "category"> & Pick<ScrapedHomePage, "topAiringAnimes"> & {
    producerName: string;
};

type ScrapedGenreAnime = Pick<ScrapedAnimeCategory, CommonAnimeScrapeTypes | "genres"> & Pick<ScrapedHomePage, "topAiringAnimes"> & {
    genreName: string;
};

type Video = {
    url: string;
    quality?: string;
    isM3U8?: boolean;
    size?: number;
    [x: string]: unknown;
};
type Subtitle = {
    id?: string;
    url: string;
    lang: string;
};
type Intro = {
    start: number;
    end: number;
};

type ScrapedAnimeEpisodesSources = {
    headers?: {
        [k: string]: string;
    };
    intro?: Intro;
    subtitles?: Subtitle[];
    sources: Video[];
    download?: string;
    embedURL?: string;
};

type ScrapedAnimeEpisodes = {
    totalEpisodes: number;
    episodes: AnimeEpisode[];
};

type ScrapedAnimeAboutInfo = Pick<ScrapedAnimeSearchResult, "mostPopularAnimes"> & {
    anime: {
        info: AnimeGeneralAboutInfo;
        moreInfo: Record<string, string | string[]>;
    };
    seasons: Season[];
    relatedAnimes: RelatedAnime[];
    recommendedAnimes: RecommendedAnime[];
};

declare class Scraper {
    /**
     * @param {string} animeId - unique anime id
     * @throws {HiAnimeError}
     * @example
     * import { HiAnime } from "aniwatch";
     *
     * const hianime = new HiAnime.Scraper()
     *
     * hianime.getInfo("steinsgate-3")
     *  .then((data) => console.log(data))
     *  .catch((err) => console.error(err));
     *
     */
    getInfo(animeId: string): Promise<ScrapedAnimeAboutInfo>;
    /**
     * @param {string} category - anime category
     * @param {number} page - page number, defaults to `1`
     * @throws {HiAnimeError}
     * @example
     * import { HiAnime } from "aniwatch";
     *
     * const hianime = new HiAnime.Scraper()
     *
     * hianime.getCategoryAnime("subbed-anime")
     *  .then((data) => console.log(data))
     *  .catch((err) => console.error(err));
     *
     */
    getCategoryAnime(category: AnimeCategories, page?: number): Promise<ScrapedAnimeCategory>;
    /**
     * @param {string} animeId - unique anime id
     * @throws {HiAnimeError}
     * @example
     * import { HiAnime } from "aniwatch";
     *
     * const hianime = new HiAnime.Scraper()
     *
     * hianime.getEpisodes("steinsgate-3")
     *  .then((data) => console.log(data))
     *  .catch((err) => console.error(err));
     *
     */
    getEpisodes(animeId: string): Promise<ScrapedAnimeEpisodes>;
    /**
     * @param {string} episodeId - unique episode id
     * @throws {HiAnimeError}
     * @example
     * import { HiAnime } from "aniwatch";
     *
     * const hianime = new HiAnime.Scraper()
     *
     * hianime.getEpisodeSources("steinsgate-3?ep=230", "hd-1", "sub")
     *  .then((data) => console.log(data))
     *  .catch((err) => console.error(err));
     *
     */
    getEpisodeSources(episodeId: string, server?: AnimeServers, category?: "sub" | "dub" | "raw"): Promise<ScrapedAnimeEpisodesSources & {
        anilistID: number | null;
        malID: number | null;
    }>;
    /**
     * @param {string} genreName - anime genre name
     * @param {number} page - page number, defaults to `1`
     * @throws {HiAnimeError}
     * @example
     * import { HiAnime } from "aniwatch";
     *
     * const hianime = new HiAnime.Scraper()
     *
     * hianime.getGenreAnime("shounen", 2)
     *  .then((data) => console.log(data))
     *  .catch((err) => console.error(err));
     *
     */
    getGenreAnime(genreName: string, page?: number): Promise<ScrapedGenreAnime>;
    /**
     * @param {string} producerName - anime producer name
     * @param {number} page - page number, defaults to `1`
     * @throws {HiAnimeError}
     * @example
     * import { HiAnime } from "aniwatch";
     *
     * const hianime = new HiAnime.Scraper()
     *
     * hianime.getProducerAnimes("toei-animation", 2)
     *  .then((data) => console.log(data))
     *  .catch((err) => console.error(err));
     *
     */
    getProducerAnimes(producerName: string, page?: number): Promise<ScrapedProducerAnime>;
    /**
     * @param {string} q - search query
     * @param {number} page - page number, defaults to `1`
     * @param {SearchFilters} filters - optional advance search filters
     * @throws {HiAnimeError}
     * @example
     * import { HiAnime } from "aniwatch";
     *
     * const hianime = new HiAnime.Scraper();
     *
     * hianime
     *   .search("monster", 1, {
     *     genres: "seinen,psychological",
     *   })
     *   .then((data) => {
     *     console.log(data);
     *   })
     *   .catch((err) => {
     *     console.error(err);
     *   });
     *
     */
    search(q: string, page?: number, filters?: SearchFilters): Promise<ScrapedAnimeSearchResult>;
    /**
     * @param {string} q - search query
     * @throws {HiAnimeError}
     * @example
     * import { HiAnime } from "aniwatch";
     *
     * const hianime = new HiAnime.Scraper()
     *
     * hianime.searchSuggestions("one piece")
     *  .then((data) => console.log(data))
     *  .catch((err) => console.error(err));
     *
     */
    searchSuggestions(q: string): Promise<ScrapedAnimeSearchSuggestion>;
    /**
     * @param {string} animeEpisodeId - unique anime episode id
     * @throws {HiAnimeError}
     * @example
     * import { HiAnime } from "aniwatch";
     *
     * const hianime = new HiAnime.Scraper()
     *
     * hianime.getEpisodeServers("steinsgate-0-92?ep=2055")
     *  .then((data) => console.log(data))
     *  .catch((err) => console.error(err));
     *
     */
    getEpisodeServers(animeEpisodeId: string): Promise<ScrapedEpisodeServers>;
    /**
     * @param {string} date - date in `YYYY-MM-DD` format
     * @throws {HiAnimeError}
     * @example
     * import { HiAnime } from "aniwatch";
     *
     * const hianime = new HiAnime.Scraper()
     *
     * hianime.getEstimatedSchedule("2024-08-09")
     *  .then((data) => console.log(data))
     *  .catch((err) => console.error(err));
     *
     */
    getEstimatedSchedule(date: string): Promise<ScrapedEstimatedSchedule>;
    /**
     * @throws {HiAnimeError}
     * @example
     * import { HiAnime } from "aniwatch";
     *
     * const hianime = new HiAnime.Scraper()
     *
     * hianime.getHomePage()
     *  .then((data) => console.log(data))
     *  .catch((err) => console.error(err));
     *
     */
    getHomePage(): Promise<ScrapedHomePage>;
}

type hianime_Anime = Anime;
type hianime_AnimeCategories = AnimeCategories;
type hianime_AnimeCharacter = AnimeCharacter;
type hianime_AnimeCharactersAndVoiceActors = AnimeCharactersAndVoiceActors;
type hianime_AnimeEpisode = AnimeEpisode;
type hianime_AnimeGeneralAboutInfo = AnimeGeneralAboutInfo;
type hianime_AnimePromotionalVideo = AnimePromotionalVideo;
type hianime_AnimeSearchQueryParams = AnimeSearchQueryParams;
type hianime_AnimeSearchSuggestion = AnimeSearchSuggestion;
type hianime_AnimeServers = AnimeServers;
type hianime_DubEpisode = DubEpisode;
type hianime_FilterKeys = FilterKeys;
type hianime_LatestCompletedAnime = LatestCompletedAnime;
type hianime_LatestEpisodeAnime = LatestEpisodeAnime;
type hianime_MostFavoriteAnime = MostFavoriteAnime;
type hianime_MostPopularAnime = MostPopularAnime;
type hianime_RawEpisode = RawEpisode;
type hianime_RecommendedAnime = RecommendedAnime;
type hianime_RelatedAnime = RelatedAnime;
type hianime_ScrapedAnimeAboutInfo = ScrapedAnimeAboutInfo;
type hianime_ScrapedAnimeCategory = ScrapedAnimeCategory;
type hianime_ScrapedAnimeEpisodes = ScrapedAnimeEpisodes;
type hianime_ScrapedAnimeEpisodesSources = ScrapedAnimeEpisodesSources;
type hianime_ScrapedAnimeSearchResult = ScrapedAnimeSearchResult;
type hianime_ScrapedAnimeSearchSuggestion = ScrapedAnimeSearchSuggestion;
type hianime_ScrapedEpisodeServers = ScrapedEpisodeServers;
type hianime_ScrapedEstimatedSchedule = ScrapedEstimatedSchedule;
type hianime_ScrapedGenreAnime = ScrapedGenreAnime;
type hianime_ScrapedHomePage = ScrapedHomePage;
type hianime_ScrapedProducerAnime = ScrapedProducerAnime;
type hianime_Scraper = Scraper;
declare const hianime_Scraper: typeof Scraper;
type hianime_SearchFilters = SearchFilters;
type hianime_Season = Season;
type hianime_Servers = Servers;
declare const hianime_Servers: typeof Servers;
type hianime_SpotlightAnime = SpotlightAnime;
type hianime_SubEpisode = SubEpisode;
type hianime_Top10Anime = Top10Anime;
type hianime_Top10AnimeTimePeriod = Top10AnimeTimePeriod;
type hianime_TopAiringAnime = TopAiringAnime;
type hianime_TopUpcomingAnime = TopUpcomingAnime;
type hianime_TrendingAnime = TrendingAnime;
declare namespace hianime {
  export { type hianime_Anime as Anime, type hianime_AnimeCategories as AnimeCategories, type hianime_AnimeCharacter as AnimeCharacter, type hianime_AnimeCharactersAndVoiceActors as AnimeCharactersAndVoiceActors, type hianime_AnimeEpisode as AnimeEpisode, type hianime_AnimeGeneralAboutInfo as AnimeGeneralAboutInfo, type hianime_AnimePromotionalVideo as AnimePromotionalVideo, type hianime_AnimeSearchQueryParams as AnimeSearchQueryParams, type hianime_AnimeSearchSuggestion as AnimeSearchSuggestion, type hianime_AnimeServers as AnimeServers, type hianime_DubEpisode as DubEpisode, type hianime_FilterKeys as FilterKeys, type hianime_LatestCompletedAnime as LatestCompletedAnime, type hianime_LatestEpisodeAnime as LatestEpisodeAnime, type hianime_MostFavoriteAnime as MostFavoriteAnime, type hianime_MostPopularAnime as MostPopularAnime, type hianime_RawEpisode as RawEpisode, type hianime_RecommendedAnime as RecommendedAnime, type hianime_RelatedAnime as RelatedAnime, type hianime_ScrapedAnimeAboutInfo as ScrapedAnimeAboutInfo, type hianime_ScrapedAnimeCategory as ScrapedAnimeCategory, type hianime_ScrapedAnimeEpisodes as ScrapedAnimeEpisodes, type hianime_ScrapedAnimeEpisodesSources as ScrapedAnimeEpisodesSources, type hianime_ScrapedAnimeSearchResult as ScrapedAnimeSearchResult, type hianime_ScrapedAnimeSearchSuggestion as ScrapedAnimeSearchSuggestion, type hianime_ScrapedEpisodeServers as ScrapedEpisodeServers, type hianime_ScrapedEstimatedSchedule as ScrapedEstimatedSchedule, type hianime_ScrapedGenreAnime as ScrapedGenreAnime, type hianime_ScrapedHomePage as ScrapedHomePage, type hianime_ScrapedProducerAnime as ScrapedProducerAnime, hianime_Scraper as Scraper, type hianime_SearchFilters as SearchFilters, type hianime_Season as Season, hianime_Servers as Servers, type hianime_SpotlightAnime as SpotlightAnime, type hianime_SubEpisode as SubEpisode, type hianime_Top10Anime as Top10Anime, type hianime_Top10AnimeTimePeriod as Top10AnimeTimePeriod, type hianime_TopAiringAnime as TopAiringAnime, type hianime_TopUpcomingAnime as TopUpcomingAnime, type hianime_TrendingAnime as TrendingAnime };
}

interface AniwatchError extends Error {
    scraper: string;
    status: number;
}

declare class HiAnimeError extends Error implements AniwatchError {
    scraper: string;
    status: number;
    constructor(errMsg: string, scraperName: string, status?: number);
    static wrapError(err: HiAnimeError | any, scraperName: string): HiAnimeError;
    json(): {
        status: number;
        message: string;
    };
    private logError;
}

export { type AniwatchError, hianime as HiAnime, HiAnimeError };
