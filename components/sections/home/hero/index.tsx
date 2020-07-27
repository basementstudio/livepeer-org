/** @jsx jsx */
import { jsx, Container, Heading, Text, Box, Image, Link as A } from "theme-ui"
import Divider from "components/primitives/divider"

const HomeHero = () => {
  const video = [
    "/hero-videos/1-final.mp4",
    "/hero-videos/2-final.mp4",
    "/hero-videos/3-final.mp4",
    "/hero-videos/4-final.mp4",
    "/hero-videos/5-final.mp4"
  ]

  return (
    <Box sx={{ bg: "dark", position: "relative" }}>
      <Container
        variant="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          overflow: "visible",
          pt: "200px",
          pb: 0,
          bg: "muted",
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
        <Box sx={{ position: "relative" }}>
          <Image src="/images/hero/world.png" alt="" />
          <Image
            sx={{ position: "absolute", left: "0", top: "0", zIndex: 100 }}
            src="/images/hero/overlay.png"
            alt=""
          />
          <video
            style={{
              position: "absolute",
              left: "50%",
              bottom: "0",
              transform: "translateX(-50%)",
              borderRadius: "8px",
              zIndex: 100,
              width: "30vw"
            }}
            playsInline
            muted
            autoPlay
            loop
            controls
            controlsList="nodownload nofullscreen noremoteplayback"
            preload="none"
            width="100%"
          >
            <source
              id="mp4"
              src={video[Math.floor(Math.random() * 10 + 1) % video.length]}
              type="video/mp4"
            />
          </video>
        </Box>
      </Container>
    </Box>
  )
}

export default HomeHero
