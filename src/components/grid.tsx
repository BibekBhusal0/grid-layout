import { useEffect, useState, useRef } from "react";
import GridLayout from "react-grid-layout";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function Grid({ height }: { height: number }) {
  const widgets = useSelector((state: RootState) => state.widgets.widgets);
  const layout = widgets.map((w) => w.gridProps);
  const n_rows = 6;

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1500);
  const [rowHeight, setRowHeight] = useState(100);
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setRowHeight(containerRef.current.offsetHeight / n_rows);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [widgets.length]);

  return (
    <div
      ref={containerRef}
      style={{ height: `${height}%` }}
      className="relative w-full">
      <GridLayout
        layout={layout}
        className="size-full"
        cols={10}
        rowHeight={rowHeight}
        width={containerWidth}>
        {widgets.map((item) => (
          <div
            className="text-xl bg-green-400 rounded-md p-4 overflow-auto"
            key={item.gridProps.i}>
            {item.url}
          </div>
        ))}
      </GridLayout>
    </div>
  );
}

export default Grid;
