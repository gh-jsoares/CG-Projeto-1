'use strict'

export default class Robot {

    constructor(x, y, z) {
        this.obj = new THREE.Object3D()
        this.material = new THREE.MeshBasicMaterial({
            color: 0xE5F7F,
            wireframe: false
        })

        let base = this.createBase(this.obj, x, y + 1, z)
        this.addWheels(base)
        this.arm = this.addArm(base)
    }
    
    addToScene(scene) {
        scene.add(this.obj)
    }

    removeFromScene(scene) {
        scene.remove(this.obj)
    }

    rotateArm(x, z) {
        this.arm.rotation.x += x
        this.arm.rotation.z += z
    }

    move(x, y, z) {
        this.obj.position.x += x
        this.obj.position.y += y
        this.obj.position.z += z
    }

    createBase(root, x, y, z) {
        let geometry = new THREE.BoxGeometry(10, 2, 10)
        let mesh = new THREE.Mesh(geometry, this.material)

        mesh.position.set(x, y, z)

        root.add(mesh)

        return mesh
    }

    createArm(root, y) {
        let geometry = new THREE.BoxGeometry(1, 10, 2)
        let mesh = new THREE.Mesh(geometry, this.material)

        mesh.position.y = y

        root.add(mesh)

        return mesh
    }

    createJoint(root, radius, y) {
        let geometry = new THREE.SphereGeometry(radius, 8, 8)
        let mesh = new THREE.Mesh(geometry, this.material)
        
        mesh.position.y = y

        root.add(mesh)
        return mesh
    }

    addWheels(base) {
        let wheels = new THREE.Object3D()
        
        this.addWheel(wheels, -5, -5)
        this.addWheel(wheels, -5, 5)
        this.addWheel(wheels, 5, -5)
        this.addWheel(wheels, 5, 5)

        wheels.position.y = -1

        base.add(wheels)
    }

    addArm(root) {
        let arm = new THREE.Object3D() // Arm Group
        let joint = this.createJoint(arm, 2, 0) // Parent of arm

        let arm_mesh = this.createArm(joint, 7) // Parent of Forearm group
        this.addForearm(arm_mesh)
        
        arm.position.y = 1

        arm.add(joint)
        root.add(arm)
        
        return arm
    }

    addForearm(root, y) {
        let forearm = new THREE.Object3D() // Forearm Group
        let joint = this.createJoint(forearm, 1, 0) // Parent of arm
        let arm_mesh = this.createArm(joint, 6) // Parent of Wrist group

        this.addWrist(arm_mesh)

        forearm.rotateZ(-Math.PI / 2)
        forearm.position.y = 6

        forearm.add(joint)
        root.add(forearm)
    }

    addWrist(root) {
        let wrist = new THREE.Object3D() // Wrist Group
        let joint = this.createJoint(wrist, 1, 0) // Parent of hand
        this.addHand(joint)

        wrist.position.y = 6

        wrist.add(joint)
        root.add(wrist)
    }

    addFinger(root, x) {
        let geometry = new THREE.BoxGeometry(0.5, 3, 2)
        let mesh = new THREE.Mesh(geometry, this.material)

        mesh.position.x = x
        
        root.add(mesh)
    }

    addFingers(root) {
        let fingers = new THREE.Object3D()

        this.addFinger(fingers, -2)
        this.addFinger(fingers, 2)

        fingers.position.y = 1.5

        root.add(fingers)
    }

    addHand(root) {
        let geometry = new THREE.BoxGeometry(5, 1.5, 2)
        let mesh = new THREE.Mesh(geometry, this.material)
        mesh.position.y = 1

        this.addFingers(mesh)

        root.add(mesh)
    }

    addWheel(root, x, z) {
        let geometry = new THREE.SphereGeometry(1, 8, 8)
        let mesh = new THREE.Mesh(geometry, this.material)

        mesh.position.x = x
        mesh.position.z = z

        root.add(mesh)
    }
}