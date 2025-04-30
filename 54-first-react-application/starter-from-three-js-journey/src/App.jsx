import { useMemo, useState } from "react"
import Clicker from "./Clicker.jsx"

export default function App({clickersCount, children}) {
    const [hasClicker, setHasClicker] = useState(true)
    const [count, setCount] = useState(0)
    
    const toggleClicker = () => {
        setHasClicker(!hasClicker)
    }
    
    const increment = () => {
        setCount(count + 1)
    }
    
    const colors = useMemo(() => {
        const colors = []
        for (let i = 0; i < clickersCount; i++) {
            colors.push(`hsl(${ Math.random() * 360 }deg, 100%, 70%)`)     
        }

        return colors
    }, [clickersCount])

    return(
        <>
            { children }
            <div>Total count: { count }</div>

            <button onClick = { toggleClicker }>
                {hasClicker ? 'Hide' : 'Show'} clicker
            </button>

            { hasClicker ? <>
                { [...Array(clickersCount)].map((value, index) => 
                    <Clicker
                        key={ index } // !!! bad practice, but it has to be done this way here
                        increment={ increment }
                        keyName={ `count${index}` }
                        color={ colors[index] }
                    />
                ) }
            </> : null }
        </>
    )
    
}
