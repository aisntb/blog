import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header(){
    
    return(
            <header className='bg-white/70 dark:bg-black/70'>
                <Link href='/'>
                    <div className='header-title'>Blog</div>
                </Link>
                <ThemeToggle/>
            </header>
    )
}