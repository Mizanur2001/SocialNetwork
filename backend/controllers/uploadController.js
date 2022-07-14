const uploadController = ()=>{
    return{
        uploadimg(req,res){
            res.send("Image upload successfully")
        }
    }
}

export default uploadController