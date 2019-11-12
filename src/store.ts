import Vue from "vue";
import Vuex from "vuex";
import { extractVuexModule, createProxy, createModule } from "vuex-class-component";

Vue.use(Vuex);

export class StoreA extends createModule({ namespaced: "StoreA", strict: true }) { }
export class StoreB extends createModule({ namespaced: "StoreB", strict: true }) { }
console.log(extractVuexModule(StoreA));
console.log(extractVuexModule(StoreB));
export class StoreC extends createModule({ namespaced: "StoreC", strict: true }) { }
console.log(extractVuexModule(StoreA));
console.log(extractVuexModule(StoreB));
console.log(extractVuexModule(StoreC));

const modules = {
    ...extractVuexModule(StoreA),
    ...extractVuexModule(StoreB),
    ...extractVuexModule(StoreC),
};

console.log(modules);

export const store = new Vuex.Store({ modules });
export const vxm = {};
