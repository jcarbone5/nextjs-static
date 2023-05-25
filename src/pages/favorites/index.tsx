import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { Card, Container, Grid, Text } from "@nextui-org/react";

//Layout
import { Layout } from "@/components/layouts";

//Utils
import { localFavorites } from "@/utils";

const FavoritesPage: NextPage = () => {
  const router = useRouter();

  const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>();

  useEffect(() => {
    setFavoritesPokemons(localFavorites.getFavoritesPokemons());
  }, []);

  const handleRedirectPokemon = (id: number) => {
    router.push(`/pokemon/${id}`);
  };

  return (
    <Layout title="Pokémons">
      {favoritesPokemons?.length === 0 ? (
        <Container
          css={{ h: "calc(100vh - 100px)" }}
          display="flex"
          justify="center"
          alignItems="center"
        >
          <Text b h3>
            No hay Favoritos en la lista
          </Text>
        </Container>
      ) : (
        <Grid.Container gap={4} direction="row" justify="flex-start">
          {favoritesPokemons?.map((pokemon) => {
            return (
              <Grid key={pokemon} xs={6} sm={4} md={3}>
                <Card
                  isHoverable
                  isPressable
                  onClick={() => handleRedirectPokemon(pokemon)}
                >
                  <Card.Body>
                    <Card.Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon}.svg`}
                      width="100%"
                      height={150}
                    />
                  </Card.Body>
                </Card>
              </Grid>
            );
          })}
        </Grid.Container>
      )}
    </Layout>
  );
};

export default FavoritesPage;
