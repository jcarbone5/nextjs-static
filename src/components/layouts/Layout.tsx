import { FC, PropsWithChildren } from 'react'
import Head from 'next/head'

//Components
import { Navbar } from '@/components/ui';

type Props = PropsWithChildren & {
  title?: string;
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
        <Head>
            <title>{ title || 'Pokémon App' }</title>
            <meta name="author" content="Jean Carbone" />
            <meta name="description" content="Pokémon App, Pokedex" />
            <meta name="keywords" content="Pokémon App, Pokedex" />
        </Head>

        <Navbar />

        <main>
            {children}
        </main>
    </>
  )
}
