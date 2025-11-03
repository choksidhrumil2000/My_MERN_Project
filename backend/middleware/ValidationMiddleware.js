const validate = (Schema) => (req,res,next)=>{
    try{

        const {error} = Schema.validate(req.body);
        if(error)return res.status(400).json({
            message:error.details[0].message
        })
        next();
    }catch(err){
        next(err);
    }
}

module.exports = validate;