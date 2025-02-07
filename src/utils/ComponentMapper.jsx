import { componentsMap } from "../constants";

const ComponentMapper = ({ componentId, ...props }) => {
  const Component = componentsMap[componentId] || null;
  return Component ? <Component {...props} /> : null;
};

export default ComponentMapper;
