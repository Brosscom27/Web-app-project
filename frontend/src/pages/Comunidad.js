import React from 'react';
import '../styles/Comunidad.css'; // Asegúrate de que la ruta esté correcta

function Comunidad() {
    const images = [
        { src: 'https://i.pinimg.com/736x/a0/e1/11/a0e111a7c766201e37045acfd7f5a5b1.jpg', link: 'https://www.pinterest.com.mx/pin/786933734921918692/', size: 'large' },
        { src: 'https://i.pinimg.com/736x/09/82/29/098229ec28935fea281cefc6a82d2231.jpg', link: 'https://www.pinterest.com.mx/pin/786933734921918555/', size: 'medium' },
        { src: 'https://i.pinimg.com/736x/75/43/db/7543db3f5b33ac3933b8a60ccae49d02.jpg', link: 'https://www.pinterest.com.mx/pin/786933734921918700/', size: 'small' },
        { src: 'https://i.pinimg.com/736x/cf/34/89/cf3489451f700d30500165f1fbf370f2.jpg', link: 'https://www.pinterest.com.mx/pin/786933734921918719/', size: 'small' },
        { src: 'https://i.pinimg.com/736x/f0/1f/4a/f01f4a4f06e4c6367136ce48bd9b262b.jpg', link: 'https://www.pinterest.com.mx/pin/786933734921918750/', size: 'medium' },
        { src: 'https://i.pinimg.com/736x/c6/d0/3c/c6d03c598d832e894e9e2fee8f2ff4ee.jpg', link: 'https://www.pinterest.com.mx/pin/786933734921918764/', size: 'large' },
        { src: 'https://i.pinimg.com/736x/11/66/d1/1166d1aab32848bbcc98c0194d49112e.jpg', link: 'https://www.pinterest.com.mx/pin/786933734921918683/', size: 'medium' },
        { src: 'https://i.pinimg.com/564x/2a/82/1c/2a821caf15ba4f685bc3865303c52c27.jpg', link: 'https://www.pinterest.com.mx/pin/914862418014082/', size: 'small' },
        { src: 'https://i.pinimg.com/564x/d0/7d/99/d07d99c9331e228f7ac9fdc8faad0f1c.jpg', link: 'https://www.pinterest.com.mx/pin/4222193393737176/', size: 'medium' },
    ];

    return (
        <div className="image-gallery">
            {images.map((image, index) => (
                <a key={index} href={image.link} target="_blank" rel="noopener noreferrer" className={image.size}>
                    <img src={image.src} alt={`Imagen ${index + 1}`} />
                </a>
            ))}
        </div>
    );
}

export default Comunidad;
