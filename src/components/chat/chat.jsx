// Import => React
import React, {
    useContext,
    useEffect,
    useState,
    createRef,
    useRef,
} from "react";
import { NavLink as Link, Route } from "react-router-dom";

import { auth, db } from "../firebase/firebase";
import {
    query,
    collection,
    orderBy,
    onSnapshot,
    QuerySnapshot,
} from "firebase/firestore";

// Import => Mui
import { Box, Button, IconButton, Avatar, Typography } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { UserContext } from "../../context/user";

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
    const { user } = useContext(UserContext);
    const [chats, setChats] = useState(null);
    const [chatID, setChatID] = useState(
        urlHash.trim() != "" && !isNaN(urlHash) && urlHash != userID
            ? urlHash
            : null
    );
    const [chatUser, setChatUser] = useState(true);
    const { windowWidth } = useWindowDimensions();

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
        // window.addEventListener("hashchange", getHashUrl);
        // function getHashUrl() {
        //     let hash = window.location.hash.substring(1);
        //     if (hash.trim() != "" && !isNaN(hash) && hash != userID) {
        //         setChatID(hash);
        //     } else {
        //         setChatID(null);
        //         window.addEventListener("hashchange", getHashUrl, {
        //             once: true,
        //         });
        //         window.location.hash = "";
        //     }
        // }
        setTimeout(() => {
            Notification.requestPermission().then((result) => {
                console.log(result);
            });
            document.querySelector("#__replain_widget_iframe")?.remove();
        }, 3000);
    }, []);

    function getMessages() {
        const request = query(collection(db, "messages"), orderBy("date"));
        const unsubscribe = onSnapshot(request, (querySnapshot) => {
            let messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages);
        });
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

    return (
        <Box className="chat">
            <ChatUsers chats={chats} chatID={chatID} />

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
                                href="#"
                            >
                                <ArrowLeft />
                            </IconButton>
                        )}
                        <Box className="chatProfile">
                            <Avatar
                                src={chatUser.image}
                                alt=""
                                className="chatProfile__img"
                            ></Avatar>
                            <Box className="chatProfile__content">
                                <h5 className="chatProfile__name">
                                    {chatUser.name} {chatUser.lastname}
                                </h5>
                                <span className="chatProfile__text">
                                    Online
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
                    chatID={chatID}
                />

                {chatUser ? (
                    <ChatSend
                        messages={messages}
                        getMessages={getMessages}
                        getChats={getChats}
                    />
                ) : (
                    ""
                )}
            </section>

            <Box component="section" className="infoPanel" sx={{ mt: 10 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        src={user.photoURL}
                        alt=""
                        sx={{ width: 100, height: 100 }}
                    />
                    <Typography
                        variant="h4"
                        sx={{
                            mt: 2,
                            overflowWrap: "break-word",
                            width: "100%",
                        }}
                        color="#0f315e"
                        fontWeight={600}
                        textAlign="center"
                    >
                        {user.displayName}
                    </Typography>
                    <Typography variant="p" color="#333" fontSize={15}>
                        {user.email}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
export default Chat;
