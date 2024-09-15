import { useRouter } from "next/router"
import { useEffect, useState } from "react";

import { pb } from "@/lib/pb";
import Image from "next/image";

export default function AuthorPage() {
    const router = useRouter();
    const {author} = router.query;

    const [authorData, setAuthorData] = useState({});

    useEffect(() => {
        const getAuthorData = async () => {
            console.log(author);
            const data = await pb.collection('author').getOne(author, {expand: 'userdata'});

            setAuthorData(data);
        }

        if (author) {
            getAuthorData();
        }
    }, [author]);


    return (
        <>
            {author}
            {authorData.name}
            {authorData?.expand?.userdata?.mc_username}

            <div className="size-12 bg-custom-bpink rotate-[35deg] flex justify-center items-center">
                <Image src={`https://minotar.net/cube/${authorData?.expand?.userdata?.mc_uuid}`} width="1000" height="1000" className="-rotate-[35deg]" />
            </div>
        </>
    )
}