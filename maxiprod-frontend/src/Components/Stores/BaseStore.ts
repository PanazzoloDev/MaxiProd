/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
import { cloneDeep, get, isEmpty, isFunction, toNumber } from 'lodash';
import { action, observable } from "mobx"
import type { Controls, typeControl } from '../../Commons/types';

interface Result {
    [key: string]: any;
}

class BaseStore {
    @observable controls: Controls;
    @observable readonly backupControls: Controls;
    @observable storeMode: 'Create' | 'Update' | 'Delete' | 'Read' = 'Create';

    put?: (id: number, controls: Controls) => Promise<object>;
    post?: (controls: Controls) => Promise<object>;
    get?: (id: number) => Promise<object>;
    delete?: (id: number) => Promise<object>;

    constructor(
        controls: Controls,
        update?: (id: number, controls: Controls) => Promise<object>,
        create?: (controls: Controls) => Promise<object>,
        getById?: (id: number) => Promise<object>,
        deleteById?: (id: number) => Promise<object>
    ) {
        this.backupControls = cloneDeep(controls);
        this.controls = controls;
        this.put = update;
        this.post = create;
        this.get = getById;
        this.delete = deleteById;
    }

    @action
    changeFormControl = (controlName: string, control: typeControl) => {
        return new Promise<object>((resolve) => {
            const oldControl = get(this.controls, controlName);

            if (!isEmpty(oldControl)) {
                this.controls[controlName] = {
                    ...oldControl,
                    ...control
                };
            }

            resolve(this.controls)
        })

    }
    @action
    setStoreMode = (mode: 'Create' | 'Update' | 'Delete' | 'Read') => {
        this.storeMode = mode;
    }
    @action
    submit = async (mode?: 'Create' | 'Update' | 'Delete' | 'Read', id?: number) => {
        const controls = await this.convertControlsToFormat(this.controls);

        return await new Promise((resolve) => {
            const usedMode = mode ? mode : this.storeMode
            switch (usedMode) {
                case 'Create':
                    isFunction(this.post) ? resolve(this.post(controls as Controls)) : () => { };
                    break;
                case 'Update':
                    isFunction(this.put) ?
                        resolve(this.put(id ? id : toNumber(get(controls, 'id', 0)), controls as Controls)) : () => { };
                    break;
                case 'Delete':
                    isFunction(this.delete) ?
                        resolve(this.delete(id ? id : toNumber(get(controls, 'id', 0)))) : () => { };
                    break;
                case 'Read':
                    if (isFunction(this.get)) {
                        resolve(this.get(id ? id : toNumber(get(controls, 'id', 0)))
                            .then((result: Result) => {
                                const resultData = get(result, 'data.value', {})
                                Object.keys(this.controls).forEach(key =>
                                    this.controls[key].value = get(resultData, key)
                                )
                            }))
                    }
                    break;
                default:
                    break;
            }
        })
    }
    @action
    resetStore = () => {
        this.controls = cloneDeep(this.backupControls);
        this.storeMode = 'Create'
    }
    @action
    convertControlsToFormat = (controls: { [key: string]: any }): Promise<object> => {
        return new Promise((resolve) => {
            const convertedControls: { [key: string]: any } = {};

            for (const key in controls) {
                if (controls.hasOwnProperty(key)) {
                    const value = controls[key].value;
                    if ([undefined, null, ''].includes(value)) {
                        continue
                    }
                    const parts = key.split('.');
                    let currentObj = convertedControls;

                    for (let i = 0; i < parts.length - 1; i++) {
                        const part = parts[i];
                        if (!currentObj.hasOwnProperty(part)) {
                            currentObj[part] = {};
                        }
                        currentObj = currentObj[part];
                    }

                    currentObj[parts[parts.length - 1]] = value;
                }
            }
            resolve(convertedControls);
        });
    }

}

export default BaseStore;
