import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import worldImg from '../assets/images/world.png'
import ecperienceImg from '../assets/images/experience.png'
import heroVideo from '../assets/images/hero-video.mp4'
import Subtitle from '../shared/Subtitle'
import '../styles/home.css'
import SearchBar from '../shared/SearchBar'
import ServiceList from '../services/ServiceList'
import FeaturedTourList from '../Components/Featured-tours/FeaturedTourList'
import MasonryImagesGallery from '../image-gallery/MasonryImagesGallery'
import Testimonials from '../Components/Testimonial/Testimonials'
import Newsletter from '../shared/Newsletter'



const Home = () => {
  return (
    <>
      {/* ==========  Hero Section Start */}
      <section>
        <Container>
          <Row>
            <Col lg='6 '>
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center"><Subtitle subtitle={'Know Before You Go'} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>Traveling opens the door to creating <span className="highlight">memories</span></h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis aut qui beatae numquam nesciunt odio accusamus voluptate sint nemo vitae voluptatem perspiciatis, aliquam, culpa ratione alias optio illo eligendi sapiente.</p>
              </div>
            </Col>

            <Col lg='2'>
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>

            <Col lg='2'>
              <div className="hero__img-box hero__video-box mt-4">
                <video src={heroVideo} alt="" controls />
              </div>
            </Col>
            <Col lg='2'>
              <div className="hero__img-box mt-5" >
                <img src={heroImg02} alt="" />
              </div>
            </Col>
            <SearchBar />
          </Row>
        </Container>
      </section>
      {/* ==========  Hero Section Start */}
      <section>
        <Container>
          <Row>
            <Col lg='3'>
              <h5 className='services__subtitle'>What we server</h5>
              <h2 className='services__title'>We offer our best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>
      {/* ============featured tour section start */}
      <section>
        <Container>
          <Row>
            <Col lg='12' className='mb-5'>
              <Subtitle subtitle={'Explore'} />
              <h2 className="featured__tour-title">Our Featured tours</h2>

            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>


      {/* ============featured tour section end=============== */}
      {/* ============Exprince Section start=============== */}
      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <div className="experience__content">
                <Subtitle subtitle={'Expernience'} />
                <h2>With our all experience <br />we will serve you</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. <br /> Cupiditate recusandae at id nam, perspiciatis.</p>
              </div>
              <div className="counter__wapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Successfull trip</h6>
                </div>
                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Regular clients</h6>
                </div>
                <div className="counter__box">
                  <span>15</span>
                  <h6>Years experience</h6>
                </div>
              </div>
            </Col>
            <Col lg='6'>
              <div className="experience__img">
                <img src={ecperienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ============Exprince Section end=============== */}
      {/* ============gallery Section start=============== */}
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'Gallery'} />
              <h2 className="gallery__title">Visit Our Customers tours gallery</h2>
            </Col>
            <Col lg='12' >
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>

      </section>
      {/* ============gallery Section end=============== */}
      {/* ============testimonial Section start=============== */}
      <section>
        <Container>
          <Row>
            <Col lg='12' className='mt-3'  >
              <Subtitle  subtitle={'Fans Love'} />
              <h2 className="testimonial__title">
                What our fans say about us
              </h2>
            </Col>
            <Col lg='12'>
            <Testimonials/>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ============testimonial Section end=============== */}
      <Newsletter/>
    </>
  )
}

export default Home