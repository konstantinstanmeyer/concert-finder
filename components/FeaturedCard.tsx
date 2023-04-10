import { Event } from '@/redux/slices/user/types'
import Link from 'next/link';

interface FeaturedProps {
    featured: Event;
    key: number;
}

export default function FeaturedCard(props: FeaturedProps){
    const { featured, key } = props;

    return (
        <Link href={`/view/${featured.id}`} className="featured-card" key={key}>
            <div className="featured-image">
                <img src={featured.image}/>
            </div>
            <h2>{featured?.artists ? featured.artists[0]["name"] : featured.name} <span>{featured.date}</span></h2>
            <p>{featured.location}</p>
            {featured.startingPrice !== "na" ? <p>Starting at: ${featured.startingPrice}</p> : null}
        </Link>
    )
}