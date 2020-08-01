import Head, { HeadProps } from "components/primitives/head"
import Nav, { NavProps } from "components/sections/nav"
import { Box, SxStyleProp } from "theme-ui"

type Props = {
  headProps?: HeadProps
  isDark?: boolean
  navProps?: NavProps
  pushContentSx?: SxStyleProp
}

const PageLayout: React.FC<Props> = ({
  children,
  headProps,
  isDark,
  navProps,
  pushContentSx
}) => (
  <>
    <Head {...headProps} />
    <Nav
      isPrimer
      {...(navProps ? navProps : { background: isDark ? "black" : "white" })}
    />
    <Box
      as="main"
      sx={{ position: "relative", overflow: "hidden", ...pushContentSx }}
    >
      {children}
    </Box>
  </>
)

export default PageLayout
