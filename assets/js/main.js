'use strict'

import Robot from './robot.js'
import CameraManager from './camera.js'
import Target from './target.js'
import SceneManager from './SceneManager.js'

const ASPECT = window.innerWidth / window.innerHeight
const NEAR = -100
const FAR = 100
const FRUSTUM_SIZE = 70

let cameraManager, renderer

function init(shouldAnimate) {
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    window.sceneManager = new SceneManager()
    cameraManager = new CameraManager(sceneManager.getScene(), renderer)

    sceneManager.addObject('target', new Target(25, 0, 0))
    sceneManager.addObject('robot', new Robot(0, 0, 0))

    if(shouldAnimate)
        animate()
}

function animate() {
    sceneManager.getObject('robot').animate()

    render()
    requestAnimationFrame(animate)
}

function render() {
    renderer.render(sceneManager.getScene(), cameraManager.getCamera())
}

window.init = init(true)