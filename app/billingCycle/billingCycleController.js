(function () {
  angular
    .module("cicloPagamentos")
    .controller("BillingCycleController", [
      "$http",
      "messageFactory",
      "tabsFactory",
      BillingCycleController,
    ]);

  function BillingCycleController($http, messageFactory, tabsFactory) {
    const vm = this;
    const url = "http://localhost:3333/billing-cycles";

    vm.onInit = function () {
      vm.refresh();
      console.log(vm);
    };

    vm.refresh = function () {
      $http.get(url).then((response) => {
        console.log("response: ", response);
        vm.billingCycle = {};
        vm.billingCycles = response.data;
        tabsFactory.show(vm, { tabList: true, tabCreate: true });
      });
    };

    vm.create = function () {
      $http
        .post(url, vm.billingCycle)
        .then((response) => {
          vm.refresh();
          messageFactory.addSuccess("Operação realizada com sucesso!");
        })
        .catch((error) => {
          console.log("error", error);
          messageFactory.addError(
            error.message || "Tente novamente em alguns instantes"
          );
        });
    };

    vm.onInit();
  }
})();
