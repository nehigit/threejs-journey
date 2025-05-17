import { OrbitControls } from '@react-three/drei'
import Cube from './Cube'
import { button, useControls } from 'leva'
import { color } from 'three/tsl';
import { Perf } from 'r3f-perf';

export default function Experience() {
    const { perfVisible } = useControls({
        perfVisible: true
    })

    const { position, color, visible } = useControls('sphere', {
        position: {
            value: {
                x: -2,
                y: 0
            },
            step: .01,
            joystick: 'invertY'
        },
        color: '#ff0000',
        visible: true,
        clickMe: button(() => {
            console.log("OK")
        }),
        choice: { options: ['a', 'b', 'c'] }
    })

    return <>
    { perfVisible ? <Perf position='top-left' /> : null }
        

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <mesh position = {[position.x, position.y, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color={color} />
        </mesh>

        <Cube scale={2} visible={visible}/>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}