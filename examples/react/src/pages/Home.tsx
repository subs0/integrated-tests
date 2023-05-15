import { API } from "@-0/browser"
import { H1, H2, H3 } from "../elements"
import { Link, TopNav, ButtonCTA } from "../components"
import {
    medium_slab_padding,
    Page,
    Slab,
    slim_slab_padding,
    xtall_slab_padding,
    TextPanel,
} from "../containers"
import { useR$ } from "../for-export"
import { useMyTheme } from "../hooks"
import {
    WhatWhy,
    BannerQuote,
    IsoSimple,
    IsoLiving,
    BoldSlab,
    IsoStair,
    BigQuote,
    TimelineHome,
    WhenTitle,
    Footer,
    YouTubeSlab,
} from "../slabs"

// need the extra "data" prop to nest home state inside global atom
export const Home = ({ data: { data } }) => {
    const { colors, fonts, fontWeights, lineHeights, fontSizes } = useMyTheme()
    const { dark_5 } = colors
    const { xs, sm, md } = fontSizes
    //console.log("Home:", { data })

    return (
        <Page>
            {/*<BannerQuote />*/}
            <Slab
                //padding={xtall_slab_padding}
                bg="light_5"
                justify="center"
                align={["flex-start", null, "center"]}
                full_height={true}
                direction={["column"]}
            >
                <H1>Double Your Square Footage</H1>
                <div>
                    <H3 color="dark_5" weight="thin">
                        The Easy Way
                    </H3>
                </div>
            </Slab>
            {/*<iframe title="vimeo-player" src="https://player.vimeo.com/video/777452572?h=a19a02c9c6" width="640" height="360" frameborder="0" allowfullscreen></iframe>*/}
            <YouTubeSlab embedId="779274998" yt={false} title="Hall Interview" />
            <Slab padding={medium_slab_padding} bg="light_5" justify="center" align="center">
                <H3 color="dark_5" width={null}>
                    Latest News
                </H3>
            </Slab>
            <IsoSimple
                src="/svgs/pro-remodeler-logo.svg"
                alt="Pro Remodeler Journal Logo"
                href="https://www.proremodeler.com/anotherstory-revamping-second-story-addition"
                display="none"
            >
                <TextPanel>
                    <p
                        css={{
                            fontFamily: fonts.serif,
                            fontWeight: fontWeights.normal,
                            fontSize: fontSizes.sm,
                            color: colors.dark_5,
                            "&:after": {
                                display: "none",
                                paddingBottom: "100%",
                            },
                        }}
                    >
                        <span style={{ fontStyle: "italic" }}>
                            Traditionally, second-story additions are intense and disrupting
                            projects: for both the builder and the homeowners. The disruption alone
                            could be enough to deter a family from proceeding with an addition, but
                            that’s AnotherStory’s entire selling point: a second story without
                            disruption.
                        </span>
                    </p>
                </TextPanel>
            </IsoSimple>
            <Slab padding={medium_slab_padding} bg="light_5" justify="center" align="center"></Slab>
            <WhatWhy />
            <BoldSlab title="How" subtitle="Patent-Pending Technology" />
            <IsoSimple
                src="/svgs/about-us.svg"
                alt="Man working in second story addition hovering above first"
                zIndex={10}
            >
                <p
                    css={useR$({
                        flex: "1",
                        color: dark_5,
                        fontFamily: fonts.serif,
                        fontWeight: fontWeights.normal,
                        lineHeight: lineHeights.md,
                        fontSize: [sm, null, md],
                    })}
                >
                    We build your second story without breaching the first
                </p>
            </IsoSimple>
            <IsoLiving
                src="/svgs/living.svg"
                tagline="While you live uninterrupted and dust-free until stair installation"
                zIndex={1}
            />
            <IsoStair
                src="/svgs/stair.svg"
                tagline="Stairs are installed and cleanup occurs at the end of the process"
                zIndex={10}
            />
            <Slab aria-hidden bg="light_5" padding={medium_slab_padding}>
                {/*<Link href="#initial-phone-call"> Initial Phone Call </Link>*/}
                <span></span>
            </Slab>
            <TimelineHome title="When" subtitle="things happen for you" data={data} />

            <BannerQuote />

            <BigQuote />
            <YouTubeSlab embedId="736543055" yt={false} title="Hall Interview" />

            <Footer />
        </Page>
    )
}
