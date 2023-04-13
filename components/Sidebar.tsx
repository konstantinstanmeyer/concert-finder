import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Link from "next/link";

interface Props {
    isUser: boolean;
    session: Session | null;
}

// navigate around the website via the sidebar, conditionally rendered and allows users to view account information and view other pages
export default function Sidebar({ isUser, session }: Props){
    function handleClick(){
        document.querySelector('.cover')?.classList.remove('display');
        document.querySelector('.sidebar')?.classList.remove('visible');
    }

    async function handleGoogleSignin(){
        signIn('google', { callbackUrl: 'http://localhost:3000' })
    }

    return (
        <>
            <div onClick={() => handleClick()} className="cover"/>
            <div className="sidebar">
                <p onClick={() => handleClick()} className="x">+</p>
                {!isUser ? 
                    <button onClick={handleGoogleSignin} className="auth login">
                        Log in
                        <img className="google-signup" src="/google.png" />
                    </button> : null}
            </div>
        </>
    )
}
