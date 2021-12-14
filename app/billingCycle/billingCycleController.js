(function () {
  angular
    .module("cicloPagamentos")
    .controller("BillingCycleController", ["$http", BillingCycleController]);

  function BillingCycleController($http) {
    const vm = this;

    vm.create = function () {
      const url = "http://localhost:3333/billing-cycles";

      $http
        .post(url, vm.billingCycle)
        .then((response) => {
          vm.billingCycle = {};
        })
        .catch((error) => {
          vm.error = error;
        });
    };
  }
})();
