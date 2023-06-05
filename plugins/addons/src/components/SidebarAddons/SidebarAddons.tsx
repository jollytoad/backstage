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
import FallbackIcon from '@material-ui/icons/Extension';
import { SidebarItem } from '@backstage/core-components';
import { useAhxSlot } from './useAhxSlot';

export interface SidebarAddonsProps {
  slot: string;
}

interface AddonLink {
  key: string;
  href: string;
  text: string;
  icon: string;
}

const addonIcon = (icon?: string) => {
  return FallbackIcon;
};

export const SidebarAddons = ({ slot }: SidebarAddonsProps) => {
  const links = useAhxSlot<AddonLink>(slot);

  return (
    <>
      <div data-ahx-slot={slot} />
      {links.map(({ key, href, text, icon }) =>
        href && text ? (
          <SidebarItem key={key} icon={addonIcon(icon)} to={href} text={text} />
        ) : null,
      )}
    </>
  );
};
