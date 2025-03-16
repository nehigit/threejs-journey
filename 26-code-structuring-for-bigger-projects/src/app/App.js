import Sizes from "./utils/Sizes"

export default class App {

    constructor(canvas) {
        this.canvas = canvas
        this.sizes = new Sizes()

        // Global access from console
        window.experience = this

        window.addEventListener('resize', () => {
            console.log(this.sizes)
        })
    }

    
}