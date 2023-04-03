import Link from "next/link";

interface Props {
    isUser: boolean;
}

export default function Sidebar({ isUser }: Props){

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
