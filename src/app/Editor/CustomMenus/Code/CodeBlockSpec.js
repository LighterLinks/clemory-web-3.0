import { createReactBlockSpec } from "@blocknote/react";
import {
    defaultBlockSchema,
    defaultBlockSpecs,
    defaultProps,
} from "@blocknote/core";

export const CodeBlockSpec = createReactBlockSpec(
    {
        type: "codeBlock",
        propSchema: {
            // ...defaultProps,
            backgroundColor: {
                default: "gray",
            },
            textColor: {
                default: "black",
            },
            textAlignment: {
                default: "left",
            },
            font: {
                default: "Consolas",
            },
        },
        content: "inline",
    },
    {
        render: ({ block, contentRef }) => {
            const style = {
                fontFamily: block.props.font,
                color: block.props.textColor,
                backgroundColor: block.props.backgroundColor,
            };

            return (
                <p ref={contentRef} style={style} />
            );
        },
        // toExternalHTML: ({ contentRef }) => <p ref={contentRef} />,
        parse: (element) => {
            const font = element.style.fontFamily;
            return {
                font: font || undefined,
            };
        },
    },
);