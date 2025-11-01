const Product = require("../model/product");
const multer = require("multer");
const Firm=require('../model/Firm');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // folder to save images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + Path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


const addProduct=async(req,res)=>{
    try {
        const{productName,price,category,bestseller,description}=req.body;
        const image=req.file?req.file.filename:undefined;

        const firmId=req.params.firmId;
        const firm=await Firm.findById(firmId);

        if(!firm){
            return res.status(404).json({error:"no firm found"});

        }
        const product= new Product({
            productName,price,category,bestseller,description,image,firm:firm._id

        })
        const savedProduct = await product.save();

        firm.products.push(savedProduct);
       

        await firm.save()

        res.status(200).json(savedProduct)

    } catch (error) {
        console.error(error);
        res.status(500).json({error:"internal server error"});
        
    }

}

const getProductByFirm=async(req,res)=>{
  try {
    const firmId=req.params.firmId;
    const firm = await Firm.findById(firmId);

    if(!firm){
      return res.status(404).json({error:"no firm is found"});
    }

    const restaurtname=firm.firmName;
    const products = await Product.find({firm:firmId});

    res.status(200).json({restaurtname,products});
    
  } catch (error) {
    console.error(error);
        res.status(500).json({error:"internal server error"});
    
  }
}

module.exports ={ addProduct:[upload.single('image'),addProduct],getProductByFirm};