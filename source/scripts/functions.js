//  this is a test

var pageFunctions = {
    intialize: function () {
      console.log('works');
      var self=this;
      this.intializeWatchers(); //listens for clicks
    },
    intializeWatchers: function () {
    },
    initializeIndex: function () {
      var self=this;

      Book = Backbone.Model.extend({
        initialize: function() {
          // console.log('a new book');
          this.on("change", function() {
            // console.log(JSON.stringify(this.changed));
          });
        },
        // defaults: {
        //   title: "Book Title",
        //   author: "No One"
        // },
        urlRoot:'http://localhost:5000/books',
        printDetails: function () {
          // console.log(this.get('name'), this.get('author'));
        },
        parse: function(response, xhr) {
          response.bookType = 'ebook';
          return response;
        }
      });

      // to remove a specific entry create entry with id number
      // var book = new Book({id:'100'});

      var book = new Book();

      // book.set({author: 'J.K. Rowling', title: 'Harry Potter X'});

      // console.log('new book', book.attributes);

      //
      book.fetch({
        success: function (model, response, options) {
          console.log('fetch success');
          // console.log(model);
          },
          error: function(model, response, options) {
          console.log('fetch error');
        }
      });

      // book.destroy({
      //   success: function(model, response, options) {
      //     console.log('destroy success');
      //   },
      //   error: function(model, response, options) {
      //     console.log('destroy error');
      //   },
      //   wait:true
      // });

      book.save(book.attributes, {
        success: function(model, response, options) {
          console.log('Model saved');
          // console.log('Id: ' + book.get('id'));
        },
        error: function(model, xhr, options){
          console.log('Failed to save model');
          }
      });

      var Library = Backbone.Collection.extend({
        url:'http://localhost:5000/books',
        model: Book,
        initialize: function() {
          console.log('Creating a new library collection');
          // records model change
          this.on('add', function() {
            console.log('removed');
          })
        },
        reactToChange: function() {
          console.log('changed');
        }
      });


      var bookOne = new Book({title:'Charlie and the Chocolate Factory', author: 'Roald Dahl'});
      var bookTwo = new Book({title:'To Kill a Mockingbird', author: 'Harper Lee'});
      var bookThree = new Book({title:'War and Peace', author: 'Leo Tolstoy'});
      var bookFour = new Book({title:'Pride and Prejudice', author: 'Jane Austen'});


      var myOnlineLibrary = new Library();

      console.log('before', myOnlineLibrary.length);

      myOnlineLibrary.add(bookFour);

      console.log('after add' , myOnlineLibrary.length);


      myOnlineLibrary.create([bookOne])


      // myOnlineLibrary.bind("add", this.reactToChange, this);


      myOnlineLibrary.fetch({
        success: function(e) {
          console.log('got data');
        },
        error: function(e) {
          console.log('something went wrong');
        }
      });

      console.log('after' , myOnlineLibrary.length);





      var myLibrary = new Library();

      myLibrary.set([bookOne, bookTwo, bookThree]);

      console.log(myLibrary.length);


      var sortedByName = myLibrary.sortBy(function(book) {
        return book.get('title');
      });

      var shuffle = myLibrary.shuffle();


      var authors = myLibrary.pluck('author');


      // console.log('sorted');
      sortedByName.forEach(function(model) {
        // console.log(model.get('title'));
      });

      // console.log('shuffle');
      shuffle.forEach(function(model) {
        // console.log(model.get('title'));
      });

      // console.log('authors');
      authors.forEach(function(authorName) {
        // console.log(authorName);
      });


    },
    initializeIndexToo: function () {
      var self=this;

      Book = Backbone.Model.extend({
        initialize: function() {
          console.log('a new book');
        },
        urlRoot:'http://localhost:5000/books'
      });

      var book = new Book();


      var Library = Backbone.Collection.extend({
        url:'http://localhost:5000/books',
        model: Book,
        initialize: function() {
          console.log('Creating a new library collection');
        },
      });


      var bookOne = new Book({title:'Charlie and the Chocolate Factory', author: 'Roald Dahl', form: 'hardcover', pubdate: 1973});
      var bookTwo = new Book({title:'To Kill a Mockingbird', author: 'Harper Lee', form: 'paperback', pubdate: 1956});
      var bookThree = new Book({title:'War and Peace', author: 'Leo Tolstoy', form: 'paperback', pubdate: 1960});
      var bookFour = new Book({title:'Pride and Prejudice', author: 'Jane Austen', form: 'e-book', pubdate: 1987});


      var library = new Library([bookOne, bookTwo, bookThree, bookFour]);

      var LibraryView = Backbone.View.extend({
        initialize: function() {
          this.render();
        },
        events: {
          'click #ToKillaMockingbird' : 'alertBook'
        },
        alertBook: function() {
          console.log('hovered!');
        },
        alertBookToo: function() {
          console.log('clicked');
        },
        template: Handlebars.compile($('#library-template').html()),

        render: function() {
          var self=this;
          var arr = {'library': self.collection.toJSON()};
          var output = self.template( arr );
          self.$el.append(output);
          return self;
        }
      });

      var myView = new LibraryView({
        collection: library,
        el: '#myLibraryViewSection'
      });

      myView.delegateEvents( {
        'mouseover #ToKillaMockingbird': 'alertBook',
        'click #WarandPeace': 'alertBookToo'
      });

      // myView.undelegateEvents();

      // changes $el to to foobar
      // myView.setElement('#foobar');

    }


  };






  // var Book = Backbone.Model.extend({
  //   destroy: function(optionsOrPagesToDestroy) {
  //       if (typeof optionsOrPagesToDestroy === 'number') {
  //         // optionsOrPagesToDestroy is pagesToDestroy: call our version
  //         this.totalPages -=  optionsOrPagesToDestroy;
  //       } else {
  //         // optionsOrPagesToDestroy is an options object: call the Backbone version
  //         Backbone.Model.prototype.destroy.apply(this, arguments);
  //       }
  //     }
  //   });


    //
    // var Book = Backbone.Model.extend({
    //   currentPage: 1,
    //   turnPage: function() {
    //     this.currentPage += 1;
    //   }
    // });
    // var simpleBook = {currentPage: 20};
    //
    // Book.prototype.turnPage.apply(simpleBook); //  simpleBook.currentPage == 21”
