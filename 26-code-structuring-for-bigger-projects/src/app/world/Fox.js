import * as THREE from 'three'

import Core from "../Core.js"

export default class Fox {
    constructor() {
        this.core = Core.getInstance()
        this.scene = this.core.scene
        this.resources = this.core.resources
        this.time = this.core.time
        this.debug = this.core.debug

        if(this.debug.active) {
            this.debugFolder = this.debug.gui.addFolder('fox')
        }

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
        
        this.animation.actions = {}
        this.animation.actions.idle = this.animation.mixer.clipAction(
            this.resource.animations[0]
        )
        this.animation.actions.walking = this.animation.mixer.clipAction(
            this.resource.animations[1]
        )
        this.animation.actions.running = this.animation.mixer.clipAction(
            this.resource.animations[2]
        )

        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        this.animation.play = name => {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)
        
            this.animation.actions.current = newAction
        }

        // Debug
        if(this.debug.active) {
            const debugObject = {
                playIdle: () => this.animation.play('idle'),
                playWalking: () => this.animation.play('walking'),
                playRunning: () => this.animation.play('running')
            }

            this.debugFolder.add(debugObject, 'playIdle')
            this.debugFolder.add(debugObject, 'playWalking')
            this.debugFolder.add(debugObject, 'playRunning')
        }
    }

    addModelToScene() {
        this.scene.add(this.model)
    }

    update() {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}