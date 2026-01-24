import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ⚠️ 注意：请将 'ics-lab-portal' 替换为您在 GitHub 上创建的实际仓库名称
  // 如果您部署到 username.github.io (根域名)，则将其改为 '/'
  base: '/ics-lab-portal/', 
});