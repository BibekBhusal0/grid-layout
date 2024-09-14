import { Button, DropButton, Text, TextInput } from "grommet";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { RxDragHandleDots1 } from "react-icons/rx";
import { urlPattern } from "./footer/add-widget";

interface widgetControlsProps {
  crrUrl: string;
  changeURL?: (url: string) => void;
  handleDelete?: () => void;
}

function WidgetControls({
  crrUrl,
  changeURL,
  handleDelete,
}: widgetControlsProps) {
  return (
    <div className="flex gap-3 group items-center justify-between px-3 w-full h-9">
      <div className="drag-handle flex flex-col gap-1 cursor-grab ">
        <RxDragHandleDots1 className="rotate-90 text-4xl" />
      </div>
      <div className="flex gap-3">
        <Button
          icon={<AiFillDelete className="text-xl" />}
          plain
          onClick={handleDelete}
        />
        <DropButton
          icon={<FaEdit className="text-xl" />}
          dropProps={{ align: { top: "bottom", left: "left" } }}
          dropContent={<DropItem crrUrl={crrUrl} changeURL={changeURL} />}
        />
      </div>
    </div>
  );
}

function DropItem({ crrUrl, changeURL }: widgetControlsProps) {
  const [text, setText] = useState(crrUrl);
  const [extractedUrl, setExtractedUrl] = useState(crrUrl);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setText(inputValue);

    const matchedUrl = inputValue.match(urlPattern);
    setExtractedUrl(matchedUrl ? matchedUrl[0] : "");
  };

  const add = () => {
    if (extractedUrl !== "" && extractedUrl !== crrUrl) {
      changeURL?.(extractedUrl);
      setText("");
      setExtractedUrl("");
    }
  };
  return (
    <div className="p-4 flex flex-col gap-4 items-center justify-center">
      <div className="flex flex-col gap-2">
        <TextInput
          autoFocus
          placeholder="Widget URL"
          value={text}
          onChange={handleTextChange}
        />
        <Text color={"status-warning"}>
          {extractedUrl === "" ? (text.trim() === "" ? "" : "Invalid URL") : ""}
        </Text>
      </div>

      <Button label="Save" disabled={extractedUrl === ""} onClick={add} />
    </div>
  );
}

export default WidgetControls;
