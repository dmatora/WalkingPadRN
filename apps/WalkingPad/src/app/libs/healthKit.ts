import AppleHealthKit from 'rn-apple-healthkit';

const initHealthKit = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    AppleHealthKit.initHealthKit(
      {
        permissions: {
          read: ['StepCount'],
          write: ['StepCount'],
        },
      },
      (error) => {
        if (error) {
          console.error('error initializing Healthkit: ', error);
          resolve(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};

const saveSteps = async (steps: number) => {
  const now = new Date();
  const minuteAgo = new Date(now.getTime() - 60000);
  const options = {
    value: steps,
    startDate: minuteAgo.toISOString(),
    endDate: now.toISOString(), // optional; default now
  };
  // @ts-ignore
  AppleHealthKit.saveSteps(options, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('saved ' + steps + ' steps to apple health');
    console.log(result);
  });
};

const getTodaySteps = async (): Promise<number | null> => {
  return new Promise((resolve, reject) => {
    const now = new Date();
    const options = {
      startDate: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0
      ).toISOString(), // required
      endDate: new Date().toISOString(), // optional; default now
    };
    AppleHealthKit.getStepCount(options, (error, results) => {
      if (error) {
        // console.error(error);
        // reject(error);
        resolve(0);
        return;
      }
      resolve(Math.floor(results.value));
    });
  });
};

export { initHealthKit, saveSteps, getTodaySteps };
