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
import { H2, H4, H3 } from "../elements"
import { IsoSimple, ContactForm, Footer } from "../slabs/index"
import { useMyTheme } from "../hooks"

export const Contact = ({ data }) => {
    const { fontWeights, fonts, letterSpacings, fontSizes, colors } = useMyTheme()

    //console.log({ data })
    return (
        <Page>
            <Slab padding={tall_slab_padding} bg="light_5" />
            <IsoSimple src="/svgs/living.svg" alt="image of female reading a book in living room">
                <TextPanel>
                    <H3 font="serif" color="dark_5">
                        What&apos;s your story?
                    </H3>
                    <p
                        css={{
                            fontFamily: fonts.serif,
                            fontWeight: fontWeights.bold,
                            fontSize: fontSizes.sm,
                            color: colors.dark_5,
                        }}
                    >
                        You don&apos;t have to move to make one
                    </p>
                    <p
                        css={{
                            fontFamily: fonts.serif,
                            fontWeight: fontWeights.normal,
                            fontSize: fontSizes.sm,
                            color: colors.dark_5,
                        }}
                    >
                        Sign up for a free 15-minute consultation
                    </p>
                </TextPanel>
            </IsoSimple>
            <ContactForm />
            <Footer />
        </Page>
    )
}
