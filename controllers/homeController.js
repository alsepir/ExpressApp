const View = require("../views/Views.js");
const model = require("../models/Model.js");

module.exports = {
  index: function(request, response, next) {
    if(model.dbIsConnect) {
      let content = this.getContent();

      let view = new View(response, "table");
      view.render({
        title: "Таблица",
        data: content
      });
    } else {
      let view = new View(response, "error");
      view.render({
        title: "Таблица",
        data: "Нет связи с базой данных"
      });
    }
  },
  getContent: function() {
    let data = model.getData();

    return this._map(data);
  },
  _map: function(data) {
    let {user, book} = data;
    let arr = [];

    for(let index in book) {
      let elm = book[index];

      if(elm.uid) {
        let id = elm.uid - 1000;
        
        if(arr[id-1]) {
          arr[id-1].books.push({
            title: elm.title,
            year: elm.year
          });
        } else {
          arr[id-1] = {
            id: id,
            name: user[id-1].name,
            old: user[id-1].old,
            books: [{
              title: elm.title,
              year: elm.year
            }]
          };
        }
      }
    }

    return arr;
  }
}
