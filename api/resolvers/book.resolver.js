import bookList from './data.json';

const getBooks = (parent, args) => {
 const first = args.first || 50;
 const after = args.after || 0;

 const index = bookList.findIndex((item, i) => parseInt(item.ID) === parseInt(after));
 const offset = index + 1;
 //console.log(index, bookList.length, args);
 const books = bookList.slice(offset, offset + first);
 const lastBook = books[books.length - 1];
 const firstBook = books[0];
 return {
  pageInfo: {
   startCursor: books[0].ID,
   endCursor: lastBook.ID,
   hasNextPage: offset + first < bookList.length,
   hasBackPage: offset + first > 50,
  },
  edges: bookList.map((book) => ({
   cursor: parseInt(book.ID),
   node: book,
  })),
 };
};

export default getBooks;
