import gql from "graphql-tag";

export default gql(`
mutation($author: String! $authorBirthday: String! $authorBirthplace: String! $authorOccupation: String! $authorQuote: String!
$authorCreatedDate: String!) {
  putQuote(
    author: $author
    authorBirthday: $authorBirthday
    authorBirthplace: $authorBirthplace
    authorOccupation: $authorOccupation
    authorQuote: $authorQuote
  ) {
    id
    author
    authorBirthday
    authorBirthplace
    authorOccupation
    content
    createdDate
    likes
    dislikes
    comments {
      items {
        commentId
      }
    }
  }
}`);
