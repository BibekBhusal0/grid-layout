import { DropButton, CheckBox, Select, Button, TextInput } from "grommet";
import { useRef, useState } from "react";
import { RiSettings5Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  addMode,
  changeCompaction,
  changeMode,
  deleteMode,
  toggleLocked,
} from "../../redux/widgetsSlice";
import useCurrentMode from "../../redux/useCurrentMode";
import SidebarContainer from "../sidebar-container";
import { RootState } from "../../redux/store";
import { AiFillDelete } from "react-icons/ai";
import { Add } from "grommet-icons";

export function Settings() {
  const [open, setOpen] = useState(false);
  const icon = (
    <RiSettings5Fill
      className={`text-2xl transition-all duration-300 ${
        open ? "rotate-45" : ""
      }`}
    />
  );
  return (
    <DropButton
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      //
      dropContent={<DropContent />}
      dropProps={{
        align: { top: "bottom", left: "left" },
        round: "small",
        className: "mb-2 ml-2 w-[600px] h-[400px]",
        style: { boxShadow: "none" },
      }}
      //
      icon={icon}
      plain
    />
  );
}

function DropContent() {
  return (
    <SidebarContainer
      contents={[
        { title: "Current Mode", content: <CurrentMode /> },
        { title: "Modes Settings", content: <ModesSettings /> },
      ]}
    />
  );
}

function CurrentMode() {
  const { locked, compaction } = useCurrentMode();
  const dispatch = useDispatch();
  const handleSelectionChange = (e: any) => {
    var val = e.option;
    val = val === "none" ? null : val;
    dispatch(changeCompaction(val));
  };

  return (
    <div className="flex flex-col gap-6 justify-center">
      <div className="flex items-center justify-between">
        <div className="text-xl">Locked</div>
        <CheckBox
          className="text-4xl"
          toggle
          checked={locked}
          reverse
          onChange={() => dispatch(toggleLocked())}></CheckBox>
      </div>
      <div className="flex-center gap-5 justify-between">
        <div className="text-xl">Compaction</div>
        <Select
          name="compaction"
          width={"200px"}
          aria-label="compaction"
          onChange={handleSelectionChange}
          className="capitalize"
          dropProps={{ className: "capitalize" }}
          value={compaction ?? "none"}
          options={["none", "horizontal", "vertical"]}
        />
      </div>
    </div>
  );
}

function ModesSettings() {
  const { modes, current_id } = useSelector(
    (state: RootState) => state.widgets
  );
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-2">
      <div
        id="all-modes"
        className="flex-col flex gap-2 p-3 rounded-lg bg-green-950">
        <div className="text-2xl">All Modes</div>
        {modes.map((mode) => (
          <div
            key={mode.id}
            onClick={() => {
              if (mode.id !== current_id) dispatch(changeMode(mode.id));
            }}
            className={`text-xl group flex justify-between items-center cursor-pointer bg-white rounded-md p-1 px-3 ${
              mode.id === current_id ? "bg-opacity-25" : "bg-opacity-10"
            }`}>
            <div>{mode.name}</div>
            {mode.delete_able && (
              <AiFillDelete
                className="hidden group-hover:block"
                size={26}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(deleteMode(mode.id));
                }}
              />
            )}
          </div>
        ))}
      </div>
      <AddModeButton />
    </div>
  );
}

function AddModeButton() {
  const [inp, setInp] = useState(false);
  const [text, setText] = useState("");
  const inpRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const handleClick = () => {
    const usefulText = text.trim();
    if (usefulText !== "") {
      dispatch(addMode(usefulText));
      setInp(!inp);
      setText("");
    } else if (!inp) {
      setInp(!inp);
      setTimeout(() => inpRef.current?.focus(), 10);
    }

    if (inpRef.current && inp) {
      inpRef.current.focus();
    }
  };
  return (
    <div className="flex gap-2 flex-col items-center justify-center">
      {inp && (
        <TextInput
          placeholder="Give beautiful name to new mode"
          ref={inpRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}
      <Button label="Add Mode" icon={<Add />} onClick={handleClick} />
    </div>
  );
}

export default Settings;
