import * as THREE from 'three'

import Sizes from './utils/Sizes.js'
import Time from './utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './world/World.js'
import Debug from './utils/Debug.js'
import sources from './utils/sources.js'
import Resources from './utils/Resources.js'


export default class Core {
    static instance = null

    constructor() {
        if (Core.instance) throw new Error("Singleton. Use Core.getInstance().")
        Core.instance = this

        this.canvas = document.querySelector('canvas.webgl')
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        // Global access from console
        window.core = this

        // Listen to custom 'resize' event from Sizes
        this.onMyCustomResizeEvent = () => this.resize()
        this.sizes.addEventListener('myCustomResizeEvent', this.onMyCustomResizeEvent)

        this.onTick = () => this.update()
        this.time.addEventListener('tick', this.onTick)
    }
    
    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        // Order matters
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy() {
        this.sizes.removeEventListener('myCustomResizeEvent', this.onMyCustomResizeEvent)
        // The 'resize' event on window is still active
        this.time.removeEventListener('tick', this.onTick)

        this.scene.traverse(child => {
            if(child instanceof THREE.Mesh) {
                child.geometry.dispose()
                for(const key in child.material) {
                    const value = child.material(key)
                    if(value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.orbitControls.dispose()
        this.renderer.instance.dispose()
        
        if(this.debug.active) {
            this.debug.gui.destroy()
        }

        // Destroying things is a bit tricky and you need to dive into the different components
        // and make sure you are disposing of eveything properly

        // For bigger projects it's better to create a destroy() method on every class,
        // not only on this one
    }

    static getInstance() {
        if (!Core.instance) Core.instance = new Core()
        return Core.instance
    }
}