(function () {
  angular
    .module("cicloPagamentos")
    .controller("BillingCycleController", [
      "$http",
      "messageFactory",
      BillingCycleController,
    ]);

  function BillingCycleController($http, messageFactory) {
    const vm = this;
    const url = "http://localhost:3333/billing-cycles";

    vm.refresh = function () {
      $http.get(url).then((response) => {
        vm.billingCycle = {};
        vm.billingCycles = response;
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

    vm.refresh();
  }
})();
