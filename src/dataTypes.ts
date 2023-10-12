import invariant from "tiny-invariant";
import { CHARACTERISTIC_TYPE } from "./parsedSchema";

export function encodeType(value: string, type: CHARACTERISTIC_TYPE): DataView {
  const numValue = Number(value)
  invariant(!isNaN(numValue), `${value} is not a number`)

  const dataView = new DataView(new ArrayBuffer(4))

  // TODO implement and support other types
  switch(type) {
    case "INT32": {
      dataView.setInt32(0, numValue, true)
    }
    break

    default: throw Error(`Unknown type ${type}`)
  }

  return dataView
}

export function decodeType(value: DataView, type: CHARACTERISTIC_TYPE): number {
  // TODO support other types
  if (type === "INT32") {
    return value.getInt32(0, true)
  } else {
    throw new Error(`Unsupported characteristic type: ${type}`);
  }
}
