
var app = angular.module('myApp', ['ui.router', 'ui.bootstrap', 'ngSanitize','blockUI']);  // Modules used

var BASE_URL = "http://mlknights.eastus.cloudapp.azure.com:8080/boeing";  // base URL of Azure

//  Routing
app.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.hashPrefix('')
}])

app.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('dashboard', {
      url: "dashboard",
      templateUrl: "dashboard.html",
      controller: "checkBoxController",
      caseInsensitiveMatch: true
    })
    .state('activity1', {
      url: "/activity1",
      templateUrl: "activity1.html",
      controller: "checkController",
      caseInsensitiveMatch: true
    })
    .state('activity2', {
      url: "/activity2",
      templateUrl: "activity2.html",
      controller: "searchApiController",
      caseInsensitiveMatch: true
    })
    .state('activity3', {
      url: "/activity3",
      templateUrl: "activity3.html",
      controller: "activity3Controller",
      caseInsensitiveMatch: true
    })
    .state('activity4', {
      url: "/activity4",
      templateUrl: "activity4.html",
      controller: "FileUploadCtrl",
      caseInsensitiveMatch: true
    })
}])  //config end


var activeTab = null;
$('a[data-toggle="tab"]').on('shown', function (e) {
  activeTab = e.target;
})


////////////////////////////////   Overview Start     /////////////////////////////////////

app.controller("checkBoxController", ["$scope", "$stateParams", "$http", "supplierFactory", function ($scope, $stateParams, $http, supplierFactory) {

  // $scope.supplierValue = [];
  $scope.overviewData = [];
  $scope.selectedSupplierData;
  $scope.apiData = [];
  $scope.supplierValue = []



  supplierFactory.getSuppOverview()
    .then(function (response) {
      $scope.overview = response.data.result;
      $scope.supplierValue = $scope.overview;
    })

  $scope.toggleSelection = function toggleSelection(key, supName) {

    document.getElementById("dashTable").style.display = "table";
    $scope.names = key;
    $scope.selectedSupplierData = supName;

    $scope.capability = $scope.selectedSupplierData.capability;
    $scope.capability_key = Object.keys($scope.capability).length
    // alert( $scope.capability_key);

    $scope.strength = $scope.selectedSupplierData.strengths;
    $scope.strength_key = Object.keys($scope.strength).length;



    $scope.recommendation = $scope.selectedSupplierData.recommendations;
    $scope.recomm_key = Object.keys($scope.recommendation).length;


    $scope.observation = $scope.selectedSupplierData.observations;
    $scope.observ_key = Object.keys($scope.observation).length;


    $scope.risk = $scope.selectedSupplierData.risks;
    $scope.risk_key = Object.keys($scope.risk).length;



    $scope.awarenes = $scope.selectedSupplierData.awareness;
    $scope.aware_key = Object.keys($scope.awarenes).length;


    $scope.airplane = $scope.selectedSupplierData.airplane_program;
    $scope.airplane_key = Object.keys($scope.airplane).length

    $scope.assessment = $scope.selectedSupplierData.Assessment_type;
    $scope.assess_key = Object.keys($scope.assessment).length;

    $scope.certificates = $scope.selectedSupplierData.Certificates;
    $scope.certificates_key = Object.keys($scope.certificates).length;

    $scope.delegation = $scope.selectedSupplierData.delegation_level;
    $scope.delegation_key = Object.keys($scope.delegation).length;
    // 
    $scope.suppAbbrevation = $scope.selectedSupplierData.supplier_abbreviation;
    $scope.suppAbbrevation_key = Object.keys($scope.suppAbbrevation).length;

    $scope.suppCity = $scope.selectedSupplierData.supplier_loc_city;
    $scope.suppCity_key = Object.keys($scope.suppCity).length;

    $scope.suppCountry = $scope.selectedSupplierData.supplier_loc_country;
    $scope.suppCountry_key = Object.keys($scope.suppCountry).length;

    $scope.suppState = $scope.selectedSupplierData.supplier_loc_state;
    $scope.suppState_key = Object.keys($scope.suppState).length;


    $scope.workPackage = $scope.selectedSupplierData.work_package;
    $scope.workPackage_key = Object.keys($scope.workPackage).length;


    $scope.TeamTitle = $scope.selectedSupplierData.Teamnames_Titles;
    $scope.TeamTitle_key = Object.keys($scope.TeamTitle).length;
   

    $scope.assessmentDate = $scope.selectedSupplierData.assessment_date;
    $scope.assessmentDate_key = Object.keys($scope.assessmentDate).length;
   

    $scope.experiences = $scope.selectedSupplierData.experience;
    $scope.experience_key = Object.keys($scope.experiences).length;

    $scope.enggFun = $scope.selectedSupplierData.Engineering_Function;
    $scope.enggFun_key = Object.keys($scope.enggFun).length;

    $scope.enggSubFun = $scope.selectedSupplierData.Engineering_SubFunction;
    $scope.enggSubFun_key = Object.keys($scope.enggSubFun).length;


    // var keys = Object.keys($scope.strength);
    // console.log(keys);

  };

  angular.forEach($scope.overview, function (key, value) {
    $scope.overviewData = key;


    $scope.supplierValue.push(value);

    angular.forEach(key, function (key1, value1) {

    })
  })
}]);

////////////////////////////////   Activity1 Start     /////////////////////////////////////


app.controller("checkController", ["$scope", "$http", "$sce", "supplierFactory", function ($scope, $http, $sce, supplierFactory) {
  $scope.suppliers = [];
  $scope.html = [];
  $scope.selection = [];
  $scope.fields = [];
  $scope.supplierNames = [];
  $scope.fieldChecked = [];
  //  $scope.field=[];

  var length;



  supplierFactory.getSuppDataAct1()

    .then(function (response) {

      $scope.suppliers = response.data.UniqueSupplier;

      for (var i = 0; i < $scope.suppliers.length; i++) {

        var name = $scope.suppliers[i].supplier;

        if ($scope.html.indexOf(name) == -1)
          $scope.html.push(name);

      } //filtering supplier names

      for (var i = 0; i < $scope.suppliers.length; i++) {
        var name = $scope.suppliers[i].field;

        if ($scope.fields.indexOf(name) == -1)
          $scope.fields.push(name);
      }
    }) // filtering field names

  $scope.supplierName = function (supplier) {
    var idx = $scope.supplierNames.indexOf(supplier);

    if (idx > -1) {
      $scope.supplierNames.splice(idx, 1);
    } else {
      $scope.checkedData = supplier;
      $scope.supplierNames.push($scope.checkedData);
    }
  }

  $scope.fieldName = [
    {
      id: 1,
      name: "strengths",
    },
    {
      id: 2,
      name: "risks",
    },
    {
      id: 3,
      name: "observations",
    },
    {
      id: 4,
      name: "recommendations",
    },
    {
      id: 5,
      name: "awareness",
    }
  ];

  $scope.fieldNames = function (field) {
    var idx = $scope.fieldChecked.indexOf(field);

    if (idx > -1) {
      $scope.fieldChecked.splice(idx, 1);
    }
    else {
      $scope.fieldCheckedData = field;
      $scope.fieldChecked.push($scope.fieldCheckedData);
    }
  }

  $scope.submit = function () {
    $scope.suppData = "";
    var suppInfo = $scope.supplierNames;
    var fieldInfo = $scope.fieldChecked;

    if (suppInfo.length <= 0 && fieldInfo.length <= 0) {

          $scope.suppfieldMessage = "Please select Suppliers and Fields";
          $scope.fieldMessage = "";
          $scope.supplierMessage = "";
      }
      else if (suppInfo.length == 1) {
          $scope.suppfieldMessage = "";
          $scope.fieldMessage = "";
          $scope.supplierMessage = "Please select atleast two suppliers";
            if (fieldInfo.length <= 0) {
              $scope.supplierMessage = "";
              $scope.fieldMessage = "Please select atleast two Suppliers and Fields";
            }
      }
      else if (suppInfo.length <= 0) {
          $scope.suppfieldMessage = " ";
          $scope.supplierMessage = "Please select suppliers";
          $scope.fieldMessage = "";
      }
      else if (fieldInfo.length <= 0) {

          $scope.suppfieldMessage = " ";
          $scope.supplierMessage = " ";
          $scope.fieldMessage = "Please select Fields";
      }
      else {
          $scope.suppfieldMessage = "";
          $scope.supplierMessage = "";
          $scope.fieldMessage = "";

        supplierFactory.getSuppData(suppInfo, fieldInfo)
          .then(function (response) {
            $scope.suppData = response.data.SuppliersCompairesion;
            console.log($scope.suppData);
            $scope.deliberatelyTrustDangerousSnippet = function () {
              return $sce.trustAsHtml($scope.suppData);
            }
          })
      }
  };

}]);



////////////////////////////////   Activity 2 Start     /////////////////////////////////////

app.controller("searchApiController", ['$scope', '$http', "$sce", '$filter', '$stateParams', 'supplierFactory', function ($scope, $http, $sce, $filter, $stateParams, supplierFactory) {
  $scope.searchAPI;
  $scope.searchData = [];
  $scope.count;
  $scope.duplicateRemoval = [];
  $scope.sortingScore = [];
  $scope.sortedData = [];
  $scope.key11 = [];
  $scope.value11 = [];
  $scope.currentPage = 1;
  $scope.numPerPage = 5;
  $scope.maxSize = 5;

  var sortingSearch = [];


  document.getElementById("search").addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("submitButton").click();
    }
  });

  $scope.search = function (searchAPI) {

    $scope.sortedData.splice(0);

    $scope.key11.splice(0);
    $scope.value11.splice(0);

    supplierFactory.getSearchResults(searchAPI)
      .then(function (response) {

        $scope.searchDataArray = response.data;
        console.log($scope.searchDataArray);
        $scope.searchData = $scope.searchDataArray

        angular.forEach($scope.searchData, function (key, value) {
          $scope.duplicateRemoval = key;
          angular.forEach(key, function (key1, value1) {
          $scope.currentText = key1.current_text;
          })
        })

        $scope.length = $scope.searchData[1];

        $scope.count = Object.keys($scope.length).length;

        angular.forEach($scope.duplicateRemoval, function (value11, key11) {
          $scope.key11.push(key11);
          $scope.value11.push(value11);
        })

        // console.log($scope.key11);

        for (var i = 0; i < $scope.count; i++) {
          for (var j = 0; j < $scope.count; j++) {
            if ($scope.key11[j] == "count_" + [i]) {
              $scope.sortedData.push($scope.value11[j]);
            }
          }
          // $scope.sorted.push($scope.value11[i]);
        }
        // console.log($scope.sortedData);

        $scope.timeData = $scope.searchData[0].time;
        $scope.sortedArray = $scope.sortingScore.sort(function (a, b) {
          return b.score - a.score;
        });

        // console.log($scope.sortedArray);

        $scope.suggestion = " Searched for :   " + $scope.searchData[0].suggest;
        $scope.time = " About " + $scope.count + " results in (" + $scope.timeData + ") seconds"
        $scope.numPages = function () {
          return Math.ceil($scope.count / $scope.numPerPage);
        };

        $scope.$watch('currentPage + numPerPage', function () {
          var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;
          $scope.sortedDatas = $scope.sortedData.slice(begin, end);
        });
        if ($scope.count == 0) {
          $scope.message = "Your search " + searchAPI + " did not match any documents please make sure all words are spelled correctly";
        }
        else {
          $scope.message = "";
        }
        $scope.currentText = function (color) {
          var colors = color;
        
          return $sce.trustAsHtml(colors);
        }
      }, function (error) {

      });
  }
}]);
////////////////////////////////   Activity 3 Start     /////////////////////////////////////



app.controller("activity3Controller", ["$scope", "$stateParams", "$http", "$sce", "supplierFactory", function ($scope, $stateParams, $http, $sce, supplierFactory) {
  $scope.uniqueSupp = [];
  $scope.filteredSupp = [];
  $scope.htmlDate = [];
  $scope.suppData;
  supplierFactory.getSuppDataAct1()

    .then(function (response) {
      $scope.uniqueSupp = response.data.UniqueSupplier;

      for (var i = 0; i < $scope.uniqueSupp.length; i++) {
        var name = $scope.uniqueSupp[i].supplier;
        if ($scope.filteredSupp.indexOf(name) == -1)
          $scope.filteredSupp.push(name);
      } //filtering dates
      // console.log($scope.filteredSupp);
    })

  $scope.toggleColumn = function (supplier) {

    $scope.htmlDate.splice(0);
    $scope.supplierName = supplier;
    supplierFactory.getSupplierDates(supplier)
      .then(function (response) {
        $scope.suppliersDate = response.data.SupplierDate;
        // console.log($scope.suppliersDate);

        for (var i = 0; i < $scope.suppliersDate.length; i++) {
          var name = $scope.suppliersDate[i].year;
          if ($scope.htmlDate.indexOf(name) == -1)
            $scope.htmlDate.push(name);
        }
        $scope.isDisabled = false;

        // console.log($scope.difference);

        $scope.difference = $scope.htmlDate[0] - $scope.htmlDate[1];
        // console.log($scope.htmlDate);
        if ($scope.htmlDate.length == 1 || $scope.difference <= 1) {
          $scope.mess = "Note : Only one Assessment Date is available for supplier";
          $scope.message = "";
          $scope.suppData = "";
          $scope.isDisabled = true;
        }
        else {
          $scope.mess = "";
          $scope.message = "";
        }
        // console.log("length of date:" + $scope.htmlDate.length);
      }, function (error) {
      });
  }

  $scope.dateData = function () {
    var from = document.getElementById("fromdate").selectedIndex;
    var fromdate = document.getElementsByTagName("option")[from].value;
    var to = document.getElementById("todate").selectedIndex;
    var todate = document.getElementsByTagName("option")[to].value;
    // console.log(todate);
    // todate - fromdate;

    if ((Date.parse(fromdate) >= Date.parse(todate))) {
      $scope.message = " Note: To Date should be greater than From Date";
      //document.getElementById("todate").value = "";
      $scope.suppData = ""
      return ;
    }
    else {
      $scope.message = ""
    }
    var suppdateName = $scope.supplierName;

    //todate api calling
    var outData = { supplierName: suppdateName, fdate: fromdate, tdate: todate };

    supplierFactory.getSupplierDatesData(outData)
      .then(function (response) {
        $scope.suppData = response.data.SuppliersCompairesion;
        console.log($scope.suppData);
        $scope.deliberatelyTrustDangerousSnippet = function () {

          return $sce.trustAsHtml($scope.suppData);
        }
        // console.log($scope.suppData);
      })

  }
}]);

////////////////////////////////   Activity 4 Start     /////////////////////////////////////

app.controller('FileUploadCtrl', ['$scope', '$timeout', '$http', 'supplierFactory', function ($scope, $timeout, $http, supplierFactory) {
  $scope.sowValue = [];
  $scope.rankSow = [];
  $scope.topSentence = [];
  $scope.sentenceContent = [];
  $scope.act4_Data;
  $scope.content = [];
  $scope.sowContents;

  supplierFactory.getSOWNumNew()
    .then(function (response) {
      $scope.act4_Data = response.data.sowData;
      // console.log($scope.act4_Data);
    });

  $scope.sows = function (sow1) {
    supplierFactory.getSOWDataNew(sow1)
      .then(function (response) {
        $scope.sowData = response.data.Sow;
        // console.log(response.data.Sow);
        $scope.sowContent = $scope.sowData[0].sow;
        $scope.sowContents = $scope.sowContent.charAt(0).toUpperCase() + $scope.sowContent.slice(1);
        $scope.qualifiedContent = $scope.sowData[0].data;
      })
  }
  $scope.checkData = function (sowContents) {
    // console.log(sowContents);
    if (sowContents == 0 || "") {
      $scope.mssg = "Note: Please provide proper SOW statement";
    } else {
      $scope.mssg = " ";
      var submitData = sowContents;
      supplierFactory.getSow(submitData)
        .then(function (response) {
          $scope.submitContent = response.data.result;
          //console.log(response.data.result); 
          $scope.sowAfter = $scope.submitContent.sow;//Sow Content
          $scope.listAfter = $scope.submitContent.data;//List of qualified suppliers
          $scope.qualifiedContent.length = 0;
          $scope.resultList = [];
          $scope.resultList.push($scope.listAfter);
          $scope.qualifiedContent = $scope.resultList[0];//Display list of suppliers
          //  console.log( $scope.resultList[0]);
        })
    }
  }
}]);

