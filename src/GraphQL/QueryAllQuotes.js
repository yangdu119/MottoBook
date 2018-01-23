import gql from "graphql-tag";

export default gql(`
query ($nextToken: String){
  allQuote (nextToken: $nextToken){
    items {
        id
        content
        author
        createdDate
        likes
        dislikes
        profession
        authorOccupation
        authorBirthday
        authorBirthname
        authorBirthplace
        comments {
        items {
          commentId
        }
      }
    }
    nextToken
  }
}`);
