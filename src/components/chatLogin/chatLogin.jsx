import React from "react";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { Box, Button } from "@mui/material";

export default function ChatLogin() {
    function signIn() {
        const provider = new GoogleAuthProvider();

        auth.useDeviceLanguage();
        signInWithPopup(auth, provider);
        // const q = query(collection(db, "cities"), where("capital", "==", true));

        // const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {
        // // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        // });
    }
    return (
        <Box sx={{ display: "grid", placeItems: "center", height: "100vh" }}>
            <Button variant="outlined" size="large" onClick={signIn}>
                Sign in with Google
            </Button>
        </Box>
    );
}
