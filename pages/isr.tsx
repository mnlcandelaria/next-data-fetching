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

const ISR: NextPage<GetUsersReponse> = ({ data }) => {
    return (
        <>
            <div className={styles.container}>
                {(data as any).map((e: User) => (
                    <h2 key={e.id}>{e.name}</h2>
                ))}
            </div>
        </>
    )
}

export default ISR;

export const getStaticProps: GetStaticProps = async () => {
    // Get external data from API
    const res = await axios.get<GetUsersReponse>('https://631f692422cefb1edc4b6535.mockapi.io/api/users')
    const data = res.data;
    
    // The value of the `props` key will be
    //  passed to the `ISR` component
    return {
        props: {
            data,
        },
        revalidate: 20,
    };
}