/*

bluetooth-tracker

*/

#include <Arduino.h>
#include <M5Stack.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

#define BEACON_UUID "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define BEACON_NAME "ESP32_TRACKER"

void setup()
{
    BLEDevice::init(BEACON_NAME);

    BLEServer *pServer = BLEDevice::createServer();
    BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();

    // Configuration de la puissance de transmission
    esp_ble_tx_power_set(ESP_BLE_PWR_TYPE_DEFAULT, ESP_PWR_LVL_P9);

    // Configuration de l'advertissement
    BLEAdvertisementData advData;
    advData.setName(BEACON_NAME);
    pAdvertising->setAdvertisementData(advData);

    pAdvertising->start();
}

void loop()
{
    delay(2000);
}