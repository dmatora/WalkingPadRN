import nodejs from 'nodejs-mobile-react-native';

let ready = false;

export const miioInit = async () => {
  let readinessListenerInstance: any;
  nodejs.start('main.js');
  return new Promise(resolve => {
    const readinessListener = (data: any) => {
      const deviceReadyMessages = [
        'device_ready_event',
        'device_ready_response',
      ];
      // console.log('miio readinessListener', {data});
      if (deviceReadyMessages.includes(data)) {
        ready = true;
        readinessListenerInstance.remove();
        // console.log('removed readinessListener');
        resolve(data);
      }
    };
    if (!ready) {
      nodejs.channel.send(['is_ready']);
    }

    readinessListenerInstance = nodejs.channel.addListener(
      'message',
      readinessListener,
    );
  });

  // console.log('added readinessListener');
};

export const miioSend = async (cmd: string, arg: any): Promise<any> => {
  if (!ready) {
    return;
  }
  return new Promise(resolve => {
    let commandListenerInstance: any;
    const commandListener = (data: any) => {
      // if (typeof data === "string")
      commandListenerInstance.remove();
      console.log('miio raw_command:', cmd, arg, 'response:', data);
      if (data instanceof Array) {
        if (data.length === 1) {
          const [item] = data;
          resolve(item);
          return;
        }
        if (cmd === 'get_prop' && arg === 'all' && data.length > 1) {
          resolve(parseColonDelimitedArrayToObject(data));
          return;
        }
      }
      resolve(data);
    };
    commandListenerInstance = nodejs.channel.addListener(
      'message',
      commandListener,
    );
    // console.log('added miioSend Listener');
    nodejs.channel.send([cmd, arg]);
  });
};

const parseColonDelimitedArrayToObject = (response: any) => {
  if (!response) {
    return {};
  }
  return Object.fromEntries(response.map((item: string) => item.split(':')));
};
