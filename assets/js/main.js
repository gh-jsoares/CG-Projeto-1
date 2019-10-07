'use strict'

import Robot from './Robot.js'
import CameraManager from './CameraManager.js'
import Target from './Target.js'
import SceneManager from './SceneManager.js'

let cameraManager, renderer, sceneManager

function init(shouldAnimate) {
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    sceneManager = new SceneManager()
    cameraManager = new CameraManager(sceneManager.getScene(), renderer)

    sceneManager.addObject('target', new Target(25, 0, 0))
    sceneManager.addObject('robot', new Robot(0, 0, 0))

    if(shouldAnimate)
        animate(0)
}

let prevTimestamp = 0
function animate(timestamp) {
    let deltaTime = (timestamp - prevTimestamp) / 10
    sceneManager.animate(deltaTime)
    prevTimestamp = timestamp
    
    render()
    requestAnimationFrame(animate)
}

function render() {
    renderer.render(sceneManager.getScene(), cameraManager.getCamera())
}

window.init = init(true)