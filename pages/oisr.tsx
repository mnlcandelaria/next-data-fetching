import type { GetStaticProps, NextPage } from 'next';
import axios from 'axios';
import styles from '../styles/Home.module.css'

type User = {
    id: number,
    name: string;
}

type GetUsersReponse = {
    data: User[];
}

const OISR: NextPage<GetUsersReponse> = ({ data }) => {
    const revalidate = () => {
        fetch('/api/revalidate?secret=erni');
    }

    return (
        <>
            <div className={styles.container}>
                <button onClick={() => revalidate()}>Revalidate</button>
                {(data as any).map((e: User) => (
                    <h2 key={e.id}>{e.name}</h2>
                ))}
            </div>
        </>
    )
}

export default OISR;

export const getStaticProps: GetStaticProps = async () => {
    const res = await axios.get<GetUsersReponse>('https://631f692422cefb1edc4b6535.mockapi.io/api/users')
    const data = res.data;
    
    return {
        props: {
            data,
        },
        revalidate: 20,
    };
}