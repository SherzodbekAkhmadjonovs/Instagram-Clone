import React from "react";
import Post from "./components/post/post";
import { db, auth } from "./firebase/firebase";
import Navbar from "./components/navbar/navbar";
import Upload from './components/upload/upload'
class App extends React.Component {
    state = {
        posts: [],
        fetching: false,
        user:null
    };
    componentDidMount() {
        this.setState({
            fetching: true,
        });
        db.collection("posts").orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
            this.setState({
                posts: snapshot.docs.map((doc) => {
                    return doc.data();
                }),
                fetching: false,
            });
        });
        auth.onAuthStateChanged((authUser) => {
            this.setState({user:authUser.email})
        });
    }
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div style={{ marginBottom: "100px" }}></div>
                {this.state.fetching === true ? (
                    <div>Loading posts</div>
                ) : (
                    this.state.posts.map((post, id) => {
                        return (
                            <Post
                                key={id}
                                username={post.username}
                                caption={post.caption}
                                avatar={post.avatar}
                                image={post.image}
                            />
                        );
                    })
                )}
                {
                    this.state.user ? 
                    <Upload user={this.state.user}/> :
                    null
                }
            </React.Fragment>
        );
    }
}
export default App;
