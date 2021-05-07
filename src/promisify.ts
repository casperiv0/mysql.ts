export function promisify(functionName: string, params: any): Promise<any> {
  params = [params];

  return new Promise((resolve, reject) => {
    params.push(function (err: any) {
      const arg = (arguments as any)["1"];

      if (err) {
        return reject(err);
      }

      process.nextTick(() => {
        return resolve(arg);
      });
    });

    // @ts-expect-error ignore
    // eslint-disable-next-line prefer-spread
    this[functionName].apply(this, params);
  });
}
