'use strict'

import Robot from './robot.js'
import Camera from './camera.js'

const FOV = 50
const ASPECT = window.innerWidth / window.innerHeight
const NEAR = -100
const FAR = 100

let camera, scene, renderer

function init(shouldAnimate) {
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    createScene()
    createCamera()

    registerEvents()

    if(shouldAnimate)
        animate()
}

let multiplier = 1
let x = 0

function animate() {
    let val = multiplier * 0.01
    x += val
    if(x > 1)
        multiplier = -1
    else if(x < -1)
        multiplier = 1

    robot.rotateArm(val, val)

    render()
    requestAnimationFrame(animate)
}

function render() {
    renderer.render(scene, camera)
}

function createScene() {
    scene = new THREE.Scene()
    scene.add(new THREE.AxesHelper(10))

    window.robot = new Robot(0, 0, 0)

    robot.addToScene(scene)
}

function createCamera() {
    //camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR)
    camera = new THREE.OrthographicCamera(-ASPECT * FOV / 2, ASPECT * FOV / 2, FOV / 2, -FOV / 2, NEAR, FAR)
    camera.position.y = 0
    camera.lookAt(scene.position)
}

function registerEvents() {
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKeyDown)
}

function onResize() {
    let height = window.innerHeight
    let width = window.innerWidth
    renderer.setSize(width, height)

    if(height > 0 && width > 0) {
        let size = new THREE.Vector2()
        renderer.getSize(size)
        camera.aspect = size.width / size.height
        camera.updateProjectionMatrix()
    }
}

function onKeyDown(e) {
    if(e.keyCode == 65 || e.keyCode == 97) {
        scene.traverse((node) => {
            if(node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe
            }
        })
    }
}

window.init = init(true)