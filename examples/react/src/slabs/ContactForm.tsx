import React, {
    CSSProperties,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react"
import { Slab, TextPanel } from "../containers"
import { useMyTheme } from "../hooks"
import { run$ } from "@-0/spool"
import { _NAVIGATE } from "../context"
import { API } from "@-0/browser"
import { Input, Address, DropDown } from "../components"
import Airtable from "airtable"
import { PopupModal } from "react-calendly"
//import vc from "vcards-js"
//import dotenv from "dotenv"

//dotenv.config()

const apiKey = import.meta.env.VITE_AIRTABLE
const places = import.meta.env.VITE_PLACES

//create a new vCard
//const vCard = vc()

//save to file

//get as formatted string

//console.log({ apiKey })
const base = new Airtable({
    apiKey,
}).base("appK6q2gwVCCc0gmF")

const createRecord = async ({
    address,
    name,
    email,
    phone,
    experienced,
    why,
    status,
    referral,
    financed,
    certainty,
    stage = "Schedule Intake Call",
    //vcard,
}) =>
    await base("contact").create(
        [
            {
                fields: {
                    address,
                    name,
                    email,
                    phone,
                    experienced,
                    why,
                    status,
                    referral,
                    financed,
                    certainty,
                    stage,
                    //vcard,
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

export const ContactForm = () => {
    const [address, setAddress] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [experienced, setExperienced] = useState("")
    const [why, setWhy] = useState("")
    const [status, setStatus] = useState("")
    const [referral, setReferral] = useState("")
    const [financed, setFinanced] = useState("")
    const [certainty, setCertainty] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const { fonts, fontSizes, colors, fontWeights, letterSpacings } = useMyTheme()
    return (
        <form
            css={{
                width: "100%",
            }}
            onSubmit={async ev => {
                ev.preventDefault()
                // name
                const name_parts = name.trim().split(" ")
                let first = name_parts[0],
                    middle,
                    last
                if (name_parts.length === 3) {
                    middle = name_parts[1]
                    last = name_parts[2]
                }
                if (name_parts.length === 2) {
                    middle = ""
                    last = name_parts[1]
                }

                // address
                const address_parts = address.trim().split(", ")
                const street = address_parts[0]
                const city = address_parts[1]
                const state = address_parts[2]
                const zip = address_parts[3]
                await createRecord({
                    address,
                    name,
                    email,
                    phone,
                    experienced,
                    why,
                    status,
                    referral,
                    financed,
                    certainty,
                    //vcard: vCard,
                }).then(val => {
                    setIsOpen(true)
                    //window.alert(
                    //    `Thank you ${first}. We'll review your information and be in touch.`
                    //)
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
            <Slab bg="light_5" gap={["lg"]}>
                <TextPanel gap={["lg"]}>
                    <Input
                        label="Full name"
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                    />
                    <Input label="Email" value={email} onChange={ev => setEmail(ev.target.value)} />
                    <Input label="Phone" value={phone} onChange={ev => setPhone(ev.target.value)} />
                    <Address address={address} setAddress={setAddress} />
                    <DropDown
                        label="Have you renovated before?"
                        selection={experienced}
                        setSelection={setExperienced}
                        selections={["Yes", "No"]}
                    />
                </TextPanel>
                <TextPanel gap={["lg"]}>
                    <Input
                        label="How did you hear about us?"
                        value={referral}
                        onChange={ev => setReferral(ev.target.value)}
                    />
                    <Input
                        label="Why do you need more space?"
                        value={why}
                        onChange={ev => setWhy(ev.target.value)}
                    />
                    <DropDown
                        label="Project status"
                        selection={status}
                        setSelection={setStatus}
                        selections={[
                            "Just exploring",
                            "Planning & budgeting",
                            "Ready to start ASAP",
                        ]}
                    />
                    <DropDown
                        label="Financing status"
                        selection={financed}
                        setSelection={setFinanced}
                        selections={[
                            "Prequalified for financing",
                            "Exploring different options",
                            "Haven't done any research yet",
                        ]}
                    />
                    <DropDown
                        label="Certain you want a second story?"
                        selection={certainty}
                        setSelection={setCertainty}
                        selections={[
                            "We are certain we want a second story addition",
                            "Leaning towards a different type of addition",
                            "Considering the pros & cons of various types",
                        ]}
                    />

                    <input
                        type="submit"
                        value="Send"
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
                <PopupModal
                    url="https://calendly.com/anotherstory/introduction"
                    rootElement={document.getElementById("root")}
                    open={isOpen}
                    onModalClose={() => {
                        run$.next({
                            ..._NAVIGATE,
                            [API.CMD_ARGS]: {
                                [API.URL_FULL]: ".",
                            },
                        })
                        window.history.pushState({}, null, ".")
                    }}
                    prefill={{
                        email,
                        name,
                        customAnswers: {
                            a1: why,
                        },
                    }}
                />
            </Slab>
        </form>
    )
}
