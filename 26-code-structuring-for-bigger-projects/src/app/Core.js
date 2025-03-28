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
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.debug = new Debug()

        // Global access from console
        window.core = this

        // Listen to custom 'resize' event from Sizes
        this.sizes.addEventListener('myCustomResizeEvent', () => {
            this.resize()
        })

        // Listen to tick event
        this.time.addEventListener('tick', () => {
            this.update()
        })
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

    static getInstance() {
        if (!Core.instance) Core.instance = new Core()
        return Core.instance
    }
}