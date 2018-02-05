import React, { Component } from 'react'
import { Accordion, Form, Menu } from 'semantic-ui-react'

const ColorForm = (
    <Form.Input placeholder='Author name...' />
)

const OccupationForm = (
    <Form>
        <Form.Group grouped>
            <Form.Checkbox label='Arts' name='color' value='blue' />
            <Form.Checkbox label='Business' name='color' value='red' />
            <Form.Checkbox label='Entertrainment' name='color' value='blue' />
            <Form.Checkbox label='Military' name='color' value='blue' />
            <Form.Checkbox label='Writer' name='color' value='blue' />
            <Form.Checkbox label='Philosopher' name='color' value='blue' />
            <Form.Checkbox label='Politics' name='color' value='blue' />
            <Form.Checkbox label='Science and Engineering' name='color' value='blue' />
            <Form.Checkbox label='Sports' name='color' value='blue' />
            <Form.Checkbox label='Religion and Spirituality' name='color' value='green' />
        </Form.Group>
    </Form>
)

export default class AccordionExampleMenu extends Component {
    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state

        return (
            <Accordion as={Menu} vertical style={{ textAlign: 'left' }}>
                <Menu.Item>
                    <Accordion.Title
                        active={activeIndex === 0}
                        content='Occupation category'
                        index={0}
                        onClick={this.handleClick}
                    />
                    <Accordion.Content active={activeIndex === 0} content={OccupationForm} />
                </Menu.Item>

                <Menu.Item>
                    <Accordion.Title
                        active={activeIndex === 1}
                        content='Name contains'
                        index={1}
                        onClick={this.handleClick}
                    />
                    <Accordion.Content active={activeIndex === 1} content={ColorForm} />
                </Menu.Item>
            </Accordion>
        )
    }
}