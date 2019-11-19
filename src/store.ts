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
}

export class SubStoreN extends createModule({}).With({ strict: false, namespaced: "SubStoreN" }) {
    public age: number = 0;
}

const modules = {
    ...extractVuexModule(MyStore),
};

export const store = new Vuex.Store({ modules });
export const vxm = {
    myStore: createProxy(store, MyStore) as MyStore,
};

vxm.myStore.subA.age = 7;
vxm.myStore.subN.age = 1337; // Error
