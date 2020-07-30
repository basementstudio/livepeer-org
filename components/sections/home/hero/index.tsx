/** @jsx jsx */
import { jsx, Container, Heading, Text, Box, Link as A } from "theme-ui"
import { useRef, useEffect } from "react"
import gsap, { Power1, Power0 } from "gsap"
import Globe from "./globe"
import GlobeDot from "./globe-dots"
import Divider from "components/primitives/divider"

const HomeHero = () => {
  const animationTimeline = useRef()
  const dotsRef = useRef()
  const liveDotRef = useRef()
  const videoBoxRef = useRef()

  const videos = [
    "/hero-videos/1-final.mp4",
    "/hero-videos/2-final.mp4",
    "/hero-videos/3-final.mp4",
    "/hero-videos/4-final.mp4",
    "/hero-videos/5-final.mp4",
    "/hero-videos/6-final.mp4"
  ]

  useEffect(() => {
    // @ts-ignore
    animationTimeline.current = gsap.timeline({
      defaults: {
        duration: 0.2,
        ease: Power1.easeOut,
        autoAlpha: 1
      }
    })

    // @ts-ignore
    animationTimeline.current.from(videoBoxRef.current, {
      opacity: 0,
      y: -10,
      ease: Power0.easeOut
    })

    // @ts-ignore
    animationTimeline.current.from(liveDotRef.current, {
      duration: 1,
      opacity: 0,
      scale: 1.5,
      repeat: -1,
      yoyo: true
    })
    // @ts-ignore
    animationTimeline.current.to(
      // @ts-ignore
      dotsRef.current.getElementsByClassName("highlight-dot"),
      {
        duration: 2,
        y: 10,
        repeat: -1,
        yoyo: true,
        ease: "power0.inOut",
        stagger: {
          each: 0.1,
          from: "center",
          grid: "auto"
        }
      }
    )
  }, [animationTimeline])

  return (
    <Box sx={{ position: "relative" }}>
      <Container
        variant="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "105vh",
          overflow: "visible",
          pt: "200px",
          pb: 0,
          maxWidth: "100%"
        }}
      >
        <Box
          sx={{
            maxWidth: "5xl",
            mb: ["32px", "40px"],
            zIndex: "general",
            position: "relative"
          }}
        >
          <Heading sx={{ variant: ["text.heading.2", "text.heading.1"] }}>
            The&nbsp;
            <Text
              as="span"
              sx={{
                pr: ["2px", "4px"], // Fix text being clipped
                background: ({ colors }) =>
                  `linear-gradient(90deg, #00A55F 0%, ${colors.gradient.mid} 100%)`,
                variant: "text.gradientBase"
              }}
            >
              World's
            </Text>{" "}
            <Text
              as="span"
              sx={{
                background: ({ colors }) =>
                  `linear-gradient(90deg, ${colors.gradient.mid} 0%, #4CF1AC 100%)`,
                variant: "text.gradientBase"
              }}
            >
              Open&nbsp;
            </Text>
            <br sx={{ display: ["none", null, "block"] }} />
            Video Infrastructure
          </Heading>
          <Divider isTransparent isVertical size={["12px", "16px", "24px"]} />
          <Heading variant="section.subtitle">
            Livepeer is a decentralized video transcoding network powered by{" "}
            <br /> the Ethereum blockchain
          </Heading>
        </Box>
        <A
          variant="buttons.primary"
          href="/#get-started"
          sx={{
            zIndex: "general",
            position: "relative"
          }}
        >
          Get started
        </A>
        <Box sx={{ position: "relative", width: "100vw", height: "100%" }}>
          <Globe />
          <div ref={dotsRef}>
            <GlobeDot image="/images/hero/avatar-1.png" left="35%" top="15%" />
            <GlobeDot
              image="/images/hero/avatar-eth.png"
              left="26%"
              top="35%"
            />
            <GlobeDot
              image="/images/hero/avatar-livepeer.png"
              left="28%"
              top="68%"
            />
            <GlobeDot image="/images/hero/avatar-2.png" left="32%" top="50%" />

            <GlobeDot image="/images/hero/avatar-3.png" left="67%" top="62%" />
            <GlobeDot image="/images/hero/avatar-4.png" left="60%" top="30%" />
            <GlobeDot
              image="/images/hero/avatar-livepeer.png"
              left="65%"
              top="22%"
            />
            <GlobeDot
              image="/images/hero/avatar-eth.png"
              left="75%"
              top="70%"
            />
          </div>
          <div
            sx={{
              position: "absolute",
              left: "50%",
              bottom: "-10%",
              transform: "translateX(-50%)",
              zIndex: "100"
            }}
            ref={videoBoxRef}
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
              sx={{
                borderRadius: "8px",
                width: "25vw"
              }}
              src={videos[Math.floor(Math.random() * 10 + 1) % videos.length]}
              autoPlay
              muted
              playsInline
              loop
            />
          </div>
        </Box>
      </Container>
    </Box>
  )
}

export default HomeHero
