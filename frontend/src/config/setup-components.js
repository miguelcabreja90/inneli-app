// Core components
import PageFooter from "@/components/core/PageFooter";
import PageNavBar from "@/components/core/PageNavBar";

function setupComponents(Vue) {
  Vue.component("page-footer", PageFooter);
  Vue.component("page-navbar", PageNavBar);
}

export { setupComponents };
