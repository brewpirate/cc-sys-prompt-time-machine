import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import DiffTool from './DiffTool.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DiffTool', DiffTool)
  },
} satisfies Theme
