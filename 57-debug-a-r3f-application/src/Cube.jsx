export default function Cube({scale = 1, visible}) {

    return(
           <mesh position-x={2} scale={scale} visible={visible}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
    )
}