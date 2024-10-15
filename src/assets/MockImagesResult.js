export const ImagesResult = async (query) => {
  const data = [
    {
      id: 'i',
      title: 'Sunset Architecture',
      url: 'https://cdn.pixabay.com/photo/2023/06/14/23/12/sunset-8064078_1280.jpg',
    },
    {
      id: 'i123',
      title: 'Beach',
      url: 'https://cdn.pixabay.com/photo/2020/05/15/14/17/water-5173774_1280.jpg',
    },
    {
      id: 'i012',
      title: 'Waterfall',
      url: 'https://cdn.pixabay.com/photo/2023/05/01/06/55/waterfall-7962263_1280.jpg',
    },
    {
      id: 'i324',
      title: 'Adventure',
      url: 'https://cdn.pixabay.com/photo/2019/08/03/12/22/adventure-4381674_1280.jpg',
    },
    {
      id: 'i018',
      title: 'Forest Pathway',
      url: 'https://cdn.pixabay.com/photo/2022/09/20/10/11/street-7467503_1280.jpg',
    },
    {
      id: 'i100',
      title: 'Passau',
      url: 'https://cdn.pixabay.com/photo/2023/05/03/19/57/passau-7968535_1280.jpg',
    },
    {
      id: 'i555',
      title: 'Lantern in Japan',
      url: 'https://cdn.pixabay.com/photo/2018/09/30/13/18/lantern-3713493_1280.jpg',
    },
    {
      id: 'i020',
      title: 'Dark Street',
      url: 'https://cdn.pixabay.com/photo/2022/10/16/19/19/girl-7525969_1280.jpg',
    },
    {
      id: 'i021',
      title: 'Alpine',
      url: 'https://cdn.pixabay.com/photo/2019/05/29/14/20/alpine-4237636_1280.jpg',
    },
  ];

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
