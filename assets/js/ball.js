'use strict'

export default class Table {

    constructor(x, y, z) {
        this.obj = new THREE.Object3D()
        this.obj.userData = {
            jumping: false,
            step: 0
        }

        this.material = new THREE.MeshBasicMaterial({
            color: 0xFF1122,
            wireframe: true
        })
        this.geometry = new THREE.SphereGeometry(4, 10, 10)
        this.mesh = new THREE.Mesh(this.geometry, this.material)

        this.obj.add(this.mesh)
        this.obj.position.set(x, y, z)

        this.registerEvents()
    }

    addToScene(scene) {
        scene.add(this.obj)
    }

    removeFromScene(scene) {
        scene.remove(this.obj)
    }

    animate() {
        if(this.obj.userData.jumping) {
            this.obj.userData.step += 0.04
            let step = this.obj.userData.step
            this.obj.position.y = Math.abs(30 * Math.sin(step))
            this.obj.position.z = 15 * Math.cos(step)
        }
    }

    registerEvents() {
        window.addEventListener('keydown', (e) => {
            if(e.keyCode == 83 || e.keyCode == 115)
                this.obj.userData.jumping = !this.obj.userData.jumping
        })
    }
}
