import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem"
import css from './ImageGallary.module.css'


const ImageGallary = ({images, onClick}) => {
 
  return (
    <div className={css.imageGallary }>
      <ul className={css.imageGallaryCont }>
     {images !== null && images.map((image)=> (
      <li key={image.id}  className={css.imageGallaryIt}>
        <ImageGalleryItem
        image={image}
          onClick={() => onClick(image)}
     
        />
      </li>))}
      </ul>
  </div>
)
}

export default ImageGallary;
