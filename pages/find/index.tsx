import Link from "next/link"

export default function Find(){
    return(
        <div className="find">
            <div className="search-row">
                <input placeholder="search for events..." className="search" />
                <Link href={true ? "/" : {} } className="image-container">
                    <img src="/magnifier.png" className="search-magnifier" />
                </Link>
            </div>
            <div className="find-container">
                <Link href="/find/concerts" className="find-card">
                    <img src="/live.png" />
                    <h2>All Concerts</h2>
                    <p>choose from a vast assortment of live concerts</p>
                </Link>
                <Link href="/find/venues" className="find-card">
                    <img src="/venue.png" />
                    <h2>Venues</h2>
                    <p>discover new locations to listen to your favorite artists</p>
                </Link>
                <Link href="/find/artists" className="find-card">
                    <img src="/artist.png" />
                    <h2>Find-by-Artist</h2>
                    <p>enter your favorite artist and find their upcoming events</p>
                </Link>
            </div>
            <div></div>
        </div>
    )
}