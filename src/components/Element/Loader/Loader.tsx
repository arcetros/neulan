import * as types from './LoaderTypes';

interface ILoader {
  type: keyof typeof types;
}

export function Loader({ type }: ILoader) {
  const loaderType = types;
  const Loaders = loaderType[type] && loaderType[type];

  return <Loaders />;
}
