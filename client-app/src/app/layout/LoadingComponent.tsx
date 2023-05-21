import React from 'react';
import { Button, Dimmer, Item, Label, Loader, Segment } from 'semantic-ui-react';

interface Props {
   inverted?: boolean;

    content?: string;
}

export default function LoadingComponent({inverted=true, content="Loading..."}: Props) {
    return (
        <Dimmer active inverted={inverted}>
            <Loader content={content} />
        </Dimmer>

    )
    }
