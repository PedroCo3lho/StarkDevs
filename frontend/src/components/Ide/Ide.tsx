import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

export default function Ide({ dataState, initalValue }: any) {
  return (
    <AceEditor
      mode="rust"
      defaultValue={initalValue}
      theme="monokai"
      onChange={dataState}
      className="!w-[70%] !h-full"
      fontSize={16}
    />
  );
}
