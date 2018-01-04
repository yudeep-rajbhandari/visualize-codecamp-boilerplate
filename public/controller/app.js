/**
 * Created by USER on 1/1/2018.
 */
var app=angular.module("KnowYourself",['ui.router','BackendService','toaster'])

app.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/home/homepage');
    $stateProvider


        .state('home', {
            abstract: true,
            url: '/home',
            templateUrl: 'templates/navbar.html',


        })
        .state('home.homepage', {
            url: '/homepage',
            templateUrl: 'templates/homepage.html',


        })
        .state('home.visualize1', {
            url: '/visualize',
            templateUrl: 'templates/visualize.html',
            controller:'visualController'

        })

        .state('home.form', {
            url: '/form',
            templateUrl: 'templates/form.html',
            controller:'dataController'

        })

}])

app.controller('dataController',['$scope','$http','toaster','service','$rootScope','$state',function ($scope,$http,toaster,service,$rootScope,$state) {

    $scope.hours=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,24];
    $scope.genders=['Male','Female']
    $scope.addData={};
    $scope.age12=[15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    console.log("<<<<<<")
    $scope.validData=false;
    $scope.Checkit=function () {
        console.log("<<<<<<<<<<")
        var sum=$scope.addData.Leisure + $scope.addData.Sleep + $scope.addData.PersonalCare + $scope.addData.Household+$scope.addData.Study+$scope.addData.ProfessionalHour+$scope.addData.Internet+$scope.addData.Sports+$scope.addData.DailyTravel;
        // if(($scope.addData.Leisure + $scope.addData.Sleep + $scope.addData.PersonalCare + $scope.addData.Household+$scope.addData.Study+$scope.addData.ProfessionalHour+$scope.addData.Internet+$scope.addData.Sports+$scope.addData.DailyTravel) == 24 ){
        //         $scope.validData=true
        //     }
        console.log(sum)
        if(sum == 24){
            $scope.validData=true
        }
    }

    // if(($scope.addData.Leisure +$scope.addData.Sleep+$scope.addData.PersonalCare+$scope.addData.Household+$scope.addData.Study+$scope.addData.ProfessionalHour+$scope.addData.Internet+$scope.addData.Sports+$scope.addData.DailyTravel) == 24 ){
    //     $scope.validData=true
    // }
    // while($scope.addData.Leisure != null) {
    //     console.log($scope.addData.Leisure)
    // }
     while($scope.addData.Leisure){
         console.log($scope.addData.Leisure)
     }
    $scope.addVal=function () {
        service.save({addData:$scope.addData},'/viz/addData',function (err,response) {

            $rootScope.newdata=$scope.addData;
            if(err){
                throw (err)
            }
            if(!err){

                console.log(response)
                console.log("<<<<<<<<<<")
                $state.go('home.visualize1')
            }

        })
    }

    $scope.new1=function () {
        console.log("<<<<<<<<<<<<<<")
    }

}])

app.controller('visualController',['$scope','$http','service','toaster','$state','$rootScope',function ($scope,$http,service,toaster,$state,$rootScope) {



    $scope.data=false;

    service.get('/viz/getdata',function (err,response) {
        if(err){
            throw(err)
        }
        if(!err){
            $scope.visualData=response.data.data;
            console.log($scope.visualData)
            $scope.visualContent()
        }
    })


    if($rootScope.newdata != null) {
        var chart5 = dc.rowChart("#test11");
        var chart6 = dc.rowChart("#test2");
        $scope.finaldata=[$rootScope.newdata]
        console.log($rootScope.newdata)


        var ndx1 = crossfilter($scope.finaldata),

            YearDimension = ndx1.dimension(function (d) {
                return d.Gender;
            }),
            AgeDimension = ndx1.dimension(function (d) {
                return d.Age;
            }),
            SexDimension = ndx1.dimension(function (d) {
                return d.Gender;

            }),
            Healthcare = ndx1.dimension(function (d) {
                return d.PersonalCare;
            }),
            YearSumGroup = YearDimension.group().reduceSum(function (d) {

                return d.Leisure
            })
        Healthcaregroup = YearDimension.group().reduceSum(function (d) {
            return d.PersonalCare

        })


//         var group1 = YearDimension.group();
//         var group2 = YearDimension.group();
//
// // Equivalent to reductio().avg(function(d) { return d.bar; }), which sets the .sum() and .count() values.
//         var reducer = reductio()
//             .count(true)
//             .sum(function (d) {
//                 return +d.Leisure;
//             })
//             .avg(true);
//         reducer(group1);
//
//         var reducer = reductio()
//             .count(true)
//             .sum(function (d) {
//                 return +d.PersonalCare;
//             })
//             .avg(true);
//         reducer(group2);
//
        chart5
            .width(900)
            .height(100)
            .dimension(SexDimension)
            .group(YearSumGroup)
            .elasticX(false)
            .ignoreZeroValue(true)


            .othersGrouper(false)
        chart5.x(d3.scale.linear().range([0,(chart5.width()-50)]).domain([0,24]));
        chart5.xAxis().scale(chart5.x());

        chart6
            .width(900)
            .height(100)
            .dimension(SexDimension)
            .group(Healthcaregroup)
            .ignoreZeroValue(true)

            .othersGrouper(true)
        chart6.x(d3.scale.linear().range([0,(chart6.width()-50)]).domain([0,24]));
        chart6.xAxis().scale(chart6.x());

        dc.renderAll()
    }
    $scope.saveIndex=function () {
        service.save({finaldata:$scope.finaldata},"/users/finaldata",function (err,response) {
            if(err){
                throw(err)
            }
            if(!err){
                toaster.pop("success", "item deleted");
            }
        })
    }

   $scope.visualContent=function () {
       var chart2 = dc.rowChart("#test");
       var chart3 = dc.rowChart("#test1");


       // var select1 = dc.selectMenu('#selection')
       // var select2 = dc.selectMenu('#selection1')

       var ndx = crossfilter($scope.visualData),


           YearDimension = ndx.dimension(function (d) {
               return d.Gender;
           }),
           AgeDimension = ndx.dimension(function (d) {
               return d.Age;
           })
       SexDimension = ndx.dimension(function (d) {
           return d.Gender;

       })
       Healthcare = ndx.dimension(function (d) {
           return d.PersonalCare;
       }),
        newdim =YearDimension.filter($rootScope.newdata.Gender),
       newdim1=SexDimension.filter($rootScope.newdata.Gender),
           num1=$rootScope.newdata.Age,
           newdim2=AgeDimension.filter(num1)
       var group1 = newdim.group();
       var group2 = newdim.group();
       var group3=newdim.group();
       var group4=newdim.group();
       var group5=newdim.group();
       var group6=newdim.group();
       var group7=newdim.group();
       var group8=newdim.group();
       var group9=newdim.group();
       console.log(num1)

// Equivalent to reductio().avg(function(d) { return d.bar; }), which sets the .sum() and .count() values.
       var reducer = reductio()
           .count(true)
           .sum(function (d) {
               return +d.Leisure;
           })
           .avg(true);
       reducer(group1);
       var a=group1.top(Infinity)
       if($rootScope.newdata.Gender=='Male'){
           console.log(a[0].value.avg)
           var avg1=(Math.abs(a[0].value.avg-$rootScope.newdata.Leisure))/a[0].value.avg
       }
        if($rootScope.newdata.Gender=='Female'){
           console.log(a[1].value.avg)
            var avg1=(Math.abs(a[0].value.avg-$rootScope.newdata.Leisure))/a[0].value.avg
        }
       var reducer = reductio()
           .count(true)
           .sum(function (d) {
               return +d.Sleep;
           })
           .avg(true);
       reducer(group3);
       var reducer = reductio()
           .count(true)
           .sum(function (d) {
               return +d.Household;
           })
           .avg(true);
       reducer(group4);
       var reducer = reductio()
           .count(true)
           .sum(function (d) {
               return +d.Study;
           })
           .avg(true);
       reducer(group5);



       var reducer = reductio()
           .count(true)
           .sum(function (d) {
               return +d.PersonalCare;
           })
           .avg(true);
       reducer(group2);
       var b=group2.top(Infinity)
       console.log(b)
       if($rootScope.newdata.Gender=='Male'){
           console.log(b[0].value.avg)
           var avg2 = (Math.abs(b[0].value.avg-$rootScope.newdata.PersonalCare))/b[0].value.avg

       }
       if($rootScope.newdata.Gender=='Female'){
           console.log(b[1].value.avg)

           var avg2 = (Math.abs(b[0].value.avg-$rootScope.newdata.PersonalCare))/b[0].value.avg
       }
        if (avg1 != null && avg2 !=null){
           var finalIndex=(avg1+avg2)/2
            console.log(finalIndex)
            $scope.finaldata={
               Age:$rootScope.newdata.Age,
                Gender:$rootScope.newdata.Gender,
                Index:finalIndex
            }
            if($scope.finaldata !=null){
               console.log($scope.finaldata)
               $scope.saveIndex();
            }
        }


       // select1
       //     .dimension(AgeDimension)
       //     .group(AgeDimension.group())
       //     .controlsUseVisibility(true)
       //     .title(function (d) {
       //         return d.key;
       //     })
       //
       //
       //
       // //chart2.valueAccessor(function(p) { return p.value.count > 0 ? p.value.total / p.value.count : 0; });
       // select2
       //     .dimension(SexDimension)
       //     .group(SexDimension.group())
       //     .controlsUseVisibility(true)
       //     .title(function (d) {
       //         return d.key;
       //     })


       chart2
           .width(900)
           .height(100)
           .dimension(newdim)
           .group(group1)
           .elasticX(false)
           .ignoreZeroValue(true)
           .valueAccessor(function (p) {
               //console.log("p.value.average: ", p.value.average) //displays the avg fine
               return p.value.avg
           })



           .othersGrouper(false)
       chart2.x(d3.scale.linear().range([0,(chart2.width()-50)]).domain([0,24]));
       chart2.xAxis().scale(chart2.x());


       chart3
           .width(900)
           .height(100)
           .dimension(newdim)
           .group(group2)
           .ignoreZeroValue(true)

           .valueAccessor(function (p) {
               //console.log("p.value.average: ", p.value.average) //displays the avg fine
               return p.value.avg
           })
           .othersGrouper(true)
       chart3.x(d3.scale.linear().range([0,(chart3.width()-50)]).domain([0,24]));
       chart3.xAxis().scale(chart3.x());
       chart7
           .width(900)
           .height(100)
           .dimension(newdim)
           .group(group2)
           .ignoreZeroValue(true)

           .valueAccessor(function (p) {
               //console.log("p.value.average: ", p.value.average) //displays the avg fine
               return p.value.avg
           })
           .othersGrouper(true)
       chart3.x(d3.scale.linear().range([0,(chart3.width()-50)]).domain([0,24]));
       chart3.xAxis().scale(chart3.x());
       chart8
           .width(900)
           .height(100)
           .dimension(newdim)
           .group(group2)
           .ignoreZeroValue(true)

           .valueAccessor(function (p) {
               //console.log("p.value.average: ", p.value.average) //displays the avg fine
               return p.value.avg
           })
           .othersGrouper(true)
       chart3.x(d3.scale.linear().range([0,(chart3.width()-50)]).domain([0,24]));
       chart3.xAxis().scale(chart3.x());

dc.renderAll()
   }

}])
