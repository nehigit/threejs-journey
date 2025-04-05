import { useEffect, useState } from "react"

export default function Clicker({keyName, color, increment}) {

    const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? 0))
    
    useEffect(() => {
        return () => localStorage.removeItem(keyName)
    }, [])

    useEffect(() => {
        localStorage.setItem(keyName, count)
    }, [count])
    
    const buttonClick = () => {
        setCount(value => value + 1)
        if(increment) {
            increment()
        }
    }

    return (
        <div>
            <div style={{color: color}}>
                Clicks: {count}
            </div>
            <button onClick={buttonClick}>
                Click me!
            </button>
        </div>
    )

}