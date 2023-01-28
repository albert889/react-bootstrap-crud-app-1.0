import React, {Component} from 'react'
import { Button, Container, Card} from 'reactstrap'
import { firebaseAuthentication } from '../config/firebase'

import 'bootstrap/dist/css/bootstrap.min.css';

export default class Home extends Component{
    state = {
        user:{},
        password:'',
        email:'',
    }
    componentDidMount(){
        firebaseAuthentication.onAuthStateChanged((user)=>{
            if(!user){
                this.props.history.push('/login')
            }else{
                this.setState({user})
            }
        })
    }
    handleLogOut = () =>{
        firebaseAuthentication.signOut()
    }

    render(){
        console.log(this.state.user)
        const {displayName} = this.state.user
        return(
            <Container>
                <Card style={{padding:5}}>
                    <Button onClick={this.handleLogOut}>Logout</Button>
                    <h1>Ini Home</h1>
                </Card>
            </Container>
        )
    }
}