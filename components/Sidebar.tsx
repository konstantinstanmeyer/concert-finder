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
                {!session ? 
                    <button onClick={handleGoogleSignin} className="auth login">
                        Log in
                        <img className="google-signup" src="/google.png" />
                    </button> :
                    <>
                        <div className="sidebar-card profile-card">
                            <img className="sidebar-image" src={"/profile.png"} />
                            <div className="sidebar-user">
                                <p className="sidebar-name">{session.user?.name?.split(" ")[0]}</p>
                                <Link href="/profile" className="sidebar-link">view profile</Link>
                            </div>
                        </div>
                        <div className="divider" />
                        <Link href="" className="sidebar-card">
                            <img className="sidebar-icon" src="/glass.png" />
                            <p className="sidebar-text">Find Concerts</p>
                        </Link>
                        <div className="divider" />
                        <Link href="" className="sidebar-card">
                            <img className="sidebar-icon" src="/ticket.png" />
                            <p className="sidebar-text">Past Tickets</p>
                        </Link>
                        <div className="divider" />
                        <Link href="" className="sidebar-card">
                            <img className="sidebar-icon" src="/wallet.png" />
                            <p className="sidebar-text">Payment Options</p>
                        </Link>
                        <div className="sidebar-signout">
                            Sign out
                        </div>
                    </>}
            </div>
        </>
    )
}
