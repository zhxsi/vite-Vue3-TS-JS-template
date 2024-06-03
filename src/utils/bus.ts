import mitt from "mitt";

type Events = {
  count: number;
};

const bus = mitt<Events>();
export default bus;
