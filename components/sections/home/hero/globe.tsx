import * as THREE from "three"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import useWebGL from "effects/globe/hooks/use-webgl"
import OrbitControls from "effects/globe/js/OrbitControls"
import coordinates from "effects/globe/points.json"

export default function Globe() {
  const ref = useRef(null)
  const globeRadius = 200
  const globeWidth = 4098 / 2
  const globeHeight = 1968 / 2
  const mergedGeometry = new THREE.Geometry()
  const pointGeometry = new THREE.SphereGeometry(0.8, 8, 8)
  const pointMaterial = new THREE.MeshBasicMaterial({
    color: "#fff"
  })

  const coloredMergedGeometry = new THREE.Geometry()
  const coloredPointGeometry = new THREE.SphereGeometry(1, 8, 8)
  const coloredPointMaterial = new THREE.MeshBasicMaterial({
    opacity: 0.7,
    color: "#00A55F"
  })

  const sphereGeometry = new THREE.SphereGeometry(200, 128, 128)
  const sphereMaterial = new THREE.MeshBasicMaterial({
    color: "#ccc"
  })

  useEffect(() => {
    const { canvas, scene, camera, renderer } = useWebGL() // eslint-disable-line

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
      const { x, y, z } = convertFlatCoordsToSphereCoords(point.x, point.y)
      if (x && y && z) {
        if (gsap.utils.random(0, 100, 2) === 40) {
          coloredPointGeometry.translate(x, y, z)
          coloredMergedGeometry.merge(coloredPointGeometry)
          coloredPointGeometry.translate(-x, -y, -z)
        } else {
          pointGeometry.translate(x, y, z)
          mergedGeometry.merge(pointGeometry)
          pointGeometry.translate(-x, -y, -z)
        }
      }
    }

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    scene.add(sphere)

    const coloredPoints = new THREE.Mesh(
      coloredMergedGeometry,
      coloredPointMaterial
    )
    scene.add(coloredPoints)

    const globeShape = new THREE.Mesh(mergedGeometry, pointMaterial)
    scene.add(globeShape)

    camera.orbitControls = new OrbitControls(camera, canvas)
    camera.orbitControls.enableKeys = false
    camera.orbitControls.enablePan = false
    camera.orbitControls.enableZoom = false
    camera.orbitControls.enableDamping = false
    camera.orbitControls.enableRotate = false
    camera.orbitControls.autoRotate = true

    const animate = () => {
      camera.orbitControls.update()
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    animate()
  }, [
    mergedGeometry,
    pointGeometry,
    pointMaterial,
    globeHeight,
    globeWidth,
    sphereGeometry,
    sphereMaterial,
    coloredPointGeometry,
    coloredPointMaterial,
    coloredMergedGeometry
  ])

  return (
    <div
      ref={ref}
      style={{
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0
      }}
    />
  )
}
