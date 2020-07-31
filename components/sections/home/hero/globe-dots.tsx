/** @jsx jsx */
import { jsx } from "theme-ui"
import styles from "./globe-dots.module.css"
import { useEffect, useRef } from "react"
import gsap, { Linear } from "gsap"

const globeDots = ({ top, left, image, pulsating }) => {
  const pulseRef = useRef()

  useEffect(() => {
    //@ts-ignore
    const targets = pulseRef?.current?.children

    if (targets) {
      gsap.set(targets, { scale: 0 })
      const delay = 2 / targets.length

      for (let i = 0; i < targets.length; i++) {
        const tl = gsap.timeline({ delay: delay * i, repeat: -1 })
        tl.to(targets[i], 2, { scale: 3, autoAlpha: 0, ease: Linear.easeOut })
      }
    }
  }, [pulsating])

  return (
    <span
      className="highlight-dot"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,
        width: "2.778vw",
        height: "2.778vw",
        borderRadius: "50%",
        position: "absolute",
        userSelect: "none",
        top,
        left
      }}
    >
      {image && (
        <img sx={{ width: "100%", objectFit: "cover" }} src={image} alt="" />
      )}
      {pulsating && (
        <span
          ref={pulseRef}
          className="pulsating-items"
          sx={{ width: "5vw", height: "5vw" }}
        >
          <span className={styles.pulse} />
          <span className={styles.pulse} />
          <span className={styles.pulse} />
          <span className={styles.pulse} />
          <span className={styles.pulse} />
        </span>
      )}
    </span>
  )
}

export default globeDots
