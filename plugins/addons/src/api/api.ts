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

import { createApiRef, DiscoveryApi } from '@backstage/core-plugin-api';

export interface AddonsApi {
  url(path?: string): Promise<string>;
  fetch(path: string, init?: RequestInit): Promise<Response>;
}

export const addonsApiRef = createApiRef<AddonsApi>({
  id: 'plugin.addons-api.service',
});

export class AddonsApiClient implements AddonsApi {
  discoveryApi: DiscoveryApi;

  constructor({ discoveryApi }: { discoveryApi: DiscoveryApi }) {
    this.discoveryApi = discoveryApi;
  }

  async url(path: string = ''): Promise<string> {
    return `${await this.discoveryApi.getBaseUrl('proxy')}/addons/${path}`;
  }

  async fetch(path: string, init?: RequestInit): Promise<Response> {
    return await fetch(await this.url(path), init);
  }
}
