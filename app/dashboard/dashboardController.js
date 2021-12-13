angular
  .module("cicloPagamentos")
  .controller("DashboardController", ["$scope", "$http", DashboardController]);

function DashboardController($scope, $http) {
  $scope.getSummary = function () {
    const url = "http://localhost:3333/billing-cycles";
    $http
      .get(url)
      .then((response) => {
        $scope.credit = response.credit;
        $scope.debit = response.debit;
        $scope.total = $scope.credit - $scope.debit;
      })
      .catch((error) => {
        $scope.credit = 0;
        $scope.debit = 0;
        $scope.total = 0;
      });
  };

  $scope.getSummary();
}
