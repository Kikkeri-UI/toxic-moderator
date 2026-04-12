import { useState, useEffect } from "react"

export const useDebounce = (searchTerm: string, delay: number) => {
    const [debouncedTerm, setDebounedTerm] = useState("");

    useEffect(() => {
        let timer = setTimeout(() => {
            setDebounedTerm(searchTerm);
        }, delay);

        return () => clearTimeout(timer);
    }, [searchTerm])

    return debouncedTerm;
}