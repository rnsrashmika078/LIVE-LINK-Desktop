import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "@/lib/firebase/firebase";
import { PusherChatDispatch } from "@/types";
import { setAuthUser } from "@/lib/redux/chatslicer";

export default function ListenerForAuth() {
    const dispatch = useDispatch<PusherChatDispatch>();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const authUser = {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    dp: user.photoURL,
                };
                const addAuthUser = async () => {
                    const response = await fetch(
                        "http://localhost:3000/api/auth/add-auth-user",
                        {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json",
                            },
                            body: JSON.stringify(authUser),
                        }
                    );
                    const result = await response.json();
                    if (result.status === 200) {
                        console.log("Auth user data from db", result.user);
                    }
                };
                addAuthUser();
                dispatch(
                    setAuthUser({
                        uid: user.uid!,
                        email: user.email!,
                        dp: user.photoURL!,
                        name: user.displayName!,
                    })
                );
            } else {
                dispatch(setAuthUser(null));
            }
        });

        return () => {
            unsubscribe();
        };
    }, [dispatch]);

    return null;
}
