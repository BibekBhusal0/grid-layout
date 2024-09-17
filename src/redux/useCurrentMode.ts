import { useSelector } from "react-redux";
import { RootState } from "./store";
import { SingleMode } from "./widgets";

function useCurrentMode() {
  const { current_id, modes } = useSelector(
    (state: RootState) => state.widgets
  );
  if (modes.length === 0) throw new Error("No modes found");

  var crrMode: SingleMode =
    modes.find((mode) => mode.id === current_id) || modes[0];
  return crrMode;
}

export default useCurrentMode;
