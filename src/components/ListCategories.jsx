import axios from 'axios'
import React, { Component } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import { URL_API } from '../config/constans'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faCheese, faCoffee } from '@fortawesome/free-solid-svg-icons'

const Icon = ({ nama }) => {

    if (nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="me-2" />
    if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} className="me-1" />
    if (nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="me-2" />

    return <FontAwesomeIcon icon={faUtensils} className="me-2" />
}


export default class ListCategories extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios
            .get(URL_API + "categories")
            .then(res => {
                console.log("response :", res);
                const categories = res.data
                this.setState({ categories })
            })

            .catch(error => {
                console.log("Error ya", error);
            });
    }


    render() {
        const { categories } = this.state
        const { changeCategory, categoryYangDipilih } = this.props
        return (
            <Col md={2}>
                <h4>
                    <strong>
                        Daftar Kategori
                    </strong>
                </h4>
                <hr />

                <ListGroup>

                    {categories && categories.map((category) => (
                        <ListGroup.Item
                            key={category.id}
                            onClick={() => changeCategory(category.nama)}
                            className={categoryYangDipilih === category.nama && "category-aktif"}
                            style={{ cursor: 'pointer' }}
                        >
                            <h5 >
                                <Icon nama={category.nama} /> {category.nama}
                            </h5>
                        </ListGroup.Item>
                    ))}

                </ListGroup>


            </Col >
        )
    }
}
