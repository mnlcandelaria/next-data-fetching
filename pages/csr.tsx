import type { NextPage } from 'next';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'

type User = {
    id: number,
    name: string;
}

interface GetUsersReponse {
    data: User[];
}

const CSR: NextPage = () => {
    const [state, setState] = useState<GetUsersReponse | []>([]);

    async function getData() {
        await axios.get<GetUsersReponse>('https://631f692422cefb1edc4b6535.mockapi.io/api/users')
            .then(res => setState(res.data));
    }

    useEffect(() => {
        getData();
    }, []);
    
    return (
        <>
        <div className={styles.container}>
            {(state as any).map((e: User) => (
                <h2 key={e.id}>{e.name}</h2>
            ))}
            </div>
        </>
    )
}

export default CSR;