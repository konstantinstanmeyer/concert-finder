import { Session } from "next-auth";
import Link from "next/link";

interface Props {
    isUser: boolean;
    session: Session | null;
}

// navigate around the website via the sidebar, conditionally rendered and allows users to view account information and view other pages
export default function Sidebar({ isUser, session }: Props){

    return(
        <div className="sidebar">

            {isUser ? 
            <>
                <Link className="auth signup" href="/signup">
                    Signup
                </Link>
                <Link className="auth login" href="/login">
                    Login
                </Link>
            </>: null}
        </div>
    )
}
