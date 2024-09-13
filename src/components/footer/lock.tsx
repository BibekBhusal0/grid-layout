import { IoMdUnlock, IoMdLock } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Button } from "grommet";
import { toggleLocked } from "../../redux/widgetsSlice";

function Lock() {
  const { locked } = useSelector((state: RootState) => state.widgets);
  const dispatch = useDispatch();
  return (
    <Button
      plain
      onClick={() => dispatch(toggleLocked())}
      icon={locked ? <IoMdLock /> : <IoMdUnlock />}></Button>
  );
}

export default Lock;
