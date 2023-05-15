import { API } from "@-0/browser"
import { Bio, Link, TopNav } from "../components"
import {
    medium_slab_padding,
    Page,
    Slab,
    slim_slab_padding,
    tall_slab_padding,
    TextPanel,
} from "../containers"
import { H2, H3, H4 } from "../elements"
import { IsoSimple, Footer } from "../slabs"
import { useMyTheme } from "../hooks"
import { gap_shim, useR$ } from "../for-export"
import { space } from "../theme"

const P = ({ weight = "normal", children }) => {
    const { fontWeights, fonts, letterSpacings, fontSizes, colors, lineHeights } = useMyTheme()
    return (
        <p
            css={useR$({
                fontWeight: fontWeights[weight],
                fontFamily: fonts.serif,
                fontSize: [fontSizes.sm, null, fontSizes.md],
                color: colors.dark_5,
                lineHeight: lineHeights.xl,
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

export const About = ({ data }) => {
    const { fontWeights, fonts, letterSpacings, fontSizes, colors } = useMyTheme()
    //console.log({ data })

    return (
        <Page>
            <Slab padding={tall_slab_padding} bg="light_5" />
            <IsoSimple
                src="/svgs/about-us.svg"
                alt="image of builder inside a house under construction"
            >
                <TextPanel>
                    <H3 font="serif" color="dark_5">
                        Our Story
                    </H3>
                    <p
                        css={{
                            fontFamily: fonts.serif,
                            fontWeight: fontWeights.bold,
                            fontSize: fontSizes.sm,
                            color: colors.dark_5,
                        }}
                    >
                        It was a{" "}
                        <span css={{ textDecoration: "line-through" }}> dark and stormy night</span>{" "}
                        long and bumpy road
                    </p>
                </TextPanel>
            </IsoSimple>
            <Slab bg="light_5" justify="center" align="center">
                <TextPanel width={["100%", "75%"]}>
                    <P>
                        We thought we had all of the answers and we were up to any challenge. When
                        presented with the opportunity to remove an existing roof system and add a
                        second story to an existing home we thought, &ldquo;Everyone else can do it
                        so why can&apos;t we?&ldquo;
                    </P>
                    <P>
                        As if on command, the moment we removed the roof it began to rain and it
                        continued to rain. This ended in a small catastrophe.
                    </P>
                    <P>
                        <Bold>The floors were ruined.</Bold>
                    </P>
                    <P>
                        <Bold>The sheet rock was ruined.</Bold>
                    </P>
                    <P>
                        <Bold>The insulation was ruined.</Bold>
                    </P>
                    <P>
                        <Bold>The HVAC system was ruined.</Bold>
                    </P>
                    <P>
                        <Bold>All of the electrical systems had to be reworked. </Bold>
                    </P>
                    <P>
                        Even the interior basement area (which had never seen water before) filled
                        up.
                    </P>
                    <P>We had to eat all of the cost of labor to spare our clients.</P>
                    <P>And we should have learned our lesson after the first catastrophe...</P>
                    <P>
                        But, like crazy people, we removed the roof and added another story to 3
                        more homes in the &ldquo;way we have always done it&ldquo;.
                    </P>
                    <P>
                        Each time we progressed a little but the stress and additional costs of the
                        process weighed heavy on all parties involved until the project was in the
                        dry with a new roof on it.
                    </P>
                    <P>
                        It was only at this point of utter exhaustion and frustration from beating
                        our heads against the wall that we begin to formulate a new concept.
                    </P>
                    <P>
                        The question up to this point had been: &ldquo;How do we keep the house dry
                        once we’ve taken the old roof off?&ldquo; We were asking the wrong question.
                        The real question was: “How do we keep the roof on”?
                    </P>
                </TextPanel>
            </Slab>
            <Slab bg="light_5">
                <div
                    css={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: space.md,
                        ...gap_shim(space.md),
                        //justifyContent: "center",
                    }}
                >
                    {/* TEAM REMOVED FROM AIRTABLE {data.map(({ name, bio_short, quote, role, avatar }) => {
                        return (
                            <Bio
                                key={name}
                                title={role}
                                full_name={name}
                                bio={quote}
                                img={avatar}
                            />
                        )
                    })}*/}
                </div>
                {/*<TextPanel gap={["lg"]} paddingBottom={null}>
                    <Bio
                        title="CEO"
                        full_name="Ben Strout"
                        bio="Haven't you ever wanted to jump out of a 10th story window, but then thought, nah"
                        img={process.env.PUBLIC_URL + "/images/benstrout.png"}
                    />
                    <Bio
                        title="CEO"
                        full_name="Ben Strout"
                        bio="Haven't you ever wanted to jump out of a 10th story window, but then thought, nah"
                        img={process.env.PUBLIC_URL + "/images/benstrout.png"}
                    />
                </TextPanel>
                <TextPanel gap={["lg"]}>
                    <Bio
                        title="CEO"
                        full_name="Ben Strout"
                        bio="Haven't you ever wanted to jump out of a 10th story window, but then thought, nah"
                        img={process.env.PUBLIC_URL + "/images/benstrout.png"}
                    />
                    <Bio
                        title="CEO"
                        full_name="Ben Strout"
                        bio="Haven't you ever wanted to jump out of a 10th story window, but then thought, nah"
                        img={process.env.PUBLIC_URL + "/images/benstrout.png"}
                    />
                </TextPanel>*/}
            </Slab>
            <Footer />
        </Page>
    )
}
