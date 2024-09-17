import { Layout } from "react-grid-layout";

export interface Widget {
  gridProps: Layout;
  url: string;
}
export interface SingleMode {
  id: number;
  name: string;

  delete_able?: boolean;
  edit_able?: boolean;
  max_id: number;
  locked: boolean;
  n_rows: number;
  n_cols: number;

  compaction: "horizontal" | "vertical" | null;
  widgets: Widget[];
}

export const emptyMode: SingleMode = {
  id: 10,
  name: "empty",
  max_id: 1,
  n_rows: 8,
  n_cols: 12,
  locked: true,
  delete_able: true,
  compaction: null,
  widgets: [],
};

export interface ModesState {
  max_id: number;
  current_id: number;
  modes: SingleMode[];
}

export const defaultMode: SingleMode = {
  id: 0,
  name: "default",
  max_id: 3,
  n_rows: 8,
  n_cols: 12,
  locked: true,
  compaction: null,
  delete_able: false,
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

export const initialState: ModesState = {
  max_id: 3,
  current_id: 0,
  modes: [defaultMode, { ...emptyMode, id: 1 }, { ...emptyMode, id: 2 }],
};
