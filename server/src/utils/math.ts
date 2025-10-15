import ErrorHandler from "./error-handler";

const max_value = 9999999999.0;
type OperationType = "ADD" | "SUB" | "MUL" | "DIV";

export const applyOperation = (
  left: number,
  operation: OperationType,
  right: number
) => {
  let result: number;
  if (operation === "DIV" && right === 0) {
    throw new ErrorHandler("you can devide by 0", 400);
  }
  switch (operation) {
    case "ADD":
      result = left + right;
      break;

    case "SUB":
      result = left - right;
      break;

    case "MUL":
      result = left * right;
      break;

    case "DIV":
      result = left / right;
  }

  if (result > max_value) {
    throw new ErrorHandler(
      "Please provide lesser value to perform operations",
      400
    );
  }

  result = Number(result.toFixed(2));

  return result;
};
