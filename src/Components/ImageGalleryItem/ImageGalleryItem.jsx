import css from './ImageGalleryItem.module.css'
import { FiThumbsUp } from "react-icons/fi"; 
const ImageGalleryItem = ({image, openModal}) => {
  return (

<div className={css.imageGalleryItem}>

     
        <img className={css.img} 
         onClick={() => openModal(image.urls.regular)}
          src={image.urls.small}
          alt={image.alt_description}
          width="250"
          loading="lazy"

        />
       <p id = {image.id} className={css.infoItem}>{image.alt_description}</p>
       <p className={css.infoItem}><FiThumbsUp/><span>{image.likes}</span></p> 
</div>
 
  )
}

export default ImageGalleryItem