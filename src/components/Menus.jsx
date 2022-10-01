import React from 'react'
import { Col, Card } from 'react-bootstrap'
import { numberWithComas } from '../config/utils'


const Menus = ({ menu, masukKeranjang }) => {
    return (
        <Col lg={4} md={4} xs={6} className='mb-4'>
            <Card className='shadow' >
                <Card.Img variant="top"
                    src={"assets/images/" +
                        menu.category.nama.toLowerCase() +
                        "/" + menu.gambar}
                />
                <Card.Body>
                    <Card.Title>{menu.nama} </Card.Title>
                    <Card.Text> <strong>({menu.kode})</strong></Card.Text>
                    <Card.Text>
                        Rp. {numberWithComas(menu.harga)}
                    </Card.Text>
                    <button className='btnCool' onClick={() => masukKeranjang(menu)}>Buy</button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Menus;