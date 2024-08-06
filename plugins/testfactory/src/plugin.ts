import {
  createApiFactory,
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { testApiRef } from '@batzionrotman123/backstage-plugin-orchestrator';
import CustomApi from './customApi';

export const testFactoryPlugin = createPlugin({
  id: 'testfactory',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: testApiRef,
      deps: {},
      factory() {
        console.log("creating factory");
        return new CustomApi();
      },
    }),
  ]
});


export const TestPage = testFactoryPlugin.provide(
  createRoutableExtension({
    name: 'TestPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
