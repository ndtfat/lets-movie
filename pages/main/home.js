import { Layout } from '@/components';
import { getSession } from 'next-auth/react';

function HomePage({ genres }) {
    return (
        <Layout genres={genres} transparent>
            <div style={{ height: '1000px', background: 'linear-gradient(180deg, #000, transparent)' }}></div>
        </Layout>
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
