import React, { useState, useContext } from 'react';
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
    MessageBarType,
    ProgressIndicator,
    getTheme
} from 'office-ui-fabric-react';

import ITodoItem from '../models/ITodoItem.model';
import ITodoService from '../services/todo-service.interface';
import { AjaxState } from '../enums/ajax-state.enum';
import { initializeTodoService } from '../services/todo-service-helper';
import DataSourceContext from '../contexts/data-source.context';

const Todo = (props: { item: ITodoItem, onUpdate: Function, onDelete: Function }) => {

    const todoService: ITodoService =
        initializeTodoService(useContext(DataSourceContext));

    const [submissionStatus, setSubmissionStatus] = useState<AjaxState>(AjaxState.initial);

    const clickedComplete = () => {
        setSubmissionStatus(AjaxState.pending);
        todoService.update(props.item.id, { ...props.item, isComplete: true, })

            .then((updatedTodo: ITodoItem) => {
                // set initial because we already have a message bar for completed todos
                setSubmissionStatus(AjaxState.initial);

                props.onUpdate(props.item.id);
            })

            .catch(error => {
                console.error(`Failed to update!`);
                setSubmissionStatus(AjaxState.error);
                setTimeout(() => {
                    setSubmissionStatus(AjaxState.initial);
                }, 3000);
            });
    };

    const clickedDelete = () => {
        setSubmissionStatus(AjaxState.pending);
        todoService.deleteById(props.item.id)

            .then(() => {
                props.onDelete(props.item.id);
            })

            .catch(error => {
                console.error(`Failed to delete!`);
                setSubmissionStatus(AjaxState.error);
                setTimeout(() => {
                    setSubmissionStatus(AjaxState.initial);
                }, 3000);
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
                    <Card.Section tokens={{ padding: 4 }} styles={{ root: { borderTop: `solid 1px ${getTheme().palette.neutralQuaternary}` } }}>
                        <Text>{props.item.description}</Text>
                    </Card.Section>
                }

                {/* BUTTONS & MESSAGES*/}
                <Card.Section tokens={{ padding: 4 }} horizontalAlign={"end"} horizontal styles={{ root: { borderTop: `solid 1px ${getTheme().palette.neutralQuaternary}` } }}>

                    {/* AJAX STATE */}
                    {submissionStatus === AjaxState.pending &&
                        <StackItem grow>
                            <ProgressIndicator />
                        </StackItem>
                    }

                    {/* AJAX STATE */}
                    {submissionStatus === AjaxState.error &&
                        <StackItem grow>
                            <MessageBar messageBarType={MessageBarType.error}>
                                Operation failed!
                                </MessageBar>
                        </StackItem>
                    }

                    {/* COMLETION INDICATOR */}
                    {(props.item.isComplete &&
                        submissionStatus === AjaxState.initial) &&
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
