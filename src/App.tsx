import "./App.css";
import Footer from "./components/footer";
import { css } from "styled-components";

import Grid from "./components/grid";
import { Grommet, ThemeType } from "grommet";

const theme: ThemeType = {
  global: {
    colors: {
      brand: "#A8D292",
      background: "#11140F",
      "background-back": "#11140F",
      "background-front": "#1D211A",
      "background-contrast": "#373A33",
      text: "#E1E4DA",
      "text-strong": "#E1E4DA",
      "text-weak": "#8D9287",
      "text-xweak": "#C3C8BB",
      icon: "#7EB26A",
      border: "#43483F",
      control: "#A8D292",
      "accent-1": "#92CEF5",
      "accent-2": "#A0CFD0",
      "accent-3": "#C6E7FF",
      "accent-4": "#BBEBEC",
      "neutral-1": "#43483F",
      "neutral-2": "#8D9287",
      "neutral-3": "#C3C8BB",
      "status-critical": "#FFB4AB",
      "status-error": "#93000A",
      "status-warning": "#FFAA15",
      "status-ok": "#00C781",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      focus: "#6FFFB0",
      placeholder: "#8D9287",
      active: "rgba(221, 221, 221, 0.5)",
      "active-background": "#43483F",
      "active-text": "#E1E4DA",
      selected: "#A8D292",
      "selected-background": "#2C4F1D",
      "selected-text": "#E1E4DA",
    },
  },
  tab: {
    active: {
      background: "#1E432E",
    },

    border: undefined,
    pad: "small",
    extend: () => css`
      border-radius: 6px;
    `,
    hover: {
      background: "#446351",
    },
  },
  tabs: {
    panel: {
      extend: () => css`
        width: 100%;
        height: 100%;
      `,
    },
  },
};

function App() {
  const appSize = 94;
  return (
    <Grommet
      theme={theme}
      className="size-full h-screen overflow-auto bg-[#0D1117] text-white relative">
      <Grid height={appSize} />
      <Footer height={100 - appSize} />
    </Grommet>
  );
}

export default App;
