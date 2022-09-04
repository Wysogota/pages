import { autorun, toJS } from 'mobx';
import { PersistStoreOptions } from '../types';
import { filterObject } from './functions';

class PersistStore<T extends object> {
  private options: PersistStoreOptions;
  private target: T;

  constructor(target: T, options: PersistStoreOptions) {
    this.options = options;
    this.target = target;

    this.load();
    this.autoSave();
  }

  private load() {
    const loadedData: string | null = localStorage.getItem(this.options.name);
    if (loadedData) {
      const parsedData = JSON.parse(loadedData);
      Object.entries(parsedData).forEach(([key, value]: any) => {
        this.target[key as keyof T] = value;
      });
    }
  }

  private autoSave = () => {
    let firstRun = true;
    autorun(() => {
      const jsStore: T = toJS(this.target);
      const filteredStore = filterObject(jsStore, ([key]) => {
        const { properties } = this.options;
        return properties ? properties.includes(key.toString()) : true;
      });
      const json = JSON.stringify(filteredStore);

      if (!firstRun) localStorage.setItem(this.options.name, json);
      firstRun = false;
    });
  };
}

const makePersistable = <T extends object>(target: T, options: PersistStoreOptions) => {
  new PersistStore<T>(target, options);
};

export { makePersistable, PersistStore };