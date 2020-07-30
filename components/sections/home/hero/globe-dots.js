/** @jsx jsx */
import { jsx, Box } from "theme-ui"
import { useRef, useEffect } from "react"
import gsap from "gsap"

const globeDots = ({ top, left }) => {
  // const liveDotRef = useRef(null)

  // useEffect(() => {
  //   liveDotRef.current = gsap.timeline()
  // }, [])

  return (
    <span
      // ref={liveDotRef}
      sx={{
        width: "40px",
        height: "40px",
        backgroundColor: "#00A55F",
        borderRadius: "50%",
        position: "absolute",
        top,
        left
      }}
    />
  )
}

export default globeDots
