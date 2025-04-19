import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: `imgDevice`,
})
export class ImgDevicePipe implements PipeTransform {
  transform(value: string): string {
    if (this.deviceImgObj.get(value) === undefined) {
      return `${this.basePath}other/other.png`;
    }
    //@ts-ignore
    return this.deviceImgObj.get(value);
  }
  basePath = `/assets/img/devices/`;
  deviceImgObj = new Map([
    [`devices.types.sensor.climate`, `${this.basePath}sensor/sensor-climate.png`],
    [`devices.types.sensor`, `${this.basePath}sensor/sensor.png`],
    [`devices.types.sensor.button`, `${this.basePath}sensor/sensor-button.png`],
    [`devices.types.sensor.gas`, `${this.basePath}sensor/sensor-gas.png`],
    [`devices.types.sensor.illumination`, `${this.basePath}sensor/sensor-illumination.png`],
    [`devices.types.sensor.motion`, `${this.basePath}sensor/sensor-motion.png`],
    [`devices.types.sensor.open`, `${this.basePath}sensor/sensor-open.png`],
    [`devices.types.sensor.smoke`, `${this.basePath}sensor/sensor-smoke.png`],
    [`devices.types.sensor.vibration`, `${this.basePath}sensor/sensor-vibration.png`],
    [`devices.types.sensor.sensor.water_leak`, `${this.basePath}sensor/sensor-water-leak.png`],

    [
      'devices.types.smart_speaker.yandex.station.plum',
      `${this.basePath}station/station-lite2.png`,
    ],
    [
      'devices.types.smart_speaker.yandex.station.micro',
      `${this.basePath}station/station-lite.png`,
    ],
    ['devices.types.smart_speaker.yandex.station', `${this.basePath}station/station.png`],
    ['devices.types.smart_speaker.yandex.station.midi', `${this.basePath}station/station2.png`],
    [
      'devices.types.smart_speaker.yandex.station.duo.max',
      `${this.basePath}station/station-duo-max.png`,
    ],
    ['devices.types.smart_speaker.yandex.station.max', `${this.basePath}station/station-max.png`],
    [
      'devices.types.smart_speaker.yandex.station.midimidi',
      `${this.basePath}station/station-midi.png`,
    ],
    [
      'devices.types.smart_speaker.yandex.station.mini1',
      `${this.basePath}station/station-mini1.png`,
    ],
    [
      'devices.types.smart_speaker.yandex.station.mini2',
      `${this.basePath}station/station-mini2.png`,
    ],
    [
      'devices.types.smart_speaker.yandex.station.mini3',
      `${this.basePath}station/station-mini3.png`,
    ],

    [`devices.types.socket`, `${this.basePath}electrics/socket/socket.png`],
    [`devices.types.light`, `${this.basePath}electrics/lamp/light.png`],
    [`devices.types.switch`, `${this.basePath}electrics/switch/switch.png`],
    [`devices.types.light.ceiling`, `${this.basePath}electrics/light-ceiling/ceiling.png`],
    [`devices.types.light.lamp`, `${this.basePath}electrics/light-lamp/lamp.png`],
    [`devices.types.light.strip`, `${this.basePath}electrics/light-strip/strip.png`],
    [`devices.types.switch.relay`, `${this.basePath}electrics/switch-relay/relay.png`],

    [`devices.types.humidifier`, `${this.basePath}climate/humidifier/humidifier-off.png`],
    [`devices.types.thermostat`, `${this.basePath}climate/thermostat/thermostat.png`],
    [`devices.types.thermostat.ac`, `${this.basePath}climate/thermostat-ac/thermostat-ac.png`],
    [`devices.types.purifier`, `${this.basePath}climate/purifier/purifier.png`],
    [`devices.types.ventilation`, `${this.basePath}climate/ventilation/ventilation.png`],
    [
      `devices.types.ventilation.fan`,
      `${this.basePath}climate/ventilation-fan/ventilation-fan-on.png`,
    ],

    [`devices.types.hub`, `${this.basePath}media/hub.png`],
    [`devices.types.camera`, `${this.basePath}media/camera.png`],
    [
      `devices.types.media_device.receiver`,
      `${this.basePath}media/receiver/media-device-receiver.png`,
    ],
    [`devices.types.media_device.tv_box`, `${this.basePath}media/tv-box/media-device-tv-box.png`],
    [`devices.types.media_device`, `${this.basePath}media/media-device/media-device.png`],
    [
      `devices.types.media_device.tv`,
      `${this.basePath}media/media-device-tv/media-device-tv-off.png`,
    ],

    [`devices.types.smart_meter`, `${this.basePath}counters/smart-meter/smart-meter.png`],
    [
      `devices.types.smart_meter.electricity`,
      `${this.basePath}counters/smart-meter-electricity/smart-meter-electricity.png`,
    ],
    [
      `devices.types.smart_meter.heat`,
      `${this.basePath}counters/smart-meter-heat/smart-meter-heat.png`,
    ],
    [
      `devices.types.smart_meter.cold_water`,
      `${this.basePath}counters/smart-meter-cold-water/smart-meter-cold-water.png`,
    ],
    [
      `devices.types.smart_meter.gas`,
      `${this.basePath}counters/smart-meter-gas/smart-meter-gas.png`,
    ],
    [
      `devices.types.smart_meter.hot_water`,
      `${this.basePath}counters/smart-meter-hot-water/smart-meter-hot-water.png`,
    ],

    [`devices.types.cooking`, `${this.basePath}cooking/cooking/cooking.png`],
    [`devices.types.cooking.kettle`, `${this.basePath}cooking/cooking-kettle/cooking-kettle.png`],
    [`devices.types.dishwasher`, `${this.basePath}cooking/dishwasher/dishwasher-off.png`],
    [
      `devices.types.cooking.coffee_maker`,
      `${this.basePath}cooking/coffee-maker/cooking-coffee-maker.png`,
    ],
    [
      `devices.types.cooking.multicooker`,
      `${this.basePath}cooking/multicooker/cooking-multicooker.png`,
    ],

    [`devices.types.iron`, `${this.basePath}appliances/iron/iron.png`],
    [
      `devices.types.washing_machine`,
      `${this.basePath}appliances/washing-machine/washing-machine.png`,
    ],
    [
      `devices.types.vacuum_cleaner`,
      `${this.basePath}appliances/vacuum-cleaner/vacuum-cleaner.png`,
    ],

    [`devices.types.pet_feeder`, `${this.basePath}pet/pet-feeder/pet-feeder.png`],
    [
      `devices.types.pet_drinking_fountain`,
      `${this.basePath}pet/pet-drinking-fountain/pet-drinking-fountain.png`,
    ],

    [`devices.types.openable`, `${this.basePath}open-close/openable/openable.png`],
    [
      `devices.types.openable.curtain`,
      `${this.basePath}open-close/openable-curtain/openable-curtain.png`,
    ],
    [`devices.types.openable.valve`, `${this.basePath}open-close/openable-valve/valve.png`],
  ]);
}
