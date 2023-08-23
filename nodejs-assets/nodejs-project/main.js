const rn_bridge = require('rn-bridge');
const miio = require('miio');
let device;

const setup = async () => {
  if (device) {
    return;
  }
  device = await miio.device({
    address: '192.168.0.1',
    token: '13f18b1ba010f45bc161fd4b1bd160e1',
  });
};

setup();

rn_bridge.channel.on('message', async msg => {
  device.call('get_prop', ['state']).then(data => {
    rn_bridge.channel.send(JSON.stringify(data));
  });
});
