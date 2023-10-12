import { RecordedAttribute } from "./types";
import serviceUuids from "./service_uuids.json"
import characteristicUuids from './characteristic_uuids.json'
import invariant from "tiny-invariant";

export * from './types'

/**
 * Tests whether a service or characteristic key is a valid short or long UUID
 *
 * @param key
 * @returns
 */
export function checkIsUuid(key: string): boolean {
  const regexPattern: RegExp = /^([A-F0-9]{4}|[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12})$/

  return regexPattern.test(key)
}

/**
 * Tests whether the length of the UUID is 4 places. Should be used in conjunction with checkIsUuid()
 *
 * @param uuid
 * @returns
 */
export function checkIsShortUuid(uuid: string): boolean {
  return uuid.length === 4
}

/**
 * Returns the full 128 bit UUID from the short UUID
 *
 * @param uuid
 * @returns
 */
export function getFullUuid(uuid: string): string {
  return `0000${uuid}-0000-1000-8000-00805F9B34FB`
}

export function getShortUuid(uuid: string): string {
  invariant(!checkIsShortUuid(uuid), `${uuid} is already a short UUID`)

  return uuid.substring(4, 8)
}

/**
 * Gets the full identifier of form `org.bluetooth.service` for a service or characteristic
 *
 * @param shortIdentifier
 * @param type
 * @returns
 */
export function getFullIdentifier(shortIdentifier: string, type: "service" | "characteristic"): string {
  const prefix = type === 'service'
    ? 'org.bluetooth.service.'
    : 'org.bluetooth.characteristic.'

  return `${prefix}${shortIdentifier}`
}

/**
 * Find the corresponding service from Nordic's UUID database using the service key
 *
 *
 * @param key The service key passed in the raw schema. This can be the short UID, long UID,
 * full identifier or shortened SIG identifier
 */
export function findRecordedAttribute(key: string, type: "service" | "characteristic"): RecordedAttribute | undefined {
  const isUuid = checkIsUuid(key)

  if (isUuid && key.length === 4) {
    key = getFullUuid(key)
  }

  const uuidArray = type === "service"
    ? serviceUuids
    : characteristicUuids

  for (const attribute of uuidArray) {
    if (isUuid) {
      const fullUuid = attribute.source === 'gss'
      ? getFullUuid(attribute.uuid)
      : attribute.uuid

      if (key === fullUuid) {
        return {
          ...attribute,
          uuid: fullUuid
        }
      }

    } else {
      if (
        attribute.identifier === key // full identifier
        || attribute.identifier === getFullIdentifier(key, type) // short SIG identifier
      ) {
        return {
          ...attribute,
          uuid: getFullUuid(attribute.uuid)
        }
      }
    }
  }
}
