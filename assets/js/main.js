'use strict'

import Robot from './robot.js'
import CameraManager from './camera.js'
import Target from './target.js'
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
        animate()
}

let prevTimestamp = 0
function animate(timestamp) {
    if(timestamp) {
        let deltaTime = (timestamp - prevTimestamp) / 10
        sceneManager.animate(deltaTime)
        prevTimestamp = timestamp
    }
    
    render()
    requestAnimationFrame(animate)
}

function render() {
    renderer.render(sceneManager.getScene(), cameraManager.getCamera())
}

window.init = init(true)