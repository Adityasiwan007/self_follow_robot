cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-ble.BLE",
      "file": "plugins/cordova-plugin-ble/ble.js",
      "pluginId": "cordova-plugin-ble",
      "clobbers": [
        "evothings.ble"
      ]
    },
    {
      "id": "cordova-plugin-bluetooth-serial.bluetoothSerial",
      "file": "plugins/cordova-plugin-bluetooth-serial/www/bluetoothSerial.js",
      "pluginId": "cordova-plugin-bluetooth-serial",
      "clobbers": [
        "window.bluetoothSerial"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-ble": "2.0.1",
    "cordova-plugin-bluetooth-serial": "0.4.7"
  };
});