"use client"
import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ThreeDModel() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        camera.position.z = 5

        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current })
        renderer.setSize(window.innerWidth, window.innerHeight)


        const ambientLight = new THREE.AmbientLight(0x404040, 0.7)
        scene.add(ambientLight)

        const cubeGeometry = new THREE.BoxGeometry(2, 2, 2)
        const cubeMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00})
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cube.position.x = 0
        cube.position.y = 0
        cube.position.z = -2
        scene.add(cube)

        const animate = ()=>{
            cube.rotation.x += 0.01
            cube.rotation.y += 0.01
            
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }
        animate()

     

        // Cleanup
        return () => {
            renderer.dispose()
        }
    }, [])

    return (
        <div>
            <canvas id="canvas" ref={canvasRef} className="w-full h-full bg-red-500"/>
        </div>
    )
}