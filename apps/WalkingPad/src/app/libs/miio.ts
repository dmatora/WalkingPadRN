import * as miio from 'react-native-miio';
import { getSettings } from '../storage';

let device: miio.Device | null = null;

export const miioInit = async () => {
  console.log('miioInit');

  const settings = await getSettings();
  if (!settings?.ip || !settings?.token) {
    return false;
  }

  try {
    device = await miio.device({
      address: settings.ip,
      token: settings.token,
    });
    console.log({ device });
  } catch (e) {
    console.error(e);
  }
  return device !== null;
};

export const miioSend = async (cmd: string, arg: any): Promise<any> => {
  if (!device) {
    throw new Error('Device not initialized');
  }

  const response = await device.call(cmd, arg);

  if (response instanceof Array) {
    if (response.length === 1) {
      const [item] = response;
      return item;
    }
    if (cmd === 'get_prop' && arg === 'all' && response.length > 1) {
      return parseColonDelimitedArrayToObject(response);
    }
  }

  return response;
};

const parseColonDelimitedArrayToObject = (response: any) => {
  if (!response) {
    return {};
  }
  return Object.fromEntries(response.map((item: string) => item.split(':')));
};
