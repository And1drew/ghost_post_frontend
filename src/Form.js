import React from 'react'
import './App.css';

class Form extends React.Component {
    render() {
        return (<div id='formComp'>
            <form onSubmit={this.props.handleSubmit}>
                <label>
                    Description:
                    <input type="text" value={this.props.post_text} onChange={this.props.handleChange} />
                </label>
                <label>
                    is a Boast:
                    <input type='checkbox' onChange={this.props.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>)
    }
}

export default Form;