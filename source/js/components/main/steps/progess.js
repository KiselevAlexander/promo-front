import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';

class Progress extends React.Component {
    render() {

        const {status, percent} = this.props;

        return (
            <div className="progress">
                {status !== 3 &&
                    <div className="flex progress-status">
                        <CircularProgressbar
                            percentage={percent || 0}
                        />
                    </div>
                }
            </div>
        );
    }
}

export default Progress;