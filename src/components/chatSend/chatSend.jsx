import React, { createRef, useState } from "react";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth,  } from "../firebase/firebase";

import {
    IconButton,
    Button,
    Modal,
    Paper,
    Box,
} from "@mui/material";
import TimeConverter from "../../utils/timeConverter";
import PaperClip from "../../assets/img/icon/paperclip.svg";
import PaperPlane from "../../assets/img/icon/paper-plane.svg";
import "./chatSend.scss";

let url = process.env.REACT_APP_URL;

function ChatSend({ messages }) {
    const [previewImages, setPreviewImages] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    let msgValue = createRef();
    let previewModal = createRef();
    let fileInput = createRef();
    const token = localStorage.getItem("Token");
    const userID = localStorage.getItem("user_id");
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    async function sendMessage(e) {
        e.preventDefault();
        let message = msgValue.current.value.trim();
        const { uid, displayName } = auth.currentUser;

        // messageChange("");
        createMessage(message);
        await addDoc(collection(db, 'messages'), {
            text: message,
            uid,
            date: serverTimestamp()
        });

    }

    function createMessage(message) {
        const messages = document.querySelector(
            ".styles_scrollable-div__prSCv"
        );
        const lastMessage = Array.from(
            document.querySelectorAll(".message")
        ).pop();

        let newMessage = document.createElement("div");
        let newMessageContent = document.createElement("div");
        let newMessageText = document.createElement("p");
        let newMessageTime = document.createElement("p");

        newMessage.className = "message outgoing move";
        newMessageContent.className = "message__content sending";
        newMessageText.className = "message__text";
        newMessageTime.className = "message__date";

        newMessageText.innerHTML = message;
        newMessageTime.innerHTML = TimeConverter(Math.floor(Date.now() / 1000));

        newMessageContent.appendChild(newMessageText);
        newMessageContent.appendChild(newMessageTime);
        newMessage.appendChild(newMessageContent);
        messages.appendChild(newMessage);

        if (lastMessage.classList.contains("outgoing")) {
            lastMessage.classList.add("messageGroup");
        }

        // if (messages.childElementCount > 0) {
        //     const chatProfileList =
        //         document.querySelector(".chatsPanel__chats");
        //     const chatProfile = document.querySelector(
        //         ".chatProfile.active"
        //     ).parentNode;
        //     chatProfile.querySelector(".chatProfile__text").innerHTML =
        //         message.slice(0, 20);
        //     chatProfileList.prepend(chatProfile);
        // }
        messages.scrollTop = messages.scrollHeight;
    }

    function messageChange(msg) {
        let sendBtn = document.querySelector("#msgSend");

        if (msg.trim() != "") {
            sendBtn.classList.add("active");
            sendBtn.removeAttribute("disabled", "");
        } else {
            msgValue.current.value = "";
            sendBtn.classList.remove("active");
            sendBtn.setAttribute("disabled", "");
        }
    }

    function sendFile() {
        setModalOpen(false);
    }

    function previewImage() {
        const objectUrl = [];

        if (fileInput.current.files.length > 0) {
            for (let i = 0; i < fileInput.current.files.length; i++) {
                objectUrl.push(URL.createObjectURL(fileInput.current.files[i]));
            }
            setPreviewImages(objectUrl);
            setModalOpen(true);
        }
    }

    function PreviewModal() {
        const handleClose = () => setModalOpen(false);
        return (
            <Modal
                open={modalOpen}
                onClose={handleClose}
            >
                <Paper
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        p: 3,
                        borderRadius: 5
                    }}
                    className="imagePreview"
                >
                    <div className="imagePreview__content">
                        <div className="imagePreview__group">
                            {previewImages?.map((image, i) => (
                                <img
                                    src={image}
                                    key={i}
                                    alt=""
                                    className="imagePreview__image"
                                />
                            ))}
                        </div>
                        <div className="imagePreview__buttons">
                            <Button
                                variant="outlined"
                                color="error"
                                className="imagePreview__btn"
                                onClick={() => setModalOpen(false)}
                            >
                                Bekor qilish
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className="imagePreview__btn"
                                onClick={() => sendFile()}
                            >
                                Yuborish
                            </Button>
                        </div>
                    </div>
                </Paper>
            </Modal>
        );
    }

    return (
        <form
            action="#"
            className="inputMessage sendMsgForm"
            onSubmit={(e) => sendMessage(e)}
        >
            <PreviewModal />
            <IconButton className="attachFile" color="primary">
                <img src={PaperClip} alt="" />
                <input
                    type="file"
                    className="attachFile__input"
                    name="media"
                    onChange={() => previewImage()}
                    multiple
                    ref={fileInput}
                />
            </IconButton>
            <div className="chatInput">
                <input
                    type="text"
                    className="message__input"
                    id="messageInput"
                    autoFocus
                    autoComplete="off"
                    placeholder="Type a message"
                    ref={msgValue}
                    onChange={(e) => messageChange(e.target.value)}
                />
                <IconButton
                    className="sendBtn"
                    id="msgSend"
                    title="Yuborish"
                    type="submit"
                    disabled
                >
                    <img src={PaperPlane} alt="" />
                </IconButton>
            </div>
        </form>
    );
}
export default ChatSend;
