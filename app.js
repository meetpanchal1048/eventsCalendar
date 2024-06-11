const app = angular.module('myApp',[]);

app.controller('myController', function($scope,$http){
    const fn = $scope;
    const date = new Date();
    fn.currentMonth = date.getMonth() + 1;
    fn.currentYear = date.getFullYear();
    fn.todayDate = date.getDate();
    fn.currentMonthName = '';
    fn.panData = '';
    fn.eventData = '';
    fn.loader = true;
    $http.get('https://script.google.com/macros/s/AKfycbxvWAsn2qKO7LQcg_EQqZG6EPA7nUUOd5AvKy7wCbzsw6BaC3UHRXrq7jVn3gDc_BAp/exec')
    .then ((response) => {
        fn.eventData = response.data;
        fn.changeData();
        fn.loader = false;
    })
    .then(() => {
        const currentMonthData = fn.eventData.filter((item) => {
            return item.month == fn.currentMonth;
        })
        fn.currentMonthName = currentMonthData[0].monthName;
    });
    fn.setActiveData = 'event';
    fn.changeData = function (){
        fn.setActiveData == 'guj' ? fn.activeData = fn.panData : fn.activeData = fn.eventData;
    }
    fn.filterSelect = "upcoming";
    fn.filteredData = function(item){
        return fn.filterSelect == 'month' 
        ? item.month == fn.currentMonth 
        : fn.filterSelect == 'today' 
        ? item.month == fn.currentMonth && item.date == fn.todayDate
        : fn.filterSelect == 'upcoming' 
        ?  item.month >= fn.currentMonth && item.date >= fn.todayDate
        : item.month;
    }
})