

// export default class TotalBayar extends Component {


//     submitTotalBayar = (totalBayar) => {

//         const pesanan = {
//             total_Bayar: totalBayar,
//             menus: this.props.keranjangs
//         }

//         axios.post(URL_API + "pesanans", pesanan).then((res) => {
//             this.props.navigate('/sukses')
//         })

//     }


//     render() {
//         const totalBayar = this.props.keranjangs.reduce((result, item) => {
//             return result + item.total_harga;
//         }, 0)

//         return (
//             <div className='fixed-bottom'>
//                 <Row>
//                     <Col lg={{ span: 3, offset: 9 }} className='px-5'>
//                         <h5>
//                             Total Harga: {" "}
//                             <strong className='float-end '>
//                                 Rp. {numberWithComas(totalBayar)}
//                             </strong>
//                         </h5>
//                         <div className=' d-grid'>
//                             <Button variant='success'
//                                 className='mb-2 mt-2 me-2'
//                                 size='md'
//                                 onClick={() => this.submitTotalBayar(totalBayar)}
//                             >
//                                 <FontAwesomeIcon icon={faShoppingCart} />
//                                 <strong>Bayar</strong>
//                             </Button>
//                         </div>
//                     </Col>
//                 </Row>

//             </div>
//         )
//     }
// }
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Button, Col, Row } from 'react-bootstrap'
import { URL_API } from '../config/constans';
import { numberWithComas } from '../config/utils';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function TotalBayar({ keranjangs }) {
    let navigate = useNavigate();

    const totalBayar = keranjangs.reduce((result, item) => {
        return result + item.total_harga;
    }, 0)

    const submitTotalBayar = (totalBayar) => {

        const pesanan = {
            total_Bayar: totalBayar,
            menus: keranjangs
        }

        axios.post(URL_API + "pesanans", pesanan).then((res) => {
            console.log("response Totalbayar :", res)
            navigate('/sukses')
        })

    }
    return (
        <>
            {/* Web */}
            <div className='fixed-bottom d-none d-md-block'>
                <Row>
                    <Col lg={{ span: 3, offset: 9 }} className='px-5'>
                        <h5>
                            Total Harga: {" "}
                            <strong className='float-end '>
                                Rp. {numberWithComas(totalBayar)}
                            </strong>
                        </h5>
                        <div className=' d-grid'>
                            <Button variant='success'
                                className='mb-2 mt-2 me-2'
                                size='md'
                                onClick={() => submitTotalBayar(totalBayar)}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} />
                                <strong>Bayar</strong>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Mobile */}
            <div className='d-sm-block d-md-none '>
                <Row>
                    <Col lg={{ span: 3, offset: 9 }} className='px-5'>
                        <h5>
                            Total Harga: {" "}
                            <strong className='float-end '>
                                Rp. {numberWithComas(totalBayar)}
                            </strong>
                        </h5>
                        <div className=' d-grid'>
                            <Button variant='success'
                                className='mb-2 mt-2 me-2'
                                size='md'
                                onClick={() => submitTotalBayar(totalBayar)}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} />
                                <strong>Bayar</strong>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}
