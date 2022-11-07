class Filters<T extends Record<string, unknown>> {
  filters: Array<(value: T) => boolean>;

  constructor() {
    this.filters = [];
  }

  addFilter(filter: (value: T) => boolean) {
    this.filters.push(filter);
  }

  applyFilters(values: Array<T>) {
    return this.filters.reduce((accum, filter) => {
      return accum.filter(filter);
    }, values);
  }
}

export default Filters;
