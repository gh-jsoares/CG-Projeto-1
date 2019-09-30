'use strict'

export default class SceneManager {
    constructor() {
        this.objects = []

        this.scene = new THREE.Scene()
        this.scene.add(new THREE.AxesHelper(10))

        this.registerEvents()
    }

    registerEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 52)
            this.scene.traverse((node) => {
                if(node instanceof THREE.Mesh) {
                    node.material.wireframe = !node.material.wireframe
                }
            })
        })
    }

    addObject(name, object) {
        this.objects.push({
            name: name,
            object: object
        })
        object.addToScene(this.scene)
    }
    
    removeObject(name) {
        let object = this.getObject(name)
        object.object.removeFromScene(this.scene)
        this.objects = this.objects.filter((obj) => obj.name != name)
    }

    getObject(name) {
        return this.objects.find((obj) => obj.name == name).object
    }

    getScene() {
        return this.scene
    }
}