const arduinobleCpp = `/// Generated with OpenBLE

#include "openble.h"

{{#each services}}
// {{identifier}}
BLEService {{camelCase name}}Service("{{@key}}");

{{#each characteristics}}
// {{identifier}}
BLEIntCharacteristic {{camelCase name}}Characteristic(
  "{{@key}}",
  {{#if permissions.read}} BLERead | {{/if}}{{#if permissions.write}}BLEWrite | {{/if}}{{#if permissions.notify}}BLENotify | {{/if}}{{#if permissions.indicate}}BLEIndicate | {{/if}}0
);
{{/each}}
{{/each}}

void openbleSetup() {
  BLE.setLocalName("{{info.title}}");

  {{#each services}}
  {{#each characteristics}}
  {{camelCase ../name}}Service.addCharacteristic({{camelCase name}}Characteristic);
  {{/each}}

  BLE.setAdvertisedService({{camelCase name}}Service);
  BLE.addService({{camelCase name}}Service);
  {{/each}}

  BLE.advertise();
}
`

export default arduinobleCpp
