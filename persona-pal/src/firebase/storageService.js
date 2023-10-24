import { list, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
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

export function uploadToFirebase(base64Str, user) {
    const blob = base64ToBlob(base64Str);
    const timestamp = Date.now();
    const storageRef = ref(storage, `userImages/${user.uid}/character_${timestamp}.png`);  // using the user's UID as the filename
    return uploadBytes(storageRef, blob);
}

export const getUserImages = async (user) => {
    const storageRef = ref(storage, `userImages/${user.uid}`);
    console.log(storageRef);
    const imageRefs = await list(storageRef);
    console.log(imageRefs)
    
    const downloadURLs = await Promise.all(
      imageRefs.items.map(itemRef => getDownloadURL(itemRef))
    );
  
    return downloadURLs;
}