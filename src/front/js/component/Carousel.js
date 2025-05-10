import React from 'react';

const carouselImages = [
    "https://monitoreamos.com/wp-content/uploads/2024/11/Dragon-Ball.jpeg",
    "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.3487205:1709902221/Dragon%20ball%20anime.jpeg?f=16x9&h=574&w=1020&$p$f$h$w=ad6305d",
    "https://img.asmedia.epimg.net/resizer/v2/G2YEEDCDGFCWTH3WMMP5ABZJDI.jpg?auth=c2bfc6dbfdb905a5c5cb557bec6f25f3df98a5bfcdbaa393ef7abaeb7789a782&width=1472&height=828&smart=true"
];

const Carousel = () => {
    return (
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {carouselImages.map((image, index) => (
                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                        <img src={image} className="d-block w-100" alt={`Slide ${index + 1}`} style={{ height: "400px", objectFit: "cover" }} />
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
            </button>
        </div>
    );
};

export default Carousel;
