// Import => React
import React, {
    useContext,
    useEffect,
    useState,
    createRef,
    useRef,
} from "react";
import { NavLink as Link } from "react-router-dom";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useCollectionData } from "react-firebase-hooks/firestore";

// Import => Mui
import { Box, Button, IconButton } from "@mui/material";

// Import => Components
import ChatUsers from "../chatUsers/chatUsers";
import ChatMessages from "../chatMessages/chatMessages";
import ChatSend from "../chatSend/chatSend";
import useWindowDimensions from "../../utils/windowDimension";
import ArrowLeft from "../../lib/icons/arrowLeft";
import ArrowDown from "../../lib/icons/arrowDown";
import Dots from "../../assets/img/icon/dots.svg";

// Import => Style
import "./chat.scss";
import "aos/dist/aos.css";

function Chat() {
    let userID = localStorage.getItem("user_id");
    let urlHash = window.location.hash.substring(1);

    const [messages, setMessagesData] = useState("loading");
    const [adverts, setAdverts] = useState([]);
    const [chats, setChats] = useState(null);
    const [chatID, setChatID] = useState(
        urlHash.trim() != "" && !isNaN(urlHash) && urlHash != userID
            ? urlHash
            : null
    );
    const [chatUser, setChatUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [chatFound, setChatFound] = useState(true);
    const defaultAvatar =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI7M4Z0v1HP2Z9tZmfQaZFCuspezuoxter_A&usqp=CAU";
    const { windowWidth } = useWindowDimensions();
    const chatMenu = createRef();

    useEffect(() => {
        setMessagesData("loading");
        if (chatID) {
            function getUser() {}
            getUser();
        }
        document.querySelector("#messageInput")?.focus();
    }, [chatID]);

    useEffect(() => {
        window.addEventListener("hashchange", getHashUrl);
        function getHashUrl() {
            let hash = window.location.hash.substring(1);
            if (hash.trim() != "" && !isNaN(hash) && hash != userID) {
                setChatID(hash);
            } else {
                setChatID(null);
                window.addEventListener("hashchange", getHashUrl, {
                    once: true,
                });
                window.location.hash = "";
            }
        }
        setTimeout(() => {
            Notification.requestPermission().then((result) => {
                console.log(result);
            });
            document.querySelector("#__replain_widget_iframe")?.remove();
        }, 3000);
    }, []);

    firebase.initializeApp({
        apiKey: "AIzaSyD16qWNFnlRg4r3LN9eZSO-EcVQm86TrMo",
        authDomain: "firechat-e157a.firebaseapp.com",
        projectId: "firechat-e157a",
        storageBucket: "firechat-e157a.appspot.com",
        messagingSenderId: "1028131822299",
        appId: "1:1028131822299:web:47fe8cfd0029d828068afe",
        measurementId: "G-9E22DH34DF",
    });

    const auth = firebase.auth();
    const firestore = firebase.firestore();

    function getMessages() {}

    function getChats(isNotification = false) {}

    function showNotification(chat) {
        let user = chat.user?.name + " " + chat.user?.lastname;
        let message = chat.latest.message.slice(0, 50);
        let userAvatar = chat.user.image ? chat.user.image : defaultAvatar;

        new Notification(user, { body: message, icon: userAvatar });
        return 0;
    }

    function signIn() {
        const provider = new firebase.auth.GoogleAuthProvider();

        auth.useDeviceLanguage();
        auth.signInWithPopup(provider);
    }

    function SignOut() {
        return (
            auth.currentUser && (
                <Button className="sign__out__btn" onClick={() => auth.signOut()}>
                    Sign Out
                </Button>
            )
        );
    }

    if (auth.currentUser) {
        return (
            <Box className="chat">
                <ChatUsers
                    chats={chats}
                    chatID={chatID}
                    isLoading={isLoading}
                    defaultAvatar={defaultAvatar}
                    chatMenu={chatMenu}
                    isOpen={windowWidth < 768 && !chatID ? true : false}
                />

                <section className="messagesPanel">
                    {chatUser && chatFound ? (
                        <Box className="messagesPanel__header">
                            {windowWidth > 768 ? (
                                ""
                            ) : (
                                <IconButton
                                    className="chatMenuBtn"
                                    variant="text"
                                    color="primary"
                                    onClick={() =>
                                        chatMenu.current.classList.add("active")
                                    }
                                >
                                    <Link to={"/chat#"}>
                                        <ArrowLeft />
                                    </Link>
                                </IconButton>
                            )}
                            <Box className="chatProfile">
                                <Link to={"/reltorcob/" + chatUser.id}>
                                    <img
                                        src={
                                            chatUser.image
                                                ? chatUser.image
                                                : defaultAvatar
                                        }
                                        alt=""
                                        className="chatProfile__img"
                                        onError={(e) =>
                                            (e.target.src = defaultAvatar)
                                        }
                                    />
                                </Link>
                                <Box className="chatProfile__content">
                                    <Link
                                        to={"/reltorcob/" + chatUser.id}
                                        className="chatProfile__name"
                                    >
                                        {chatUser.name} {chatUser.lastname}
                                    </Link>
                                    <span className="chatProfile__text">
                                        {chatUser?.user_type}
                                    </span>
                                </Box>
                            </Box>
                            <div className="header__more">
                                <IconButton className="header__more__btn">
                                    <img src={Dots} alt="" />
                                </IconButton>
                            </div>
                        </Box>
                    ) : (
                        ""
                    )}

                    <ChatMessages
                        messages={messages}
                        chatUser={chatUser}
                        chatID={chatID}
                        defaultAvatar={defaultAvatar}
                    />

                    {chatUser && chatFound ? (
                        <ChatSend
                            chatUser={chatUser}
                            messages={messages}
                            getMessages={getMessages}
                            getChats={getChats}
                        />
                    ) : (
                        ""
                    )}
                </section>

                <section className="infoPanel">
                    {/* <SignOut /> */}
                </section>
            </Box>
        );
    } else {
        return (
            <Box
                sx={{ display: "grid", placeItems: "center", height: "100vh" }}
            >
                <Button variant="outlined" size="large" onClick={signIn}>
                    Sign in with Google
                </Button>
            </Box>
        );
    }
}
export default Chat;
