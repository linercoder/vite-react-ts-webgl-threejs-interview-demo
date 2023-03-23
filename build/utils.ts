export function readAllEnv(envConf: Recordable): ViteEnv {
  const res: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    const isTrueRealName = realName === 'true';
    const isFalseRealName = realName === 'false';
    realName = isTrueRealName ? true : isFalseRealName ? false : realName;

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }

    if (envName === 'VITE_PROXY_LIST' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = '';
      }
    }

    res[envName] = realName;

    if (typeof realName === 'string') {
      process.env[envName] = realName;
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName);
    }
  }

  return res;
}
