import Supplier from "../models/supplierModel.js"

export const addSupplier = async(req, res) => {
    try{
    const {name, email, phone, address} = req.body
    const existSupplier = await Supplier.findOne({name})
    if(existSupplier){
    return res.status(401).json({success:false, message:"supplier already exist"})
    }
    const supplier = new Supplier({
        name,
        email,
        phone,
        address
    })
    await supplier.save()
    return res.status(201).json({success:true, message:"New supplier added"})
    }
    catch(error){
    console.log("failed to add supplier", error.message)
    return res.status(500).json({success:false, message:"Server error"})
    }
}

export const getSupplier = async(req, res)=> {
    try{
    const suppliers = await Supplier.find()
     return res.status(200).json({success:true, suppliers})
    }
    catch(error){
    console.log('error fetching supplier', error.message)
     return res.status(500).json({success:false, message:"Server error"})
    }
}

export const updateSupplier = async(req, res)=> {
    try{
        const {id} = req.params
        const {name, email, phone, address} = req.body
        const existSupplier = await Supplier.find()
        if(!existSupplier){
        return res.status(404).json({success:false, message:"supplier not found"})
        }
        const updatedSupplier = await Supplier.findByIdAndUpdate(id,
            {name, email, phone, address},
            {new:true}
        )
       await updatedSupplier.save()
       return res.status(200).json({success:true, message:"supplier updated"})
    }
    catch(error){
     return res.status(500).json({success:false, message:"Server error"})
    }
}

export const deleteSupplier = async(req, res)=> {
    try{
    const {id} = req.params
    const existSupplier = await Supplier.findById(id)
    if(!existSupplier){
    return res.status(404).json({success:false, message:"Supplier not found"})
    }
    await Supplier.findByIdAndDelete(id)
     return res.status(200).json({success:true, message:"supplier deleted"}) 
    }
    catch(error){
     return res.status(500).json({success:false, message:"Server error"})   
    }
}
