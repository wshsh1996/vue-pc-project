import { fileURLToPath, URL } from 'node:url'

import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  /**
   * command =》 build: 开发环境 || serve: 生产环境
   * */

  /**
   * mode: 是读取package.json中配置的dev和build命令的--mode后的参数
   *
   * 例："dev": "vite --mode env.local"；"dev:test": "vite --mode test"
   *
   *  在加载环境变量时遵循以下规则：
   *  .env                # 所有情况下都会加载
   *  .env.local          # 所有情况下都会加载，但会被 git 忽略
   *  .env.[mode]         # 只在指定模式下加载
   *  .env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
   *  因此，你指定了 --mode env.local，Vite 会尝试加载 .env.local 文件
   *  但其他.env.[mode]名称的文件，只需要填写 mode 即可
   * */

  /**
   * process.cwd() 获取项目路径 当前执行node命令时文件夹的地址(工作目录)
   *
   * loadEnv(mode, process.cwd()): 将mode模式的环境变量应用到到工作目录
   *
   * 返回的是一个环境变量对象。这个对象包含了根据指定模式 (mode) 加载的所有环境变量。
   * 这些环境变量会被加载到 import.meta.env 中，在整个项目中可以方便地访问
   *
   * 具体可查看vite官网：https://cn.vitejs.dev/guide/env-and-mode.html
   * */
  const env = loadEnv(mode, process.cwd())
  console.log(env, 'env')
  console.log(process.cwd(), 'cwd')
  return {
    plugins: [vue(), vueDevTools()],
    server: {
      port: Number(env.VITE_PORT),
      open: Boolean(env.VITE_OPEN)
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
