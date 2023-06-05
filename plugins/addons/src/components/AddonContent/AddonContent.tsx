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
import React from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { addonsApiRef } from '../../api/api';
import useAsync from 'react-use/lib/useAsync';
import { Helmet } from 'react-helmet';

interface AddonContentProps {
  path: string;
  htmxProcess?: boolean;
}

const HTMX_PROCESS = 'window.htmx && window.htmx.process(document);';

export const AddonContent = ({ path, htmxProcess }: AddonContentProps) => {
  const addonsApi = useApi(addonsApiRef);

  const { loading, error, value } = useAsync(async () => {
    const response = await addonsApi.fetch(path, {
      headers: {
        'HX-Current-URL': document.location.href,
      },
    });
    const content = await response.text();
    if (response.ok || response.status === 304) {
      return content;
    }
    throw new Error(`${response.status} ${response.statusText}: ${content}`);
  }, [addonsApi, path]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // NOTE: The html content injected here should already have been sanitized by the
  // addons registry.
  return (
    <>
      <div dangerouslySetInnerHTML={value ? { __html: value } : undefined} />
      {htmxProcess ? (
        <Helmet>
          <script>{HTMX_PROCESS}</script>
        </Helmet>
      ) : null}
    </>
  );
};
