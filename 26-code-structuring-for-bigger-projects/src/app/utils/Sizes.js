export default class Sizes {

    constructor() {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // Update sizes on window resize
        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
        })
    }

}