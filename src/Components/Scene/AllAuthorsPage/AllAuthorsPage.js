import React, { Component } from 'react'
import { Grid, Image, Rail, Segment, Sticky, Table} from 'semantic-ui-react'
import MottoBookHeader from '../../Header'
import MottoBookFooter from '../../Footer'
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { Link } from 'react-router-dom'

class AllAuthorsPage extends Component {

    render() {
        console.log('AllAuthorsPage',this.props);

        return (
            <div>
                <MottoBookHeader auth={this.props.auth} {...this.props} />
                <Grid centered columns={3} style={{ marginTop: '3em' }}>
                    <Grid.Column mobile={'16'} textAlign={'center'} computer={'7'}>
                        <Table celled>
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
                                    this.props.allAuthors.allAuthors && this.props.allAuthors.allAuthors.map(
                                        author => (
                                            <Table.Row>
                                                <Table.Cell><Link to={`/author/${author.author}`}>{author.author}</Link></Table.Cell>
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
            </div>
        )
    }
}

const ALL_AUTHORS_QUERY = gql`
    query allAuthorsQuery{
        allAuthors(orderBy: author_ASC){
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
