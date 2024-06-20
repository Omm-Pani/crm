export default function dataURItoBlob(dataURI) {
  // Convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  const parts = dataURI.split(",");
  if (parts[0].indexOf("base64") >= 0) {
    byteString = atob(parts[1]);
  } else {
    byteString = decodeURIComponent(parts[1]);
  }

  // Separate out the mime component
  const mimeString = parts[0].split(":")[1].split(";")[0];

  // Write the bytes of the string to a typed array
  const byteStringLength = byteString.length;
  const ia = new Uint8Array(byteStringLength);
  for (let i = 0; i < byteStringLength; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}
