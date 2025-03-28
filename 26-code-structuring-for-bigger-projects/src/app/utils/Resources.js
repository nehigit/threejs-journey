import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/Addons.js"

export default class Resources extends THREE.EventDispatcher {
    constructor(sources) {
        super()

        // Options
        this.sources = sources

        // Setup
        this.items = {}
        this.toLoad = this.sources.length // Number of sources to load
        this.loaded = 0 // Number of sources loaded

        this.setLoaders()
        this.startLoading()

    }

    setLoaders() {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    }

    startLoading() {
        // Load each source
        for(const source of this.sources) {
            switch(source.type) {
                case 'gltfModel':
                    this.loaders.gltfLoader.load(
                        source.path,
                        file => {
                            this.updateLoadedSources(source, file)
                        }
                    )
                    break
                case 'texture':
                    this.loaders.textureLoader.load(
                        source.path,
                        file => {
                            this.updateLoadedSources(source, file)
                        }
                    )
                    break
                case 'cubeTexture':
                    this.loaders.cubeTextureLoader.load(
                        source.path,
                        file => {
                            this.updateLoadedSources(source, file)
                        }
                    )
                    break
            }
        }
    }

    updateLoadedSources(source, file) {
        this.items[source.name] = file

        this.loaded++

        if(this.loaded === this.toLoad) {
            this.dispatchEvent({type: 'resourcesLoaded'})
        }

    }
}