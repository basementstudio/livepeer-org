import { useRef, useEffect, useState } from "react"

const VideoSwapper = ({ sources, onChange }) => {
    const videosRef = useRef([])
    const [currentVideo, setCurrentVideo] = useState(0)

    // i === currentVideo || i === currentVideo + 1 % videosRef.current.length ? source : ''

    const videos = sources.map((source, i) =>
        <video
            onEnded={() => { onVideoEnded(i) }}
            key={i.toString()}
            ref={el => videosRef.current[i] = el}
            style={{ position: 'absolute', top: 0, left: 0, opacity: i === currentVideo ? 1 : 0, transition: 'opacity 1s ease-out' }}
            // style={{ position: 'absolute', top: 0, left: 0, display: i === currentVideo ? 'block' : 'none' }}
            src={source}
            muted
            playsInline
        />
    );

    useEffect(() => {
        videosRef.current[currentVideo].play()
        onChange()
    }, [currentVideo])

    const onVideoEnded = (i) => {
        let index = currentVideo + 1
        index %= videosRef.current.length
        setCurrentVideo(index)
    }

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