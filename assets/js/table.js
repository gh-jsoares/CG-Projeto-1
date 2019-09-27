'use strict'

export default class Table {

    constructor(x, y, z) {
        this.obj = new THREE.Object3D()
        this.material = new THREE.MeshBasicMaterial({
            color: 0x11CC22,
            wireframe: true
        })

        this.addTableTop(x, y, z)
        this.addTableLeg(x - 25, y - 1, z - 8)
        this.addTableLeg(x - 25, y - 1, z + 8)
        this.addTableLeg(x + 25, y - 1, z + 8)
        this.addTableLeg(x + 25, y - 1, z - 8)

        this.obj.position.set(x, y, z)
    }

    addToScene(scene) {
        scene.add(this.obj)
    }

    removeFromScene(scene) {
        scene.remove(this.obj)
    }

    addTableTop(x, y, z) {
        let geometry = new THREE.CubeGeometry(60, 2, 20)
        let mesh = new THREE.Mesh(geometry, this.material)
        mesh.position.set(x, y, z)

        this.obj.add(mesh)
    }

    addTableLeg(x, y, z) {
        let geometry = new THREE.CubeGeometry(2, 6, 2)
        let mesh = new THREE.Mesh(geometry, this.material)
        mesh.position.set(x, y - 3, z)

        this.obj.add(mesh)
    }
}
