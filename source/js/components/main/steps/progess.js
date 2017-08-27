import React from 'react';
import {Link} from 'react-router';

class Progress extends React.Component {
    render() {

        const {percent, session} = this.props;

        return (
            <div className="progess">
                Создание видео: {percent} %

                {session &&
                    <div>
                        Ссылка на видео: <br />
                        <Link to={`/player/${session}`}>{`${location.origin}/player/${session}`}</Link>
                    </div>
                }
            </div>
        );
    }
}

export default Progress;