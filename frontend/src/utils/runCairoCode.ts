import { compileCairoProgram, compileStarknetContract, runTests } from '../pkg/module';
// import { Append } from "../types/exercise";
// import { antiCheatAppend } from "./antiCheat";

interface ICompilationResult {
  success: boolean
  result: string
  error?: string
}

function appendCodeToFunction(
  code: string,
  functionName = "main",
  codeLine: string
) {
  // Find the index of the function definition
  let functionIndex = code.indexOf(`fn ${functionName}(`);

  if (functionIndex === -1) {
    functionIndex = code.indexOf(`mod ${functionName}`);
  }

  if (functionIndex === -1) {
    const error = `Function '${functionName}' not found.`;
    console.error(error);
    throw new Error(error);
  }

  // Find the end of the function definition
  let openBracesCount = 0;
  let endFunctionIndex = -1;
  for (let i = functionIndex; i < code.length; i++) {
    if (code[i] === "{") {
      openBracesCount++;
    } else if (code[i] === "}") {
      openBracesCount--;
      if (openBracesCount === 0) {
        endFunctionIndex = i;
        break;
      }
    }
  }

  if (endFunctionIndex === -1) {
    console.error(`Unable to find end of function '${functionName}'.`);
    return code; // return original code if unable to find end of function
  }

  // Get the last line of the function
  const functionBody = code.slice(functionIndex, endFunctionIndex);
  const lastLine = functionBody?.trim()?.split("\n")?.pop()?.trim();

  // Append the code line inside the function
  let modifiedCode = code.slice(0, endFunctionIndex);
  if (!lastLine?.endsWith(";") && !lastLine?.endsWith("}")) {
    modifiedCode += ";"; // Add semicolon if last line doesn't end with one
  }
  modifiedCode += `\n    ${codeLine}\n${code.slice(endFunctionIndex)}`;

  return modifiedCode;
}

export const runCairoCode = (
  code: string,
  mode: "COMPILE" | "TEST",
): ICompilationResult => {
   const appendedCode = appendCodeToFunction(code, "DinnerEvent", "");
   console.log("APPENDED CODE: ", appendedCode);
  let result;
  if (mode === "TEST") {
    result = runTests(
      appendedCode,
      true,
      "",
      false,
      false,
      true,
      "",
      false,
      false
    );
    console.log("TEST RESULT: ", result);
  } else {
    result = compileStarknetContract(appendedCode, false, false);
    console.log("COMPILE RESULT: ", result);
  }
  if (
    result.startsWith("failed to compile") ||
    result.includes("test result APPEND: FAILED") ||
    result.includes("Compilation failed") ||
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
