import React, { useState, useEffect } from 'react';

export default function ImageDetails({ image, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!image) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] mx-auto z-10 overflow-hidden flex flex-col">
        <div className="p-4 border-b flex items-center relative">
          <button
            onClick={handleClose}
            className="absolute left-4 text-gray-600 hover:text-gray-800 transition-colors font-bold text-2xl"
          >
            ←
          </button>
          <h2 className="text-2xl text-center font-semibold text-gray-800 flex-grow truncate">
            {image.name}
          </h2>
        </div>
        <div className="flex-grow overflow-auto p-4">
          <div className="h-full flex items-center justify-center">
            <img
              src={image.src}
              alt={image.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
        <div className="p-4 border-t">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-600">Image Name</p>
              <p className="text-2xl text-gray-800">{image.name}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Metadata</p>
              <ul className="text-gray-800">
                <li>
                  Width: {image.width}px
                </li>
                <li>
                  Height: {image.height}px
                </li>
              </ul>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-semibold text-gray-600">
                Original URL
              </p>
              <a
                href={image.originalURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline break-all"
              >
                {image.originalURL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
