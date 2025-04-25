import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)

/**
 * Raycaster
 */

const raycaster = new THREE.Raycaster(
    new THREE.Vector3(-3, 0, 0),
    new THREE.Vector3(1, 0, 0).normalize()
)

let currentIntersect: THREE.Intersection | null


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('click', () => {
    if(currentIntersect) console.log('click on a sphere');
})

/**
 * Mouse
 */

const mousePos = new THREE.Vector2()

window.addEventListener('mousemove', e => {
    mousePos.x = ((e.clientX / sizes.width) * 2) - 1
    mousePos.y = -(((e.clientY / sizes.height) * 2) - 1)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Model
 */

const gltfLoader = new GLTFLoader();

let model: THREE.Group

gltfLoader.load(
    './models/Duck/glTF-Binary/Duck.glb',
    gltf => {
        model = gltf.scene
        gltf.scene.position.y = -1.2
        scene.add(model);
    }
)

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight('#fff', .9)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#fff', 2.1)
directionalLight.position.set(1, 2, 3)
scene.add(directionalLight)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animate objects
    object1.position.y = Math.sin(elapsedTime * .3) * 1.5
    object2.position.y = Math.sin(elapsedTime * .8) * 1.5
    object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5

    // Raycaster
    const objectsToTest = [object1, object2, object3]
    
    let intersections = raycaster.intersectObjects(objectsToTest)
    
    // Ray from mouse
    raycaster.setFromCamera(mousePos, camera)
    
    for(const object of objectsToTest) {
        object.material.color.set('red')
    }

    for(const intersection of intersections) {
        const material = (intersection.object as THREE.Mesh).material as THREE.MeshBasicMaterial;
        material.color.set('blue')
    }

    if(intersections.length) {
        if(currentIntersect === null) console.log('mouse enter')
        currentIntersect = intersections[0]
    } else {
        if(currentIntersect) console.log('mouse leave');
        currentIntersect = null
    }

    if(model) {
        const modelIntersects = raycaster.intersectObject(model)
        if(modelIntersects.length) {
            model.scale.set(1.2, 1.2, 1.2)
        }
        else {
            model.scale.set(1, 1, 1)
        }
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()