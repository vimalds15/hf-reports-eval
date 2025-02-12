import { COMPONENTS_MAP } from "../constants";

const ComponentMapper = ({ componentId, ...props }) => {
  const Component = COMPONENTS_MAP[componentId] || null;
  return Component ? <Component {...props} /> : null;
};

export default ComponentMapper;
