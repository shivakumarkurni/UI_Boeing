app.factory("supplierFactory", ["$http", function ($http) {

    var supplierFact = {};

    //api calling for overview page

    supplierFact.getSuppOverview = function () {

        return $http({
            method: "GET",
            url: BASE_URL + "/" + "overview"
        })
    }

    // api for supplier names in side bar for act-1 & act-3
    supplierFact.getSupplier = function () {
        return $http.get(BASE_URL + "/" + "uniqueName")
    }


    // API calls for activity-1
    supplierFact.getSuppDataAct1 = function () {

        return $http({
            method: "GET",
            url: BASE_URL + "/" + "uniqueName"
        })
    }

    supplierFact.getSuppData = function (supplierNames, fieldChecked) {

        var suppInfo = supplierNames;
        var fieldInfo = fieldChecked;

        return $http({
            method: "GET",
            url: BASE_URL + "/" + "comparison",
            params: { "supplierName": suppInfo, "fieldName": fieldInfo }
        })
    }

    // API calls for activity-2
    supplierFact.getSearchResults = function (searchAPI) {

        return $http({
            method: "POST",
            url: BASE_URL + "/" + "search",
            params: { searchAPI: searchAPI }
        })
    }


    // API calls for activity-3
    supplierFact.getSupplierDates = function (supplier) {

        return $http({
            method: "GET",
            url: BASE_URL + "/" + "date/" + supplier
        })
    }

    supplierFact.getSupplierDatesData = function (outData) {

        return $http({
            method: "GET",
            url: BASE_URL + "/" + "date_comparison",
            params: outData
        })
    }


    // API calls for activity-4
    // supplierFact.getSuppDataAct4 = function () {

    //     return $http({
    //         method: "GET",
    //         url: BASE_URL + "/" + "sowNum"
    //     })
    // }

    // supplierFact.getSOWData = function (sow1) {

    //     return $http({
    //         method: "GET",
    //         url: BASE_URL + "/" + "sowData/" + sow1
    //     })
    // }


    // API calls for activity-5
    supplierFact.getSOWNumNew = function () {

        return $http({
            method: "GET",
            url: BASE_URL + "/" + "sowNum_new"
        })
    }




    supplierFact.getSOWDataNew = function (sow1) {

        return $http({
            method: "GET",
            url: BASE_URL + "/" + "sowData_new/" + sow1
        })
    }

    supplierFact.getSubmit = function (sow) {

        return $http({
            method: "POST",
            url: BASE_URL + "/" + "sow_stmt" + sow
        })
    }

    supplierFact.getSow = function (submitData) {
      return  $http({
            method: "GET",
            url: BASE_URL + "/" + "sow_stmt",
            params: { "sow_stmt": submitData }
        })

    }

    return supplierFact;

}]);