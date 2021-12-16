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
        vm.billingCycle = { credits: [{}], debts: [{}] };
        vm.billingCycles = response.data;
        tabsFactory.show(vm, { tabList: true, tabCreate: true });
      });
      vm.calculateValues();
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
        .delete(deleteUrl, vm.billingCycle)
        .then((response) => {
          vm.refresh();
          messageFactory.addSuccess("Operação realizada com sucesso!");
        })
        .catch((error) => {
          messageFactory.addError("Tente novamente em alguns instantes.");
        });
    };

    vm.addCredit = function (index) {
      console.log(index);
      vm.billingCycle.credits.splice(index + 1, 0, {});
    };

    vm.cloneCredit = function (index, { name, value }) {
      vm.billingCycle.credits.splice(index + 1, 0, { name, value });
      vm.calculateValues();
    };

    vm.deleteCredit = function (index) {
      if (vm.billingCycle.credits.length > 1) {
        vm.billingCycle.credits.splice(index, 1);
        vm.calculateValues();
      }
    };

    vm.addDebt = function (index) {
      console.log("executei");
      vm.billingCycle.debts.splice(index + 1, 0, {});
    };

    vm.cloneDebt = function (index, { name, value, status }) {
      vm.billingCycle.debts.splice((index + 1, 0, { name, value, status }));
      vm.calculateValues();
    };

    vm.deleteDebt = function (index) {
      if (vm.billingCycle.debts.length > 1) {
        vm.billingCycle.debts.splice(index, 1);
        vm.calculateValues();
      }
    };

    vm.calculateValues = function () {
      vm.credit = 0;
      vm.debt = 0;

      if (vm.billingCycle) {
        vm.billingCycle.credits.forEach((value) => {
          vm.credit += !value || isNaN(value) ? 0 : parseFloat(value);
        });

        vm.billingCycle.debts.forEach((value) => {
          vm.debt += !value || isNaN(value) ? 0 : parseFloat(value);
        });
      }
    };

    vm.total = vm.credit - vm.debt || 0;

    vm.onInit();
  }
})();
