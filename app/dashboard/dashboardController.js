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
          vm.credit = response.data.credits;
          vm.debt = response.data.debts;
          vm.total = response.data.total;
        })
        .catch((error) => {
          vm.credit = 0;
          vm.debt = 0;
          vm.total = 0;
        });
    };

    vm.getSummary();
  }
})();
