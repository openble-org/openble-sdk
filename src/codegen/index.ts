import * as Handlebars from "handlebars"
import { ParsedSchema } from "../parsedSchema"
import arduinobleCppTemplate from './arduinobleCpp.hbs?raw'
import arduinobleHTemplate from './arduinobleH.hbs?raw'

// TODO fix helpers- need `eq` helper for variable types
// handlebarsHelpers({ handlebars: Handlebars })

Handlebars.registerHelper('camelCase', function (str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word: string, index: number) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
});

// TODO support other platforms
export function generateCode(schema: ParsedSchema): FileData[] {
  const cppTemplate = Handlebars.compile(arduinobleCppTemplate)
  const hTemplate = Handlebars.compile(arduinobleHTemplate)

  const cppCode = cppTemplate(schema)
  const hCode = hTemplate(schema)

  console.log('cpp code', cppCode)
  console.log('h code', hCode)

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
