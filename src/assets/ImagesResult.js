export const ImagesResult = async (query) => {

  var xmlHttp = new XMLHttpRequest();
  //console.log(query)
  var url = "http://20.75.49.187:8081/api/search?query_text=";
  url = url.concat(query);
  url = url.concat("&limit=50");
  xmlHttp.open( "GET", url, false ); // false for synchronous request
  xmlHttp.send( null );
  var response = xmlHttp.responseText;
  const data = JSON.parse(response);

  //console.log(response);

  const getImageDimensions = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = () => reject(new Error('Could not load image'));
    });
  };

  const addImageMetadata = async (images) => {
    const promises = images.map((image) => 
      getImageDimensions(image.url)
        .then((dimensions) => ({ ...image, ...dimensions }))
        .catch((error) => null) // Null if img failed to load
    );

    const promiseResults = await Promise.all(promises);
    return promiseResults.filter((result) => result !== null);
  };

  const dataWithMeta = await addImageMetadata(data);
  return dataWithMeta;
}
