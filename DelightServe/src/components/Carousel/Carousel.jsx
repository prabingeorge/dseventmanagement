import Carousel from 'react-bootstrap/Carousel';

const AppCarousel = () => {
    return (
        <Carousel data-bs-theme="dark">
            <Carousel.Item>
                <img style={{ height: '460px' }}
                    className="d-block w-100"
                    // src="holder.js/800x400?text=First slide&bg=f5f5f5"
                    src='images/carousel/10.jpg?text=First slide&bg=f5f5f5'
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h5>Out Door Wedding</h5>
                    <p>Marriage outside the church.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img style={{ height: '460px' }}
                    className="d-block w-100"
                    // src="holder.js/800x400?text=Second slide&bg=eee"
                    src='images/carousel/7.jpg?text=Second slide&bg=eee'
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h5>Birthday</h5>
                    <p>Celebration at Home.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img style={{ height: '460px' }}
                    className="d-block w-100"
                    // src="holder.js/800x400?text=Third slide&bg=e5e5e5"
                    src="images/carousel/8.jpg?text=Third slide&bg=e5e5e5"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h5>Holy Communion</h5>
                    <p>Party at Hall.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img style={{ height: '460px' }}
                    className="d-block w-100"
                    // src="holder.js/800x400?text=First slide&bg=f5f5f5"
                    src='images/carousel/9.jpg?text=Fourth slide&bg=e5e5e5'
                    alt="Fourth slide"
                />
                <Carousel.Caption>
                    <h5>Wedding</h5>
                    <p>Marriage inside the church.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
};

export default AppCarousel;