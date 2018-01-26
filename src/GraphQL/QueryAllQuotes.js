import gql from "graphql-tag";

export default gql(`
query{
  allQuotes{
    id
    authorQuote
    authorBirthday
    authorBirthplace
    authorBirthname
    authorOccupation
    author
    likes
    dislikes
  }
}`);
