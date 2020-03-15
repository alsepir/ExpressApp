const requestPromise = require("request-promise");

module.exports = {
  db: {},
  dbIsConnect: false,
  connectDB: function(request, response, next) {
    requestPromise({
      uri: "http://z.bokus.ru/user.json",
      json: true
    }).then((data) => {
      this.db = data;
      this.dbIsConnect = true;
      next();
    }).catch(() => {
      console.log('Ошибочка!')
      next();
    });
  },
  getData: function() {
    return this.db;
  }
}
