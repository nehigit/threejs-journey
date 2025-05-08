import { Canvas } from '@react-three/fiber'
import './style.css'
import ReactDOM from 'react-dom/client'
import Core from './Core.jsx'
import * as THREE from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        dpr={ [1, 2] }
        gl={ {
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.SRGBColorSpace,
        } }
        camera={ {
            fov: 45,
            near: .1,
            far: 200,
            position: [2, 3, 5]
        } }
    >
        <Core />
    </Canvas>
)