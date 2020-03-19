const View = require('../views/Views.js');
const rest = require('../rest/rest.js');

module.exports = {
  index(request, response, next) {
    let options = {
      host: 'z.bokus.ru',
      path: '/user.json',
      port: 80,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    rest.getJSON(options)
      .then(
        (data) => {
          //console.log('onResolve:', data);
          this.sendSuccess(response, data);
        }, 
        (error) => {
          console.log('Ошибка соединения с ресурсом: http://z.bokus.ru/user.json');
          this.sendError(response);
        }
      );
  },

  sendSuccess(response, data) {
    let validData = this.transformDataForComponent(data);

    let view = new View(response, 'table');
    view.render({
      title: 'Таблица',
      data: validData
    });
  },

  sendError(response) {
    let view = new View(response, 'error');
    view.render({
      title: 'Таблица',
      data: 'Нет связи с базой данных'
    });
  },

  transformDataForComponent(data) {
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
