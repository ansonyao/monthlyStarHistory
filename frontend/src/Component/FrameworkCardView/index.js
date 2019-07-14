import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Line, Circle } from 'rc-progress';
import errorIcon from 'Image/error-icon.png';

class FrameworkCardView extends Component {
    static propTypes = {
        onPressAdd: PropTypes.func,
        onPressRemove: PropTypes.func,
        type: PropTypes.string,
        framework: PropTypes.object,
    }

    constructor() {
        super()
        this.state = {
            showRemoveButton: false,
        }
    }

    render() {
        const { type, framework, onPressAdd, onPressEdit } = this.props
        const containerClassName = "w-32 h-32 inline-block border rounded-sm border-yellow-700 border-2 mx-6 my-3"
        if (type === "addCard") {
            return (
                <div className={`${containerClassName} flex flex-col justify-around items-center` } onClick={() => {
                    onPressAdd()
                }}>
                    <img style={{ width: 40, height: 40 }} src={require('Image/addLibrary.svg')} />
                </div>
            )
        } else {
            return (
                <div className={containerClassName}
                    onMouseEnter={() => {
                        this.setState({showRemoveButton: true})
                    }}
                    onMouseLeave={() => {
                        this.setState({showRemoveButton: false})
                    }}
                    onClick={onPressEdit}
                >
                    <div className="relative w-full h-full flex flex-col justify-around items-center">
                        {this.renderOwner(framework.owner)}
                        {this.renderName(framework.name)}
                        {this.renderLoadingIndicator()}
                        {this.renderDeleteButton()}
                    </div>
                </div>
            )
        }
    }

    renderDeleteButton = () => {
        const { showRemoveButton } = this.state;
        const { onPressRemove, framework } = this.props;
        if (showRemoveButton) {
            return (
                <img 
                    className="w-8 absolute top-0 right-0"
                    src={require('Image/delete.svg')}
                    onClick={(event) => {
                        event.stopPropagation()
                        onPressRemove(framework)
                    }}
                />
            )
        }
    }

    renderName = () => {
        const { framework: { name } } = this.props
        return (
            <div className="w-full text-center text-sm px-4" >
                {name}
            </div>
        )
    }

    renderOwner = () => {
        const { framework: { owner } } = this.props
        return (
            <div className="w-full text-center text-sm px-4" >
                {owner}
            </div>
        )
    }

    renderLoadingIndicator = () => {
        const { loading, dataError, total, worked } = this.props
        let percentage = 0
        if (total) {
            percentage = Math.round((worked / total) * 100)
        }
        if (loading) {
            return (
                <div className="w-12 h-12">
                    <Circle percent={`${percentage}`} strokeWidth="8" strokeColor="#4caf50" />
                </div>
            )
        } else if (dataError) {
            return <img src={errorIcon} className="w-8"/>
        } else {
            return null
        }
    }
}

export default FrameworkCardView

