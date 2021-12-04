import { Link } from "react-router-dom"
import './Post.css'

const Post = () => {
    return (
        <div className="post">
            <h1 className="appName">Flea Illinois</h1>
            <h1 class="header">Post a Listing</h1>
                <form>   
            <div class="container-login-form">
                    <div className="form-group">
                        <label htmlFor="itemtype">Item Type</label>
                        <input type="text" name="itemtype" id="itemtype"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="brandname">Brand Name</label>
                        <input type="text" name="brandname" id="brandname"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="model">Model</label>
                        <input type="text" name="model" id="model"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="condition">Condition</label>
                        <input type="text" name="condition" id="condition"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="color">Color</label>
                        <input type="text" name="color" id="color"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="warranty">Warranty</label>
                        <input type="text" name="warranty" id="warranty"/>
                    </div>
                    <div>
                    <form action="/action_page.php"> Photo
                      <input type="file" id="myFile" name="filename"/>
                      <input type="submit"/>
                    </form>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="text" name="price" id="price"/>
                    </div>
                    <input type="submit" value="Submit"/>
            </div>
                </form>
        </div>
    )
}

export default Post
