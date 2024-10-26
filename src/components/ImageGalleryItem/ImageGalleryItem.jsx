
import css from './ImageGalleryItem.module.css'
import { FiThumbsUp } from "react-icons/fi"; 
const ImageGalleryItem = ({image, onClick}) => {
  
  return (

<div className={css.imageGalleryItem}>

        <img className={css.imgItem} 
          src={image.urls.small}
          alt={image.alt_description}
          width="250"
          loading="lazy"
          onClick={() => onClick(image.urls.regular)}
        />
      
       <p className={css.infoItem}><FiThumbsUp/><span>{image.likes}</span></p> 

</div>
 
  )
}

export default ImageGalleryItem