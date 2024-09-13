import { DropButton } from "grommet";
import { HiViewGridAdd } from "react-icons/hi";

function AddWidget() {
  return (
    <DropButton
      plain
      dropProps={{
        align: { top: "bottom", left: "left" },
        style: { boxShadow: "none" },
      }}
      icon={<HiViewGridAdd />}
      dropContent={<DropContent />}></DropButton>
  );
}

function DropContent() {
  return <div className="text-3xl">add widget</div>;
}

export default AddWidget;
