const arduinobleH = `/// Generated with OpenBLE

#ifndef OPENBLE_H
#define OPENBLE_H

#include <ArduinoBLE.h>

{{#each services}}
extern BLEService {{camelCase name}}Service;
{{#each characteristics}}
extern BLEIntCharacteristic {{camelCase name}}Characteristic;
{{/each}}
{{/each}}

void openbleSetup();

#endif
`

export default arduinobleH
