export type OPENBLE_VERSION = "0.1.0"
export type OPENBLE_PROFILE = "gatt"

// TODO implement extended properties
export type CHARACTERISTIC_PERMISSION = "READ" | "WRITE" | "NOTIFY" | "INDICATE"

// TODO support other types
// export type CHARACTERISTIC_TYPE = "BOOL" | "UINT8" | "INT8" | "UINT16" | "INT16" | "UINT32" | "INT32" | "UINT64" | "INT64" | "FLOAT32" | "FLOAT64"
export type CHARACTERISTIC_TYPE = "INT32"

export interface ParsedSchema {
  openble: OPENBLE_VERSION
  info: {
    title: string
    description: string
    version: string
  }
  services: {
    // A service along with its full UUID
    [fullUuid: string]: ParsedService
  }
}

export interface ParsedService {
  // The service name
  name: string

  // The full identifier
  identifier: string

  // The source of the UUID's definition. Equals `custom` if the UUID is not recorded in Nordic's database
  source: string

  // Service summary
  summary?: string

  characteristics: {
    [fullUuid: string]: ParsedCharacteristic
  }
}

export interface ParsedCharacteristic {
  // The service name
  name: string

  // The full identifier
  identifier: string

  // The source of the UUID's definition. Equals `custom` if the UUID is not recorded in Nordic's database
  source: string

  // Service summary
  summary?: string

  // Characteristic permissions
  permissions: Permissions

  dataType: CHARACTERISTIC_TYPE
}

export interface Permissions {
  read: boolean
  write: boolean
  notify: boolean
  indicate: boolean
}
