import React from "react";

const Avatar = React.memo(
    ({
        image,
        width = 10,
        height = 10,
    }: {
        width?: number;
        height?: number;
        image: string;
    }) => {
        const dynamicClass = `flex-shrink-0 bg-pattern_5 border border-pattern_4 object-cover rounded-full shadow-0`;

        return (
            <img
                src={image || "/no_avatar2.png"}
                alt="profile image"
                width={width * 4}
                className={dynamicClass}
                height={height * 4}
                style={{
                    width: `${width * 4}px`,
                    height: `${height * 4}px`,
                    borderRadius: "9999px",
                }}
            />
        );
    }
);
Avatar.displayName = "Avatar";
export default Avatar;
