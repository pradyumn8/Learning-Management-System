const cloudinary = require('cloudinary').v2;

// configure with env data
cloudinary.config({
    cloud_name: process.env.CLOUNDINARY_CLOUD_NAME,
    api_key: process.env.CLOUNDINARY_API_KEY,
    api_secret: process.env.CLOUNDINARY_API_SECRET,
});


const uploadMediaToCloudinary = async (filePath) => {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: 'auto',  
      });
      return result;
      
    } catch (error) {
      console.log('Cloudinary upload error:', error);  
      throw new Error('Error uploading to Cloudinary');
    }
  };
  

const deleteMediaFromCloudinary = async(publicId)=>{
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log(error)
        throw new Error('Failed to delete assset from cloudinary')
    }
}

module.exports = { uploadMediaToCloudinary, deleteMediaFromCloudinary }; 