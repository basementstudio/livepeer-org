/** @jsx jsx */
import { jsx } from "theme-ui"

const globeDots = ({ top, left, image }) => {
  return (
    <span
      className="highlight-dot"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "2.778vw",
        height: "2.778vw",
        backgroundColor: "#00A55F",
        borderRadius: "50%",
        position: "absolute",
        overflow: "hidden",
        top,
        left
      }}
    >
      {image && <img sx={{ width: "100%" }} src={image} alt="" />}
    </span>
  )
}

export default globeDots
