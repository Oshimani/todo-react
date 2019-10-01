import React from 'react';
import { Card, } from '@uifabric/react-cards';
import {
    Text,
    Icon,
    IconButton,
    StackItem,
    Stack,
    FontSizes,
    DefaultPalette
} from 'office-ui-fabric-react';
import ITodoItem from '../models/ITodoItem.model';

export default function todo(props: { item: ITodoItem }) {
    return (
        <div>
            {props.item}
            <Card styles={{ root: { textAlign: 'initial' } }} tokens={{ padding: 5, childrenGap: 5, width: '100%', maxWidth: '-webkit-fill-available' }}>
                <Card.Section tokens={{ padding: 4 }}>
                    <Stack horizontal tokens={{ childrenGap: 12 }}>
                        <StackItem>
                            <Icon styles={{ root: { fontSize: FontSizes.xxLarge } }} iconName="TaskLogo"></Icon>
                        </StackItem>
                        <StackItem grow>
                            <Text styles={{ root: { fontSize: FontSizes.xLarge } }}>
                                Contoso
                            </Text>
                        </StackItem>
                    </Stack>

                </Card.Section>
                <Card.Section tokens={{ padding: 4 }} styles={{ root: { borderTop: `solid 1px ${DefaultPalette.neutralQuaternary}` } }}>
                    <Text>Content</Text>
                </Card.Section>
                {/* BUTTONS */}
                <Card.Section tokens={{ padding: 4 }} horizontalAlign={"end"} horizontal styles={{ root: { borderTop: `solid 1px ${DefaultPalette.neutralQuaternary}` } }}>
                    <IconButton className={"s"} iconProps={{ iconName: 'Completed' }}></IconButton>
                    <IconButton iconProps={{ iconName: 'RecycleBin' }}></IconButton>
                </Card.Section>
            </Card>
        </div>
    )
}
