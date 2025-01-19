import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

export default function Ide({ dataState }: any) {
  return (
    <AceEditor
      mode="rust"
      defaultValue="IDE"
      theme="monokai"
      onChange={dataState}
      className="!w-3/5 !h-full"
    />
  );
}
