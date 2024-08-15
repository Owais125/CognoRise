import React, { useState } from 'react'
import CommonSection from '../shared/CommonSection'
import { Col, Container, Row } from 'reactstrap'
import { useLocation } from 'react-router-dom'
import TourCard from '../shared/TourCard'
import Newsletter from '../shared/Newsletter'

const SearchResultList = () => {
  const location = useLocation()
  const [data] = useState(location.state)
  console.log(data)



  return (
    <>
      <CommonSection title={'Tour Search Result'} />

      <section>
        <Container>
          <Row>
            {
              data.length === 0 ? <h4 className='text-center'>No tour Found</h4>:data?.map(tour=><Col key={tour._id} lg='3' className='mb-4 mt-3'><TourCard tour={tour}/></Col>)
            }
          </Row>
        </Container>
        <Newsletter/>
      </section>



    </>
  )
}

export default SearchResultList