import React, { Component } from 'react'
import { Accordion, Form, Menu, Icon } from 'semantic-ui-react'
import history from '../history'


const OccupationForm = (props) => {
    return (
        <Form>
            <Form.Group grouped>
                <Form.Radio label='Arts' name='arts' value='arts' checked={props.value==='arts'} onClick={props.onItemClick}/>
                <Form.Radio label='Business' name='business' value='business' checked={props.value==='business'}  onClick={props.onItemClick}/>
                <Form.Radio label='Entrepreneur' name='entrepreneur' value='entrepreneur' checked={props.value==='entrepreneur'} onClick={props.onItemClick}/>
                <Form.Radio label='Entertainment' name='entertainment' value='entertainment' checked={props.value==='entertainment'} onClick={props.onItemClick}/>
                <Form.Radio label='Military' name='military' value='military' checked={props.value==='military'} onClick={props.onItemClick}/>
                <Form.Radio label='Writer' name='writer' value='writer' checked={props.value==='writer'} onClick={props.onItemClick}/>
                <Form.Radio label='Philosopher' name='philosopher' value='philosopher' checked={props.value==='philosopher'} onClick={props.onItemClick}/>
                <Form.Radio label='Politics' name='politics' value='politics' checked={props.value==='politics'} onClick={props.onItemClick}/>
                <Form.Radio label='Science and Engineering' name='science' value='science' checked={props.value==='science'} onClick={props.onItemClick}/>
                <Form.Radio label='Sports' name='sports' value='sports' checked={props.value==='sports'}  onClick={props.onItemClick}/>
                <Form.Radio label='Religion and Spirituality' name='religion' value='religion' checked={props.value==='religion'} onClick={props.onItemClick}/>
            </Form.Group>
        </Form>
    )
}

export default class VerticalMenu extends Component {
    state = {
        activeIndex: 0,
        authorName: '',
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
        console.log('newIndex', newIndex);

        this.setState({ activeIndex: newIndex })
    }

    handleItemClick = (e, titleProps) => {
        //console.log('titleProps',titleProps);
        this.setState({
            radioValue: titleProps.value
        })
        console.log("push to history", titleProps.value)
        if (titleProps.value === 'clear'){
            history.push(`/`);
        }else{
            history.push(`/category/${titleProps.value}`);
        }


        //this.props.onCategoryClick(titleProps)
    }

    handleBrowseAuthors = () => {
        history.push(`/allAuthors`);
    }

    componentDidMount() {
        this.setState({
            radioValue: this.props.radioSelected
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            radioValue: nextProps.radioSelected
        })
    }

    render() {
        const { activeIndex } = this.state
        const {activeItem} = this.state
        //console.log('radio value', this.state.radioValue);

        return (
            <div>
            <Accordion as={Menu} vertical style={{ textAlign: 'left' }}>
                <Menu.Item>
                    <Accordion.Title
                        active={activeIndex === 0}
                        content='Categories'
                        index={0}
                        onClick={this.handleClick}
                    />
                    <Accordion.Content active={activeIndex === 0} content={<OccupationForm onItemClick={this.handleItemClick} value={this.state.radioValue}/>} />
                </Menu.Item>

                <Menu.Item name='browse' active={activeItem === 'browse'} onClick={this.handleBrowseAuthors}>
                    <Icon name='users' />
                    Browse Authors
                </Menu.Item>
            </Accordion>
            </div>
        )
    }
}