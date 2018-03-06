import React, { Component } from 'react'
import { Grid, Table, Dimmer, Loader} from 'semantic-ui-react'
import MottoBookHeader from '../../Header'
import MottoBookFooter from '../../Footer'
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { Link } from 'react-router-dom'

class AllAuthorsPage extends Component {

    processLink(authorName) {
        authorName = authorName.replace(/ /g,"_");
        return authorName
    }
    render() {
        console.log('AllAuthorsPage',this.props);
        const { allAuthors: { loading, error } } = this.props;
        if (loading) {
            return (
                <Dimmer active inverted>
                    <Loader>Loading</Loader>
                </Dimmer>
            )
        } else if (error) {
            return <p>Error!</p>;
        } else {
            return (
                <div>
                    <MottoBookHeader auth={this.props.auth} {...this.props} />
                    <Grid centered columns={3} style={{marginTop: '3em'}}>
                        <Grid.Column mobile={'16'} textAlign={'center'} computer={'7'}>
                            <Table striped>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Author</Table.HeaderCell>
                                        <Table.HeaderCell>Birthday</Table.HeaderCell>
                                        <Table.HeaderCell>Birthplace</Table.HeaderCell>
                                        <Table.HeaderCell>Occupation</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {

                                        this.props.allAuthors.authors && this.props.allAuthors.authors.map(
                                            author => (
                                                <Table.Row>
                                                    <Table.Cell><Link
                                                        to={`/author/${this.processLink(author.author)}`}>{author.author}</Link></Table.Cell>
                                                    <Table.Cell>{author.authorBirthday}</Table.Cell>
                                                    <Table.Cell>{author.authorBirthplace}</Table.Cell>
                                                    <Table.Cell>{author.authorOccupation}</Table.Cell>
                                                </Table.Row>
                                            )
                                        )
                                    }
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid>
                    <MottoBookFooter />
                </div>
            )
        }
    }
}

const ALL_AUTHORS_QUERY = gql`
    query allAuthorsQuery{
        authors(orderBy: author_ASC){
            author
            authorCategory
            authorBirthday
            authorBirthplace
            authorOccupation
        }
    }
`
const allAuthorsGraphql = graphql(ALL_AUTHORS_QUERY, {
    name: 'allAuthors',
    options: {
        variables: {
        },
        fetchPolicy: 'cache-and-network',
    }
})

export default compose(
    allAuthorsGraphql,
)(AllAuthorsPage)
