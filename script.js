var formApp = angular.module('formApp', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

// configure our routes
formApp.config(function ($routeProvider) {
    $routeProvider

        // route for the form page
        .when('/', {
            templateUrl: 'pages/form.html',
            controller: 'mainController'
        })

        // route for the resultado page
        .when('/resultado', {
            templateUrl: 'pages/resultado.html',
            controller: 'resController'
        });
});

// create the controller and inject Angular's $scope
formApp.controller('mainController', function ($scope, $location, myService) {

    $scope.changeView = function (view, data) {
        $location.path(view); // path not hash
        myService.set(data);
    }

});

formApp.controller('resController', function ($scope, myService) {

    $scope.forma = myService.get();
});

formApp.service('myService', function () {
    var savedData = {}
    
    function set(data) {
        savedData = data;
        console.log(savedData);
    }
    function get() {
        return savedData;
        console.log(savedData);
    }

    return {
        set: set,
        get: get
    }

});

//angular with bootstrap datepicker
formApp.controller('DatepickerPopup', function ($scope) {

    $scope.forma = {
        dt: new Date()
    }

    let date = new Date();
    date.setFullYear(date.getFullYear() - 100);
    
    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(),
        minDate: date,
        startingDay: 1
    };

    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.formats = [`d 'de' MMMM 'del' yyyy`,'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.popup1 = {
        opened: false
    };


    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

});