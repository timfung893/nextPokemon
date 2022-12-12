import {useRouter} from 'next/router'
import { useEffect, useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Details.module.css';

export default function Details() {
    const {
        query: {id},
    } = useRouter()

    // get the object for each id
    const [pokemon, setPokemon] = useState(null)

    useEffect(() => {
        async function getPokemon() {
            const resp = await fetch(
              `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
            )
            setPokemon(await resp.json())
        }

        if (id) {
        getPokemon()
        }

    }, [id])


    if (!pokemon) {
        return null;
    }

    return (
        <div>
            <Head>
                <title>{pokemon.name}</title>
            </Head>
            <div>
                <Link href="/">
                    Back to Home
                </Link>
            </div>
            <div className={styles.layout}>
                <div>
                    <img className={styles.photo} src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`} alt={pokemon.name.english}></img>
                </div>
                <div className={styles.info}>
                    <div className={styles.name}>
                        {pokemon.name}
                    </div>
                    <div className={styles.type}>
                        {pokemon.type.join(', ')}
                    </div>
                    <table className={styles.layoutInfo}>
                        <thead className={styles.header}>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody className={styles.header}>
                            {pokemon.stats.map(({name, value}) => (
                                <tr key={name}>
                                    <td>{name}</td>
                                    <td>{value}</td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
             
            </div>
        </div>
    )
}