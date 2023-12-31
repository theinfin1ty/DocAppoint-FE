import { goto } from "$app/navigation";
import { page } from "$app/stores";
import { browser } from "$app/environment";

function queryToObject(params) {
  // parse query string
  const obj = {};
  // iterate over all keys
  for (const key of params.keys()) {
    if (params.getAll(key).length > 1) {
      obj[key] = params.getAll(key);
    } else {
      obj[key] = params.get(key);
    }
  }
  return obj;
}

export function createQueryStore(prop) {
  var query = undefined;
  return {
    subscribe: (h) => {
      return page.subscribe((p) => {
        query = queryToObject(p.url.searchParams);
        h(query[prop]);
      });
    },
    set: (v) => {
      query[prop] = v;
      const urlSearchParams = new URLSearchParams(query);
      const g = `?${urlSearchParams.toString()}`;
      if (browser) {
        goto(g, { keepfocus: true, replaceState: true, noscroll: true });
      }
    },
  };
}
