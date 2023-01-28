import React, { Component } from 'react'
import {Container, Card } from 'reactstrap'
import { firebaseAuthentication } from '../config/firebase'
import '../style/style.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';

export default class Home extends Component {
    state = {
        user: {},
        password: '',
        email: '',
    }
    componentDidMount() {
        firebaseAuthentication.onAuthStateChanged((user) => {
            if (!user) {
                this.props.history.push('/login')
            } else {
                this.setState({ user })
            }
        })
    }
    handleLogOut = () => {
        firebaseAuthentication.signOut()
    }

    render() {
        console.log(this.state.user)
        const { displayName } = this.state.user
        return (
            <div>
                <Navbar value={true}/>
                <Container className="container-home">
                    <div className="d-flex bd-highlight">
                        <div className="p-2 flex-grow-1 bd-highlight">
                            <p className="mt-2">Hi, {displayName}</p>
                        </div>
                        <div className="p-2 bd-highlight">
                            <a href="/add-product" type="button" className="btn-add-product">Add Product</a>
                        </div>
                    </div>
                    <Card>
                        LIST Product
                    </Card>
                </Container>
            </div>
        )
    }
}