import { Storage } from "@aws-amplify/storage"
import { Auth } from "@aws-amplify/auth"
import { v4 as uuid } from "uuid"
import { Amplify } from "@aws-amplify/core"
import { defAtom } from "@thi.ng/atom"

export const $global$ = defAtom({ config: {} })

export const configureWith = aws_exports => {
    const new_config = {
        ...aws_exports,
        // fix for ownerField resolution provided by:
        // https://github.com/aws-amplify/amplify-cli/issues/3794#issuecomment-606757449
        graphql_headers: async () => {
            try {
                const token = (await Auth.currentSession()).getIdToken().getJwtToken()
                return { Authorization: token }
            } catch (e) {
                console.error(e)
                return {}
            }
        },
    }
    Amplify.configure(new_config)
    $global$.resetIn(["config"], new_config)
}

//import { CRUD } from "../utils"

enum Level {
    private = "private",
    public = "public",
    protected = "protected",
}

type MimeType = string

interface HTMLFileInput {
    type: MimeType
    name: string
    size: number
    lastModified: number
    lastModifiedDate: Date
}
export const isFile = ({ type, content }) => {
    const [cat, sub] = type.split("_")
    const isFile = content.size // a File object has a size property
    return cat === "F" && isFile
}

// https://w3c.github.io/FileAPI/#filelist-section
// https://www.sufle.io/blog/aws-amplify-storage-part-3
export const storeObject = async (
    { content, name, id, node_id, createdAt, type, index, owner, editors },
    isAssetPr = true,
    level = Level.protected
) => {
    const {
        // @ts-ignore
        aws_user_files_s3_bucket: bucket,
        // @ts-ignore
        aws_user_files_s3_bucket_region: region,
    } = $global$.deref().config

    //console.log({ bucket, region })
    const { type: mimeType, name: file_name } = content
    const file_parts = file_name.split(".")
    const cut = file_parts.length - 1
    const extension = file_parts[cut]
    const UID = uuid()
    const key = `${extension}/${UID}--${file_name}`
    //console.log({ key, content, level, mimeType, file_name })
    const { id: user_id } = await Auth.currentUserInfo()
    //console.log({ user_id, ...rest })
    return await Storage.put(key, content, {
        level,
        contentType: mimeType,
        // others: https://github.com/aws-amplify/amplify-js/blob/a047ce73/packages/storage/src/Storage.ts#L185
        //progressCallback
    })
        .then(async s3Response => {
            //console.log({ s3Response })
            const { data } = await CRUD({
                query: (isAssetPr && mutations.createAssetPr) || mutations.createAsset,
                variables: {
                    input: {
                        name,
                        // public is different: `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
                        content: `https://${bucket}.s3.${region}.amazonaws.com/${level}/${user_id}/${key}`,
                        id,
                        node_id,
                        createdAt,
                        type,
                        index,
                        owner,
                        editors,
                    },
                },
            })
            //console.log({ data })
            return (isAssetPr && data.createAssetPr) || data.createAsset
        })
        .catch(error => {
            console.error("Error storing file:", { content, error })
        })
}
// "https://cope-storage-bucket180042-dev.s3.us-east-1.amazonaws.com/protected/us-east-1:92a4c58a-36ff-44ca-8f04-ae3cf469c3ec/jpg/99b318a9-9902-4fcb-87a3-fce9c05b6f51--jimi.jpg"
