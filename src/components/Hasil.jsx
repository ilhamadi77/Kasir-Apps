import React, { Component } from 'react'
import { Badge, Col, ListGroup, Row, Card } from 'react-bootstrap'
import { numberWithComas } from '../config/utils'
import { ModalKeranjang } from './modalKeranjang'
import TotalBayar from './TotalBayar'
import { URL_API } from '../config/constans'
import axios from 'axios'
import Swal from 'sweetalert2'

export default class Hasil extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            keranjangDetail: false,
            jumlah: 0,
            keterangan: '',
            totalHarga: 0
        }
    }

    handleShow = (menuKeranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: menuKeranjang,
            jumlah: menuKeranjang.jumlah,
            keterangan: menuKeranjang.keterangan,
            totalHarga: menuKeranjang.total_harga
        })
    }

    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    tambah = () => {
        this.setState({
            jumlah: this.state.jumlah + 1,
            totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1)
        })
    }

    kurang = () => {
        if (this.state.jumlah !== 1) {
            this.setState({
                jumlah: this.state.jumlah - 1,
                totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1)
            })
        }

    }

    changHandler = (event) => {
        this.setState({
            keterangan: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.handleClose()
        const data = {
            jumlah: this.state.jumlah,
            total_harga: this.state.totalHarga,
            product: this.state.keranjangDetail.product,
            keterangan: this.state.keterangan
        }

        axios
            .put(URL_API + "keranjangs/" + this.state.keranjangDetail.id, data)
            .then(res => {
                this.props.getListKeranjang();
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Sukses Update Pesanan',
                    text: 'Sukses Update Pesanan ' + data.product.nama,
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => {
                console.log('Coba cek lagi servernya', error);
            });
    }

    hapusPesanan = (id) => {
        this.handleClose();

        axios
            .delete(URL_API + "keranjangs/" + id)
            .then(res => {
                this.props.getListKeranjang();
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Sukses Hapus Keranjang',
                    text: 'Sukses Hapus Keranjang ',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.log('Coba cek lagi servernya', error);
            });
    }

    render() {
        const { keranjangs } = this.props
        return (
            <Col md={3}>
                <h4>
                    <strong>Hasil</strong>
                </h4>
                <hr />

                {keranjangs.length !== 0 && (
                    <Card className='overflow-auto hasil'>
                        <ListGroup variant='flush'>
                            {keranjangs.map((menuKeranjang) => (
                                <ListGroup.Item onClick={() => this.handleShow(menuKeranjang)} key={menuKeranjang.product.id}>
                                    <Row>
                                        <Col xs={2} md={2}>
                                            <Badge>
                                                {menuKeranjang.jumlah}
                                            </Badge>
                                        </Col>
                                        <Col xs={7} md={7}>
                                            <h5>
                                                {menuKeranjang.product.nama}
                                            </h5>
                                            <p>Rp. {numberWithComas(menuKeranjang.product.harga)}</p>

                                        </Col>
                                        <Col xs={3} md={3}>
                                            <h6>
                                                <strong>RP.{numberWithComas(menuKeranjang.total_harga)} </strong>
                                            </h6>

                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}

                            <ModalKeranjang
                                handleClose={this.handleClose}
                                {...this.state}
                                tambah={this.tambah}
                                kurang={this.kurang}
                                changHandler={this.changHandler}
                                handleSubmit={this.handleSubmit}
                                hapusPesanan={this.hapusPesanan}
                            />
                        </ListGroup>
                    </Card>
                )}

                <TotalBayar keranjangs={keranjangs} {...this.props} />
            </Col>
        )
    }
}
