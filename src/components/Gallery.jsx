import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function Gallery() {
  const images = [
    {
      original: "/images/1.png",
    },
    {
      original: "/images/2.png",
    },
    {
      original: "/images/3.png",
    },
    {
      original: "/images/5.png",
    },
    {
      original: "/images/6.png",
    },
    {
      original: "/images/7.png",
    },
    {
      original: "/images/8.png",
    },
  ];

  return (
    <ImageGallery
      items={images}
      showPlayButton={false}
      showFullscreenButton={false}
      showNav={false}
      showBullets={true}
      autoPlay={true}
      slideInterval={4500}
      renderItem={(item) => (
        <div className="w-full h-full">
          <img
            src={item.original}
            alt="foto de Carlos y Arely"
            className="shadow-lg min-h-[50vh] object-cover"
          />
        </div>
      )}
    />
  );
}
