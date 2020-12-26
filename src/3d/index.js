  
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gui from './gui'
import Stats from 'stats.js'

export const getScene = () => {
	const stats = new Stats()
	stats.showPanel(1)
	document.body.appendChild(stats.dom)

	const canvas = document.querySelector('canvas')

	const renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.antialias = false
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = THREE.PCFSoftShadowMap

	const scene = new THREE.Scene()
	scene.fog = new THREE.Fog(0x000000, 0, 150)
	renderer.setClearColor(scene.fog.color, 1)

	scene.add(new THREE.GridHelper(800, 160, '#030', '#020').translateY(-1))

	scene.add(new THREE.AmbientLight('#fff'))

	const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
	camera.position.x = camera.position.z = camera.position.y = 50
	scene.add((scene.camera = camera))

	const controls = new OrbitControls(camera, canvas)
	controls.autoRotate = true
	controls.maxPolarAngle = Math.PI / 2 - 0.01
	controls.enableDamping = false
	controls.maxDistance = 150

	scene.helper = new THREE.AxesHelper(1000)
	scene.helper.visible = true
	scene.add(scene.helper)

	// GUI
	const cameraGui = gui.addFolder('camera')
	cameraGui.add(controls, 'autoRotate')
	cameraGui.add(controls, 'autoRotateSpeed', -5, 5)
	cameraGui.add(controls, 'enableDamping')

	if (window.devicePixelRatio !== 1) {
		const dpiConfig = {
			HiDPI: true
		}

		cameraGui.add(dpiConfig, 'HiDPI').onChange(v => {
			renderer.setPixelRatio(v ? window.devicePixelRatio : 1)
		})
	}

	//  render loop

	const animate = t => {
		stats.begin()
		controls.update()
		scene.tick && scene.tick(t)
		renderer.render(scene, camera)
		stats.end()
		requestAnimationFrame(animate)
	}

	animate()

	// window resize

	const onResize = () => {
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
		renderer.setSize(window.innerWidth, window.innerHeight)
	}

	window.addEventListener('resize', onResize)
	onResize()

	return scene
}