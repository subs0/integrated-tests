import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
//import dotenv from "dotenv"
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService"
import { useMyTheme } from "../hooks"
import { _NAVIGATE } from "../context"

//dotenv.config()

const places = import.meta.env.VITE_PLACES

/*
{
  "description": "Somerset, PA, USA",
  "matched_substrings": [
    {
      "length": 4,
      "offset": 0
    }
  ],
  "place_id": "ChIJk2aiIYTTyokRVBsWHkYkhFg",
  "reference": "ChIJk2aiIYTTyokRVBsWHkYkhFg",
  "structured_formatting": {
    "main_text": "Somerset",
    "main_text_matched_substrings": [
      {
        "length": 4,
        "offset": 0
      }
    ],
    "secondary_text": "PA, USA"
  },
  "terms": [
    {
      "offset": 0,
      "value": "Somerset"
    },
    {
      "offset": 10,
      "value": "PA"
    },
    {
      "offset": 14,
      "value": "USA"
    }
  ],
  "types": [
    "locality",
    "political",
    "geocode"
  ]
}
*/

export const Input = ({ label, onChange, value, bg = "light_5", children = null }) => {
    const [focused, setFocused] = useState(false)
    const { colors, letterSpacings, fontSizes } = useMyTheme()
    return (
        <label
            css={{
                position: "relative",
                display: "block",
                width: "100%",
                marginBottom: "6rem",
            }}
        >
            <input
                css={{
                    fontSize: fontSizes.sm,
                    letterSpacing: letterSpacings.md,

                    width: "100%",
                    padding: "1rem 0",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    borderRadius: "0",
                    borderBottom: "1px solid black",
                    "::placeholder": {
                        color: "transparent",
                    },
                    "&:focus": {
                        outline: "none",
                    },
                }}
                onChange={ev => {
                    ev.preventDefault()
                    //console.log({ value: ev.target.value })
                    onChange(ev)
                }}
                onFocus={ev => {
                    setFocused(true)
                }}
                onBlur={ev => {
                    ev.preventDefault()
                    setTimeout(() => {
                        setFocused(false)
                    }, 300)
                }}
                //  loading={isPlacePredictionsLoading}
                value={value}
            />
            <motion.span
                css={{
                    fontSize: fontSizes.sm,
                    letterSpacing: letterSpacings.md,

                    position: "absolute",
                    top: 0,
                    padding: "1rem 0",
                    //left: 0,
                }}
                variants={{
                    focused: {
                        scale: 0.5,
                        y: -25,
                        x: "-25%",
                    },
                    unfocused: {
                        x: 0,
                        y: 0,
                    },
                }}
                transition={{
                    ease: [0.44, 0, 0.56, 1],
                }}
                animate={((focused || value) && "focused") || "unfocused"}
            >
                {label}
            </motion.span>
            <motion.div
                css={{
                    height: "2px",
                    backgroundColor: "black",
                    width: "100%",
                    position: "absolute",
                    top: 43,
                }}
                variants={{
                    focused: {
                        scaleX: 1,
                        x: 0,
                    },
                    unfocused: {
                        scaleX: 0,
                        x: "-50%",
                    },
                }}
                transition={{
                    ease: [0.44, 0, 0.56, 1],
                }}
                initial="unfocused"
                animate={(focused && "focused") || "unfocused"}
            />
            {focused && children}
        </label>
    )
}

export const Li = ({ onClick, description }) => {
    return (
        <li
            css={{
                width: "100%",
                height: "auto",
                cursor: "pointer",
                fontSize: "1.6rem",
                padding: "1rem",
                "&:hover": {
                    textDecoration: "underline",
                },
                zIndex: 20,
                backgroundColor: "white",
            }}
            onClick={onClick}
        >
            {/*{JSON.stringify(item, null, 2)}*/}
            {description}
        </li>
    )
}

export const Address = ({ address, setAddress, bg = "light_5" }) => {
    const { colors } = useMyTheme()
    const { placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
        usePlacesService({
            apiKey: places,
            debounce: 500,
        })

    const [zip, setZip] = useState("")
    //console.log({ address })
    useEffect(() => {
        // fetch place details for the first element in placePredictions array
        if (placePredictions.length) {
            //console.log({ placePredictions })
            placesService?.getDetails(
                {
                    placeId: placePredictions[0].place_id,
                    fields: ["address_components"],
                },
                details => {
                    let postcode = null
                    details?.address_components?.forEach(entry => {
                        if (entry.types?.[0] === "postal_code") {
                            postcode = entry.long_name
                            console.log({ postcode })
                        }
                    })
                    //console.log({ postcode })
                    setZip(postcode)
                }
            )
        }
    }, [placePredictions, placesService])
    return (
        <Input
            label="Address (street, city, state, zip)"
            onChange={ev => {
                const input = ev.target.value
                getPlacePredictions({ input })
                setAddress(input)
            }}
            value={address}
        >
            <ul
                css={{
                    width: "100%",
                    position: "absolute",
                    top: 50,
                    left: 0,
                    backgroundColor: colors[bg],
                    borderRadius: "3px",
                    padding: "0px 5px",
                    //padding: "1rem",
                }}
            >
                {placePredictions.map(({ description, place_id, terms }, idx) => {
                    //console.log({ description, terms })
                    const text = description.split(", ").slice(0, -1).join(", ")
                    return (
                        <Li
                            onClick={() => {
                                //console.log({ text })
                                setAddress(text.concat(`, ${zip}`))
                            }}
                            description={text}
                            key={place_id}
                        />
                    )
                })}
            </ul>
        </Input>
    )
}

export const DropDown = ({ selections = [], selection, setSelection, bg = "light_5", label }) => {
    const { colors } = useMyTheme()
    return (
        <Input
            label={label}
            onChange={ev => {
                //console.log("onChange setSelection:", ev.target.value)
                setSelection(ev.target.value)
            }}
            value={selection}
        >
            {
                <ul
                    css={{
                        width: "100%",
                        position: "absolute",
                        top: 50,
                        left: 0,
                        backgroundColor: colors[bg],
                        borderRadius: "3px",
                        padding: "0px 5px",
                        //padding: "1rem",
                    }}
                >
                    {" "}
                    {selections.map((c, i) => {
                        return (
                            <Li
                                key={`${label}_${i}`}
                                onClick={() => {
                                    //console.log("onClick setSelection: ", c)
                                    setSelection(c)
                                }}
                                description={c}
                            />
                        )
                    })}
                </ul>
            }
        </Input>
    )
}
