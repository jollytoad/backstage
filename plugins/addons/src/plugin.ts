/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {
  createApiFactory,
  createComponentExtension,
  createPlugin,
  createRoutableExtension,
  discoveryApiRef,
} from '@backstage/core-plugin-api';
import { AddonsApiClient, addonsApiRef } from './api/api';

import { rootRouteRef } from './routes';

export const addonsPlugin = createPlugin({
  id: 'addons',

  routes: {
    root: rootRouteRef,
  },

  apis: [
    createApiFactory({
      api: addonsApiRef,
      deps: { discoveryApi: discoveryApiRef },
      factory: ({ discoveryApi }) => new AddonsApiClient({ discoveryApi }),
    }),
  ],
});

/** @public */
export const AddonsHead = addonsPlugin.provide(
  createComponentExtension({
    name: 'AddonsHead',
    component: {
      lazy: () => import('./components/AddonsHead').then(m => m.AddonsHead),
    },
  }),
);

/** @public */
export const SidebarAddons = addonsPlugin.provide(
  createComponentExtension({
    name: 'SidebarAddons',
    component: {
      lazy: () =>
        import('./components/SidebarAddons').then(m => m.SidebarAddons),
    },
  }),
);

export const AddonsPage = addonsPlugin.provide(
  createRoutableExtension({
    name: 'AddonsPage',
    component: () => import('./Router').then(m => m.Router),
    mountPoint: rootRouteRef,
  }),
);
