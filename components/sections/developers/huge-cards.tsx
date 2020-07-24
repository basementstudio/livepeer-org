import SectionLayout from "components/layouts/section"
import { Grid } from "theme-ui"
import HugeCard, { HugeCardProps } from "components/primitives/cards/huge"
import NetworkSvg from "components/svgs/network"
import HostedApiSvg from "components/svgs/hosted-api"

const cards: HugeCardProps[] = [
  {
    titleLabel: "Build with",
    title: "The Public Network",
    listItems: [
      "ERC-20 token available on a number of non-custodial and custodial exchanges",
      "Originally distributed via a “Merkle Mine”, an algorithm for decentralized distribution of token during the genesis state",
      "Inflationary  according to algorithmically programmed issuance over time"
    ],
    cta: {
      label: "Read the docs",
      isLink: true,
      isExternal: true,
      href: "https://livepeer.readthedocs.io/"
    },
    accent: "primary",
    headerIllustration: <NetworkSvg />
  },
  {
    titleLabel: "Build with",
    title: "A Hosted API",
    listItems: [
      "Earns you the right to perform or delegate work on the Livepeer network and vote on protocol proposals",
      "Routes work through the network in proportion to the amount of staked and delegated token, serving as a coordination mechanism",
      "Secures the network against a number of attacks via slashing that occurs due to protocol violation"
    ],
    cta: {
      label: "Visit livepeer.com",
      isLink: true,
      isExternal: true,
      href: "https://livepeer.com"
    },
    accent: "secondary",
    headerIllustration: <HostedApiSvg pushSx={{ minWidth: "968px" }} />
  }
]

const HugeCardsSection = () => (
  <SectionLayout
    background="muted"
    pushSx={{ py: ["80px", "160px"] }}
    headingContainerPushSx={{ mb: 0 }}
  >
    <Grid
      columns={["minmax(auto, 632px)", null, "repeat(2, minmax(auto, 632px))"]}
      sx={{ justifyContent: "center" }}
    >
      {cards.map((c) => (
        <HugeCard key={`get-token-card-${c.titleLabel}=${c.title}`} {...c} />
      ))}
    </Grid>
  </SectionLayout>
)

export default HugeCardsSection
