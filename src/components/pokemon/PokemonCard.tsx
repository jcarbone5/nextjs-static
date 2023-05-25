import { FC } from "react";
import { useRouter } from "next/router";
import { Card, Grid, Row, Text } from "@nextui-org/react";

//Interfaces
import { SmallPokemon } from "@/interfaces";

interface Props {
  pokemon: SmallPokemon;
}

const PokemonCard: FC<Props> = ({ pokemon }) => {
  const router = useRouter();

  const redirectPokemon = () => {
    router.push(`/name/${pokemon.name}`);
  };

  return (
    <Grid key={pokemon.id} xs={12} sm={4} md={3} lg={2}>
      <Card isHoverable isPressable onClick={redirectPokemon}>
        <Card.Body>
          <Card.Image src={pokemon.img} width="100%" height={140} />
        </Card.Body>

        <Card.Footer>
          <Row justify="space-between" css={{ paddingInline: 10 }}>
            <Text transform="capitalize">{pokemon.name}</Text>
            <Text>#{pokemon.id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};

export default PokemonCard;
