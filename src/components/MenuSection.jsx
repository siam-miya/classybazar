"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MenuSection = () => {
    const pathname = usePathname();
    return (
        <ul className='flex items-center gap-10'>
            <li className='text-base leading-6 text-black'>
                <Link
                    href="/"
                    className={`pb-1 transition-all ${pathname === '/' ? 'border-b-2 border-black font-medium' : ''}`}
                >
                    Home
                </Link>
            </li>
            <li className='text-base leading-6 text-black'>
                <Link
                    href="/contact"
                    className={`pb-1 transition-all ${pathname === '/contact' ? 'border-b-2 border-black font-medium' : ''}`}
                >
                    Contact
                </Link>
            </li>
            <li className='text-base leading-6 text-black'>
                <Link
                    href="/about"
                    className={`pb-1 transition-all ${pathname === '/about' ? 'border-b-2 border-black font-medium' : ''}`}
                >
                    About
                </Link>
            </li>
            <li className='text-base leading-6 text-black'>
                <Link
                    href="/signup"
                    className={`pb-1 transition-all ${pathname === '/signup' ? 'border-b-2 border-black font-medium' : ''}`}
                >
                    Sign Up
                </Link>
            </li>
        </ul>
    )
}

export default MenuSection
