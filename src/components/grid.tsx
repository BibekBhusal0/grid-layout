import { useEffect, useState, useRef } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setWidgets } from "../redux/widgetsSlice";

function Grid({ height }: { height: number }) {
  const { widgets, locked, compaction, n_rows, n_cols } = useSelector(
    (state: RootState) => state.widgets
  );
  const dispatch = useDispatch();

  const handleChange = (layout: Layout[]) => {
    dispatch(setWidgets(layout));
  };

  const layout = widgets.map((w) => w.gridProps);
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
        cols={n_cols}
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
        draggableHandle=".drag-handle"
        resizeHandles={["n", "e", "w", "s"]}>
        {widgets.map((item) => (
          <div
            className={` rounded-md flex items-center justify-center flex-col ${
              locked ? "bg-inherit" : "p-2 pt-0 bg-red-500 bg-opacity-10"
            }`}
            key={item.gridProps.i}
            //
          >
            {!locked && (
              <div className="drag-handle w-full h-8 py-1 flex flex-col gap-1 cursor-grab focus:cursor-grabbing">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div className="rounded-full bg-white bg-opacity-50 h-1 w-full"></div>
                ))}
              </div>
            )}
            <iframe src={item.url} className="size-full"></iframe>
          </div>
        ))}
      </GridLayout>
    </div>
  );
}

export default Grid;
