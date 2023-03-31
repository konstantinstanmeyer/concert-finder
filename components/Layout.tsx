import { PropsWithChildren } from 'react';
import { Head } from 'next/document';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children }: PropsWithChildren<{}>){
    return(
        <>
            <Navbar />
            <Sidebar />
            <main>
                {children}
            </main>
        </>
    )
}