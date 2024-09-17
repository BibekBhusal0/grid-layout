import { Tab, Tabs } from "grommet";
import { ReactNode } from "react";

export interface SidebarContainerProps {
  contents: { title: ReactNode | string; content: ReactNode }[];
  sidebar_width?: number;
}

function SidebarContainer({ contents }: SidebarContainerProps) {
  return (
    <Tabs
      style={{ display: "flex", flexDirection: "row" }}
      className="w-full gap-4 vertical-tabs settings h-full"
      //
    >
      {contents.map(({ title, content }, i) => (
        <Tab className="pr-2 pt-3" key={i} title={title}>
          <div className="pr-4 pt-6 w-full ">{content}</div>
        </Tab>
      ))}
    </Tabs>
  );
}

export default SidebarContainer;
