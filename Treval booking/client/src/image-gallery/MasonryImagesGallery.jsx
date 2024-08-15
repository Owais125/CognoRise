import React from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import galleryImages from './galleryImages'



const MasonryImagesGallery = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{350:1 , 750:3 , 900:4}}>
        <Masonry gutter='1rem'>
        {
            galleryImages.map((item, index) => {
               return <img className='masnory__img' key={index} src={item} alt="" style={{width:'100%',display:'block',borderRadius:'10px'}} />
            })
        }
        </Masonry>
    </ResponsiveMasonry>
  )
}

export default MasonryImagesGallery