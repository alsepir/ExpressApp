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
    let userBooks = [];

    for(let id in user) {
      let currentUser = user[id];
      currentUser.books = [];
      userBooks.push(currentUser);
    }

    for(let item in book) {
      let currentBook = book[item];

      if(currentBook.uid) {
        let userId = currentBook.uid - 1001;
        let booksForUserId = userBooks[userId].books;
        booksForUserId.push({title: currentBook.title, year: currentBook.year})
      }
    }

    return userBooks;
  }
}
