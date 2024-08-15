import React, { useEffect, useState } from 'react'
import CommonSection from '../shared/CommonSection'
import '../styles/tour.css'
import TourCard from '../shared/TourCard'
import SearchBar from '../shared/SearchBar'
import Newsletter from '../shared/Newsletter'
import { Col, Container, Row } from 'reactstrap'
import useFetch from '../hooks/useFetch.js'
import { BASE_URL } from '../utilts/config.js'

const Tours = () => {
  const [pageCount, setpageCount] = useState(0)
  const [page, setpage] = useState(0)

const {data:tours , loading ,error } = useFetch(`${BASE_URL}/tours?page=${page}`)
const {data:tourCount} = useFetch(`${BASE_URL}/tours/search/getTourCount`)

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8)
    setpageCount(pages)
    window.scrollTo(0,0)
  
    
  }, [page,tourCount,tours])
  
  return (
    <>
      <CommonSection title={'All Tours'} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>

        </Container>
      </section>
      <section className='pt-0'>
        <Container>
          {
            loading && <h4 className='text-center'>Loading..........</h4>
          }
          {
            error && <h4 className='text-center'>{error}</h4>
          }
          {
            !loading && <Row>
            {
              tours?.map(tour => (
                <Col lg='3' md='6' sm='6' className='mb-4' key={tour._id}>
                <TourCard tour={tour}/>
                </Col>
              ))
            }
            <Col lg='12'>
            <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
              {[...Array(pageCount).keys()].map(number=>{
                 return <span className={page === number?"active__page":""} key={number.id} onClick={()=>setpage(number)}>
                    {number + 1}
                  </span>
              })} 
            </div>
            </Col>
          </Row> 
          }
        </Container>
      </section>
      <Newsletter/>

    </>
  )
}

export default Tours