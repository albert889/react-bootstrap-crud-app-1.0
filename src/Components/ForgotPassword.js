import React, {Component} from 'react'
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import { firebaseAuthentication } from '../config/firebase'

import 'bootstrap/dist/css/bootstrap.min.css';


export default class ForgotPassword extends Component{
    state = {
        email:'',
    }
    handleChangeField = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        const {email} = this.state
        firebaseAuthentication.sendPasswordResetEmail(email)
        .then(()=>{
            alert('Silahkan periksa email anda untuk mengubah password')
            this.props.history.push('/login')
        })
        .catch(error=>{
            alert(error.message)
        })
    }
    render(){
        const {email} = this.state
        return(
            <Container>
            <Form>
                <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="Masukkan Email Anda" onChange={this.handleChangeField} value={email} required />
                </FormGroup>
                <Button type="submit" color="primary" block>Kirim Email Reset Password</Button>
            </Form>
            <p>Belum punya akun? <Link to="/registrasi">Registrasi</Link></p>
            <p>Sudah Punya Akun? <Link to="/login">Login</Link></p>
            </Container>
        )
    }
}
