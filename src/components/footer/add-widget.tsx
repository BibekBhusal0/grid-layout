import { Button, DropButton, TextInput, Text, RangeInput } from "grommet";
import { HiViewGridAdd } from "react-icons/hi";
import { addWidget, Widget } from "../../redux/widgetsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";

export const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)/;

export function fits(
  widgets: Widget[],
  row: number,
  col: number,
  w: number = 1,
  h: number = 1,
  maxCols: number = 12,
  maxRows: number = 6
): boolean {
  const positions = Array.from({ length: maxRows }, () =>
    Array(maxCols).fill(false)
  );

  widgets.forEach((widget) => {
    const { x, y, w: widgetW, h: widgetH } = widget.gridProps;
    for (let i = 0; i < widgetH; i++) {
      for (let j = 0; j < widgetW; j++) {
        if (y + i < maxRows && x + j < maxCols) {
          positions[y + i][x + j] = true;
        }
      }
    }
  });

  if (row + h > maxRows || col + w > maxCols) return false;

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (positions[row + i][col + j]) return false;
    }
  }

  return true;
}

function findNextAvailablePosition(
  widgets: Widget[],
  maxCols: number,
  maxRows: number,
  w: number = 1,
  h: number = 1
) {
  for (let row = 0; row < maxRows; row++) {
    for (let col = 0; col < maxCols; col++) {
      if (fits(widgets, row, col, w, h, maxCols, maxRows)) {
        return { x: col, y: row, w, h, i: "" };
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
  const [text, setText] = useState("");
  const [extractedUrl, setExtractedUrl] = useState("");
  const [rows, setRows] = useState(1);
  const [cols, setCols] = useState(1);
  const available_widgets = findNextAvailablePosition(
    widgets,
    n_cols,
    n_rows,
    cols,
    rows
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setText(inputValue);

    const matchedUrl = inputValue.match(urlPattern);
    setExtractedUrl(matchedUrl ? matchedUrl[0] : "");
  };
  const add = () => {
    if (available_widgets !== null && extractedUrl !== "") {
      dispatch(addWidget({ gridProps: available_widgets, url: extractedUrl }));
      setText("");
      setExtractedUrl("");
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 items-center justify-center">
      <div className="flex flex-col gap-2">
        <TextInput
          autoFocus
          placeholder="Widget URL"
          value={text}
          onChange={handleTextChange}
        />
        <Text color={"status-warning"}>
          {extractedUrl === "" ? (text.trim() === "" ? "" : "Invalid URL") : ""}
        </Text>
      </div>

      <div className="flex justify-start gap-3 w-full px-3">
        <div className="text-xl">Y: </div>
        <RangeInput
          value={rows}
          onChange={(e) => setRows(parseInt(e.target.value))}
          min={1}
          max={n_rows}
        />
      </div>
      <div className="flex justify-start gap-3 w-full px-3">
        <div className="text-xl">X: </div>
        <RangeInput
          value={cols}
          onChange={(e) => setCols(parseInt(e.target.value))}
          min={1}
          max={n_cols}
        />
      </div>

      <Text color={"status-warning"}>
        <Text color={"text"}>{`Size: ${cols} x ${rows}`}</Text>
        <div>{available_widgets === null ? "Not enough space" : ""}</div>
      </Text>
      <Button
        label="Add"
        disabled={available_widgets === null || extractedUrl === ""}
        onClick={add}
      />
    </div>
  );
}

export default ButtonAddWidget;
