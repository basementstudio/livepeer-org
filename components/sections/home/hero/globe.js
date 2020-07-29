import * as THREE from "three"
import { useEffect, useRef } from "react"
import useWebGL from "effects/globe/hooks/use-webgl"
// import GlobeEffect from "effects/globe/globe-effect"
// import useRAF from "effects/globe/hooks/use-raf"
import coordinates from "effects/globe/points.json"

export default function Mosaic() {
  const ref = useRef(null)
  const globeRadius = 100
  const globeWidth = 4098 / 2
  const globeHeight = 1968 / 2
  const mergedGeometry = new THREE.Geometry()
  // - Material that the dots will be made of.
  const pointGeometry = new THREE.SphereGeometry(0.5, 1, 1)
  const pointMaterial = new THREE.MeshBasicMaterial({
    color: "#000"
  })

  useEffect(() => {
    const { canvas, scene, viewsize, camera } = useWebGL() // eslint-disable-line
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
        viewsize.width,
        viewsize.height
      )

      if (x && y && z) {
        pointGeometry.translate(x, y, z)
        mergedGeometry.merge(pointGeometry)
        pointGeometry.translate(-x, -y, -z)
      }
    }

    const globeShape = new THREE.Mesh(mergedGeometry, pointMaterial)
    scene.add(globeShape)

    console.log(camera)
    // camera.controls.update()
    // RAF(animate)
    // renderer.render(scene, camera)
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
        zIndex: 0,
        backgroundColor: "pink"
      }}
    />
  )
}
