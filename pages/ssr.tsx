import type { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';

type User = {
    id: number,
    name: string;
}

type GetUsersReponse = {
    data: User[];
}

const SSR: NextPage<GetUsersReponse> = ({ data }) => {
    return (
        <>
            {(data as any).map((e: User) => (
                <h2 key={e.id}>{e.name}</h2>
            ))}
        </>
    )
}

export default SSR;

export const getServerSideProps: GetServerSideProps = async () => {
    // Get external data from API
    const res = await axios.get<GetUsersReponse>('https://631f692422cefb1edc4b6535.mockapi.io/api/users')
    const data = res.data;
    
    
    // The value of the `props` key will be
    //  passed to the `SSR` component
    return {
        props: {
            data,
        },
    };
}