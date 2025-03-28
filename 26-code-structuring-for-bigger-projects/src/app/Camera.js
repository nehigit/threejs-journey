import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import Core from "./Core"

export default class Camera {
    constructor() {
        this.core = Core.getInstance()
        this.sizes = this.core.sizes
        this.scene = this.core.scene
        this.canvas = this.core.canvas
        this.setInstance()
        this.setOrbitControls()
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            45,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        )

        this.instance.position.set(6, 4, 8)
        this.scene.add(this.instance)
    }

    setOrbitControls() {
        this.orbitControls = new OrbitControls(this.instance, this.canvas)
        this.orbitControls.enableDamping = true
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        this.orbitControls.update()
    }

}