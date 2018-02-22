import React from 'react'
import { Link } from 'react-router-dom'
import {Card, Image, Icon, List} from 'semantic-ui-react'
import graphqlEndPoint from "../GraphQLConfig"
import {createApolloFetch} from 'apollo-fetch';
import gql from 'graphql-tag'
import { graphql, compose } from "react-apollo";

class QuoteCard extends React.Component {

    processLink(authorName) {
        authorName = authorName.replace(/ /g,"_");
        return authorName
    }

    getQuoteLikes = (quoteId) => new Promise(function(resolve, reject){
        const uri = graphqlEndPoint.graphqlEndPoint
        const apolloFetch = createApolloFetch({uri})
        const getLikesQuery = `
            query getLikes{
              Quote(id: "${quoteId}"){
                likes
                likedBy{
                    id
                    name
                }
              }
            }
        `

        apolloFetch({query:getLikesQuery})
            .then(result => {
                const {data, errors, extensions} = result;
                if (data){
                    resolve(data.Quote)
                }
            })
    })

    getUserId = (sub) => new Promise(function(resolve, reject){
        const uri = graphqlEndPoint.graphqlEndPoint
        const apolloFetch = createApolloFetch({uri})
        const query = `
            query{
              User(sub: "${sub}"){
                id
              }
            }
        `

        apolloFetch({query})
            .then(result => {
                const {data, errors, extensions} = result;
                if (data){
                    resolve(data.User.id)
                }
            })
    })

    // getQuoteDisLikes = (quoteId) => new Promise(function(resolve, reject){
    //     const uri = graphqlEndPoint.graphqlEndPoint
    //     const apolloFetch = createApolloFetch({uri})
    //     const getLikesQuery = `
    //         query getLikes{
    //           Quote(id: "${quoteId}"){
    //             dislikes
    //             likedBy
    //           }
    //         }
    //     `
    //
    //     apolloFetch({query:getLikesQuery})
    //         .then(result => {
    //             const {data, errors, extensions} = result;
    //             if (data){
    //                 console.log('data quote', data.Quote)
    //                 resolve(data.Quote.dislikes)
    //             }
    //         })
    // })

    addQuoteToMyLikes = (quoteId, userId) => new Promise(function(resolve, reject){
        const uri = graphqlEndPoint.graphqlEndPoint
        const apolloFetch = createApolloFetch({uri})
        const query = `
            mutation {
              addToUserLikeQuotes(
                likedByUserId: "${userId}"
                likeQuotesQuoteId: "${quoteId}"
              ){
                likedByUser{
                  id
                }
                likeQuotesQuote{
                  id
                }
              }
            }
        `

        apolloFetch({query})
            .then(result => {
                const {data, errors, extensions} = result;
                if (data){
                    resolve(data)
                }
            })
    })

    getUserProfile = (that) => new Promise(function(resolve, reject){
        const { userProfile, getProfile } = that.props.auth;
        if (!userProfile) {
            getProfile((err, profile) => {
                resolve(profile)
            });
        } else {
            resolve(userProfile)
        }

    })

    async incrementLikes(quoteId){
        const {likes, likedBy} = await this.getQuoteLikes(quoteId)
        console.log('likedBy', likedBy)
        //get user profile
        const {sub} = await this.getUserProfile(this);
        const userId = await this.getUserId(sub)
        await this.addQuoteToMyLikes(quoteId,userId);

        if (likedBy.filter(e => e.id === userId).length ==0){
            this.props.updateLikes({
                quoteId: quoteId,
                likes: likes+1
            })
        }else{
            //tell user he already add the quote in his mottobook
        }
        //await this.addQuoteToMyLikes(quoteId,this.props.auth.)
    }

    // async incrementDisLikes(quoteId){
    //     const disLikes = await this.getQuoteDisLikes(quoteId)
    //     this.props.updateDisLikes({
    //         quoteId: quoteId,
    //         dislikes: disLikes+1
    //     })
    // }

    handleLike = () => {
        const { isAuthenticated } = this.props.auth;
        if (!isAuthenticated()){
            this.props.auth.login();
            console.log('navigate to login page')
        }else{
            //first increment like count on quote
            //second add edges relationship between user and quote
            this.incrementLikes(this.props.quote.id);
        }
    }

    // handleDislike = () => {
    //     const { isAuthenticated } = this.props.auth;
    //     if (!isAuthenticated()){
    //         this.props.auth.login();
    //         console.log('navigate to login page')
    //     }else{
    //         this.incrementDisLikes(this.props.quote.id)
    //     }
    // }

    handleComments = () => {
        const { isAuthenticated } = this.props.auth;
        if (!isAuthenticated()){
            this.props.auth.login();
            console.log('navigate to login page')
        }
    }

    processOccupationLink(occupation) {
        return `/search/${occupation}`
    }

    render() {
        const autorLink = `/author/${this.processLink(this.props.quote.author)}`
        const quoteDetailLink = `/quote/${this.props.quote.id}`
        const occupationList = this.props.quote.authorOccupation.split(",").map(Function.prototype.call, String.prototype.trim);

        return (
            <div className="card" >
                <Card fluid>
                    <Card.Content>
                        <Card.Header href={quoteDetailLink}>
                            {this.props.quote.authorQuote}
                        </Card.Header>
                        <Card.Description>
                            <Link to={autorLink}>{this.props.quote.author}</Link>
                        </Card.Description>

                        <Card.Description className={'black'}>
                            <List horizontal divided>
                                {occupationList.map(occu =>
                                    <List.Item key={occu.toString()}>
                                        <Link to={`/search/${occu}`}>{occu}</Link>
                                    </List.Item>
                                )}
                            </List>
                        </Card.Description>
                        <Card.Description>
                            Born: {this.props.quote.authorBirthday}, {this.props.quote.authorBirthplace}
                        </Card.Description>

                        <Image src={this.props.quote.imageUrl} href={quoteDetailLink}/>

                        <Card.Description>
                            <Icon name='empty heart' />
                            {this.props.quote.likes}
                        </Card.Description>


                    </Card.Content>

                    <Card.Content extra>
                        <a onClick={this.handleLike}>
                            <Icon name='heart' />
                            Add to my MottoBook
                        </a>

                        <a style={{ marginLeft: '2em' }} onClick={this.handleComments}>
                            <Icon name='comments' />
                            Comments
                        </a>

                        <a style={{ marginLeft: '2em' }}>
                            <Icon name='share' />
                            Share
                        </a>
                    </Card.Content>

                </Card>
                <br/>
            </div>
        )
    }
}
const updateLikes = gql`
    mutation mutateLikes($quoteId: ID!, $likes:Int!){
              updateQuote(
                id: $quoteId
                likes: $likes
              ){
                id
                __typename
                likes
                
              }
            }
    `

// const updateDislikes = gql`
//     mutation mutateLikes($quoteId: ID!, $dislikes:Int!){
//               updateQuote(
//                 id: $quoteId
//                 dislikes: $dislikes
//               ){
//                 id
//                 __typename
//                 dislikes
//
//               }
//             }
//     `

const UpdateLikesWithData = graphql(updateLikes, {
    props: ({ ownProps, mutate }) => ({
        updateLikes({ quoteId, likes }) {
            return mutate({
                variables: { quoteId, likes },
                optimisticResponse: {
                    updateQuote: {
                        id: quoteId,
                        __typename: 'Quote',
                        likes: likes,
                    },
                },
            });
        },
    }),
})

// const UpdateDisLikesWithData = graphql(updateDislikes, {
//     props: ({ ownProps, mutate }) => ({
//         updateDisLikes({ quoteId, dislikes }) {
//             return mutate({
//                 variables: { quoteId, dislikes },
//                 optimisticResponse: {
//                     updateQuote: {
//                         id: quoteId,
//                         __typename: 'Quote',
//                         dislikes: dislikes,
//                     },
//                 },
//             });
//         },
//     }),
// })
export default compose(
    UpdateLikesWithData,
    //UpdateDisLikesWithData,
)(QuoteCard)
