import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
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
