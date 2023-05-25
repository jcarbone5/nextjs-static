import NavLink from "next/link";
import Image from "next/image";
import { Button, Navbar as Nav, Text } from "@nextui-org/react";

export const Navbar = () => {
  return (
    <Nav isBordered variant="sticky">
      <Nav.Brand>
        <Image
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
          width={70}
          height={70}
          alt="Pokémon"
        />
        <NavLink href="/" passHref>
          <Text b h3 color="inherit" css={{ margin: 0 }}>
            Pokémons
          </Text>
        </NavLink>
      </Nav.Brand>
      <Nav.Content>
        <Nav.Item>
          <NavLink href="/favorites">
            <Button auto color="gradient">
              Favoritos
            </Button>
          </NavLink>
        </Nav.Item>
      </Nav.Content>
    </Nav>
  );
};
