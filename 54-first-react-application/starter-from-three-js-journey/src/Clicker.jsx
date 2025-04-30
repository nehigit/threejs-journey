import { useRef, useEffect, useMemo, useState } from "react"

export default function Clicker({keyName, color, increment}) {
    const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? 0))
    
    const buttonRef = useRef()

    useEffect(() => {
        console.log(buttonRef.current)
        buttonRef.current.style.backgroundColor = 'papayawhip'

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
                Clicks: { count }
            </div>
            <button ref={ buttonRef } onClick={ buttonClick }>
                Click me!
            </button>
        </div>
    )

}