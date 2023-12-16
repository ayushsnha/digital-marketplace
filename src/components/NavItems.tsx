'use client';

import { PRODUCT_CATEGORIES } from '@/config';
import { useEffect, useRef, useState } from 'react';
import NavItem from './NavItem';


const NavItems = () => {
    const[activeIndex, setActiveIndex]= useState<null|number>(null);

    const isAnyOpen = activeIndex !== null

    const navRef = useRef<HTMLDivElement|null>(null);

    const handleClickOutside = (event:MouseEvent) => {
        if (navRef.current && !navRef.current.contains(event.target as Node)) {
            setActiveIndex(null);
        }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setActiveIndex(null);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event:MouseEvent) => {
            handleClickOutside(event);
        };

        const handleEscape = (event: KeyboardEvent) => {
            handleEscapeKey(event);
        };
    
        if (typeof activeIndex === 'number') {
            document.addEventListener('mousedown', handleOutsideClick);
            document.addEventListener('keydown', handleEscape);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleEscape);
        }
    
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [activeIndex]);
    
    

    return (
        <div className="flex gap-4 h-full" ref={navRef}>
            {PRODUCT_CATEGORIES.map((category, i)=>{
                const handleOpen = () => {
                    if(activeIndex === i) {
                        setActiveIndex(null)
                    } else {
                        setActiveIndex(i)
                    }
                }

                const isOpen = i === activeIndex
                return (
                    <NavItem
                        category={category}
                        handleOpen={handleOpen}
                        isOpen={isOpen}
                        key={category.value}
                        isAnyOpen={isAnyOpen}
                    />
                )
            })}
        </div>
    )
}

export default NavItems