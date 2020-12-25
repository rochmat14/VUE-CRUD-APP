import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            // alias: "/tutorials",
            name: "btn-create-data",
            component: () => import("./components/BtnCreateData")
        },
        {
            path: "/add",
            name: "create-data",
            component: () => import("./components/CreateData")
        },
        // {
        //     path: "/edit/:id",
        //     name: "edit-form",
        //     component: () => import("./components/EditData")
        // }
        {
            path: "/edit",
            name: "edit-form",
            component: () => import("./components/EditData"),
            props:true,
        }
    ]
});


