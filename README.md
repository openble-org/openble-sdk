# OpenBLE SDK

Define your GATT services in YAML with the OpenBLE SDK. This SDK can

- Accept and validate raw JSON schema
- Generate type safe clients and perepherals

## Links

- [Web bluetooth demo](https://demo.openble.org)
- [Demo video](https://www.loom.com/share/4f1304d2749d476682ed27727921d023?sid=5c100489-29cb-4641-aa5b-7b41570866e4)
- [Website and docs](https://openble.org)

## Features

1. Define your GATT services in YAML.
2. Say goodbye to searching UUIDs in datasheets. Directly use GATT and Nordic identifiers.
3. Read and write directly from your browser with Web Bluetooth.
4. Automatically validate your schema with the connected device.
5. Generate type safe clients and peripherals using a platform agnostic specification.

## Spec summary

```yaml
openble: 0.1.0

info:
  title: string
  # Description in markdown
  description: string
  version: string

services:
  # Service key can be
  # - 16 bit UUID in capital for GATT services: 181A
  # - Long UUID in capital for GATT or custom services: 0000181A-0000-1000-8000-00805F9B34FB
  # - Long identifier: org.bluetooth.service.environmental_sensing
  # - Short identifier: environmental_sensing
  # Identifiers are read from Nordic's UUID database- https://github.com/NordicSemiconductor/bluetooth-numbers-database/tree/master/v1
  environmental_sensing:
    name: Environmental Sensing Service
    summary: Service to read temperature and humidity
    characteristics:
      # Characteristic key is defined similar to service key
      temperature_celsius:
        name: Temperature
        summary: Read or write temperature in Degree Celsius
        # Currently INT32 is the only supported type. TODO support other types
        dataType: INT32
        # READ, WRITE, NOTIFY, INDICATE
        permissions:
          - READ
          - WRITE
      humidity:
        name: Humidity
        summary: Read humidity in percentage. A value of 50 denotes 50% humidity
        dataType: INT32
        permissions:
          - READ
```

The spec is defined [here](./src/parsedSchema.ts).

## Motivation

Bluetooth development is frustrating. While building an environment sensor on Arduino, I had to

- Look up specifications in PDF sheets
- Write services / clients by hand for each platform I wanted to support. Building my climate sensor app involved
  1. Writing the arduino perepheral in C++
  2. Writing clients and encoders/decoders by hand. Every platform I wished to support had its own language and libraries. Mobile cross platform SDKs in React Native and Flutter do not support desktop, and the desktop implementations don't support mobile. Under the hood every OS (linux, macOS, windows, phones) have their own bluetooth implementation.
- Dealing with library sprawl. Android has an official SDK from Google and additionally two more from Nordic. Then the canonical BLE library for NodeJS is abandoned; a community fork is being used.

I scratched my head, realizing that

- A Swagger / OpenAPI style specification would make development 10x faster
- Web bluetooth supports all platforms except iOS and works out of the box, straight from the browser

The OpenBLE spec benefits from but does not depend on web bluetooth.

## Work in progress

- [ ] Support descriptors
- [ ] Notifications
- [ ] More clients- currently just Arduino is supported.
- [ ] Additional datatypes

## Roadmap

- Finalize the specification
- Support all major platforms and clients
- OpenBLE cloud: Postman for teams building bluetooth apps

## Contact

Email to shardul@openble.org

## Contributing

Contributors welcome. OpenBLE SDK and the frontend demo are open sourced under the MIT license.
