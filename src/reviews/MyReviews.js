import React, {useState, useEffect, useRef} from 'react';
import {Row, Col, Container} from 'reactstrap'
import {Button, Form, FormGroup, Input} from 'reactstrap';
import Modal from 'react-modal';
import EditReview from './EditReview';
    
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    
    const MyReviews = (props) => {
        const [value, setValue] = useState('');
        const [modalIsOpen, setIsOpen] = useState(false);
        const [selected, setSelected] = useState('');
            
        const fetchMovies = () => {
            console.log(props.token);
            fetch('https://cb-movie-reviews-server.herokuapp.com/reviews/myreviews', {
                method: 'GET',
                headers: new Headers ({
                    'Content-Type': 'application.json',
                    'Authorization': `Bearer ${props.token}`
                })
            }).then((res) => res.json())
            .then((reviewData) => {
                setValue(reviewData)
                console.log(value)
            })
        }

        fetchMovies();

        const openModal = result =>{
            setIsOpen(result);
        }
        
        function afterOpenModal() {
            // references are now sync'd and can be accessed.
        }
        
        const closeModal = result => {
            setIsOpen(false);
        }
    
    return (
        <Container id='homeWrapper'>
            <Row className='resultsWrapper g-0'>
                {value !== undefined ? value.map(result => {
                    return (
                        <Col className='resultsCol'>
                            {result.imageURL != null ? <img src={`https://image.tmdb.org/t/p/w154${value.imageURL}`} alt='No poster available' /> :
                                <h2 className='altBackground'>No poster available</h2>}
                            <h5>{value.title}</h5>
                            <p>{value.review}</p>
                            <Button 
                            onMouseEnter={() => {setSelected(value)}}
                            onClick={() => {setSelected(value); openModal(selected); console.log(selected)}}>Movie Details
                            </Button>
                        </Col>
                    )
                })
                    :
                    <Col className='noResultsCol'>
                        <h1>You have no reviews.</h1>
                    </Col>
                }
            </Row>
            {!!selected && (
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Movie Details"
            >
                                
                <h2>Movie Details</h2>
                <div>{selected.poster_path != null ? <img src={`https://image.tmdb.org/t/p/w154${selected.poster_path}`} alt='No poster available' /> :
                <h2 className='altBackground'>No poster available</h2>}</div>
                <h4>{selected.title}</h4>
                <div>
                    <p>{selected.overview}</p>
                </div>
                <EditReview selected={selected} token={props.token} />
                <Button className="homepageButton" onClick={closeModal}>Close</Button>
            </Modal>
            )}
        </Container>
    )
}

export default MyReviews;