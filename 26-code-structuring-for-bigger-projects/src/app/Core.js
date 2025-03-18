import * as THREE from 'three'

import Sizes from "./utils/Sizes"
import Time from "./utils/Time"
import Camera from './Camera'

export default class Core {
    static instance = null;

    constructor() {
        if (Core.instance) {
            throw new Error("Core is a singleton. Use Core.getInstance() instead.");
        }
        Core.instance = this;

        // Initialize the instance
        this.canvas = document.querySelector('canvas.webgl');
        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.camera = new Camera();

        // Global access from console
        window.core = this;

        // Listen to custom 'resize' event from Sizes
        this.sizes.addEventListener('myCustomResizeEvent', () => {
            this.handleResize();
        });

        // Time tick event
        this.time.addEventListener('tick', () => {
            this.handleTickUpdate();
        });
    }
    
    handleResize() {
        console.log("A resize occurred. Sizes have been updated.");
        console.log(this.sizes);
    }
    
    handleTickUpdate() {
        console.log("xd");
    }

    static getInstance() {
        if (!Core.instance) {
            Core.instance = new Core();
        }
        return Core.instance;
    }
}