import { motion } from "framer-motion";
import { BsGoogle } from "react-icons/bs";
import { signInWithGoogle } from "../../util/auth-options/server_options";
import { useSelector } from "react-redux";
import { PusherChatState } from "../../types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";

const Welcome = () => {
    const authUser = useSelector(
        (store: PusherChatState) => store.chat.authUser
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const authenticated = !!authUser?.uid;
    const handleAuth = async () => {
        if (authenticated) {
            navigate("/app");
        } else {
            setIsLoading(true);
            await signInWithGoogle();
            setTimeout(() => {
                navigate("/app");
            }, 1000);
        }
    };
    return (
        <div className=" bg-gray-950 h-screen w-screen flex flex-col justify-center items-center">
            <motion.h1
                className="text-4xl "
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.p
                    animate={{ color: ["#ff4d4d", "#4db8ff"] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className="font-bold italic"
                >
                    {" LIVE LINK "}
                </motion.p>
            </motion.h1>
            <motion.p
                className="text-pattern_5 text-xl"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Instant chat application with dozens of features
            </motion.p>
            <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Button className="gap-2" radius="xl" onClick={handleAuth}>
                    {authenticated
                        ? "Continue to chat"
                        : "Continue with Google"}
                    {!authenticated && <BsGoogle size={20} />}
                </Button>
                <Spinner condition={isLoading} />
            </motion.div>
        </div>
    );
};

export default Welcome;
