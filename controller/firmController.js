const Firm = require('../model/Firm');
const Vendor = require('../model/Vendor');
const multer = require('multer');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // folder to save images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + Pathfile.originalname);
  }
});

const upload = multer({ storage: storage });

// Controller function
const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : null;

    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const firm = new Firm({
      firmName, // ✅ corrected
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id
    });

   const savedFirm= await firm.save();
     vendor.firm.push(savedFirm)

     await vendor.save()

    return res.status(200).json({ message: "Firm added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteFirmId=async(req,res)=>{
   try {
    const firmId=req.params.firmId;
    const deletedProduct=await Firm.findByIdAndDelete(firmId);

    if(!deletedProduct){
      return res.status(404).json({error:"no product found"})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:"internal server error"})

    
  }
}

module.exports = { addFirm: [upload.single('image'), addFirm],deleteFirmId };
