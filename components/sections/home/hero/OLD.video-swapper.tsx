/** @jsx jsx */
import { jsx } from "theme-ui"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import styles from "./video-swapper.module.css"

const VideoSwapper = ({ sources }) => {
  const [currentSrc, setCurrentSrc] = useState(0)
  const [nextSrc, setNextSrc] = useState(1)
  const liveDotRef = useRef()
  const video1Ref = useRef()
  const video2Ref = useRef()

  useEffect(() => {
    const timeline = gsap.timeline()
    const video1 = video1Ref.current
    const video2 = video2Ref.current

    timeline.set([video1, video2], {
      position: "absolute",
      top: 0,
      left: 0
    })

    timeline.to(video1, {
      display: "block",
      opacity: 1
    })

    // @ts-ignore
    video1.play()

    //@ts-ignore
    video1.addEventListener("ended", () => {
      timeline
        .to(video2, {
          display: "block",
          opacity: 1
        })
        .to(video1, {
          display: "none",
          opacity: 0
        })

      //@ts-ignore
      video2.play()

      if (currentSrc + 1 === sources.length) {
        setCurrentSrc(0)
      } else {
        setCurrentSrc(currentSrc + 1)
      }
    })

    //@ts-ignore
    video2.addEventListener("ended", () => {
      timeline
        .to(video1, {
          display: "block",
          opacity: 1
        })
        .to(video2, {
          display: "none",
          opacity: 0
        })

      //@ts-ignore
      video1.play()

      if (nextSrc === sources.length) {
        setNextSrc(0)
      } else {
        setNextSrc(nextSrc + 1)
      }
    })
  }, [])

  return (
    <div
      sx={{
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
        width: "25vw",
        height: "14vw"
      }}
    >
      <span
        sx={{
          position: "absolute",
          left: "20px",
          top: "10px",
          zIndex: "101"
        }}
      >
        <p
          sx={{
            position: "relative",
            paddingLeft: "10px",
            fontSize: "12px",
            textShadow: "0 0 2px #fff"
          }}
        >
          <span
            ref={liveDotRef}
            sx={{
              width: "5px",
              height: "5px",
              backgroundColor: "red",
              borderRadius: "50%",
              position: "absolute",
              left: "0",
              top: "50%",
              transform: "translateY(-50%)"
            }}
          />
          Live
        </p>
      </span>
      <video
        className={styles.video}
        ref={video1Ref}
        src={sources[currentSrc]}
        muted
        playsInline
      />
      <video
        className={styles.video}
        ref={video2Ref}
        src={sources[nextSrc]}
        muted
        playsInline
      />
    </div>
  )
}

export default VideoSwapper
