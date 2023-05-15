//import React from "react"
//import PropTypes from "prop-types";

export const YoutubeEmbed = ({ embedId, yt = true, title = "AnotherStory" }) => (
    <div
        css={{
            overflow: "hidden",
            position: "relative",
            width: "100%",
            "&:after": {
                paddingTop: "56.25%",
                display: "block",
                content: `""`,
            },
            //"&:iframe": {
            //    left: 0,
            //    top: 0,
            //    height: "100%",
            //    width: "100%",
            //    position: "absolute",
            //},
        }}
    >
        <iframe
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
            src={
                yt
                    ? `https://www.youtube.com/embed/${embedId}`
                    : `https://player.vimeo.com/video/${embedId}`
            }
        />
    </div>
)

//const bloop = () => (
//    <div style="padding:56.25% 0 0 0;position:relative;">
//        <iframe
//            src="https://player.vimeo.com/video/736543055?h=dfba48524a&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
//            frameborder="0"
//            allow="autoplay; fullscreen; picture-in-picture"
//            allowfullscreen
//            style="position:absolute;top:0;left:0;width:100%;height:100%;"
//            title="2&amp;#039;40- Cut Proof.mp4"
//        ></iframe>
//    </div>
//    //<script src="https://player.vimeo.com/api/player.js"></script>
//)
