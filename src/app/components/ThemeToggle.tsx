'use client'
import { useTheme } from "next-themes"

export default function ThemeToggle(){
    const { theme, setTheme } = useTheme()
    return(
        <div className='header-menu' onClick={()=>setTheme(theme==='dark'?'light':'dark')}>🌗</div>
    )
}