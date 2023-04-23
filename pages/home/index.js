import { LayOut } from '@/components';
import { signOut, getSession } from 'next-auth/react';

function HomePage() {
    return (
        <LayOut>
            <h1>this is Home Page</h1>
            <button onClick={() => signOut()}>Log out</button>
        </LayOut>
    );
}

export const getServerSideProps = async ({ req }) => {
    const session = await getSession({ req });
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanace: false,
            },
        };
    }

    return {
        props: { session },
    };
};

export default HomePage;
