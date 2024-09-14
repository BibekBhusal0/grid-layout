import { useEffect, useState, useRef } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { deleteWidget, setWidgets, setWidgetURL } from "../redux/widgetsSlice";
import WidgetControls from "./widget-controls";

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
            className={`rounded-md flex flex-col ${
              locked ? "" : "p-2 pt-0 bg-red-500 bg-opacity-10"
            }`}
            key={item.gridProps.i}
            //
          >
            {!locked && (
              <WidgetControls
                crrUrl={item.url}
                changeURL={(url) =>
                  dispatch(setWidgetURL({ id: item.gridProps.i, url }))
                }
                handleDelete={() => dispatch(deleteWidget(item.gridProps.i))}
              />
            )}
            <iframe src={item.url} className="size-full"></iframe>
          </div>
        ))}
      </GridLayout>
    </div>
  );
}

export default Grid;
