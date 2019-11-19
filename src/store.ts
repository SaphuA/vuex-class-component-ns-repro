import Vue from "vue";
import Vuex from "vuex";
import { extractVuexModule, createProxy, createModule, createSubModule, mutation, action } from "vuex-class-component";
Vue.use(Vuex);

export class MyStore extends createModule({}).With({ strict: false, namespaced: "MyStore" }) {
    public subA = createSubModule(SubStoreA);
    public subN = createSubModule(SubStoreN);
}

export class SubStoreA extends createModule({}).With({ strict: false }) {
    public age: number = 0;

    private _name: string = "x";
    public get name() { return this._name; }
    public set name(name: string) { this._name = name; }
}

export class SubStoreN extends createModule({}).With({ strict: false, namespaced: "SubStoreN" }) {
    public age: number = 0;

    private _name: string = "x";
    public get name() { return this._name; }
    public set name(name: string) { this._name = name; }
}

const modules = {
    ...extractVuexModule(MyStore),
};

export const store = new Vuex.Store({ modules });
export const vxm = {
    myStore: createProxy(store, MyStore) as MyStore,
};

vxm.myStore.subA.age = 7;
console.log(vxm.myStore.subA.age);

vxm.myStore.subA.name = "Harry";
console.log(vxm.myStore.subA.name);

vxm.myStore.subN.age = 3; // unknown mutation type: MyStore/SubStoreN/__substoren_internal_mutator__
console.log(vxm.myStore.subN.age); // $store.getters[(namespacedPath + ("__" + className + "_internal_getter__"))] is not a function

vxm.myStore.subN.name = "Hermoine"; // unknown mutation type: MyStore/SubStoreN/name
console.log(vxm.myStore.subN.name); // Undefined