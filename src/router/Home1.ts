import Layout from "@/views/Layout/index.vue";
const route = {
  path: "/",
  name: "Home1",
  meta: {
    index: "1",
    title: "首页",
    hidden: false,
  },
  component: Layout,
  redirect: "/Home1/1",
  children: [
    {
      path: "/Home1/1",
      name: "Home1-1",
      meta: {
        index: "1-1",
        title: "首页1-1",
        hidden: false,
      },
      component: () => import("@/views/Home1/index.vue"),
    },
  ],
};

export default route;
