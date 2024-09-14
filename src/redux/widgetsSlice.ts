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
  n_rows: number;
  n_cols: number;

  compaction: "horizontal" | "vertical" | null;
  //
  widgets: Widget[];
}

const initialState: WidgetsState = {
  max_id: 9,
  n_rows: 6,
  n_cols: 10,
  locked: true,
  compaction: "vertical",
  widgets: [
    {
      gridProps: {
        x: 0,
        y: 0,
        w: 4,
        h: 2,
        i: "0",
      },
      url: "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&light=0&autoplay=1&feed=%2FRojEiO%2Feminem-kamikaze-exclusive-fire-new%2F",
    },
    {
      gridProps: {
        isResizable: true,
        x: 5,
        y: 5,
        w: 3,
        h: 3,
        i: "1",
      },
      url: "https://getkairo.com/embed-local?id=e1e6447e-2407-418d-8c81-a828f0f865bc&local=true&title=Focus&type=Block&color=green&size=2&faceType=default",
    },
  ],
};

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
    setWidgetURL: (
      state,
      action: PayloadAction<{ id: string; url: string }>
    ) => {
      const widget = state.widgets.find(
        (w) => w.gridProps.i === action.payload.id
      );
      if (widget) {
        widget.url = action.payload.url;
      }
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
    changeCompaction: (
      state,
      action: PayloadAction<"horizontal" | "vertical" | null>
    ) => {
      state.compaction = action.payload;
    },
  },
});

export const {
  addWidget,
  deleteWidget,
  setWidgets,
  toggleLocked,
  changeCompaction,
  setWidgetURL,
} = widgetsSlice.actions;
export default widgetsSlice.reducer;
