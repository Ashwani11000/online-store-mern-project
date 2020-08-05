import React from 'react'
import { API } from '../../backend';


const ImageHelper= ({product}) => {
    const imageurl = product? `${API}/product/photo/${product._id}` : `https://cdn.clipart.email/62c02a2eb4bc7a83ae8ede2ed516848d_rhprekhomecom-christmas-simple-pencil-drawings-tumblr-unique-fun-_1264-1010.jpeg`
    return (
        <div className="rounded border border-success p-2">
          <img
            src= {imageurl}
            alt="Product not loaded"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            className="mb-3 rounded"
          />
        </div>
    )
}
export default ImageHelper;