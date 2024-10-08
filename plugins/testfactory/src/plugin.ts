import {
  createApiFactory,
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import CustomApi from './customApi';
import { orchestratorFormApiRef } from '@janus-idp/backstage-plugin-orchestrator-form-api';

export const formApiFactory =  createApiFactory({
  api: orchestratorFormApiRef,
  deps: {},
  factory() {
    return new CustomApi();
  },
});
export const testFactoryPlugin = createPlugin({
  id: 'testfactory',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    formApiFactory
  ]
});




export const TestFormPage = testFactoryPlugin.provide(
  createRoutableExtension({
    name: 'TestForm',
    component: () =>
      import('./components/TestForm').then(m => m.TestForm),
    mountPoint: rootRouteRef,
  }),
);
