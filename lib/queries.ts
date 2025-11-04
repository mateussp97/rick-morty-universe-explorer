import { gql } from "graphql-request";

// Character Queries
export const SEARCH_CHARACTERS = gql`
  query SearchCharacters($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
        status
        species
        type
        gender
        image
        origin {
          name
          dimension
        }
        location {
          name
          dimension
        }
        episode {
          id
          name
          episode
        }
      }
    }
  }
`;

// Location Queries
export const SEARCH_LOCATIONS = gql`
  query SearchLocations($name: String!) {
    locations(filter: { name: $name }) {
      results {
        id
        name
        type
        dimension
        residents {
          id
          name
          image
        }
      }
    }
  }
`;

// Episode Queries
export const SEARCH_EPISODES = gql`
  query SearchEpisodes($name: String!) {
    episodes(filter: { name: $name }) {
      results {
        id
        name
        air_date
        episode
        characters {
          id
          name
          image
        }
      }
    }
  }
`;

// Type Definitions
export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  origin: {
    name: string;
    dimension: string | null;
  };
  location: {
    name: string;
    dimension: string | null;
  };
  episode: Array<{
    id: string;
    name: string;
    episode: string;
  }>;
}

export interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: Array<{
    id: string;
    name: string;
    image: string;
  }>;
}

export interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: Array<{
    id: string;
    name: string;
    image: string;
  }>;
}

// Response Types
export interface CharacterSearchResponse {
  characters: {
    results: Character[];
  };
}

export interface LocationSearchResponse {
  locations: {
    results: Location[];
  };
}

export interface EpisodeSearchResponse {
  episodes: {
    results: Episode[];
  };
}

// Union types for generic handling
export type EntityType = "character" | "location" | "episode";
export type Entity = Character | Location | Episode;
export type SearchResponse =
  | CharacterSearchResponse
  | LocationSearchResponse
  | EpisodeSearchResponse;
