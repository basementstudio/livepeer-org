import * as THREE from "three"
import { useEffect, useRef } from "react"
import useWebGL from "effects/globe/hooks/use-webgl"
import OrbitControls from "effects/globe/js/OrbitControls"
import coordinates from "effects/globe/points.json"

export default function Globe() {
  const ref = useRef(null)
  const globeRadius = 200
  const globeWidth = 4098 / 2
  const globeHeight = 1968 / 2
  const mergedGeometry = new THREE.Geometry()
  const pointGeometry = new THREE.SphereGeometry(1, 1, 1)
  const pointMaterial = new THREE.MeshBasicMaterial({
    color: "#fff"
  })

  const sphereGeometry = new THREE.SphereGeometry(200, 64, 64)
  const sphereMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.3,
    color: "rgb(209,209,209)"
  })

  useEffect(() => {
    const { canvas, scene, camera, renderer } = useWebGL() // eslint-disable-line
    const { width, height } = ref.current.getBoundingClientRect()

    const convertFlatCoordsToSphereCoords = (x, y) => {
      let latitude = ((x - globeWidth) / globeWidth) * -180
      let longitude = ((y - globeHeight) / globeHeight) * -90
      latitude = (latitude * Math.PI) / 180
      longitude = (longitude * Math.PI) / 180
      const radius = Math.cos(longitude) * globeRadius

      return {
        x: Math.cos(latitude) * radius,
        y: Math.sin(longitude) * globeRadius,
        z: Math.sin(latitude) * radius
      }
    }

    ref.current.appendChild(canvas)

    for (let point of coordinates.points) {
      const { x, y, z } = convertFlatCoordsToSphereCoords(
        point.x,
        point.y,
        width,
        height
      )

      if (x && y && z) {
        pointGeometry.translate(x, y, z)
        mergedGeometry.merge(pointGeometry)
        pointGeometry.translate(-x, -y, -z)
      }
    }
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    scene.add(sphere)
    const globeShape = new THREE.Mesh(mergedGeometry, pointMaterial)
    scene.add(globeShape)

    camera.orbitControls = new OrbitControls(camera, canvas)
    camera.orbitControls.enableKeys = false
    camera.orbitControls.enablePan = false
    camera.orbitControls.enableZoom = false
    camera.orbitControls.enableDamping = false
    camera.orbitControls.enableRotate = false
    camera.orbitControls.autoRotate = true

    console.log(camera.orbitControls)

    const animate = () => {
      camera.orbitControls.update()
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    animate()
  }, [mergedGeometry, pointGeometry, pointMaterial, globeHeight, globeWidth])

  return (
    <div
      ref={ref}
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0
      }}
    />
  )
}
