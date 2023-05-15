export const calc_column_width =
    ({ gutter_width, column_width }) =>
    column_count =>
        (gutter_width + column_width) * column_count - gutter_width + "rem"

export const calc_columns = ({ column_width = 20, gutter_width = 2 }) => {
    const col = calc_column_width({ gutter_width, column_width })
    const cols = Array(12)
        .fill(0)
        .map((x, i) => col(i))
    //console.log({ cols })
    return cols
}

export const columns = calc_columns({})

export const phosphor_weights = {
    thin: "thin",
    light: "light",
    regular: "regular",
    bold: "bold",
    fill: "fill",
    duotone: "duotone",
}
