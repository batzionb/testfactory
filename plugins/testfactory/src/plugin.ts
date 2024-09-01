import {
  createApiFactory,
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { orchestratorFormApiRef } from '@batzionrotman123/backstage-plugin-orchestrator-form-api';
import CustomApi from './customApi';

export const testFactoryPlugin = createPlugin({
  id: 'testfactory',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: orchestratorFormApiRef,
      deps: {},
      factory() {
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
