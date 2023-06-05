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
import { useCallback } from 'react';
import useEvent from 'react-use/lib/useEvent';
import useList from 'react-use/lib/useList';

interface WithKey {
  key: string;
}

export function useAhxSlot<T extends WithKey>(slot: string) {
  const [tenants, { upsert }] = useList<Partial<T> & WithKey>();

  const handler = useCallback(
    event => {
      if (event.detail.rule.selectorText.includes('data-ahx-slot')) {
        const targetSlot = event.detail.elt.getAttribute('data-ahx-slot');
        if (targetSlot === slot) {
          const attrs: Map<string, string> = event.detail.attrs;
          const tenant: Record<string, string> = {};

          attrs.forEach((value, key) => {
            if (key.startsWith('data-')) {
              tenant[key.slice(5)] = value;
            }
          });

          if (tenant.key) {
            upsert((a, b) => a.key === b.key, tenant as Partial<T> & WithKey);
          }

          event.preventDefault();
        }
      }
    },
    [slot, upsert],
  );

  useEvent('htmx:beforeApplyCssRule', handler, document);

  return tenants;
}
