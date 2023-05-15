import * as CSS from "csstype"
import { MotionStyle, MotionProps } from "framer-motion"
import { phosphor_weights } from "./constants"
import { theme } from "../theme"
import { Interpolation } from "@emotion/serialize"

export type FontSize = keyof typeof theme.fontSizes
export type Space = keyof typeof theme.space
export type Color = keyof typeof theme.colors
export type Font = keyof typeof theme.fonts

type RArr = (string | number)[]
type RFun = (theme: Record<string, any>, props: React.ReactPropTypes) => null
type Responsive = RArr | RFun

// https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
declare module "csstype" {
    interface Properties {
        alignItems?: CSS.Property.AlignItems | Responsive
        borderColor?: CSS.Property.BorderColor | Responsive
        color?: CSS.Property.Color | Responsive
        flexDirection?: CSS.Property.FlexDirection | Responsive
        fontFamily?: CSS.Property.FontFamily | Responsive
        fontSize?: CSS.Property.FontSize | Responsive
        fontWeight?: CSS.Property.FontWeight | Responsive
        gap?: CSS.Property.Gap | Responsive
        height?: CSS.Property.Height | Responsive
        label?: string
        letterSpacing?: CSS.Property.LetterSpacing | Responsive
        lineHeight?: CSS.Property.LineHeight | Responsive
        marginTop?: CSS.Property.MarginTop | Responsive
        mixBlendMode?: CSS.Property.MixBlendMode | Responsive
        padding?: CSS.Property.Padding | Responsive
        paddingTop?: CSS.Property.PaddingTop | Responsive
        paddingBottom?: CSS.Property.PaddingBottom | Responsive
        paddingRight?: CSS.Property.PaddingRight | Responsive
        paddingLeft?: CSS.Property.PaddingLeft | Responsive
        right?: CSS.Property.Right | Responsive
        size?: string
        top?: CSS.Property.Top | Responsive
        WebkitTextStroke?: CSS.Property.WebkitTextStroke | Responsive
        WebkitTextStrokeColor?: CSS.Property.WebkitTextStrokeColor | Responsive
        WebkitTextFillColor?: CSS.Property.WebkitTextFillColor | Responsive
        width?: CSS.Property.Width | Responsive

        // Add a CSS Custom Property
        //'--theme-color'?: 'black' | 'white';
        // ...or allow any other property
        //[index: string]: any;
    }
}

export type Styles = CSS.Properties | Interpolation<CSS.Properties>

export type IconWeight = keyof typeof phosphor_weights

export interface IStyledProps extends React.HTMLAttributes<HTMLElement> {
    as?: any
    label?: string
    size?: string
    //style?: Styles
    children?: React.ReactNode
}

export interface IMoStyledProps extends MotionProps {
    as?: any
    label?: string
    size?: string
    //style?: Styles
    children?: React.ReactNode
}

export type IDynamicProps = IStyledProps | IMoStyledProps

export interface IResize {
    target: {
        width: number
        height: number
    }
}
