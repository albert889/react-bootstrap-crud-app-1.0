import React, { Component } from "react";
import { Container, Card, Button } from "reactstrap";
import { firebaseAuthentication, db } from "../config/firebase";
import "../style/style.css";
import { Table } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default class Home extends Component {
  state = {
    user: {},
    password: "",
    email: "",
    data: [],
    loading: false,
  };

  componentDidMount() {
    this.fetchdata();
    firebaseAuthentication.onAuthStateChanged((user) => {
      if (!user) {
        this.props.history.push("/login");
      } else {
        this.setState({ user });
      }
    });
  }

  handleLogOut = () => {
    firebaseAuthentication.signOut();
  };

  fetchdata = () => {
    this.setState({ loading: true });
    db.collection("products")
      .get()
      .then((docRef) => {
        const data = docRef.docs.map((item) => {
          return { ...item.data(), id: item.id };
        });
        this.setState({ data });
        this.setState({ loading: false });
      });
  };

  deleteData = (id) => {
    db.collection("products")
      .doc(id)
      .delete()
      .then(() => {
        alert("Item successfully deleted!");
        console.log("Document successfully deleted!");
        this.fetchdata();
      })
      .catch((error) => {
        alert("Error removing item: ", error);
        console.error("Error removing document: ", error);
        this.fetchdata();
      });
  };

  // editData = (id) => {
  //   db.collection("products")
  //     .doc(id)
  //     console.log("cok ",)
  // }

  render() {
    console.log(this.state.user);
    const { displayName } = this.state.user;
    console.log(this.state.data, "data");
    return (
      <div>
        <Navbar value={true} />
        <Container className="container-home">
          <div className="d-flex bd-highlight">
            <div className="p-2 flex-grow-1 bd-highlight">
              <p className="mt-2">Hi, {displayName}</p>
            </div>
            <div className="p-2 bd-highlight">
              <a href="/add-product" type="button" className="btn-add-product">
                Add Product
              </a>
            </div>
          </div>
          <h2>Daftar Produk</h2>
          <Card>
            {!this.state.loading ? (
              <Table>
                <thead>
                  <tr>
                    <th>Nama Product</th>
                    <th>Deskripsi</th>
                    <th>Harga Beli</th>
                    <th>Harga Jual</th>
                    <th>Gambar</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((item) => {
                    return (
                      <tr>
                        <th width="300px">{item.productName}</th>
                        <td width="450px">{item.description}</td>
                        <td>{item.purchasePrice}</td>
                        <td>{item.sellPrice}</td>
                        <td>
                          <img
                            src={item.imageProduct}
                            width="100px"
                            height={"100px"}
                            alt={item.productName}
                          />{" "}
                        </td>
                        <td>
                          <Link to={`/edit-product/${item.id}`}>
                          <Button className="mx-3" color="primary">
                            Edit
                          </Button>
                          </Link>
                          <Button
                            color="danger"
                            onClick={() => this.deleteData(item.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <div>Loading....</div>
            )}
          </Card>
        </Container>
      </div>
    );
  }
}
