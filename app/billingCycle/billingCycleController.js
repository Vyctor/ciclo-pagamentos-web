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

    vm.create = function () {
      const url = "http://localhost:3333/billing-cycles";

      $http
        .post(url, vm.billingCycle)
        .then((response) => {
          vm.billingCycle = {};
          messageFactory.addSuccess("Operação realizada com sucesso!");
        })
        .catch((error) => {
          console.log("error", error);
          messageFactory.addError(
            error.message || "Tente novamente em alguns instantes"
          );
        });
    };
  }
})();
