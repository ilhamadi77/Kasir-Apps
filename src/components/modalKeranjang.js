import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { numberWithComas } from '../config/utils'

export const ModalKeranjang = ({ showModal,
    handleClose,
    keranjangDetail,
    jumlah,
    keterangan,
    tambah,
    kurang,
    changHandler,
    handleSubmit,
    totalHarga,
    hapusPesanan
}) => {
    if (keranjangDetail) {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {keranjangDetail.product.nama} {' '}
                        <strong>
                            {numberWithComas(keranjangDetail.product.harga)}
                        </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Total Harga :</Form.Label>
                            <p>
                                <strong>
                                    {numberWithComas(totalHarga)}
                                </strong>
                            </p>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Jumlah :</Form.Label>
                            <br />

                            <Button variant='danger' size='sm' onClick={() => kurang()}>
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>{' '}

                            <strong>{jumlah}</strong>{' '}

                            <Button variant='primary' size='sm' onClick={() => tambah()}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Keterangan :</Form.Label>
                            <Form.Control
                                as={'textarea'}
                                placeholder='Contoh : Pedas, Nasi Setengah'
                                name='keterangan'
                                value={keterangan}
                                rows={3}
                                onChange={(event) => changHandler(event)}
                            />
                        </Form.Group>
                        <Button variant='primary' className='mt-2' type='submit'>Simpan</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={() => hapusPesanan(keranjangDetail.id)}>
                        <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    } else {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{keranjangDetail}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woho is modal Bootstrap
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant='primary'>save</Button>
                    <Button onClick={handleClose} variant='secondary'> close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
