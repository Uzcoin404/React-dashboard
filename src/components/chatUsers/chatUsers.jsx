import React, { Fragment, useContext, createRef } from "react";
import { NavLink as Link } from "react-router-dom";
import { v4 } from "uuid";

import { auth } from "../firebase/firebase"
import { Button } from "@mui/material";

import Spinner from "../spinner/spinner";
import TimeConverter from "../../utils/timeConverter";
import noChatsIcon from "../../assets/img/icon/noChats.svg";
import ArrowDown from "../../lib/icons/arrowDown";
import LogoImg from "../../assets/img/logo.png";
import "./chatUsers.scss";

function ChatUsers({
    chats,
    chatID,
    isLoading,
    defaultAvatar,
    chatMenu,
    isOpen,
}) {
    const userIndicator = createRef();

    function showChats(amount) {
        if (isLoading) {
            let i = -75;
            return <Spinner />;
        } else {
            if (chats) {
                return chats.map((chat) => {
                    let lastMsgDate = TimeConverter(chat.latest?.created, true);
                    return (
                        <a
                            href={`#${chat.user.id}`}
                            id={chat.user.id}
                            key={v4()}
                            onClick={() => {
                                userIndicator.current.classList.remove(
                                    "active"
                                );
                                chatMenu.current.classList.remove("active");
                            }}
                        >
                            <div
                                className={
                                    chatID != chat.user.id
                                        ? "chatProfile"
                                        : "chatProfile active"
                                }
                            >
                                <img
                                    src={
                                        chat.user.image
                                            ? chat.user.image
                                            : defaultAvatar
                                    }
                                    alt=""
                                    className="chatProfile__img"
                                    onError={(e) =>
                                        (e.target.src = defaultAvatar)
                                    }
                                />
                                <div className="chatProfile__content">
                                    <div className="chatProfile__content__item">
                                        <h3 className="chatProfile__name">
                                            {chat.user?.name}{" "}
                                            {chat.user?.lastname}
                                        </h3>
                                        <p className="chatProfile__text">
                                            {chat?.latest?.message.slice(0, 20)}
                                        </p>
                                    </div>
                                    <span
                                        ref={userIndicator}
                                        className={`chatProfile__read${
                                            chat.chat.reading ? "" : " active"
                                        }`}
                                    >
                                        {lastMsgDate}
                                    </span>
                                </div>
                            </div>
                        </a>
                    );
                });
            } else {
                return (
                    <div className="noChats">
                        <img
                            src={noChatsIcon}
                            alt=""
                            className="noChats__img"
                        />
                        <h3 className="noChats__title">
                            Hozircha hech kim bilan suhbatlashmagansiz
                        </h3>
                    </div>
                );
            }
        }
    }

    return (
        <section
            className={isOpen ? "chatsPanel active" : "chatsPanel"}
            ref={chatMenu}
        >
            <div className="chatsPanel__header">
                <Link to="/" className="chatsPanel__logo">
                    <img src={LogoImg} alt="" />
                    <h4 className="chatsPanel__header__title">Messages</h4>
                </Link>
                <ArrowDown className="arrowDown" />
                {chats?.hasOwnProperty("length") ? (
                    <span className="chats__indicator">{chats.length}</span>
                ) : (
                    ""
                )}
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => auth.signOut()}
                >
                    Log out
                </Button>
            </div>
            <div className="chatsPanel__main">
                <div className="chatsPanel__chats">{showChats(7)}</div>
            </div>
            <div></div>
        </section>
    );
}
export default ChatUsers;
