import { PropsWithChildren } from 'react';
import { Head } from 'next/document';

export default function Layout({ children }: PropsWithChildren<{}>){
    return(
        <>
            <main>{children}</main>
        </>
    )
}