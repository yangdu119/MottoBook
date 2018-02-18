import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
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
    handleCategoryClick = (item) => {

        this.setState({
            radioSelected: item.value
        })
    }

    componentWillReceiveProps(nextProps) {
        let radioSelected = nextProps.match.params.category
        if (radioSelected !==this.state.radioSelected) {
            console.log('occupation category radio selected: ', radioSelected)
            this.setState({
                radioSelected: radioSelected
            })
        }
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
        return (
            <div>
                <MottoBookHeader auth={this.props.auth} {...this.props} />
                <Grid centered columns={3} style={{ marginTop: '3em' }}>
                    <Grid.Column computer={'3'} only={'computer'}>
                        <VerticalMenu onCategoryClick={this.handleCategoryClick} radioSelected={this.state.radioSelected}/>
                    </Grid.Column>
                    <Grid.Column mobile={'16'} textAlign={'center'} computer={'7'}>
                        <FilterQuotes {...this.state} auth={this.props.auth}/>
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
