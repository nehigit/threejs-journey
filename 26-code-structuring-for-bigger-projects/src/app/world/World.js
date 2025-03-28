import Core from "../Core.js"
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'


export default class World {
    constructor() {
        this.core = Core.getInstance()
        this.scene = this.core.scene
        this.resources = this.core.resources

        // When all resources are loaded:
        this.resources.addEventListener('resourcesLoaded', () => {
            this.floor = new Floor()
            this.fox = new Fox()
            // Environment is instanciated last because the Environment stuff
            // should be also applied on the floor
            this.environment = new Environment()
        })

    }

    update() {
        if(this.fox) {
            this.fox.update()
        }
    }
}