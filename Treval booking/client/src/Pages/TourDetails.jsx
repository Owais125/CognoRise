import React, { useEffect, useRef, useState,useContext } from 'react'
import '../styles/tour-details.css'
import {Container,Row,Col,Form,ListGroup} from 'reactstrap'
import {useParams} from 'react-router-dom'
import tourData from'../assets/data/tours'
import calculateAvgRating from '../utilts/avgRating'
import avatar from '../assets/images/avatar.jpg'
import Booking from '../Components/Booking/Booking'
import Newsletter from '../shared/Newsletter'
import useFetch from '../hooks/useFetch.js'
import {BASE_URL} from '../utilts/config.js'
import {AuthContext} from '../context/AuthContext.jsx'

const TourDetails = () => {
  const reviewMsgRef = useRef('')
  const [tourRating, setTourRating] = useState(null)

  const {user} = useContext(AuthContext)
  const options = {day:'numeric',month:'long',year:'numeric'}
  const {id} = useParams()

  // const tour = tourData.find(tour=>tour.id===id)
   const {data:tour ,loading} = useFetch(`${BASE_URL}/tours/${id}`)
  
  
  
  const {photo,title,desc,price,reviews,city,address,distance,maxGroupSize} = tour 
  const {totalRating,avgRating}=calculateAvgRating(reviews)
const submitHandler = async(e)=>{
  e.preventDefault
  const reviewText = reviewMsgRef.current.value

  try {
    if (!user === undefined || user === null) {
      alert('Please sign in')  
    } 
    const reviewObj = {
      username:user?.username,
      reviewText,
      rating:tourRating
    }
    const res = await fetch(`${BASE_URL}/review/${id}`,{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      credentials:'include',
      body:JSON.stringify(reviewObj)

    })
    const result = await res.json()
    if(!res.ok){
     return alert(result.message)
    }
    alert(result.message  )
  } catch (error) {
    alert(error.message)
    
  }
}

useEffect(() => {
  window.scrollTo(0,0)
}, [tour])

  return (
    <>
    <section>
      <Container>
        {
          loading && <h4 className='text-center'>Loading.......</h4>
        }
       {
        !loading &&  <Row>
        <Col lg="8">
        <div className="tour__content">
          <img src={photo} alt="" />
          <div className="tour__info">
            <h2>{title}</h2>
            <div className='d-flex align-items-center gap-5'>
            <span  className="tour__rating d-flex align-items-center gap-1">
                      <i style={{color:'#ffca2c'}} class="ri-star-fill"></i>{avgRating === 0 ?null :avgRating}{""}{totalRating === 0?'Not rated': <span>({reviews?.length})</span>}
                  </span>
                  <span>
                    <i class="ri-map-pin-user-fill"></i>{address}
                  </span>
            </div>
            <div className="tour__extra-details">
              <span><i class="ri-map-pin-2-line"></i> {city}</span>
              <span><i class="ri-money-dollar-circle-line"></i> ${price}/per Person</span>
              <span><i class="ri-map-pin-time-line"></i> {distance}k/m</span>
              <span><i class="ri-group-line"></i> {maxGroupSize} People</span>
            </div>
            <h5>Description</h5>
            <p>{desc}</p>
          </div>
          {/* =========== tour reviews section start */}
          <div className="tour__reviews mt-4">
            <h4>Reviews ({reviews?.length} reviews )</h4>
            <Form onSubmit={submitHandler}>
              <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                <span onClick={()=>setTourRating(1)}>1 <i class="ri-star-s-fill"></i></span>
                <span onClick={()=>setTourRating(2)}>2 <i class="ri-star-s-fill"></i></span>
                <span onClick={()=>setTourRating(3)}>3 <i class="ri-star-s-fill"></i></span>
                <span onClick={()=>setTourRating(4)}>4 <i class="ri-star-s-fill"></i></span>
                <span onClick={()=>setTourRating(5)}>5 <i class="ri-star-s-fill"></i></span>
              </div>
              <div className="review__input">
                <input required ref={reviewMsgRef} type="text" placeholder='share your thoughts' />
                <button className='btn btn-warning'>Submit</button>
              </div>
            </Form>
            <ListGroup className='user__reviews'>
              {
                reviews?.map(review=>{
                   return <div className="review__item">
                      <img src={avatar} alt="" />
                      <div className="w-100">
                        <div className="d-flex align-items-center justify-content-between ">
                          <div>
                            <h5>{review.username}</h5>
                            <p>{new Date(review.createdAt).toLocaleDateString('en-US',options)}</p>
                          </div>
                          <span className='d-flex align-items-center'>
                            {review.rating}<i class="ri-star-s-fill"></i>
                          </span>
                        </div>
                        <h6>{review.reviewText}</h6>
                      </div>
                    </div>
                })
              }

            </ListGroup>
          </div>
          {/* =========== tour reviews section end */}
        </div>
        </Col>
        <Col lg='4'>
        <Booking tour={tour} avgRating={avgRating}/>
        </Col>
      </Row>
       }
      </Container>
    </section>
    <Newsletter/>
    
    
    
    
    
    </>
  )
}

export default TourDetails