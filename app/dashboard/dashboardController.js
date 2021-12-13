(function () {
  angular
    .module("cicloPagamentos")
    .controller("DashboardController", ["$http", DashboardController]);

  function DashboardController($http) {
    const vm = this;
    vm.getSummary = function () {
      const url = "http://localhost:3333/billing-cycles";
      $http
        .get(url)
        .then((response) => {
          vm.credit = response.credit;
          vm.debit = response.debit;
          vm.total = vm.credit - vm.debit;
        })
        .catch((error) => {
          vm.credit = 0;
          vm.debit = 0;
          vm.total = 0;
        });
    };

    vm.getSummary();
  }
})();
