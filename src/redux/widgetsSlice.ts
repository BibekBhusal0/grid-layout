import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Layout } from "react-grid-layout";

export interface Widget {
  gridProps: Layout;
  url: string;
}
export interface WidgetsState {
  max_id: number;
  widgets: Widget[];
}

const initialState: WidgetsState = {
  max_id: 9,
  widgets: [
    {
      gridProps: {
        x: 0,
        y: 0,
        w: 3,
        h: 1,
        i: "0",
      },
      url: "https://reactjs.org/",
    },
    {
      gridProps: {
        x: 5,
        y: 5,
        w: 3,
        h: 1,
        i: "1",
      },
      url: "https://redux.js.org/",
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
  },
});

export const { addWidget, deleteWidget, setWidgets } = widgetsSlice.actions;
export default widgetsSlice.reducer;
