import Core from "./Core"

export default class Camera {
    constructor() {
        this.core = Core.getInstance()
        console.log(this.core)
    }
}