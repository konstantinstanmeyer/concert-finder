import { PropsWithChildren } from 'react';
import { Head } from 'next/document';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useSession } from 'next-auth/react';

export default function Layout({ children }: PropsWithChildren<{}>){
    const { data: session, status } = useSession();

    return(
        <>
            <Navbar session={session} isUser={status === "authenticated"}  />
            <Sidebar session={session} isUser={status === "authenticated"} />
            <main>
                {children}
            </main>
        </>
    )
}