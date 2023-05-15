import { API } from "@-0/browser"
import { Link, TopNav } from "../components"
import {
    medium_slab_padding,
    Page,
    Slab,
    slim_slab_padding,
    tall_slab_padding,
    TextPanel,
} from "../containers"
import { H2, H3, H4 } from "../elements"
import { IsoSimple, Footer, TimelineProcess, YouTubeSlab } from "../slabs"
import { YoutubeEmbed } from "../components"
import { useMyTheme } from "../hooks"
import { useR$ } from "../for-export"

const P = ({ weight = "normal", children }) => {
    const { fontWeights, fonts, letterSpacings, fontSizes, colors, lineHeights } = useMyTheme()
    return (
        <p
            css={useR$({
                fontWeight: fontWeights[weight],
                fontFamily: fonts.serif,
                fontSize: [fontSizes.sm, null, fontSizes.md],
                color: colors.dark_5,
                lineHeight: lineHeights.md,
            })}
        >
            {children}
        </p>
    )
}

const Bold = ({ children }) => {
    const { fontWeights, fonts, letterSpacings, fontSizes, colors } = useMyTheme()

    return (
        <em
            css={useR$({
                fontWeight: fontWeights.bold,
                fontSize: [fontSizes.sm, null, fontSizes.md],
                fontFamily: fonts.serif,
            })}
        >
            {children}
        </em>
    )
}
export const Process = ({ data }) => {
    const { fontWeights, fonts, letterSpacings, fontSizes, colors } = useMyTheme()
    //console.log({ data })
    return (
        <Page>
            <Slab padding={tall_slab_padding} bg="light_5" />
            <IsoSimple
                src="/svgs/finance.svg"
                alt="image of office with 3 chairs facing each other across a desk"
            >
                <TextPanel>
                    <H3 font="serif" color="dark_5">
                        The Creative Process
                    </H3>
                    <p
                        css={{
                            fontFamily: fonts.serif,
                            fontWeight: fontWeights.bold,
                            fontSize: fontSizes.sm,
                            color: colors.dark_5,
                        }}
                    >
                        What it&apos;s like to work with us
                    </p>
                </TextPanel>
            </IsoSimple>
            <Slab padding={medium_slab_padding} bg="light_5" />
            <YouTubeSlab embedId="MjdbuYFfHaQ" />
            {/*<YouTubeSlab embedId="YE1QU3bYeSY" />*/}
            <Slab padding={medium_slab_padding} bg="light_5" justify="center" align="center">
                <H3 color="dark_5" width={null}>
                    Timeline
                </H3>
            </Slab>
            <TimelineProcess milestones={data} />
            <Slab bg="light_5" justify="center" align="center">
                <TextPanel width={["100%", "75%"]}>
                    <H3 color="dark_5">Financing Options</H3>
                    <P weight="bold">
                        We can help connect you with a number of different options to finance your
                        dream.
                    </P>
                    <P>
                        - Financing options
                        <br />- Pre-Approval
                    </P>
                    <hr />
                    <P>
                        <Bold>NEW!!</Bold>
                    </P>
                    <P>
                        Finance your renovation using your existing equity without refinancing your
                        home with{" "}
                        <Bold>
                            <a
                                href="https://www.renofi.com/"
                                style={{
                                    fontFamily: "Bitter",
                                    color: "#c02d2d",
                                    textDecoration: "underline",
                                }}
                            >
                                RENOFI
                            </a>
                        </Bold>
                    </P>
                    <hr />
                    <P>
                        <Bold>We</Bold> provide complete design services with a registered
                        architect.
                    </P>
                    <P>
                        <Bold>You</Bold> sign a contract based on estimated construction costs.
                    </P>
                    <P>
                        <Bold>We</Bold> consult with local government to ensure compliance with all
                        codes and setbacks and covenants.{" "}
                    </P>
                    <P>
                        Once we have all necessary approvals (permits, engineering, zoning,
                        geotechnical, etc.) we begin construction on your project!
                    </P>
                </TextPanel>
            </Slab>
            <Footer />
        </Page>
    )
}
