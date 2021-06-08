import { Button, TextField } from "@material-ui/core";
import React from "react";
import "./upload.css"
import { storage, db, firebaseapp } from "../../firebase/firebase";
class Upload extends React.Component {
    state = {
        caption: null,
        progress: null,
        image: null,
        url: null,
    };
    handleChoose = (event) => {
        if (event.target.files[0]) {
            this.setState({ image: event.target.files[0] });
        }
    };

    handleUpload = () => {
        
        const uploadTask = storage
            .ref(`image/${this.state.image.name}`)
            .put(this.state.image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({ progress });
            },
            (err)=>{
                console.log(err.message)
            },
            (props) => {
                
                storage
                    .ref("/image/")
                    .child(this.state.image.name)
                    .getDownloadURL()
                    .then((url) => {
                        console.log(url)
                        db.collection("posts").add({
                            timestamp:new Date().getUTCSeconds(),
                            avatar:"https://picsum.photos/32/32",
                            caption: this.state.caption,
                            image: url,
                            username: this.props.user,
                        });
                    }).then(() =>{
                        
                        this.setState({
                            progress:null,
                            caption:null,
                            image:null,
                            url:null
                        })
                    })
            }
        );
    };
    render() {
        return (
            <div className="fon">
                <div className="upload container">
                <label htmlFor="file">Choose file</label>
                <label className="photo" htmlFor="upload-photo">Browse...</label>
                <input id="upload-photo" type="file" onChange={this.handleChoose} />
                <TextField
                    type="text"
                    placeholder="Enter a caption"
                    onChange={(event) => {
                        this.setState({ caption: event.target.value });
                    }}
                />
                <Button onClick={this.handleUpload}>Post</Button>
            </div>
            </div>
        );
    }
}
export default Upload;
