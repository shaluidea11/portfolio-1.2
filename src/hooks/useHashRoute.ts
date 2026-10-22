// src/hooks/useHashRoute.ts
// Hash-based routing for GitHub Pages compatibility.
// Supports deep links like #/work/customer360

import { useState, useEffect, useCallback } from 'react';

export interface RouteState {
  /** The full hash path, e.g. '/work/customer360' */
  path: string;
  /** Route segments, e.g. ['work', 'customer360'] */
  segments: string[];
}

function parseHash(): RouteState {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const segments = hash.split('/').filter(Boolean);
  return { path: '/' + segments.join('/'), segments };
}

export function useHashRoute() {
  const [route, setRoute] = useState<RouteState>(parseHash);

  useEffect(() => {
    function onHashChange() {
      setRoute(parseHash());
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((path: string) => {
    window.location.hash = '#' + path;
  }, []);

  return { route, navigate };
}
