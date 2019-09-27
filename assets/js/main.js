'use strict'

import Table from './table.js'
import Ball from './ball.js'

const FOV = 70
const ASPECT = window.innerWidth / window.innerHeight
const NEAR = 1
const FAR = 1000

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

function animate() {
    ball.animate()

    render()

    requestAnimationFrame(animate)
}

function render() {
    renderer.render(scene, camera)
}

function createScene() {
    scene = new THREE.Scene()
    scene.add(new THREE.AxesHelper(10))

    window.table = new Table(0, 0, 0)
    window.ball = new Ball(0, 0, 15)

    table.addToScene(scene)
    ball.addToScene(scene)
}

function createCamera() {
    camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR)
    camera.position.x = 50
    camera.position.y = 50
    camera.position.z = 50
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