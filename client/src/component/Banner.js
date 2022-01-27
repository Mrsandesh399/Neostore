import React from 'react'
import { Carousel } from 'react-bootstrap'

export default function Banner() {
    return (
        <div>
   <Carousel>
  <Carousel.Item>
    <img style={{height:"300px"}}
      className="d-block w-100" 
      src="./images/sculptural-furniture-1574790540.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img style={{height:"300px"}}
      className="d-block w-100"
      src="./images/image2.jpg"
      alt="Second slide"
    />

    <Carousel.Caption>
     
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img style={{height:"300px"}}
      className="d-block w-100"
      src="./images/image3.jpg"
      alt="Third slide"
    />

    <Carousel.Caption>
      
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
            
        </div>
    )
}
