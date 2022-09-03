import { autorun, toJS } from 'mobx';
import { PersistStoreOptions } from '../types';

class PersistStore<T> {
  private options: PersistStoreOptions;
  private target: T;

  constructor(target: T, options: PersistStoreOptions) {
    this.options = options;
    this.target = target;

    this.load();
    this.autoSave();
  }

  private load() {
    const { name, properties } = this.options;
    const loadedData: string | null = localStorage.getItem(name);

    if (loadedData) {
      const parsedData = JSON.parse(loadedData);

      const filteredData = Object.fromEntries(
        Object.entries(parsedData).filter(([key]) =>
          properties ? properties.includes(key) : true
        )
      );

      Object.entries(filteredData).forEach(([key, value]: any) => {
        this.target[key as keyof T] = value;
      });
    }
  }

  private autoSave = () => {
    let firstRun = true;
    autorun(() => {
      const json = JSON.stringify(toJS(this.target));
      if (!firstRun) localStorage.setItem(this.options.name, json);
      firstRun = false;
    });
  };
}

const makePersistable = <T>(target: T, options: PersistStoreOptions) => {
  new PersistStore<T>(target, options);
};

export { makePersistable, PersistStore };