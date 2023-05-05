const uploadImage = (img, thumb1, thumb2, thumb3) => {
    
    const uploadData = new FormData();
    uploadData.append("image", img.target.files[0], "file");
    uploadData.append("thumbnail1", thumb1.target.files[0], "file");
    uploadData.append("thumbnail2", thumb2.target.files[0], "file");
    uploadData.append("thumbnail3", thumb3.target.files[0], "file");

    return uploadData;
}

export default uploadImage;