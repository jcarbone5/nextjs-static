import { useState } from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import {
  Button,
  Card,
  Container,
  Grid,
  Image,
  Row,
  Text,
} from "@nextui-org/react";
import confetti from "canvas-confetti";

//Layout
import { Layout } from "@/components/layouts";

//Api
import { pokemonsApi } from "@/api";

//Interfaces
import { Pokemon, PokemonListResponse } from "@/interfaces";

//Utils
import { localFavorites } from "@/utils";

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  const toggleFavorites = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container gap={4}>
        <Grid xs={12} sm={4}>
          <Card>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || ""}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ p: "20px" }}>
              <Row align="center" justify="space-between">
                <Text h1 transform="capitalize">
                  {pokemon.name}
                </Text>

                <Button
                  color="gradient"
                  ghost={!isInFavorites}
                  onClick={toggleFavorites}
                >
                  {isInFavorites ? "Esta en favoritos" : "Añadir a favoritos"}
                </Button>
              </Row>
            </Card.Header>

            <Card.Body css={{ p: "20px" }}>
              <Text size={30}>Sprites:</Text>

              <Container direction="row" display="flex">
                <Image
                  src={pokemon.sprites.front_default}
                  width={100}
                  height={100}
                  alt={pokemon.name}
                />

                <Image
                  src={pokemon.sprites.back_default}
                  width={100}
                  height={100}
                  alt={pokemon.name}
                />

                <Image
                  src={pokemon.sprites.front_shiny}
                  width={100}
                  height={100}
                  alt={pokemon.name}
                />

                <Image
                  src={pokemon.sprites.back_shiny}
                  width={100}
                  height={100}
                  alt={pokemon.name}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const {
    data: { results },
  } = await pokemonsApi.get<PokemonListResponse>("/pokemon?limit=151");

  const paths = results.map((pokemon) => {
    return { params: { name: pokemon.name } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  try {
    const { data: pokemon } = await pokemonsApi.get<Pokemon>(
      `/pokemon/${name}`
    );

    return {
      props: {
        pokemon,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default PokemonByNamePage;
