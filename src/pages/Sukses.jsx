import axios from 'axios'
import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { URL_API } from '../config/constans'

export default class Sukses extends Component {
    componentDidMount() {
        axios
            .get(URL_API + "keranjangs")
            .then((res) => {
                const keranjangs = res.data;
                keranjangs.map(function (item) {
                    return axios
                        .delete(URL_API + "keranjangs/" + item.id)
                        .then((res) => console.log("response :", res))
                        .catch((error) => console.log("error ya", error))
                })

            })

            .catch((error) => {
                console.log('erro ya ', error);
            })
    }

    render() {
        return (
            <div className='mt-4 text-center'>
                <h2>Sukses Pesan</h2>
                <Image src='assets/images/success.svg' width={400} />
                <p className='mt-3'>Terimakasih sudah Memesan</p>

                <Button as={Link} to='/'>
                    Kembali
                </Button>
            </div>
        )
    }
}
