import React, { useEffect, useState } from "react";

function Carousel() {
  const img = [
    "https://images.pexels.com/photos/19166246/pexels-photo-19166246.jpeg",
    "https://www.fashionsnap.com/article/images/2023/03/isetan-suit-202230329-71.jpg",
    "https://images.pexels.com/photos/8387833/pexels-photo-8387833.jpeg",
    "https://images.pexels.com/photos/7330336/pexels-photo-7330336.jpeg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const loadImage = setInterval(() => {
      setIndex((prev) => (prev + 1) % img.length);
    }, 4000);

    return () => clearInterval(loadImage);
  }, []);

  return (
    <div className="relative mt-3 w-full overflow-hidden">
      <img
        src={img[index]}
        alt="slide"
        className="w-full h-[200px] sm:h-[300px] md:h-[450px] lg:h-[600px] object-cover transition-all duration-700"
      />
    </div>
  );
}

export default Carousel;