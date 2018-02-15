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
                <Grid centered columns={3} style={{ marginTop: '3em' }}>
                    <Grid.Column computer={'3'} only={'computer'}>
                        <VerticalMenu onCategoryClick={this.handleCategoryClick} radioSelected={this.state.radioSelected}/>
                    </Grid.Column>
                    <Grid.Column mobile={'16'} textAlign={'center'} computer={'7'}>
                        <FilterQuotes {...this.state}/>
                    </Grid.Column>
                    {/*<Grid.Column computer={'3'} only={'computer'}>*/}
                        {/*<FeedExampleBasic />*/}
                    {/*</Grid.Column>*/}
                </Grid>
                <MottoBookFooter />

            </div>
        )
    }
}
