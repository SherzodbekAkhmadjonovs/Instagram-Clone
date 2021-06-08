import React, { useState, useEffect } from "react";
import "./navbar.css";
import { auth } from "../../firebase/firebase";
import { Button, Modal, TextField } from "@material-ui/core";
const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [openSignin, setOpenSignin] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
                if (authUser.displayName) {
                } 
                else {
                    return authUser.updateProfile({
                        displayName: username,
                    });
                }
            } else {
                setUser(null);
            }
        });
    }, [user, username]);

    const signUp = (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username,
                });
            })
            .catch((error) => {
                alert(error.message);
            });
        setOpen(false)
    };
    const signIn = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then((authUser) => {

        }).catch((err)=>{
            alert(err.message);
        });
        setOpenSignin(false)
    };
    const style = {
        transform: "translate(-50%, -50%)",
        position: "absolute",
        top: "50%",
        left: "50%",
        background: "#f6f6f6",
        padding: 30,
    };
    return (
        <div className="navbar_fon">
            <div className="navbar container">
                <img
                    className="logo"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt=""
                />
                <Modal
                    open={open}
                    onClose={() => {
                        setOpen(false);
                    }}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={style}>
                        <form className="auth" autoComplete="off">
                            <TextField
                                id="email"
                                label="Email"
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                            <TextField
                                id="password"
                                label="Password"
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                                inputProps={{ type: "password" }}
                            />
                            <TextField
                                id="passwordConfirm"
                                label="Confirm your password"
                                inputProps={{ type: "password" }}
                            />
                            <Button onClick={signUp}>Sign up</Button>
                        </form>
                    </div>
                </Modal>
                <Modal
                    open={openSignin}
                    onClose={() => {
                        setOpenSignin(false);
                    }}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={style}>
                        <form className="auth" autoComplete="off">
                            <TextField
                                id="email"
                                label="Email"
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                            <TextField
                                id="password"
                                label="Password"
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                                inputProps={{ type: "password" }}
                            />
                            <Button onClick={signIn}>Sign up</Button>
                        </form>
                    </div>
                </Modal>
                {user ? (
                    <Button
                        onClick={() => {
                            auth.signOut();
                        }}
                    >
                        Logout
                    </Button>
                ) : (
                    <div>
                        <Button
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            Sign up
                        </Button>
                        <Button
                            onClick={() => {
                                setOpenSignin(true);
                            }}
                        >
                            Sign in
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Navbar;
