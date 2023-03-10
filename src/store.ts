interface STORE {
  [key: string]: any;
}
const store: STORE = {};

// 动态引入文件
const files = import.meta.glob("./pages/*/store.js", {
  eager: true,
  import: "default",
});

// 读取文件列表
for (const url in files) {
  // 名称
  const name = url.replace(/^\.\/|pages\/|\/store\.js/g, "");
  // 赋值
  store[name] = files[url];
}

export const useStore = (name: string) => {
  if (!name) {
    throw new Error("请输入你要使用 Store 的模块名称");
  } else {
    if (name in store) {
      return store[name]();
    }
    throw new Error(`模块 ${name} 尚未定义 Store`);
  }
};
