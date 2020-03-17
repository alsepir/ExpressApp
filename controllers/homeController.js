const requestPromise = require("request-promise");
const View = require("../views/Views.js");
//const model = require("../models/Model.js");

module.exports = {
  index(request, response, next) {
    requestPromise({
      uri: "http://z.bokus.ru/user.json",
      json: true
    }).then((data) => {
      let content = this.getContent(data);
      console.log(content)

      let view = new View(response, "table");
      view.render({
        title: "Таблица",
        data: content
      });
    }).catch(() => {
      console.log("Ошибка соединения с ресурсом: http://z.bokus.ru/user.json");

      let view = new View(response, "error");
      view.render({
        title: "Таблица",
        data: "Нет связи с базой данных"
      });
    })
  },
  getContent(data) {
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
