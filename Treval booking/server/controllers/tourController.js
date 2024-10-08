import Tour from "../models/Tour.js";
// createTour
export const createTour =  async(req,res)=>{
    const newTour = new Tour(req.body)
    try {
        const savedTour = await newTour.save()
        res.status(200).json({success:true,message:"SuccessFully created",data:savedTour})
    } catch (error) {
        res.status(500).json({success:false,message:"Failed to create. Try Again"})
        
    }
    
}

// update Tour 
export const updateTour =  async(req,res)=>{
    const id = req.params.id
    try {
        const updateedTour = await Tour.findByIdAndUpdate(id,{
            $set : req.body
        },{new:true})
        res.status(200).json({success:true,message:"SuccessFully update",data:updateTour})
        
        
    } catch (error) {
        res.status(500).json({success:false,message:"failed to update"})
        
    }
}

// delete Tour 
export const deleteTour =  async(req,res)=>{
    const id = req.params.id
    try {
         await Tour.findByIdAndDelete(id)
        res.status(200).json({success:true,message:"SuccessFully delete"})
        
        
    } catch (error) {
        res.status(500).json({success:false,message:"failed to detele"})
        
    }
}

// getSingleTour Tour 
export const getSingleTour =  async(req,res)=>{
    const id = req.params.id
    try {
       const tour =  await Tour.findById(id).populate('reviews')
        res.status(200).json({success:true,message:"SuccessFully found Data",data:tour})
        
        
    } catch (error) {
        res.status(404).json({success:false,message:"not Found"})
        
    }
}

// getAll Tour 
export const getAllTour =  async(req,res)=>{
    const page = parseInt(req.query.page)
    console.log(page)
    try {
        const tours = await Tour.find({}).populate('reviews').skip(page * 8).limit(8)
        res.status(200).json({success:true,count:tours.length,message:"SuccessFully found Data",data:tours})
        
    } catch (error) {
        res.status(404).json({success:false,message:"not Found"})
        
    }
}


// get tour by search 
export const getTourBySearch = async(req,res)=>{
    const city = new RegExp(req.query.city,'i')
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)
    
    try {
        const tours =  await Tour.find({city,distance:{$gte:distance},maxGroupSize:{$gte:maxGroupSize}}).populate('reviews')
        res.status(200).json({success:true,message:"SuccessFully found Data",data:tours})
    } catch (error) {
    res.status(404).json({success:false,message:"not Found"})
    
}
}



// get  Featured Tour 
export const getFeaturedTour =  async(req,res)=>{
    try {
        const tours = await Tour.find({featured:true}).populate('reviews').limit(8)
        res.status(200).json({success:true,message:"SuccessFully found Data",data:tours})
        
    } catch (error) {
        res.status(404).json({success:false,message:"not Found"})
        
    }
}


// get tour count 

export const getTourCount = async(req,res)=>{
    try {
        const tourCount = await Tour.estimatedDocumentCount()  
        res.status(200).json({success:true,data:tourCount})
    } catch (error) {
        res.status(500).json({success:false,message:"failed to fetch"})
        
    }
}
