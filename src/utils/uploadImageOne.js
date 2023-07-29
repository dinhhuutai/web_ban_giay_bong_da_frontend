const uploadImageOne = (iamge) => {
    
    const uploadData = new FormData();
    uploadData.append("image", iamge, "file");

    return uploadData;
}

export default uploadImageOne;