import "./styles/ImageGallery.css";

/*
 * ImageGallery component displays images in a mansory layout.
 * It looks the best when there are a lot of images. Otherwise, the bottom of the gallery could look strage depending on the final images size.
 */
export const ImageGallery = ({ images }) => {
  return (
    <>
      {images.length > 0 ? (
        <div className="image-gallery columns-1 sm:columns-2 lg:columns-3 gap-4">
          {images.map((image, index) => (
            <div key={`${image.id}${index}`} className="mb-4 break-inside-avoid">
              <img
                key={image.id}
                src={image.url}
                alt={image.title}
                className="image-gallery-snap w-full object-over"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>No images were found :(</p>
        </div>
      )}
    </>
  );
};
