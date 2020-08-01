/** @jsx jsx */
import { jsx } from "theme-ui"
import { useRef, useState, useCallback, useEffect } from "react"

const VideoSwapper = ({ sources, onChange }) => {
  const videosRef = useRef([])
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)

  const videos = sources.map((source, i) => (
    <video
      onEnded={() => {
        onVideoEnded(i)
      }}
      key={i.toString()}
      ref={(el) => (videosRef.current[i] = el)}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        opacity: i === currentVideo ? 1 : 0,
        transition: "opacity 1s ease-out"
      }}
      src={source}
      muted
      playsInline
    />
  ))

  useEffect(() => {
    if (isInitialized) return
    setIsInitialized(true)
    videosRef.current[currentVideo].play()
  }, [currentVideo, isInitialized])

  const onVideoEnded = useCallback(
    (i) => {
      if (!videosRef.current) return
      const newCurrentVideo = i + 1 < videosRef.current.length ? i + 1 : 0
      videosRef.current[newCurrentVideo].play()
      setCurrentVideo(newCurrentVideo)
      onChange()
    },
    [videosRef, onChange]
  )

  return (
    <div
      sx={{
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
        width: ["60vw", "25vw"],
        height: ["33vw", "14vw"]
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
      <div>{videos}</div>
    </div>
  )
}

export default VideoSwapper
