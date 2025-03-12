import Icon from './Icon';

let customCache = new Set<string>();

function isValidCustomScriptUrl(scriptUrl: string): boolean {
  return Boolean(
    typeof scriptUrl === 'string' &&
      scriptUrl.length &&
      !customCache.has(scriptUrl),
  );
}

function isValidEnviroment(): boolean {
  return Boolean(
    typeof document !== 'undefined' &&
      typeof window !== 'undefined' &&
      typeof document.createElement === 'function',
  );
}

/**
 * @description script标签引入iconfont symbol js代码
 * @param scriptUrls iconfont symbol地址
 * @param index 当前scriptUrl
 */
function createScriptUrlTag(scriptUrls: string[], index: number = 0): void {
 try {
  const currentScriptUrl = scriptUrls[index];
  if (isValidCustomScriptUrl(currentScriptUrl)) {
    const script = document.createElement('script');
    script.setAttribute('src', currentScriptUrl);
    script.setAttribute('data-namespace', currentScriptUrl);
    if (scriptUrls.length > index + 1) {
      // script创建完成之后执行下一个url的script标签创建
      script.onload = () => {
        createScriptUrlTag(scriptUrls, index + 1);
      };
      script.onerror = () => {
        createScriptUrlTag(scriptUrls, index + 1);
      };
    }
    customCache.add(currentScriptUrl);
    document.body.appendChild(script);
  } else {
    console.log('Failed');
  }
 } catch (error) {
    console.log(error)
 }
}

const create = (scriptUrls: string[] | string) => {
  if (isValidEnviroment()) {
    if (Array.isArray(scriptUrls)) {
      // 因为iconfont资源会把svg插入before，所以加载相同type会覆盖后加载，为了数组覆盖顺序，倒叙插入
      let url = [...scriptUrls].reverse();
      createScriptUrlTag(url);
    } else {
      createScriptUrlTag([scriptUrls]);
    }
  }
  return Icon;
};

export default create;
