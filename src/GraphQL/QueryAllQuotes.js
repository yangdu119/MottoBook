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
        comments {
        items {
          commentId
        }
      }
    }
    nextToken
  }
}`);
