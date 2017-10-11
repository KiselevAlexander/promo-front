import React from 'react';
import {request} from 'managers/request';
import {API_BASE_URL, STATIC_URL} from 'consts';


class Admin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isAuth: false,
            pass: '',
            rows: []
        };
    }

    getList = (event) => {

        if (event) {
            event.preventDefault();
        }

        const {pass} = this.state;

        if (pass) {

            request.get(`${API_BASE_URL}/admin?pass=${pass}`, null)
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        isAuth: true,
                        rows: data
                    });
                })
                .catch(() => {
                    this.setState({
                        error: 'Проверьте правильность пароля'
                    });
                });

        } else {

            this.setState({
                error: 'Необходимо указать пароль'
            });

        }


    };

    passChangeHandler = (event) => {
        this.setState({
            pass: event.target.value
        });
    };

    blockVideo = (id, blocked) => {
        const {pass} = this.state;

        console.log(id);

        request.post(`${API_BASE_URL}/admin`, {
            pass,
            id,
            blocked
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState((state) => ({
                    rows: state.rows.map((item) => {
                        if (item.id === id) {
                            item.blocked = !item.blocked;
                        }
                        return item;
                    })
                }));
            })
            .catch(() => {
                this.setState({
                    error: 'Проверьте правильность пароля'
                });
            });
    };

    deleteVideo = (id) => {
        const {pass} = this.state;
        request.delete(`${API_BASE_URL}/admin/rows/delete?pass=${pass}&id=${id}`, null)
            .then((res) => res.json())
            .then((data) => {
                this.setState((state) => ({
                    rows: state.rows.filter((item) => item.id !== id)
                }));
            })
            .catch(() => {
                this.setState({
                    error: 'Проверьте правильность пароля'
                });
            });
    };

    render() {

        const {isAuth, pass, error, rows} = this.state;

        return (
            <div id="admin">
                <h1>Admin</h1>
                {!isAuth &&
                    <div className="form">
                        <form onSubmit={this.getList}>
                            <label htmlFor="password">Секретный пароль:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="password"
                                value={pass}
                                onChange={this.passChangeHandler}
                            />
                            {error && <div className="error">{error}</div>}
                            <button type="submit" onClick={this.getList} className="btn">Войти</button>
                        </form>
                    </div>
                }
                {(isAuth && rows) &&
                    <div className="rows">
                        <p><b>Всего видео: {rows.length}</b></p>
                        {rows.map((row, key) => (
                            <div key={key} className="row">
                                <div className="data">
                                    ID: {row.id}&nbsp;&nbsp;&nbsp;
                                    Статус: {row.blocked ? 'Заблокирована' : 'Активна'}
                                </div>
                                <img src={`${STATIC_URL}/static/images/${row.session}.jpg`} alt="" />
                                <div className="controls">
                                    <button onClick={() => { this.blockVideo(row.id, !row.blocked); }}>block</button>
                                    <button onClick={() => { this.deleteVideo(row.id); }}>delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        );
    }
}

export default Admin;