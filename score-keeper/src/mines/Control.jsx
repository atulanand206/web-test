import React from 'react';
class Control extends React.Component {

    render() {
        return (
            <div className='control-container'>
                {!this.props.gameActive && 
                    <img src='play.svg' alt='Play Game' className='icon-container' onClick={() => this.props.play()}/>
                }
                {this.props.gameActive &&
                    <img src='pause.svg' alt='Pause Game' className='icon-container' onClick={() => this.props.pause()}/>
                }
            </div>
        )
    }
}

export default Control;