import React from "react"
import { nudge_size, useR$ } from "../for-export"
import { useMyTheme } from "../hooks"
import {
    ChartBar,
    ClipboardText,
    CurrencyDollar,
    Envelope,
    Eye,
    FacebookLogo,
    FaceMask,
    Handshake,
    House,
    Image,
    InstagramLogo,
    Key,
    LinkedinLogo,
    MapPin,
    Megaphone,
    Package,
    PaintRoller,
    Pencil,
    PhoneCall,
    SmileyNervous,
    Sun,
    Swatches,
    TrendUp,
    Wind,
} from "phosphor-react"

const IconSet = type => {
    const types = {
        // WhatWhy
        package: Package,
        house: House,
        "currency-dollar": CurrencyDollar,
        sun: Sun,
        wind: Wind,
        "trend-up": TrendUp,
        image: Image,
        "map-pin": MapPin,
        "face-mask": FaceMask,
        eye: Eye,
        "smiley-nervous": SmileyNervous,
        // Timeline
        "phone-call": PhoneCall,
        "clipboard-text": ClipboardText,
        swatches: Swatches,
        megaphone: Megaphone,
        handshake: Handshake,
        pencil: Pencil,
        "paint-roller": PaintRoller,
        "chart-bar": ChartBar,
        key: Key,
        // Footer
        envelope: Envelope,
        "facebook-logo": FacebookLogo,
        "instagram-logo": InstagramLogo,
        "linkedin-logo": LinkedinLogo,
    }
    const Component = types[type]
    //console.log({ type, Component })
    const Phosphor = ({ weight, color }) => React.createElement(Component, { weight, color })
    return Phosphor
}

// set styles in index.css
export const Icon = ({ weight, type, color = "white", size = "md" }) => {
    const { colors, fontSizes } = useMyTheme()
    const [downsize] = nudge_size(fontSizes)(size, -1)
    const Phosphor = IconSet(type)
    return (
        <span
            css={useR$({
                color: color || colors.dark_5,
                fontSize: [fontSizes[downsize], fontSizes[size]],
                lineHeight: 0,
            })}
        >
            {/*<i className={"phosphor ph-" + type + (weight && "-" + weight)}></i>*/}
            {Phosphor({ weight, color })}
        </span>
    )
}
