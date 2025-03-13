import { useEffect, useState } from "react"

export default function Clicker() {
    const [count, setCount] = useState(
        parseInt(localStorage.getItem('count') ?? 0)
    )
    
    useEffect(() => {
        return () => localStorage.removeItem('count')
    }, [])

    useEffect(() => {
        localStorage.setItem('count', count)
    }, [count])
    
    const buttonClick = () => setCount(value => value + 1)

    return (
        <div>
            <div>
                Clicks: {count}
            </div>
            <button onClick = {buttonClick}>
                Click me!
            </button>
        </div>
    )
}