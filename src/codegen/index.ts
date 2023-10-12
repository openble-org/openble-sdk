import * as Handlebars from "handlebars"
import { ParsedSchema } from "../parsedSchema"
// import arduinobleCppTemplate from './arduinobleCpp.precompiled.js'
// import arduinobleHTemplate from './arduinobleH.precompiled.js'

// export * from './arduinobleCpp.precompiled.js'
// export * from './arduinobleH.precompiled.js'

import arduinobleCppTemplate from './arduinobleCpp'
import arduinobleHTemplate from './arduinobleH'

// TODO fix helpers- need `eq` helper for variable types
// handlebarsHelpers({ handlebars: Handlebars })

Handlebars.registerHelper('camelCase', function (str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word: string, index: number) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
});

// TODO support other platforms
export function generateCode(schema: ParsedSchema): FileData[] {
  // const cppTemplate = Handlebars.template(arduinobleCppTemplate)
  // const hTemplate = Handlebars.template(arduinobleHTemplate)
  const cppTemplate = Handlebars.compile(arduinobleCppTemplate)
  const hTemplate = Handlebars.compile(arduinobleHTemplate)

  const cppCode = cppTemplate(schema)
  const hCode = hTemplate(schema)

  return [{
    fileName: 'openble.cpp',
    code: cppCode
  }, {
    fileName: 'openble.h',
    code: hCode
  }]
}

export interface FileData {
  fileName: string;
  code: string;
}
