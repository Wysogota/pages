import { autorun, toJS } from 'mobx';

class PersistStore<T extends object> {
  private name: string;
  private target: T;

  constructor(target: T, name: string) {
    this.name = name;
    this.target = target;

    this.load();
    this.autoSave();
  }

  private load() {
    const loadedData: string | null = localStorage.getItem(this.name);
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
      const json = JSON.stringify(toJS(this.target));

      if (!firstRun) localStorage.setItem(this.name, json);
      firstRun = false;
    });
  };
}

const makePersistable = <T extends object>(target: T, name: string) => {
  new PersistStore<T>(target, name);
};

export { makePersistable, PersistStore };