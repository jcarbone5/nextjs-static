import { GetStaticProps, NextPage } from "next";
import { Grid } from "@nextui-org/react";

//Layout
import { Layout } from "@/components/layouts";

//Api
import { pokemonsApi } from "@/api";

//Interfaces
import { PokemonListResponse, SmallPokemon } from "@/interfaces";

//Components
import { PokemonCard } from "@/components/pokemon";

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado de Pokémons">
      <Grid.Container gap={4} justify="flex-start">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {
    data: { results },
  } = await pokemonsApi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemons: SmallPokemon[] = results.map((pokemon, index) => {
    return {
      id: index + 1,
      name: pokemon.name,
      url: pokemon.url,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        index + 1
      }.svg`,
    };
  });

  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
