import { gql } from "graphql-request";

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

export interface CharacterSearchResponse {
  characters: {
    results: Character[];
  };
}
