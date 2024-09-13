import { DropButton } from "grommet";
import { useState } from "react";
import { RiSettings5Fill } from "react-icons/ri";

export function Settings() {
  const [open, setOpen] = useState(false);
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
      icon={
        <RiSettings5Fill
          className={`text-2xl transition-all duration-300 ${
            open ? "rotate-45" : ""
          }`}
        />
      }
      plain
    />
  );
}

function DropContent() {
  return <div className="text-3xl">settings</div>;
}

export default Settings;
