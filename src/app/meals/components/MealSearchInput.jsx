"use client";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";


const MealSearchInput = () => {
    const [search, setSearch] = useState([]);
    const router = useRouter();
    const pathname = usePathname();
    useEffect(()=>{
        const searchQuery ={search}
        const urlQueryParam = new URLSearchParams(searchQuery)
        const url =`${pathname}?${urlQueryParam}`;
        router.push(url)
    },[search])
    return (
        <div>
            <input type="text" className="border-1 border-black mb-8" value={search} 
            onChange={(e)=> setSearch(e.target.value)}/>
        </div>
    );
};

export default MealSearchInput;