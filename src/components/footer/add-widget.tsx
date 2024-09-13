import { Button, DropButton, TextInput } from "grommet";
import { HiViewGridAdd } from "react-icons/hi";
import { addWidget, Widget } from "../../redux/widgetsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";

export function fits(
  grid: boolean[][],
  row: number,
  col: number,
  w: number,
  h: number,
  maxCols: number,
  maxRows: number
): boolean {
  if (row + h > maxRows || col + w > maxCols) return false;

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (grid[row + i][col + j]) return false;
    }
  }
  return true;
}

function findNextAvailablePosition(
  widgets: Widget[],
  maxCols: number,
  maxRows: number
) {
  const positions = Array.from({ length: maxRows }, () =>
    Array(maxCols).fill(false)
  );

  widgets.forEach((widget) => {
    const { x, y, w, h } = widget.gridProps;
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        if (y + i < maxRows && x + j < maxCols) {
          positions[y + i][x + j] = true;
        }
      }
    }
  });

  for (let row = 0; row < maxRows; row++) {
    for (let col = 0; col < maxCols; col++) {
      if (
        !positions[row][col] &&
        fits(positions, row, col, 1, 1, maxCols, maxRows)
      ) {
        return { x: col, y: row, w: 1, h: 1, i: "" };
      }
    }
  }
  return null;
}

function ButtonAddWidget() {
  const { n_cols, n_rows, widgets } = useSelector(
    (state: RootState) => state.widgets
  );
  const available_widgets = findNextAvailablePosition(widgets, n_cols, n_rows);
  return (
    <DropButton
      plain
      disabled={available_widgets === null}
      dropProps={{
        align: { top: "bottom", left: "left" },
        style: { boxShadow: "none" },
      }}
      icon={<HiViewGridAdd />}
      dropContent={<DropContent />}></DropButton>
  );
}

function DropContent() {
  const { n_cols, n_rows, widgets } = useSelector(
    (state: RootState) => state.widgets
  );
  const dispatch = useDispatch();
  const available_widgets = findNextAvailablePosition(widgets, n_cols, n_rows);
  const [text, setText] = useState("");

  const add = () => {
    if (
      available_widgets !== null &&
      available_widgets !== undefined &&
      text.trim() !== ""
    ) {
      dispatch(addWidget({ gridProps: available_widgets, url: text.trim() }));
      setText("");
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 items-center justify-center">
      <TextInput
        autoFocus
        placeholder="Widget URL"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        label="Add"
        disabled={available_widgets === null || text.trim() === ""}
        onClick={add}
      />
    </div>
  );
}

export default ButtonAddWidget;
