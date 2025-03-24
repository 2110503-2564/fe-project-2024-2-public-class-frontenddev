import styles from './topmenu.module.css'
import Image from 'next/image'
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Link } from '@mui/material';

export default async function TopMenu () {

    const session = await getServerSession(authOptions)

    return (
        <div className={styles.menucontainer}>
            <Link href="/"><Image src={'/img/logo.png'} className={styles.logoimg}
            alt='logo' width={0} height={0} sizes='6vh'/></Link>
            <TopMenuItem title='Booking' pageRef='/booking'/>
            {
                session? <Link href="/api/auth/signout">
                    <div className='flex items-center absolute left-0 h-full
                    px-2 absoulute left-0 text-green-600 text-sm'>Sign-Out of {session.user?.name}</div></Link>
                :<Link href="/api/auth/signin">
                    <div className='flex items-center absolute left-0 h-full
                    px-2 absoulute left-0 text-green-600 text-sm'>Sign-In</div></Link>
            }
            {
                session? null:<Link href="/api/auth/register">
                <div className='flex items-center absolute left-20 h-full
                px-2 text-green-600 text-sm'>Register</div></Link>
            }
            <div className='flex items-center h-full
                    px-2 text-cyan-600 text-sm'>
                <TopMenuItem title='My Booking' pageRef='/mybooking'/>
            </div>
            {
                session? (
                <div className='flex items-center h-full
                    px-2 text-cyan-600 text-sm'>
                <TopMenuItem title='Profile' pageRef='/profile'/>
                </div>
                ): null
            }
        </div>
    );
}