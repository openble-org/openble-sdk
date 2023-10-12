// Raw types are read from the input JSON
// Parsed types are output by the SDK
export interface RawSchema {
  openble: string
  info: {
    title: string
    description: string
    version: string
  }
  services?: {
    // The serviceKey can be the short UUID, long UUID, short identifier or long identifier
    [serviceKey: string]: RawService
  }
}

export interface RawService {
  // The service name. Required for custom services. Overwritten by official name for known services.
  name?: string

  // Service identifier. Required for custom services. Overwritten by official identifier for known services.
  identifier?: string

  // The service summary, optional
  summary?: string

  // Characteristics
  characteristics?: {
    // The characteristicKey can be the short UUID, long UUID, short identifier or long identifier
    [characteristicKey: string]: RawCharacteristic
  }
}

export interface RawCharacteristic {
  // The characteristic name. Required for custom characteristics. Overwritten by official name for known services
  name?: string

  // Characteristic identifier. Required for custom characteristics. Overwritten by official identifier for known services
  identifier?: string

  // The characteristic's summary, optional
  summary?: string

  permissions: string[]

  dataType: string

  descriptors?: {
    // The descriptorKey can be the short UUID, long UUID, short identifier or long identifier
    [descriptorKey: string]: number[]
  }
}
