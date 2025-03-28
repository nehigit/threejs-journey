import * as THREE from 'three'

import Core from '../Core.js'


export default class Floor {
    constructor() {
        this.core = Core.getInstance()
        this.scene = this.core.scene
        this.resources = this.core.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
        this.addMeshToScene()
    }

    setGeometry() {
        this.geometry = new THREE.CircleGeometry(5, 64)
    }

    setTextures() {
        this.textures = {}

        this.textures.color = this.resources.items.grassColorTexture
        this.textures.color.colorSpace = THREE.SRGBColorSpace
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping
        
        this.textures.normal = this.resources.items.grassNormalTexture
        this.textures.normal.repeat.set(1.5, 1.5)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            normalMap: this.textures.normal,
        })
    }

    setMesh() {
        this.mesh = new THREE.Mesh(
            this.geometry,
            this.material
        )

        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
    }

    addMeshToScene() {
        this.scene.add(this.mesh)
    }
}