import { SORT_OPTIONS_SELECTION } from './../constants';
export function sortCardData(type: string, dataSource: any) {
  if (type == SORT_OPTIONS_SELECTION.NAME) {
    return dataSource.sort((a: { name: string }, b: { name: string }): any => {
      return a.name.localeCompare(b.name);
    });
  } else if (type == SORT_OPTIONS_SELECTION.HEIGHT) {
    return dataSource.sort(
      (
        a: { detail: { height: number } },
        b: { detail: { height: number } }
      ): any => {
        return a.detail.height - b.detail.height;
      }
    );
  } else if (type == SORT_OPTIONS_SELECTION.WEIGHT) {
    return dataSource.sort(
      (
        a: { detail: { weight: number } },
        b: { detail: { weight: number } }
      ): any => {
        return a.detail.weight - b.detail.weight;
      }
    );
  }
  return dataSource;
}

export function filterPredicate(data: any, filter: string) {
  return data.detail.abilities.find((r: any) => {
    return r.ability.name.startsWith(filter) || data.name.startsWith(filter);
  });
}
