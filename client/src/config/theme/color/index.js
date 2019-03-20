import color from "color";

import purple from "@material-ui/core/colors/purple";

let primary = color(purple[500]);
let secondary = color("#fff");

export default {
  primary: primary.hex(),
  primaryLight: primary
    .whiten(0.6)
    .lighten(0.3)
    .hex(),
  primaryDark: primary.darken(0.1).hex(),
  secondary: secondary.hex(),
  secondaryLight: secondary
    .whiten(0.3)
    .lighten(0.2)
    .hex(),
  secondaryDark: secondary.blacken(0.5).hex(),
  transparent: color("rgba(255, 255, 255, 0.01)").hex(),
  background: color("#fff").hex(),
  gray: color("#f1f1f1").hex(),
  error: color("#D70012").hex(),
  textLight: color("#f1f1f1").hex(),
  textDark: color("#333333").hex(),
  textGray: color("#A5ADB9").hex()
};
