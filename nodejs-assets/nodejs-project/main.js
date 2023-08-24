const rn_bridge = require('rn-bridge');
const miio = require('miio');
let device,
  communicating = false,
  deviceReady = false;

const setup = async () => {
  if (device) {
    return;
  }
  device = await miio.device({
    address: '192.168.0.1',
    token: '13f18b1ba010f45bc161fd4b1bd160e1',
  });
  setTimeout(() => {
    deviceReady = true;
    rn_bridge.channel.send('device_ready_event');
  }, 1000);
};

setup();

rn_bridge.channel.on('message', async raw => {
  const [cmd, parameters] = raw;
  // console.log('nodejs miio raw_command:', raw);
  if (cmd === 'is_ready' && deviceReady) {
    rn_bridge.channel.send('device_ready_response');
    return;
  }
  if (!deviceReady) {
    console.log('device is not ready');
    return;
  }
  if (communicating) {
    // console.log('device is busy');
    // return;
  }
  communicating = true;
  device.call(cmd, parameters).then(response => {
    communicating = false;
    rn_bridge.channel.send(response);
  });
});
