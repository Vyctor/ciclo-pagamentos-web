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
    };

    vm.refresh = function () {
      $http.get(url).then((response) => {
        vm.billingCycle = { credits: [{}], debts: [{}] };
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
          messageFactory.addError(
            error.message || "Tente novamente em alguns instantes"
          );
        });
    };

    vm.showTabUpdate = function (billingCycle) {
      vm.billingCycle = billingCycle;
      tabsFactory.show(vm, { tabUpdate: true });
    };

    vm.showTabDelete = function (billingCycle) {
      vm.billingCycle = billingCycle;
      tabsFactory.show(vm, { tabDelete: true });
    };

    vm.update = function () {
      const updateUrl = `${url}/${vm.billingCycle.id}`;

      $http
        .put(updateUrl, vm.billingCycle)
        .then((response) => {
          vm.refresh();
          messageFactory.addSuccess("Operação realizada com sucesso!");
        })
        .catch((error) => {
          messageFactory.addError("Tente novamente em alguns instantes.");
        });
    };

    vm.delete = function () {
      const deleteUrl = `${url}/${vm.billingCycle.id}`;

      $http
        .delete(url, vm.billingCycle)
        .then((response) => {
          vm.refresh();
          messageFactory.addSuccess("Operação realizada com sucesso!");
        })
        .catch((error) => {
          messageFactory.addError("Tente novamente em alguns instantes.");
        });
    };

    vm.onInit();
  }
})();
