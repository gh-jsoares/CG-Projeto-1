'use strict'

export default class Target {

    constructor(x, y, z) {
        this.obj = new THREE.Object3D()
        this.material = new THREE.MeshBasicMaterial({
            color: 0xFF3F3F,
            wireframe: false
        })

        let cylinder = this.addCylinder(this.obj)
        this.addToroid(cylinder)

        this.obj.position.set(x, y, z)
    }
    
    addToScene(scene) {
        scene.add(this.obj)
    }

    removeFromScene(scene) {
        scene.remove(this.obj)
    }

    addCylinder(root) {
        let geometry = new THREE.CylinderGeometry(2, 2, 20, 32)
        let mesh = new THREE.Mesh(geometry, this.material)

        mesh.position.y = 10

        root.add(mesh)
        
        return mesh
    }

    addToroid(root) {
        let geometry = new THREE.TorusGeometry(5, 1.5, 8, 15)
        let mesh = new THREE.Mesh(geometry, this.material)

        mesh.position.y = 15

        root.add(mesh)
    }

}