'use strict'

const ASPECT = window.innerWidth / window.innerHeight
const NEAR = -100
const FAR = 100
const FRUSTUM_SIZE = 70

export default class CameraManager {
    constructor(scene, renderer) {
        this.camera = new THREE.OrthographicCamera(-FRUSTUM_SIZE * ASPECT / 2, FRUSTUM_SIZE * ASPECT / 2, FRUSTUM_SIZE / 2, -FRUSTUM_SIZE / 2, NEAR, FAR)
        this.switchView(1)

        this.registerEvents(scene, renderer)
    }

    getCamera() {
        return this.camera
    }

    registerEvents(scene, renderer) {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode >= 49 && e.keyCode <= 51) {
                let view = e.keyCode - 49 + 1
                this.switchView(view)
            }
        })

        window.addEventListener('resize', () => {
            let aspect = window.innerWidth / window.innerHeight
        
            this.camera.left = FRUSTUM_SIZE * aspect / -2
            this.camera.right = FRUSTUM_SIZE * aspect / 2
            this.camera.top = FRUSTUM_SIZE / 2
            this.camera.bottom = -FRUSTUM_SIZE / 2

            this.camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        })
    }

    switchView(view) {
        this.camera.position.x = view == 2 ? 50 : 0
        this.camera.position.y = view == 3 ? 50 : 0

        this.camera.lookAt(0, 0, 0)
    }
}
