
import React, { Component } from 'react'
import { Hasil, ListCategories, Menus } from '../components';
import { Col, Container, Row } from 'react-bootstrap';
import { URL_API } from '../config/constans';
import axios from 'axios';
import Swal from 'sweetalert2'

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menus: [],
            categoryYangDipilih: 'Makanan',
            keranjangs: []
        }
    }

    componentDidMount() {
        axios
            .get(URL_API + "products?category.nama=" + this.state.categoryYangDipilih)
            .then(res => {
                const menus = res.data;
                this.setState({ menus });
            })

            .catch(error => {
                console.log('Coba cek lagi servernya', error);
            })

        this.getListKeranjang();
    }

    // componentDidUpdate(prevState) {
    //     if (this.state.keranjangs !== prevState.keranjangs) {
    //         axios
    //             .get(URL_API + "keranjangs")
    //             .then(res => {
    //                 const keranjangs = res.data;
    //                 this.setState({ keranjangs });
    //             })

    //             .catch(error => {
    //                 console.log('Coba cek lagi servernya', error);
    //             })
    //     }
    // }

    getListKeranjang = () => {
        axios
            .get(URL_API + "keranjangs")
            .then(res => {
                console.log("response :", res)
                const keranjangs = res.data;
                this.setState({ keranjangs });
            })

            .catch(error => {
                console.log('Coba cek lagi servernya', error);
            })
    }


    changeCategory = (value) => {

        this.setState({
            categoryYangDipilih: value,
            menus: [],
        });

        axios
            .get(URL_API + "products?category.nama=" + value)
            .then(res => {
                const menus = res.data;
                this.setState({ menus });
            })

            .catch(error => {
                console.log('Coba cek lagi servernya', error);
            })

    }

    masukKeranjang = (value) => {
        axios
            .get(URL_API + "keranjangs?product.id=" + value.id)
            .then(res => {
                if (res.data.length === 0) {
                    const keranjang = {
                        jumlah: 1,
                        total_harga: value.harga,
                        product: value
                    }

                    axios
                        .post(URL_API + "keranjangs", keranjang)
                        .then(res => {
                            this.getListKeranjang();
                            Swal.fire({
                                position: 'top',
                                icon: 'success',
                                title: 'Sukses Masuk Keranjang',
                                text: 'Sukses Masuk Keranjang ' + keranjang.product.nama,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        })
                        .catch(error => {
                            console.log('Coba cek lagi servernya', error);
                        });
                } else {
                    const keranjang = {
                        jumlah: res.data[0].jumlah + 1,
                        total_harga: res.data[0].total_harga + value.harga,
                        product: value
                    }
                    axios
                        .put(URL_API + "keranjangs/" + res.data[0].id, keranjang)
                        .then(res => {
                            Swal.fire({
                                position: 'top',
                                icon: 'success',
                                title: 'Sukses Masuk Keranjang',
                                text: 'Sukses Masuk Keranjang ' + keranjang.product.nama,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        })
                        .catch(error => {
                            console.log('Coba cek lagi servernya', error);
                        });

                }
            })

            .catch(error => {
                console.log('Coba cek lagi servernya', error);
            })

    }

    render() {

        const { menus, categoryYangDipilih, keranjangs } = this.state
        return (
            <>
                <div className='mt-3'>
                    <Container fluid mt={4}>
                        <Row>
                            <ListCategories
                                changeCategory={this.changeCategory}
                                categoryYangDipilih={categoryYangDipilih}
                            />

                            <Col md={7}>
                                <h4>
                                    <strong>Daftar Makanan</strong>
                                </h4>
                                <hr />
                                <Row className='overflow-auto menu'>
                                    {menus && menus.map((menu) => (
                                        <Menus
                                            key={menu.id}
                                            menu={menu}
                                            masukKeranjang={this.masukKeranjang}
                                        />
                                    ))}
                                </Row>
                            </Col>
                            <Hasil
                                keranjangs={keranjangs}
                                {...this.props}
                                getListKeranjang={this.getListKeranjang}
                            />
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}



