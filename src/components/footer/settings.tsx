import { DropButton, CheckBox, Select } from "grommet";
import { useState } from "react";
import { RiSettings5Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { changeCompaction, toggleLocked } from "../../redux/widgetsSlice";
import useCurrentMode from "../../redux/useCurrentMode";

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
        className: "mb-2 ml-2 p-4",
        style: { boxShadow: "none" },
      }}
      //
      icon={icon}
      plain
    />
  );
}

function DropContent() {
  const { locked, compaction, widgets } = useCurrentMode();
  console.log(widgets);
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
      <div className="flex-center gap-5">
        <div className="text-xl">Compaction</div>
        <Select
          name="compaction"
          width={"120px"}
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

export default Settings;
