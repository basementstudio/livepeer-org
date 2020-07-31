import { useRef, useState, useCallback } from "react"

const VideoSwapper = ({ sources, onChange }) => {
  const videosRef = useRef([])
  const [currentVideo, setCurrentVideo] = useState(0)

  const videos = sources.map((source, i) => (
    <video
      onEnded={() => {
        onVideoEnded(i)
      }}
      key={i.toString()}
      ref={(el) => (videosRef.current[i] = el)}
      style={{
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

  const onVideoEnded = useCallback(
    (i) => {
      if (!videosRef.current) return
      const newCurrentVideo = i + 1 < videosRef.current ? i + 1 : 0
      videosRef.current[newCurrentVideo].play()
      setCurrentVideo(newCurrentVideo)
      onChange()
    },
    [videosRef, onChange]
  )

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
        width: "25vw",
        height: "14vw"
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "20px",
          top: "10px",
          zIndex: "101"
        }}
      >
        <p
          style={{
            position: "relative",
            paddingLeft: "10px",
            fontSize: "12px",
            textShadow: "0 0 2px #fff"
          }}
        >
          <span
            style={{
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
