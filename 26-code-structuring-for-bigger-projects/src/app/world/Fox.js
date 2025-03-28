import * as THREE from 'three'

import Core from "../Core.js"

export default class Fox {
    constructor() {
        this.core = Core.getInstance()
        this.scene = this.core.scene
        this.resources = this.core.resources
        this.time = this.core.time

        this.resource = this.resources.items.foxModel

        this.setModel()
        this.addModelToScene()
        this.setAnimation()
    }

    setModel() {
        this.model = this.resource.scene
        this.model.scale.set(0.02, 0.02, 0.02)
        console.log(this.model)
        this.model.traverse(child => {
            if(child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })
    }

    setAnimation() {
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        this.animation.action = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.action.play()

    }

    addModelToScene() {
        this.scene.add(this.model)
    }

    update() {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}