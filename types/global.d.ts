declare type Recordable<T = any> = Record<string, T>;
declare type Nullable<T> = T | null;

/**
 * 用于类型指定属性增加可选性
 * @example  interface User { name: string, age: number }; PartialByKeys<User, "name"> // { name?: string, age: number }
 */
type Flatten<T> = {
  [key in keyof T]: T[key];
};

declare type PartialByKeys<T, K extends keyof T = keyof T> = Flatten<
  Omit<T, K> &
    {
      [P in K]?: T[P];
    }
>;

// 环境变量文件如果有新的字段要在当前接口添加
declare interface ViteEnv {
  VITE_PORT: number;
  VITE_PUBLIC_PATH: string;
  VITE_PROXY_LIST: [string, string][];
  VITE_API_URL: string;
  VITE_GLOB_API_SCENE_URL: string;
}

declare interface MetaProps {
  requiresAuth: boolean;
  isMenu: boolean;
  isFatherPage?: boolean;
  tabbar?: {
    title?: string;
    btnTxt?: string;
    toPath?: string;
  };
}

declare interface RouteObject {
  path?: string;
  //@ts-ignore
  element?: React.ReactNode;
  children?: RouteObject[];
  meta?: MetaProps;
}
