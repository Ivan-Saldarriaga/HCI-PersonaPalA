import { list, ref, uploadBytes, getDownloadURL, listAll, getMetadata, deleteObject } from 'firebase/storage';
import { storage } from './../firebase/config';

export const uploadImage = async (user, file) => {
    const storageRef = ref(storage, `userImages/${user.uid}/${file.name}`);

    await uploadBytes(storageRef, file);

    // Optionally, get the download URL if you want to display the image
    const downloadURL = await getDownloadURL(storageRef);
    console.log('File available at', downloadURL);
    return downloadURL;
};

export const fetchUserImages = async (user) => {
    const imagesRef = ref(storage, `userImages/${user.uid}`);
    const result = await listAll(imagesRef);

    const imageUrls = await Promise.all(
        result.items.map(async imageRef => {
        const downloadURL = await getDownloadURL(imageRef);
        return downloadURL;
        })
    );

    return imageUrls;
};

function base64ToBlob(base64) {
    const byteString = atob(base64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' }); // Assuming it's a PNG image, adjust MIME type if needed
    return blob;
}

export function uploadToFirebase(base64Str, user, index) {
    const blob = base64ToBlob(base64Str);
    //const timestamp = Date.now();
    const storageRef = ref(storage, `userImages/${user.uid}/image${index}.png`);  // using the user's UID as the filename
    return uploadBytes(storageRef, blob);
}

export const getUserImages = async (user) => {
    const storageRef = ref(storage, `userImages/${user.uid}`);
    console.log(storageRef);
    const imageRefs = await list(storageRef);
    console.log(imageRefs);
    
    const downloadURLs = await Promise.all(
      imageRefs.items.map(itemRef => getDownloadURL(itemRef))
    );
  
    return downloadURLs;
}

export const getDownloadUrlForFile = async (filePath) => {
    try {
      // Create a reference to the file
      const fileRef = ref(storage, filePath);
  
      // Attempt to get the download URL for the file
      const downloadURL = await getDownloadURL(fileRef);
  
      // Return the download URL if found
      return downloadURL;
    } catch (error) {
      if (error.code === 'storage/object-not-found') {
        // Handle the case where the reference does not exist
        console.error('File not found in Firebase Storage:', error);
        return null; // Return null when the reference is not found
      } else {
        // Handle other errors
        console.error('Error getting download URL:', error);
        throw error; // Rethrow other errors
      }
    }
};

export const removeImageByUrl = async (imageUrl) => {
    try {
      // Create a reference to the file using its download URL
      const fileRef = ref(storage, imageUrl);
  
      // Get the metadata of the file to check if it exists
      const metadata = await getMetadata(fileRef);
  
      // Check if the file exists
      if (metadata) {
        // Delete the file from Firebase Storage
        await deleteObject(fileRef);
        console.log('File deleted successfully.');
      } else {
        console.log('File not found.');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      // Handle errors here
    }
};