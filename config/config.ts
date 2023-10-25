import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
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
