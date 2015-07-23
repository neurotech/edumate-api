var Vue = require('vue');

var apiUrl = '/api/reports/all';

new Vue({
    el: '#reports',
    data: {
      reports: null
    },
    created: function () {
      this.fetchData();
    },
    methods: {
      fetchData: function () {
        var xhr = new XMLHttpRequest(),
        self = this;
        xhr.open('GET', apiUrl);
        xhr.onload = function () {
          self.reports = JSON.parse(xhr.responseText);
        };
        xhr.send();
      }
    }
});
