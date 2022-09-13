import type { GetStaticProps, NextPage } from 'next';
import axios from 'axios';

type User = {
    id: number,
    name: string;
}

type GetUsersReponse = {
    data: User[];
}

const SSG: NextPage<GetUsersReponse> = ({ data }) => {
    return (
        <>
            {(data as any).map((e: User) => (
                <h2 key={e.id}>{e.name}</h2>
            ))}
        </>
    )
}

export default SSG;

export const getStaticProps: GetStaticProps = async () => {
    const res = await axios.get<GetUsersReponse>('https://631f692422cefb1edc4b6535.mockapi.io/api/users')
    const data = res.data;
    
    return {
        props: {
            data,
        }
    };
}