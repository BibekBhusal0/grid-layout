import { IconContext } from "react-icons";
import Settings from "./settings";
import { useContext } from "react";
import { ThemeContext, ThemeType } from "grommet";
import ButtonAddWidget from "./add-widget";
import Lock from "./lock";

function Footer({ height }: { height: number }) {
  const theme = useContext(ThemeContext) as ThemeType;
  const color = theme.global?.colors?.icon;
  const iconColor: string = color
    ? typeof color === "string"
      ? color
      : (color.dark as string)
    : "ffffff";

  return (
    <footer
      style={{ height: `${height}%`, color: iconColor }}
      className="size-full border-green-400 border-t-2 px-3 flex justify-between items-center gap-3"
      //
    >
      <IconContext.Provider value={{ size: "26px" }}>
        <div className="flex items-center flex-start gap-3">
          <Settings />
          <ButtonAddWidget />
        </div>
        <div className="flex justify-end items-center gap-2">
          <Lock />
        </div>
      </IconContext.Provider>
    </footer>
  );
}

export default Footer;
