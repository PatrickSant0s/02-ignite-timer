import "styled-components";

import { defaultTheme } from "../styles/themes/default";

type themeType = typeof defaultTheme;

declare module "styled-components" {
  export interface defaultTheme extends themeType {}
}
