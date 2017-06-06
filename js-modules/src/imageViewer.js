import small from '../assets/small.jpg'
import '../styles/imageViewer.css'

// Code splitting
export default () => {
  const smallImage = document.createElement('img')
  smallImage.src = small
  document.body.appendChild(smallImage)
}
