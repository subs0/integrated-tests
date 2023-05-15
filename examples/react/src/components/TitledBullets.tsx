import React, { useContext } from "react"
import { TextPanel } from "../containers"
import { IconBullet, BulletList } from "../components"
import { useR$ } from "../for-export"
import { CTX } from "../context"
import { H2, H4 } from "../elements/index"

export const TitledBullets = ({ title, subtitle = "", bullets }) => {
    return (
        <TextPanel>
            <H2>{title}</H2>
            <H4>{subtitle}</H4>
            <BulletList bullets={bullets} size="sm" />
        </TextPanel>
    )
}
