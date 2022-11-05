import React, { Fragment, useContext, createRef } from "react";
import { NavLink as Link } from "react-router-dom";
import { v4 } from "uuid";

import { auth } from "../firebase/firebase"
import { Button } from "@mui/material";
import ContentLoader from "react-content-loader";
import { UserContext } from "../../context/user";

import useWindowDimensions from "../../utils/windowDimension";
import TimeConverter from "../../utils/timeConverter";
import noChatsIcon from "../../assets/img/icon/noChats.svg";
import ArrowDown from "../../lib/icons/arrowDown";
import LogoImg from "../../assets/img/logo.png";
import "./chatUsers.scss";

function ChatUsers({
    chats,
    chatID,
    defaultAvatar,
}) {
    const { user } = useContext(UserContext);
    const userIndicator = createRef();
    const { windowWidth } = useWindowDimensions();
    const isOpen = windowWidth < 768 && !chatID ? true : false;
    const isLoading = user == 'loading' ? true : false;

    function showChats(amount) {
        if (isLoading) {
            let i = -75;
            return (
                <ContentLoader
                    speed={1.25}
                    width={"100%"}
                    height={amount * 75}
                    interval={0.25}
                    backgroundColor="#ebebeb"
                    foregroundColor="#0066ff00"
                    style={{ padding: "10px 12px 0" }}
                >
                    {Array.apply(null, { length: amount }).map(() => {
                        i += 75;
                        return (
                            <Fragment key={v4()}>
                                <rect
                                    x="0"
                                    y={i}
                                    rx="10"
                                    width="50"
                                    height="50"
                                />
                                <rect
                                    x="65"
                                    y={i + 5}
                                    rx="5"
                                    width="75%"
                                    height="20"
                                />
                                <rect
                                    x="65"
                                    y={i + 33}
                                    rx="5"
                                    width="40%"
                                    height="10"
                                />
                            </Fragment>
                        );
                    })}
                </ContentLoader>
            );
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

    function logOut() {
        auth.signOut();
    }

    return (
        <section
            className={isOpen ? "chatsPanel active" : "chatsPanel"}
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
                    onClick={logOut}
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
