import { ReactThreeFiber, extend, useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import { OrbitControls } from "three/examples/jsm/Addons.js"
import CustomObject from "./CustomObject"
import * as THREE from 'three'

// extend({ OrbitControls: OrbitControls }) // the same
extend({ OrbitControls })

export default function Core() {

    const { camera, gl } = useThree()

    const cube = useRef()
    const group = useRef()

    const sceneCenter = new THREE.Vector3(0, 0, 0)

    useFrame((state, delta) => {
        cube.current.rotation.x += delta
        cube.current.rotation.y += delta

        // state.camera.position.x = Math.sin(state.clock.elapsedTime) * 10
        // state.camera.position.z = Math.cos(state.clock.elapsedTime) * 10
        // state.camera.lookAt(sceneCenter)
    })

    return <>
        <orbitControls args={ [camera, gl.domElement] } />

        <directionalLight position={ [1, 2, 3] } intensity={ 3 } />
        <ambientLight intensity={ 1.5 } color="mediumpurple" />

        <CustomObject />

        <group ref={ group }>
            <mesh position-x={ -2 }>
                <sphereGeometry />
                <meshStandardMaterial color='orange' />
            </mesh>

            <mesh ref={ cube } position-x={ 2 } rotation-y={ Math.PI * .25} scale={ 1.5 }>
                <boxGeometry />
                <meshStandardMaterial color='mediumpurple' />
            </mesh>
        </group>

        <mesh position-y={ -1 } rotation-x={ -Math.PI * .5 } scale={ 10 } >
            <planeGeometry />
            <meshStandardMaterial color='greenyellow' side={ 2 } />
        </mesh>
    </>
}