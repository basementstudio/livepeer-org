import React, { useState, useEffect } from "react"
import { Box } from "theme-ui"
import { Element } from "react-scroll"
import Head from "next/head"
import Link from "next/link"
import LivepeerLogo from "components/svgs/livepeer-logo"

// TODO: refactor primer components to use theme-ui
import Masthead from "components/sections/primer/Masthead"
import Menu from "components/sections/primer/Menu"
import Introduction from "components/sections/primer/Introduction"
import Chapter1 from "components/sections/primer/Chapter1"
import Chapter2 from "components/sections/primer/Chapter2"
import Chapter3 from "components/sections/primer/Chapter3"
import Chapter4 from "components/sections/primer/Chapter4"
import Chapter5 from "components/sections/primer/Chapter5"
import Chapter6 from "components/sections/primer/Chapter6"
import Chapter7 from "components/sections/primer/Chapter7"
import Chapter8 from "components/sections/primer/Chapter8"
import Chapter9 from "components/sections/primer/Chapter9"
import Footer from "components/sections/primer/Footer"

const Primer = () => {
  const [section, setActiveSection] = useState("introduction")
  const onChange = (section) => {
    setActiveSection(section)
  }
  const [data, setData] = useState({
    totalDelegators: 0,
    totalSupply: 0,
    inflationPerRound: 0,
    totalBonded: 0,
    participationRate: 0,
    blockTime: 0
  })

  useEffect(() => {
    async function fetchData() {
      let response = await fetch("https://livepeer-stats.now.sh")
      let { data } = await response.json()
      console.log(data)
      setData({
        totalDelegators: 0,
        totalSupply: 0,
        inflationPerRound: 0,
        totalBonded: 0,
        participationRate: 0,
        blockTime: 0
      })
    }

    fetchData()
  }, [Math.floor(Date.now() / 60000)])
  return (
    <Box className="primer">
      <Head>
        <meta charSet="UTF-8" />
        <title>Livepeer - A 10-Minute Primer</title>
        <meta
          name="description"
          content="Through storytelling, illustration, and data, the Livepeer Primer explains, at a high level, the problem Livepeer solves, and how it works."
        />

        {/* <!-- Search Engine --> */}
        <meta
          name="description"
          content="Through storytelling, illustration, and data, the Livepeer Primer explains, at a high level, the problem Livepeer solves, and how it works."
        />
        <meta
          name="image"
          content="https://livepeer.org/img/primer/share-image.jpg"
        />
        {/* <!-- Schema.org for Google --> */}
        <meta itemProp="name" content="Livepeer - A 10-Minute Primer" />
        <meta
          itemProp="description"
          content="Through storytelling, illustration, and data, the Livepeer Primer explains, at a high level, the problem Livepeer solves, and how it works."
        />
        <meta
          itemProp="image"
          content="https://livepeer.org/images/primer/share-image.jpg"
        />
        {/* <!-- Twitter --> */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Livepeer - A 10-Minute Primer" />
        <meta
          name="twitter:description"
          content="Through storytelling, illustration, and data, the Livepeer Primer explains, at a high level, the problem Livepeer solves, and how it works."
        />
        <meta name="twitter:site" content="@livepeerorg" />
        <meta name="twitter:creator" content="@livepeerorg" />
        <meta
          name="twitter:image:src"
          content="https://livepeer.org/images/primer/share-image.jpg"
        />
        {/* <!-- Open Graph general (Facebook, Pinterest) --> */}
        <meta name="og:title" content="Livepeer - A 10-Minute Primer" />
        <meta
          name="og:description"
          content="Through storytelling, illustration, and data, the Livepeer Primer explains, at a high level, the problem Livepeer solves, and how it works."
        />
        <meta
          name="og:image"
          content="https://livepeer.org/images/primer/share-image.jpg"
        />
        <meta name="og:url" content="https://livepeer.org/primer" />
        <meta name="og:site_name" content="Livepeer Primer" />
        <meta name="og:type" content="website" />

        <link rel="stylesheet" href="/primer.css" />
      </Head>
      <Menu />
      <Box className={`bg ${section}`} />
      <Element name="top" />
      <Box id="containerElement" style={{ position: "relative", zIndex: 10 }}>
        <Link href="/" passHref>
          <LivepeerLogo
            sx={{
              position: "absolute",
              left: ["24px", "40px", "40px"],
              top: ["28px", "28px", "36px"],
              width: "140px"
            }}
          />
        </Link>
        <Masthead />
        <Element name="introduction">
          <Introduction onChange={() => onChange("introduction")} />
        </Element>
        <Element name="chapter1">
          <Chapter1 onChange={() => onChange("chapter1")} />
        </Element>
        <Element name="chapter2">
          <Chapter2 />
        </Element>
        <Element name="chapter3">
          <Chapter3 onChange={() => onChange("chapter3")} />
        </Element>
        <Element name="chapter4">
          <Chapter4 onChange={() => onChange("chapter4")} />
        </Element>
        <Element name="chapter5">
          <Chapter5 onChange={() => onChange("chapter5")} />
        </Element>
        <Element name="chapter6">
          <Chapter6 />
        </Element>
        <Element name="chapter7">
          <Chapter7 data={data} />
        </Element>
        <Element name="chapter8">
          <Chapter8 data={data} onChange={() => onChange("chapter8")} />
        </Element>
        <Element name="chapter9">
          <Chapter9 data={data} onChange={() => onChange("chapter9")} />
        </Element>
        <Footer />
      </Box>
    </Box>
  )
}

export default Primer
