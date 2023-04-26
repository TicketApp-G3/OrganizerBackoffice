import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useState } from 'react'
import { storage } from '../../firebase'

export const useImagesUploader = ({ initialImages = [] }) => {
  const [imagesUrls, setImagesUrls] = useState(initialImages)

  const uploadFiles = (fileList) => {
    Object.values(fileList).forEach((file) => {
      if (!file) return
      const imageRef = ref(storage, `/events/images/${file.name}`)
      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImagesUrls((prev) => [...prev, url])
        })
      })
    })
  }

  const handleDeleteImage = (imageURL) => {
    setImagesUrls(imagesUrls.filter((item) => item !== imageURL))
  }

  const uploadImages = (files) => {
    uploadFiles(files)
  }

  return {
    handleDeleteImage,
    uploadImages,
    imagesUrls,
  }
}
