import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Layout } from "react-grid-layout";

export interface Widget {
  gridProps: Layout;
  url: string;
}
export interface WidgetsState {
  max_id: number;
  locked: boolean;

  compaction?: "horizontal" | "vertical" | null;
  //
  widgets: Widget[];
}

const initialState: WidgetsState = {
  max_id: 9,
  locked: true,
  widgets: [
    {
      gridProps: {
        x: 0,
        y: 0,
        w: 1,
        h: 1,
        i: "0",
      },
      url: "https://reactjs.org/",
    },
    {
      gridProps: {
        isResizable: true,
        x: 5,
        y: 5,
        w: 1,
        h: 1,
        i: "1",
      },
      url: "https://redux.js.org/",
    },
  ],
};

export function findNextAvailablePosition(
  widgets: Widget[],
  maxCols: number = 12,
  maxRows: number = 6
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
      if (!positions[row][col]) {
        return { x: col, y: row, w: 1, h: 1, i: "" };
      }
    }

    return null;
  }
}

export const widgetsSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    addWidget: (state, action: PayloadAction<Widget>) => {
      state.max_id = state.max_id + 1;
      state.widgets.push({
        url: action.payload.url,
        gridProps: { ...action.payload.gridProps, i: state.max_id.toString() },
      });
    },
    deleteWidget: (state, action: PayloadAction<string>) => {
      state.widgets = state.widgets.filter(
        (widget) => widget.gridProps.i !== action.payload
      );
    },
    setWidgets: (state, action: PayloadAction<Layout[]>) => {
      state.widgets = state.widgets.map((widget) => {
        const newWidget = action.payload.find(
          (w) => w.i === widget.gridProps.i
        );
        return {
          ...widget,
          gridProps: { ...widget.gridProps, ...newWidget },
        };
      });
    },
    toggleLocked: (state) => {
      state.locked = !state.locked;
    },
  },
});

export const { addWidget, deleteWidget, setWidgets, toggleLocked } =
  widgetsSlice.actions;
export default widgetsSlice.reducer;
