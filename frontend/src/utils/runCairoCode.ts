import { compileCairoProgram, runTests } from 'wasm-cairo';
// import { Append } from "../types/exercise";
// import { antiCheatAppend } from "./antiCheat";

interface ICompilationResult {
  success: boolean
  result: string
  error?: string
}

export const runCairoCode = (
  code: string,
  mode: "COMPILE" | "TEST",
): ICompilationResult => {
  let result;
  if (mode === "TEST") {
    result = runTests(
      code,
      false,
      "",
      false,
      false,
      false,
      "",
      false,
      false
    );
    console.log("TEST RESULT: ", result);
  } else {
    result = compileCairoProgram(code, false);
    console.log("COMPILE RESULT: ", result);
  }
  if (
    result.startsWith("failed to compile") ||
    result.includes("test result APPEND: FAILED") ||
    !code ||
    code.trim() === ""
  ) {
    return {
      success: false,
      result,
      error: result,
    };
  }
  return {
    success: true,
    result,
  };
};
