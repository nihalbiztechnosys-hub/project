import { useMemo } from 'react';
import { filterProjects, sortProjects } from '../utils/helpers';

export function useProjectFilters(rows, filters, sortConfig) {
  const filtered = useMemo(
    () => filterProjects(rows, filters),
    [rows, filters]
  );

  const sorted = useMemo(
    () => sortProjects(filtered, sortConfig.key, sortConfig.direction),
    [filtered, sortConfig]
  );

  return sorted;
}
