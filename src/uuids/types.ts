// A service or characteristic attribute recorded in Nordic's number database
// https://github.com/NordicSemiconductor/bluetooth-numbers-database
export interface RecordedAttribute {
  // The attribute name
  name: string

  // The full identifier in the format `org.bluetooth.service.environmental_sensing`
  identifier: string

  // The full UUID in the format 0000181A-0000-1000-8000-00805F9B34FB
  uuid: string

  // The source- gss, nordic, helium, apple etc
  source: string
}
