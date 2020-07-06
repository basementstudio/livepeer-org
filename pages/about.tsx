import PageLayout from "components/layouts/page"
import IconHero from "components/layouts/icon-hero"
import LivepeerSvg from "components/svgs/livepeer"
import MissionSection from "components/sections/about/mission"

const AboutPage = () => (
  <PageLayout>
    <IconHero
      icon={<LivepeerSvg pushSx={{ width: "24px" }} isDark />}
      title="About Livepeer"
      subtitle="We believe in open components for an open video infrastructure and an open web."
      illustration={<LivepeerSvg />}
    />
    <MissionSection />
  </PageLayout>
)

export default AboutPage