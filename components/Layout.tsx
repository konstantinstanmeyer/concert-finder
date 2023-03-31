import { PropsWithChildren } from 'react';
import { Head } from 'next/document';
import Navbar from './Navbar';

export default function Layout({ children }: PropsWithChildren<{}>){
    return(
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    )
}