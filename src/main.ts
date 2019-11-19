import { Vue } from "vue-property-decorator";
import { store, vxm } from "@/store";

Vue.component("test", {
    data: () => { return { store: vxm.myStore } },
    template: `<div></div>`
});

const d = document.createElement("div");
document.body.appendChild(d);
new Vue({
    name: "Main",
    store,
    render: (h) => h({ name: "Root", template: "<test />" }),
}).$mount(d);
