import { useEffect, useState, useRef } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setWidgets } from "../redux/widgetsSlice";

function Grid({ height }: { height: number }) {
  const { widgets, locked, compaction } = useSelector(
    (state: RootState) => state.widgets
  );
  const dispatch = useDispatch();

  const handleChange = (layout: Layout[]) => {
    dispatch(setWidgets(layout));
  };

  const layout = widgets.map((w) => w.gridProps);
  const n_rows = 6;
  const gap = 10;

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1500);
  const [rowHeight, setRowHeight] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setRowHeight(
          (containerRef.current.offsetHeight - gap * n_rows) / n_rows
        );
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: `${height}%` }}
      className="relative w-full overflow-hidden"
      //
    >
      <GridLayout
        layout={layout}
        className={`size-full ${locked ? "hide-resize" : ""}`}
        cols={10}
        rowHeight={rowHeight}
        width={containerWidth}
        margin={[gap, gap]}
        onLayoutChange={handleChange}
        maxRows={n_rows}
        compactType={compaction}
        isResizable={!locked}
        isDraggable={!locked}
        isDroppable={!locked}
        preventCollision
        resizeHandles={["n", "e", "w", "s"]}>
        {widgets.map((item) => (
          <div
            className=" bg-green-400 rounded-md"
            key={item.gridProps.i}
            //
          >
            {/* {item.url} */}
          </div>
        ))}
      </GridLayout>
    </div>
  );
}

export default Grid;
