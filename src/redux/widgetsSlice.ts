import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Layout } from "react-grid-layout";
import { emptyMode, initialState, Widget } from "./widgets";

export const widgetsSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    addWidget: (state, action: PayloadAction<Widget>) => {
      const crrMode = state.modes.find((mode) => mode.id === state.current_id);
      if (!crrMode) return;
      state.max_id = state.max_id + 1;
      crrMode.widgets.push({
        url: action.payload.url,
        gridProps: { ...action.payload.gridProps, i: state.max_id.toString() },
      });
    },
    deleteWidget: (state, action: PayloadAction<string>) => {
      const crrMode = state.modes.find((mode) => mode.id === state.current_id);
      if (!crrMode) return;
      crrMode.widgets = crrMode.widgets.filter(
        (widget) => widget.gridProps.i !== action.payload
      );
    },
    setWidgetURL: (
      state,
      action: PayloadAction<{ id: string; url: string }>
    ) => {
      const crrMode = state.modes.find((mode) => mode.id === state.current_id);
      if (!crrMode) return;
      const widget = crrMode.widgets.find(
        (w) => w.gridProps.i === action.payload.id
      );
      if (widget) {
        widget.url = action.payload.url;
      }
    },
    setWidgets: (state, action: PayloadAction<Layout[]>) => {
      const crrMode = state.modes.find((mode) => mode.id === state.current_id);
      if (!crrMode) return;
      crrMode.widgets = crrMode.widgets.map((widget) => {
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
      const crrMode = state.modes.find((mode) => mode.id === state.current_id);
      if (!crrMode) return;
      crrMode.locked = !crrMode.locked;
    },
    changeCompaction: (
      state,
      action: PayloadAction<"horizontal" | "vertical" | null>
    ) => {
      const crrMode = state.modes.find((mode) => mode.id === state.current_id);
      if (!crrMode) return;
      crrMode.compaction = action.payload;
    },
    //
    addMode: (state, action: PayloadAction<string>) => {
      state.max_id++;
      state.modes.push({
        ...emptyMode,
        id: state.max_id,
        name: action.payload,
      });
    },
    changeMode: (state, action: PayloadAction<number>) => {
      const newMode = state.modes.find((mode) => mode.id === action.payload);
      if (newMode) state.current_id = newMode.id;
    },
    deleteMode: (state, action: PayloadAction<number>) => {
      const modeToDelete = state.modes.find(
        (mode) => mode.id === action.payload
      );
      if (modeToDelete) {
        if (modeToDelete.delete_able) {
          state.modes = state.modes.filter(
            (mode) => mode.id !== action.payload
          );
        }
      }
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
  addMode,
  changeMode,
  deleteMode,
} = widgetsSlice.actions;
export default widgetsSlice.reducer;
