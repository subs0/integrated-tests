import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { BulletList, ButtonCTA, TitledBullets, Modal, ModalButton, Input } from "../components"
import { Slab, TextPanel } from "../containers"
import { H2 } from "../elements"
import { useMyTheme } from "../hooks"
import { URL2obj } from "@-0/browser"
import Airtable from "airtable"

const apiKey = import.meta.env.VITE_AIRTABLE

const signUpForNewsLetter = async ({
    name,
    email,
    //vcard,
}) => {
    const { _PATH } = URL2obj(window.location.href)

    const base = new Airtable({
        apiKey,
    }).base("app1dobsTUhOGsX3F")

    await base("signups").create(
        [
            {
                fields: {
                    name,
                    email,
                    page: _PATH.join("/") || "home",
                },
            },
        ],
        function (err, records) {
            if (err) {
                console.error(err)
                return
            }
            records.forEach(function (record) {
                console.log(record.getId())
            })
        }
    )
}
const data = {
    Connect: {
        //subtitle: "should you choose AnotherStory™",
        bullets: [
            {
                icon: "envelope",
                point: "Email",
                link: "mailto:hey@anotherstory.com?subject=Referral%20from%20anotherstory.com",
                //link: "/contact",
            },
            {
                icon: "facebook-logo",
                point: "facebook",
                link: "https://www.facebook.com/pg/anotherstorybham/",
            },
            {
                icon: "instagram-logo",
                point: "Instagram",
                link: "https://www.instagram.com/anotherstorybham/?hl=en",
            },
            {
                icon: "linkedin-logo",
                point: "LinkedIn",
                link: "https://www.linkedin.com/company/strout-architecture-and-construction",
            },
        ],
    },
    Location: {
        bullets: [
            { point: "Homewood" },
            { point: "Birmingham, AL" },
            { point: "USA" },
            { icon: "phone-call", point: "205-336-2121" },
            //{ icon: "envelope", point: "hey@anotherstory.com" },
        ],
    },
}

const Location = () => {
    return (
        <TextPanel>
            <H2>Location</H2>
        </TextPanel>
    )
}
export const Footer = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const { fonts, fontSizes, colors, fontWeights, letterSpacings } = useMyTheme()
    return (
        <Slab>
            <TextPanel>
                <H2>Location</H2>
                <BulletList bullets={data.Location.bullets} size="sm" />
                <ModalButton setModalOpen={() => setModalOpen(!modalOpen)}>
                    Sign Up for Our Newsletter
                </ModalButton>
            </TextPanel>
            {/*<TitledBullets bullets={data.Location.bullets} title="Location" />*/}
            <TitledBullets bullets={data.Connect.bullets} title="Connect" />
            <AnimatePresence initial={false} exitBeforeEnter={true}>
                {modalOpen && (
                    <Modal handleClose={() => setModalOpen(false)}>
                        <form
                            css={{
                                width: "100%",
                            }}
                            onSubmit={async ev => {
                                ev.preventDefault()

                                setModalOpen(false)
                                await signUpForNewsLetter({
                                    name,
                                    email,
                                }).then(val => {
                                    window.alert(
                                        `Thank you for signing up for our newsletter ${name}`
                                    )
                                    //run$.next({
                                    //    ..._NAVIGATE,
                                    //    [API.CMD_ARGS]: {
                                    //        [API.URL_FULL]: ".",
                                    //    },
                                    //})
                                    //window.history.pushState({}, null, ".")
                                })
                            }}
                        >
                            <TextPanel gap={["md"]}>
                                <Input
                                    label="Email"
                                    value={email}
                                    onChange={ev => setEmail(ev.target.value)}
                                />
                                <Input
                                    label="Name"
                                    value={name}
                                    onChange={ev => setName(ev.target.value)}
                                />
                                <input
                                    type="submit"
                                    value="Sign Up"
                                    onClick={() => setModalOpen(false)}
                                    css={{
                                        backgroundColor: colors.dark_5,
                                        fontSize: fontSizes.sm,
                                        padding: "1rem 3rem",
                                        fontFamily: fonts.sans,
                                        borderRadius: "1rem",
                                        color: colors.light_5,
                                        //letterSpacing: letterSpacings.md,
                                        fontWeight: fontWeights.black,
                                        alignSelf: "end",
                                        cursor: "pointer",
                                    }}
                                />
                            </TextPanel>
                        </form>
                    </Modal>
                )}
            </AnimatePresence>
        </Slab>
    )
}
