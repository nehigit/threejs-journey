import { useState } from "react"
import Clicker from "./Clicker.jsx"

export default function App() {
    const [hasClicker, setHasClicker] = useState(true)
    
    const toggleClicker = () => setHasClicker(!hasClicker)

    return(
        <>
            <button onClick = {toggleClicker}>
                {hasClicker ? 'Hide' : 'Show'} clicker
            </button>
            {hasClicker ? <>
                <Clicker/>
                <Clicker/>
                <Clicker/>
                <Clicker/>
            </> : null}
        </>
    )
}
