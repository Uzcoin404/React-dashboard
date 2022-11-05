import React, { useEffect, useContext } from "react";

import { UserContext } from "../../context/user";
import { Avatar } from "@mui/material";
import ReactScrollableFeed from "react-scrollable-feed";
import AOS from "aos";
import TimeConverter from "../../utils/timeConverter";
import Spinner from "../spinner/spinner";
import ArrowDown from "../../lib/icons/arrowDown";
import "./chatMessages.scss";
import noMessageIcon from "../../assets/img/noMessages.svg";
import welcomeToChat from "../../assets/img/welcomeToChat.svg";

function ChatMessages({ messages, chatID }) {
    const { user } = useContext(UserContext);
    useEffect(() => {
        AOS.init({
            offset: 0,
            duration: 500,
            debounceDelay: 50,
            throttleDelay: 90,
            mirror: true,
            once: false,
            anchorPlacement: "top-bottom",
        });
    }, []);
    const messagesBlog = document.querySelector(
        ".styles_scrollable-div__prSCv"
    );
    const scrollBottomBtn = document.querySelector(".scrollBottom");

    messagesBlog?.addEventListener("scroll", function () {
        if (this.scrollHeight - this.clientHeight - this.scrollTop > 400) {
            scrollBottomBtn.classList.add("active");
        } else {
            scrollBottomBtn.classList.remove("active");
        }
    });
    scrollBottomBtn?.addEventListener("click", function () {
        messagesBlog.scrollTop = messagesBlog.scrollHeight;
    });

    if (false) {
        // chatID
        return (
            <div className="welcomeAfemeChat">
                <img
                    src={welcomeToChat}
                    alt=""
                    className="welcomeAfemeChat__img"
                />
                <h3 className="welcomeAfemeChat__title">
                    Chatga xush kelibsiz
                </h3>
                <p className="welcomeAfemeChat__text">
                    Suhbatlashishni boshlash uchun foydalanuvchilardan birini
                    ustiga bosing
                </p>
            </div>
        );
    } else {
        if (messages == "loading") {
            return (
                <div className="messages__loader">
                    <Spinner />
                </div>
            );
        } else if (messages) {
            let sendingMessages = document.querySelectorAll(".message.move");
            if (sendingMessages) {
                for (let i = 0; i < sendingMessages.length; i++) {
                    sendingMessages[i]?.remove();
                }
            }

            return (
                <div className="messages">
                    <div className="bubbles">
                        <ReactScrollableFeed>
                            {messages.map((message, i) => {
                                let messageText = message.text;
                                let date = TimeConverter(message.date);
                                let animate =
                                    messages.length > 10
                                        ? ""
                                        : messages.length - 10 > i + 1
                                        ? ""
                                        : "fade-up";

                                // if (message.to == chatUser.id) {
                                //     let className = `message${
                                //         message.to == chatUser.id &&
                                //         messages[i]?.to == chatUser.id
                                //             ? " messageGroup"
                                //             : ""
                                //     } outgoing`;
                                //     return (
                                //         <div
                                //             className={className}
                                //             key={v4()}
                                //             data-aos={animate}
                                //         >
                                //             <div className="message__content">
                                //                 <p className="message__text">
                                //                     {messageText}
                                //                 </p>
                                //                 <p className="message__date">
                                //                     {date}
                                //                 </p>
                                //             </div>
                                //         </div>
                                //     );
                                // } else {
                                //     let className = `message${
                                //         message.to != chatUser.id &&
                                //         messages[i]?.to != chatUser.id &&
                                //         messages[i]?.to
                                //             ? " messageGroup"
                                //             : ""
                                //     } incoming`;
                                //     return (
                                //         <div
                                //             className={className}
                                //             key={v4()}
                                //             data-aos={animate}
                                //             to={message.to}
                                //         >
                                //             <img
                                //                 src={
                                //                     chatUser.image
                                //                         ? chatUser.image
                                //                         : defaultAvatar
                                //                 }
                                //                 alt=""
                                //                 className="message__sender"
                                //                 onError={(e) =>
                                //                     (e.target.src =
                                //                         defaultAvatar)
                                //                 }
                                //             />
                                //             <div className="message__content">
                                //                 <p className="message__text">
                                //                     {messageText}
                                //                 </p>
                                //                 <p className="message__date">
                                //                     {date}
                                //                 </p>
                                //             </div>
                                //         </div>
                                //     );
                                // }
                                return (
                                    <div
                                        className="message"
                                        key={i}
                                        data-aos={animate}
                                        to={message.to}
                                    >
                                        <Avatar
                                            src=""
                                            alt=""
                                            className="message__sender"
                                        ></Avatar>
                                        <div className="message__content">
                                            <p className="message__text">
                                                {messageText}
                                            </p>
                                            <p className="message__date">
                                                {date}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </ReactScrollableFeed>
                    </div>
                    <div className="scrollBottom">
                        <ArrowDown
                            className="arrowDown"
                            color="#fff"
                            width={16}
                            height={16}
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="noChatMessages">
                    <img
                        src={noMessageIcon}
                        alt=""
                        className="noChatMessages__img"
                    />
                    <h3 className="noChatMessages__title">
                        Hozircha bu yerda xabarlar yo'q
                    </h3>
                </div>
            );
        }
    }
}
export default ChatMessages;
