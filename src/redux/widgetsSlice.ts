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
  widgets: Widget[];
}

const initialState: WidgetsState = {
  max_id: 3,
  n_rows: 8,
  n_cols: 12,
  locked: true,
  compaction: null,
  widgets: [
    {
      gridProps: {
        x: 8,
        y: 6,
        w: 4,
        h: 2,
        i: "0",
      },
      url: "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&autoplay=1&feed=%2Fpueblovista%2Fmorning-coffee-mixtape-chillhop-lofi-hip-hop%2F",
    },
    {
      gridProps: {
        isResizable: true,
        x: 0,
        y: 0,
        w: 2,
        h: 4,
        i: "1",
      },
      url: "https://indify.co/widgets/live/weather/6IrFOuag2Pz5NlkM9qFw",
    },
    {
      url: "https://flipclock.app/",
      gridProps: {
        x: 4,
        y: 0,
        w: 4,
        h: 3,
        i: "2",
      },
    },

    {
      url: "https://getkairo.com/embed-local?id=07770ed8-bc63-47d5-9075-2b783d0209a7&local=true&title=Focus&type=Block&color=amber&size=3&faceType=default",
      gridProps: {
        x: 9,
        y: 1,
        w: 3,
        h: 5,
        i: "3",
      },
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
      console.log(state.widgets);
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
