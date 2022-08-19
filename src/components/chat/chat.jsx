// Import => React
import React, {
    useContext,
    useEffect,
    useState,
    createRef,
    useRef,
} from "react";
import { NavLink as Link } from "react-router-dom";

import { auth, db } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, orderBy, onSnapshot, QuerySnapshot } from "firebase/firestore";

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

    const [messages, setMessages] = useState("loading");
    const [user, setUser] = useState(useAuthState(auth));
    const [chats, setChats] = useState(null);
    const [chatID, setChatID] = useState(
        urlHash.trim() != "" && !isNaN(urlHash) && urlHash != userID
            ? urlHash
            : null
    );
    const [chatUser, setChatUser] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const defaultAvatar =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI7M4Z0v1HP2Z9tZmfQaZFCuspezuoxter_A&usqp=CAU";
    const { windowWidth } = useWindowDimensions();
    const chatMenu = createRef();

    useEffect(() => {
        setMessages("loading");
        if (chatID) {
            function getUser() {}
            getUser();
        }
        document.querySelector("#messageInput")?.focus();
    }, [chatID]);

    useEffect(() => {
        getMessages();
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

    function getMessages() {
        const request = query(collection(db, 'messages'), orderBy('date'));
        const unsubscribe = onSnapshot(request, (querySnapshot) => {
            let messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id});
            })
            setMessages(messages);
        })
        return () => unsubscribe();
    }

    function getChats(isNotification = false) {}

    function showNotification(chat) {
        let user = chat.user?.name + " " + chat.user?.lastname;
        let message = chat.latest.message.slice(0, 50);
        let userAvatar = chat.user.image ? chat.user.image : defaultAvatar;

        new Notification(user, { body: message, icon: userAvatar });
        return 0;
    }

    function signIn() {
        const provider = new GoogleAuthProvider();

        auth.useDeviceLanguage();
        signInWithPopup(auth, provider);
    }

    if (user) {
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
                    {chatUser ? (
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

                    {chatUser ? (
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

                <section className="infoPanel"></section>
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
