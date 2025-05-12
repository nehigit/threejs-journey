import { OrbitControls, TransformControls, PivotControls, Html, Text, Float, MeshReflectorMaterial} from "@react-three/drei"
import { useRef } from "react"
import { Object3D } from "three"

export default function Experience() {

    const cube = useRef()
    const sphere = useRef()
    const floor = useRef()

    return <>
        <OrbitControls makeDefault />

        <directionalLight position={ [1, 2, 3] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <mesh ref={ sphere } position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <PivotControls
            anchor={ [0, 0, 0] }
            depthTest={ false }
            lineWidth={ 4 }
            axisColors={ ["#9381ff", "#ff4d6d", "#7ae582"] }
            scale={ 1 }
            disableScaling
        >
            <mesh ref={ cube } position-x={ 2 } scale={ 1.5 }>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />

                <Html
                    occlude
                    position={ [0, 0, 0] }
                    wrapperClass="label"
                    className="labelClass"
                    center
                    distanceFactor={ 6 }
                >
                   Cube 
                </Html>
            </mesh>
        </PivotControls>

        <mesh ref={ floor } position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            {/* <meshStandardMaterial color="greenyellow" side={ 2 } /> */}
            <MeshReflectorMaterial
                resolution={512}
                blur={[1000, 1000]}
                mixBlur={1}
                mirror={1}
            />
        </mesh>

        <Text
            position-z={2}
            font="./bangers-v20-latin-regular.woff"
            color={"#333"}
        >
            I Love R3F
            <meshNormalMaterial/>
        </Text>


    </>
}