import router from "./router";
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式

// NProgress.configure({ showSpinner: true }) // NProgress Configuration
// 进度条配置项
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载 icon
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});

router.beforeEach((to, from, next) => {
  NProgress.start(); // 进度条开始
  next();
});

router.afterEach(() => {
  NProgress.done(); // 进度条结束
});
