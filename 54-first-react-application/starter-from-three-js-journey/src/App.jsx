import { useState } from "react"
import Clicker from "./Clicker.jsx"

export default function App({children}) {

    console.log(children)

    const [hasClicker, setHasClicker] = useState(true)
    
    const toggleClicker = () => {
        setHasClicker(!hasClicker)
    }

    const randomColor = `hsl(${Math.random() * 360}, 100%, 70%)`

    return(
        <>
            {children}
            <button onClick = {toggleClicker}>
                {hasClicker ? 'Hide' : 'Show'} clicker
            </button>
            {hasClicker ? <>
                <Clicker keyName="countA" color="red" />
                <Clicker keyName="countB" color="blue" />
                <Clicker keyName="countC" color="chocolate" />
                <Clicker keyName="countD" color={randomColor} />
            </> : null}
        </>
    )
    
}
