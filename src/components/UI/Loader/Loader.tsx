import * as types from './Loader-types';

interface ILoader {
  type: keyof typeof types;
}

function Loader({ type }: ILoader) {
  const loaderType = types;
  const Loaders = loaderType[type] && loaderType[type];

  return <Loaders />;
}

export default Loader;
