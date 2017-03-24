function parallel(tasks, searchterm, cb) {
  var result = tasks.map(function(){ return; });
  var n = 0;
  tasks.forEach(function (task, index) {
    task(searchterm, function(err, res) {
      if (err) { return cb(err); }
      result[index] = res;
      n++;
      if (n === result.length) return cb(null, result);
    });
  });
}

module.exports = parallel;
