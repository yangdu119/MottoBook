import React from 'react'
import { Link } from 'react-router-dom'
import {Card, Image, Icon, List} from 'semantic-ui-react'
import gql from 'graphql-tag'
import { graphql, compose } from "react-apollo";
import {FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon} from 'react-share'

class QuoteCard extends React.Component {



    processLink(authorName) {
        authorName = authorName.replace(/ /g,"_");
        return authorName
    }


    incrementLikes(){
        const prisma_userId = this.props.auth.userProfile.prisma_userId;
        console.log('prisma_userId', prisma_userId)
        this.props.updateLikes({
            quoteId: this.props.quote.id,
            likes: this.props.quote.likes+1,
            userId: prisma_userId
        })
    }

    decrementLikes(){
        console.log('decrementLikes props', this.props)
        const prisma_userId = this.props.auth.userProfile.prisma_userId;

        this.props.decrementLikes({
            quoteId: this.props.quote.id,
            likes: this.props.quote.likes-1,
            userId: prisma_userId
        })
    }


    handleLike = () => {

        const { isAuthenticated } = this.props.auth;
        if (!isAuthenticated()){
            this.props.auth.login();
        }else{
            const prisma_userId = this.props.auth.userProfile.prisma_userId;
            // if user doesn't like the quote yet.
            if (this.props.quote.likedBy.filter(e => e.id === prisma_userId).length ===0) {
                console.log('incrementlikes')
                this.incrementLikes();
            }else{
                console.log('decrementlikes')
                this.decrementLikes();
            }
        }
    }

    handleComments = () => {
        const { isAuthenticated } = this.props.auth;
        if (!isAuthenticated()){
            this.props.auth.login();
        }
    }

    processOccupationLink(occupation) {
        return `/search/${occupation}`
    }

    render() {
        const autorLink = `/author/${this.processLink(this.props.quote.author)}`
        const quoteDetailLink = `/quote/${this.props.quote.id}`
        const occupationList = this.props.quote.authorOccupation.split(",").map(Function.prototype.call, String.prototype.trim);
        const { isAuthenticated } = this.props.auth;

        let likesIcon = <Icon name='thumbs outline up' />;
        let dislikesIcon = <Icon name='thumbs outline down' />;
        if (isAuthenticated() && this.props.auth.userProfile){
            const userId = this.props.auth.userProfile.prisma_userId;
            const likedBy = this.props.quote.likedBy;
            const dislikedBy = this.props.quote.dislikedBy;
            if (likedBy && likedBy.some(e => e.id === userId)){
                likesIcon = <Icon name='thumbs up' />
            }
            if (dislikedBy && dislikedBy.some(e => e.id === userId)){
                dislikesIcon = <Icon name='thumbs down' />
            }
        }

        return (
            <div>
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

                            {likesIcon}
                            {this.props.quote.likes} Likes
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
    mutation mutateLikes($quoteId: ID!, $userId: ID!, $likes:Int!){
              updateQuote(
                  where:{id: $quoteId}
                  data:{likes: $likes, likedBy: {
                      connect: {
                          id: $userId
                      }
                  }}
              ){
                id
                __typename
                likes
                likedBy{
                    id
                    name
                }
              }
            }
    `

const decrementLikes = gql`
    mutation mutateLikes($quoteId: ID!, $userId: ID!, $likes:Int!){
        updateQuote(
            where:{id: $quoteId}
            data:{likes: $likes, likedBy: {
                disconnect: {
                    id: $userId
                }
            }}
        ){
            id
            __typename
            likes
            likedBy{
                id
                name
            }
        }
    }
`

const UpdateLikesWithData = graphql(updateLikes, {
    props: ({ ownProps, mutate }) => ({
        updateLikes({ quoteId, userId, likes }) {
            return mutate({
                variables: { quoteId, userId, likes },

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

const DecrementLikesWithData = graphql(decrementLikes, {
    props: ({ ownProps, mutate }) => ({
        decrementLikes({ quoteId, userId, likes }) {
            return mutate({
                variables: { quoteId, userId, likes },

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


export default compose(
    UpdateLikesWithData,
    DecrementLikesWithData,
)(QuoteCard)
