import React, { Component } from 'react'
import { Grid, Image, Rail, Segment, Sticky } from 'semantic-ui-react'
import FeedExampleBasic from '../Feed'
import VerticalMenu from '../VerticalMenu'
import FilterQuotes from './FilterQuotes'
import MottoBookHeader from '../Header'
import MottoBookFooter from '../Footer'

export default class OccupationCategory extends Component {
    constructor() {
        super();

        this.state = {
            radioSelected: 'clear',
        }
    }

    handleContextRef = contextRef => this.setState({ contextRef })

    handleCategoryClick = (item) => {

        this.setState({
            radioSelected: item.value
        })
    }

    componentWillReceiveProps(nextProps) {
        let radioSelected = nextProps.match.params.category
        console.log('occupation category radio selected: ',radioSelected)
        this.setState({
            radioSelected: radioSelected
        })
    }
    componentDidMount() {
        console.log('Occupation Category componentDidMount props', this.props);
        let radioSelected = this.props.match.params.category
        console.log('occupation category radio selected: ',radioSelected)
        this.setState({
            radioSelected: radioSelected
        })
    }

    render() {

        const { contextRef } = this.state
        return (
            <div>

                <MottoBookHeader auth={this.props.auth} {...this.props} />
                <h1>{this.props.match.params.name}</h1>
                <Grid centered style={{ marginTop: '3em' }}>

                    <div ref={this.handleContextRef}>
                        <Segment>
                            <Grid.Column width={8}>
                                <FilterQuotes {...this.state}/>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Rail position='left'>
                                    <Sticky context={contextRef} offset={70}>
                                        <VerticalMenu onCategoryClick={this.handleCategoryClick} radioSelected={this.state.radioSelected}/>
                                    </Sticky>
                                </Rail>
                            </Grid.Column>
                            {/*<Grid.Column width={5}>*/}
                                {/*<Rail position='right'>*/}
                                    {/*<Sticky context={contextRef} offset={70}>*/}
                                        {/*<FeedExampleBasic />*/}
                                    {/*</Sticky>*/}
                                {/*</Rail>*/}
                            {/*</Grid.Column>*/}
                        </Segment>
                    </div>

                </Grid>
            </div>
        )
    }
}
