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

  console.log(response);

  const getImageDimensions = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = () => reject(new Error('Could not load image'));
    });
  };

  const addImageMetadata = async (images) => {
    const promises = images.map(async (image) => {
      const dimensions = await getImageDimensions(image.url);
      return { ...image, ...dimensions };
    });

    return Promise.all(promises);
  };

  // Title filter for now
  const filteredData = query.length > 0 ?
    data.filter((image) =>
      image.title.toLowerCase().includes(query.toLowerCase())
    )
    : data;

  const dataWithMeta = await addImageMetadata(filteredData);
  return dataWithMeta;
}
