import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/umi-knova/' : '/',
  publicPath: process.env.NODE_ENV === 'production' ? '/umi-knova/' : '/',
  mock: {},
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {},
  routes,
  npmClient: 'pnpm',
});
