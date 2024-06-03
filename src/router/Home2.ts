import Layout from "@/views/Layout/index.vue";
const route = {
  path: "/Home2",
  name: "Home2",
  meta: {
    index: "2",
    title: "首页2",
    hidden: false,
  },
  component: Layout,
  redirect: "/Home2/1",
  children: [
    {
      path: "/Home2/1",
      name: "Home2",
      meta: {
        index: "2-1",
        title: "首页2-1",
        hidden: false,
      },
      component: () => import("@/views/Home2/index.vue"),
      children: [
        {
          path: "/Home2/1/1",
          name: "Home2-1",
          meta: {
            index: "2-1-1",
            title: "首页2-1-1",
            hidden: false,
          },
          component: () => import("@/views/Home2/index.vue"),
          children: [
            {
              path: "/Home2/1/1/1",
              name: "Home2-1-1",
              meta: {
                index: "2-1-1-1",
                title: "首页2-1-1-1",
                hidden: false,
              },
              component: () => import("@/views/Home2/index.vue"),
            },
          ],
        },
      ],
    },
  ],
};

export default route;
