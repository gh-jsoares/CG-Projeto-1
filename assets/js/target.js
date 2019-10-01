'use strict'

export default class Target {

    constructor(x, y, z) {
        this.obj = new THREE.Object3D()
        this.materials = {
            body: new THREE.MeshBasicMaterial({
                color: 0xCF9923,
                wireframe: false
            }),
            toroid: new THREE.MeshBasicMaterial({
                color: 0xCFC023,
                wireframe: false
            }),
        }

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
        let geometry = new THREE.CylinderGeometry(2, 2, 14, 32)
        let mesh = new THREE.Mesh(geometry, this.materials.body)

        mesh.position.y = 7

        root.add(mesh)
        
        return mesh
    }

    addToroid(root) {
        let geometry = new THREE.TorusGeometry(2, 0.7, 8, 15)
        let mesh = new THREE.Mesh(geometry, this.materials.toroid)

        mesh.position.y = 9.7
        mesh.rotation.y = Math.PI/2

        root.add(mesh)
    }

}