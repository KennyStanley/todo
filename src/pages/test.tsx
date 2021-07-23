import React from 'react'
import ReactCSSTransitionGroup from 'react-transition-group'

export default class TodoList extends React.Component<{}, { items: string[] }> {
    constructor(props: any) {
        super(props)
        this.state = { items: ['hello', 'world', 'click', 'me'] }
        this.handleAdd = this.handleAdd.bind(this)
    }

    handleAdd() {
        let enteredText = prompt('Enter some text')
        if (enteredText) {
            const newItems = this.state.items.concat([enteredText])
            this.setState({ items: newItems })
        }
    }

    handleRemove(i: any) {
        let newItems = this.state.items.slice()
        newItems.splice(i, 1)
        this.setState({ items: newItems })
    }

    render() {
        const items = this.state.items.map((item, i) => (
            <div key={i} onClick={() => this.handleRemove(i)}>
                {item}
            </div>
        ))

        return (
            <div>
                <button onClick={this.handleAdd}>Add Item</button>
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {items}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}
