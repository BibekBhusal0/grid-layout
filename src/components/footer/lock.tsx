import { IoMdUnlock, IoMdLock } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Button } from "grommet";
import { toggleLocked } from "../../redux/widgetsSlice";
import useCurrentMode from "../../redux/useCurrentMode";

function Lock() {
  const { locked } = useCurrentMode();
  const dispatch = useDispatch();
  return (
    <Button
      plain
      onClick={() => dispatch(toggleLocked())}
      icon={locked ? <IoMdLock /> : <IoMdUnlock />}></Button>
  );
}

export default Lock;
