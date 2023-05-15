import React, { CSSProperties, useContext, useEffect, useLayoutEffect, useState } from "react"
import { Slab, xtall_slab_padding } from "../containers"
import { AvatarQuote } from "../elements"

export const BigQuote = () => {
    return (
        <Slab bg="light_5" padding={xtall_slab_padding}>
            <AvatarQuote
                src="/images/sheryl-spain.webp"
                color="dark_5"
                text="[This] team has more vision, imagination and problem solving ability than all five previous architects (combined) with whom we have done projects. Their design-build approach simplifies multiple meetings and miscommunications between a separate contractor and architect. The end result of our renovation is stunning."
                name="Sheri Spain Long"
                location="Birmingham, AL"
                quote_size={["xs", "sm", "md"]}
            />
        </Slab>
    )
}
