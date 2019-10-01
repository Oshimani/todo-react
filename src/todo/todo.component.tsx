import React from 'react';
import { Card, } from '@uifabric/react-cards';
import {
    Text,
    Icon,
    IconButton,
    StackItem,
    Stack,
    FontSizes,
    DefaultPalette,
    MessageBar,
    MessageBarType
} from 'office-ui-fabric-react';

import ITodoItem from '../models/ITodoItem.model';
import ITodoService from '../services/todo-service.interface';
import TodoService from '../services/todo.service';

const Todo = (props: { item: ITodoItem, onUpdate: Function, onDelete: Function }) => {
    const todoService: ITodoService = new TodoService();

    const clickedComplete = () => {
        todoService.update(props.item.id, { ...props.item, isComplete: true, })

            .then((updatedTodo: ITodoItem) => {
                props.onUpdate(props.item.id);
            })

            .catch(error => {
                console.error(`Failed to update!`);
            });
    };

    const clickedDelete = () => {
        todoService.deleteById(props.item.id)

            .then(() => {
                props.onDelete(props.item.id);
            })

            .catch(error => {
                console.error(`Failed to delete!`);
            });
    };

    return (
        <div>
            <Card styles={{ root: { textAlign: 'initial' } }} tokens={{ padding: 5, childrenGap: 5, width: '100%', maxWidth: '-webkit-fill-available' }}>
                
                {/* HEADING */}
                <Card.Section tokens={{ padding: 4 }}>
                    <Stack horizontal tokens={{ childrenGap: 12 }}>
                        <StackItem>
                            {props.item.isImportant &&
                                <Icon styles={{ root: { fontSize: FontSizes.xxLarge } }} iconName="LightningBolt"></Icon>
                            }
                            {!props.item.isImportant &&
                                <Icon styles={{ root: { fontSize: FontSizes.xxLarge } }} iconName="DietPlanNotebook"></Icon>
                            }
                        </StackItem>
                        <StackItem grow>
                            <Text styles={{ root: { fontSize: FontSizes.xLarge } }}>
                                {props.item.name}
                            </Text>
                        </StackItem>
                    </Stack>

                </Card.Section>

                {/* DESCRIPTION */}
                {props.item.description &&
                    <Card.Section tokens={{ padding: 4 }} styles={{ root: { borderTop: `solid 1px ${DefaultPalette.neutralQuaternary}` } }}>
                        <Text>{props.item.description}</Text>
                    </Card.Section>
                }

                {/* BUTTONS */}
                <Card.Section tokens={{ padding: 4 }} horizontalAlign={"end"} horizontal styles={{ root: { borderTop: `solid 1px ${DefaultPalette.neutralQuaternary}` } }}>
                    {props.item.isComplete &&
                        <StackItem grow>
                            <MessageBar messageBarType={MessageBarType.success}>
                                Completed!
                            </MessageBar>
                        </StackItem>
                    }
                    <IconButton onClick={() => clickedComplete()}
                        disabled={props.item.isComplete}
                        iconProps={{ iconName: 'Completed' }}></IconButton>
                    <IconButton onClick={() => clickedDelete()} iconProps={{ iconName: 'RecycleBin' }}></IconButton>
                </Card.Section>
            </Card>
        </div>
    )
}

export default Todo;
