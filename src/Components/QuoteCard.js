import React from 'react'
import { Link } from 'react-router-dom'
import {Card, Image, Icon, List} from 'semantic-ui-react'
import graphqlEndPoint from "../GraphQLConfig"
import {createApolloFetch} from 'apollo-fetch';
import gql from 'graphql-tag'
import { graphql, compose } from "react-apollo";
import DocumentMeta from 'react-document-meta';
import {FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon} from 'react-share'

class QuoteCard extends React.Component {

    processLink(authorName) {
        authorName = authorName.replace(/ /g,"_");
        return authorName
    }

    getQuoteLikesDislikes = (quoteId) => new Promise(function(resolve, reject){
        const uri = graphqlEndPoint.prisma
        const apolloFetch = createApolloFetch({uri})
        const getLikesQuery = `
            query getLikes{
              quote(where: {id: "${quoteId}"}){
                likes
                dislikes
                likedBy{
                    id
                    name
                }
                dislikedBy{
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
                    resolve(data.quote)
                }
            })
    })

    getUserId = (sub) => new Promise(function(resolve, reject){
        const uri = graphqlEndPoint.prisma
        const apolloFetch = createApolloFetch({uri})
        const query = `
            query{
              user(where:{sub: "${sub}"}){
                id
              }
            }
        `

        apolloFetch({query})
            .then(result => {
                const {data, errors, extensions} = result;
                if (data){
                    resolve(data.user.id)
                }
            })
    })

    addQuoteToMyLikes = (quoteId, userId) => new Promise(function(resolve, reject){
        const uri = graphqlEndPoint.prisma
        const apolloFetch = createApolloFetch({uri})
        const query = `
            mutation {
              updateQuote(
                where:{
                  id:"${quoteId}"
                }
                data:{
                  likedBy:{
                    connect:{
                      id:"${userId}"
                    }
                  }
                }
              ){
                id
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

    addQuoteToMyDisLikes = (quoteId, userId) => new Promise(function(resolve, reject){
        const uri = graphqlEndPoint.prisma
        const apolloFetch = createApolloFetch({uri})
        const query = `
            mutation {
              updateQuote(
                where:{
                  id:"${quoteId}"
                }
                data:{
                  dislikedBy:{
                    connect:{
                      id:"${userId}"
                    }
                  }
                }
              ){
                id
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

    incrementLikesHelper(quoteId, likes){
        this.props.updateLikes({
            quoteId: quoteId,
            likes: likes+1
        })
    }

    async incrementLikes(quoteId){
        const {likes, likedBy} = await this.getQuoteLikesDislikes(quoteId)
        //todo submit user profile upon clicking like or dislike
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

    async incrementDisLikes(quoteId){
        const {dislikes, dislikedBy} = await this.getQuoteLikesDislikes(quoteId)
        console.log('dislikes', dislikedBy)
        //todo submit user profile upon clicking like or dislike
        const {sub} = await this.getUserProfile(this);
        const userId = await this.getUserId(sub)
        await this.addQuoteToMyDisLikes(quoteId,userId);

        if (dislikedBy.filter(e => e.id === userId).length ==0){
            this.props.updateDisLikes({
                quoteId: quoteId,
                dislikes: dislikes+1
            })
        }else{
            //tell user he already add the quote in his mottobook
        }
        //await this.addQuoteToMyLikes(quoteId,this.props.auth.)
    }


    handleLike = () => {
        const { isAuthenticated } = this.props.auth;
        if (!isAuthenticated()){
            this.props.auth.login();
            console.log('navigate to login page')
        }else{
            //first increment like count on quote
            //second add edges relationship between user and quote
            this.incrementLikesHelper(this.props.quote.id, this.props.quote.likes);
        }
    }

    handleDislike = () => {
        const { isAuthenticated } = this.props.auth;
        if (!isAuthenticated()){
            this.props.auth.login();
            console.log('navigate to login page')
        }else{
            this.incrementDisLikes(this.props.quote.id)
        }
    }

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
        // const meta = {
        //     // title: 'Some Meta Title',
        //     // description: 'I am a description, and I can create multiple tags',
        //     // canonical: 'http://example.com/path/to/page',
        //      meta: {
        //         charset: 'utf-8',
        //         // name: {
        //         //     keywords: 'react,meta,document,html,tags'
        //         // },
        //         property: {
        //             "og:site_name": "MottoBook",
        //             "og:url": `https://www.mottobook.com/quote/${this.props.quote.id}`,
        //             "og:type": "article",
        //             "og:title": `"${this.props.quote.author} Quotes"`,
        //             "og:description": `"${this.props.quote.authorQuote}"`,
        //             "og:image": `"${this.props.quote.imageUrl}"`,
        //         },
        //     }
        // };
        return (
            <div>
                {/*<DocumentMeta {...meta}>*/}
                {/*</DocumentMeta>*/}
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


                    </Card.Content>

                    <Card.Content extra>

                        {/*<a onClick={this.handleLike}>*/}
                            {/*<Icon name='heart' />*/}
                            {/*Add to my MottoBook*/}
                        {/*</a>*/}

                        <a onClick={this.handleLike} style={{ marginLeft: '2em' }}>
                            <Icon name='thumbs outline up' />
                            {this.props.quote.likes} Likes
                        </a>

                        <a onClick={this.handleDislike} style={{ marginLeft: '2em' }}>
                            <Icon name='thumbs outline down' />
                            {this.props.quote.dislikes} Dislikes
                        </a>



                        <a style={{ marginLeft: '2em' }} onClick={this.handleComments}>
                            <Icon name='comments' />
                            Comments
                        </a>

                        {/*<Icon name='empty heart' style={{ marginLeft: '2em' }}/>*/}
                        {/*{this.props.quote.likes}*/}
                    </Card.Content>

                    <Card.Content extra>

                        <FacebookShareButton style={{display: 'inline-block'}}
                            url={`https://www.mottobook.com/quote/${this.props.quote.id}`}
                            quote={`"${this.props.quote.authorQuote}" by ${this.props.quote.author} - ${occupationList[0]}, born: ${this.props.quote.authorBirthday}, ${this.props.quote.authorBirthplace}`}
                        >
                            {/*<a style={{ marginLeft: '2em' }}>*/}
                                {/*<Icon name='share' />*/}
                                {/*Share*/}
                            {/*</a>*/}
                            {/*<Icon name='share' />*/}
                            <FacebookIcon
                                size={32}
                                round />

                        </FacebookShareButton>

                        <TwitterShareButton style={{display: 'inline-block',marginLeft: '2em'}}
                            url={`https://www.mottobook.com/quote/${this.props.quote.id}`}
                            title={`"${this.props.quote.authorQuote}" by ${this.props.quote.author} - ${occupationList[0]}, born: ${this.props.quote.authorBirthday}, ${this.props.quote.authorBirthplace}`}
                            >
                            <TwitterIcon
                                size={32}
                                round />
                        </TwitterShareButton>

                    </Card.Content>


                </Card>
                <br/>
            </div>
            </div>
        )
    }
}
const updateLikes = gql`
    mutation mutateLikes($quoteId: ID!, $likes:Int!){
              updateQuote(
                  where:{id: $quoteId}
                  data:{likes: $likes}
              ){
                id
                __typename
                likes
                
              }
            }
    `

const updateDislikes = gql`
    mutation mutateDislikes($quoteId: ID!, $dislikes:Int!){
        updateQuote(
            where:{id: $quoteId}
            data:{dislikes: $dislikes}
        ){
            id
            __typename
            dislikes

        }
    }
    `

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

const UpdateDisLikesWithData = graphql(updateDislikes, {
    props: ({ ownProps, mutate }) => ({
        updateDisLikes({ quoteId, dislikes }) {
            return mutate({
                variables: { quoteId, dislikes },
                optimisticResponse: {
                    updateQuote: {
                        id: quoteId,
                        __typename: 'Quote',
                        dislikes: dislikes,
                    },
                },
            });
        },
    }),
})
export default compose(
    UpdateLikesWithData,
    UpdateDisLikesWithData,
)(QuoteCard)
