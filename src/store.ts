import Vue from "vue";
import Vuex from "vuex";
import { extractVuexModule, createProxy, createModule, createSubModule, mutation, action } from "vuex-class-component";
Vue.use(Vuex);

const VuexModule = createModule({});
export class MyStore extends VuexModule.With({ strict: false, namespaced: "MyStore" }) {
    public subA = createSubModule(SubStoreA);
    public subB = createSubModule(SubStoreB);
}

export class SubStoreA extends VuexModule.With({ strict: false }) {
    public age: number = 0;
}

export class SubStoreB extends VuexModule.With({ strict: false, namespaced: "SubStoreB" }) {
    public name: string = "";
}

const modules = {
    ...extractVuexModule(MyStore),
};

export const store = new Vuex.Store({ modules });
export const vxm = {
    myStore: createProxy(store, MyStore) as MyStore,
};

vxm.myStore.subA.age = 7; // works
vxm.myStore.subB.name = "test"; // error
