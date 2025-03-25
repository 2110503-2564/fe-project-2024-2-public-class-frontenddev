'use client'
import { useState } from 'react';
import styles from './banner.module.css'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner() {
    const covers = ['/img/campCover.jpg', '/img/campCover2.jpg', '/img/campCover3.jpg', '/img/campCover4.jpg']
    const [index, setIndex] = useState(0)
    const router = useRouter()
    const { data:session } = useSession()
    console.log(session)
    console.log(session?.user.token)

    return (
        <div className={styles.banner} onClick={()=>setIndex(index+1)}>
            <Image src={covers[index%4]}
            alt='cover'
            fill={true}
            priority
            objectFit='cover'/>
            <div className={styles.bannerText}>
                <h1 className='px-5 py-8 rounded-2xl outline-1 outline-gray-300 inline-block text-6xl font-medium text-emerald-700 bg-pink-100 bg-opacity-25 backdrop-blur-sm'>Find The Right Place For Camping</h1>
            </div>
            {
                session? <div className='z-30 absolute top-5
                right-10 font-semibold text-white text-3xl'>Welcome {session.user?.name}</div>:null
            }
            <button className='bg-white text-green-600 border border-green-600
            font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-0
            hover:bg-green-600 hover:text-white hover:border-transparent'
            onClick={(e)=>{ e.stopPropagation();
                router.push('/camp')
             }}>Select Camp</button>
        </div>
    );
}