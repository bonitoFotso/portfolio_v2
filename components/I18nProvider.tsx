'use client';

import React, { useEffect } from 'react';
import '../lib/i18n/config';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // The i18n initialization is done in the config file
  return <>{children}</>;
}