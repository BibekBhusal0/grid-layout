import { DropButton, CheckBox, Select } from "grommet";
import { useState } from "react";
import { RiSettings5Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { changeCompaction, toggleLocked } from "../../redux/widgetsSlice";

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
  const { locked, compaction, widgets } = useSelector(
    (state: RootState) => state.widgets
  );
  console.log(widgets);
  const dispatch = useDispatch();
  const handleSelectionChange = (e: any) => {
    var val = e.option;
    val = val === "none" ? null : val;
    dispatch(changeCompaction(val));
  };

  return (
    <div className="flex flex-col gap-6 justify-center">
      <div className="flex justify-between">
        <div className="text-xl">Locked</div>
        <CheckBox
          toggle
          name="locked"
          checked={locked}
          reverse
          onChange={() => dispatch(toggleLocked())}></CheckBox>
      </div>
      <Select
        onChange={handleSelectionChange}
        className="capitalize"
        dropProps={{ className: "capitalize" }}
        value={compaction ?? "none"}
        options={["none", "horizontal", "vertical"]}
      />
    </div>
  );
}

export default Settings;
