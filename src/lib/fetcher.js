export const fetcher = (...args) =>
  fetch(...args).then(async (res) => await res.json());
