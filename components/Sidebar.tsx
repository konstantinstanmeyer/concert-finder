import { Session } from "next-auth";
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

    return (
        <>
            <div onClick={() => handleClick()} className="cover"/>
            <div className="sidebar">
                <p onClick={() => handleClick()} className="x">+</p>
                {isUser ? 
                <>
                    <Link className="auth signup" href="/login">
                        Log in
                        <img className="google-signup" src="/google.png" />
                    </Link>
                </>: null}
            </div>
        </>
    )
}
