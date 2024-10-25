import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem"
import css from './ImageGallary.module.css'


const ImageGallary = ({images, openModal, onClick}) => {

  return (
    <div className={css.imageGallary }>
      <ul className={css.imageGallaryCont }>
     {images !== null && images.map((image)=> (
      <li key={image.id}  className={css.imageGallaryIt}>
        <ImageGalleryItem
        image={image}
    //  description={image.alt_description}
    //   likes={image.likes}
    //   url={image.urls.small}
    //   regular={image.urls.regular}
    //   id = {image.id}
      openModal={openModal}
      onClick={() => onClick(image)}
        />
      </li>))}
      </ul>
  </div>
)
}

export default ImageGallary;
