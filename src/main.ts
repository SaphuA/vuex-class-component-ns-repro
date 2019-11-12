import { Vue } from "vue-property-decorator";
import Vuelidate from "vuelidate";
Vue.config.productionTip = false;
Vue.use(Vuelidate);

import { store } from "@/store";

// Insert a div in which Vue will render
const d = document.createElement("div");
document.body.appendChild(d);

new Vue({
    name: "Main",
    store,
    render: (h) => h({ name: "Root", template: "<h1>Main</h1>" }),
}).$mount(d);
