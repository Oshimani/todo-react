import React, { useState } from 'react'
import { Card } from '@uifabric/react-cards';
import { Stack, StackItem, Icon, MessageBar, MessageBarType, IconButton, TextField, ProgressIndicator } from 'office-ui-fabric-react';
import { FontSizes, DefaultPalette } from '@uifabric/styling';
import ITodoService from '../services/todo-service.interface';
import TodoService from '../services/todo.service';
import ITodoItem from '../models/ITodoItem.model';
import { AjaxState } from '../enums/ajax-state.enum';

const TodoForm = (props: { onCreate: Function }) => {

    const todoService: ITodoService = new TodoService();

    const [name, setName] = useState<string>(String());
    const [description, setDescription] = useState<string>(String());
    const [submissionStatus, setSubmissionStatus] = useState<AjaxState>(AjaxState.initial);

    const clickedSubmit = () => {
        setSubmissionStatus(AjaxState.pending);
        todoService.create({ name, description, isComplete: false, isImportant: false } as ITodoItem)

            .then((newItem: ITodoItem) => {
                setSubmissionStatus(AjaxState.success);
                props.onCreate(newItem);
            })

            .catch(error => {
                console.error(error);
                setSubmissionStatus(AjaxState.error);
            })

            .finally(() => {
                // reset submission button
                setTimeout(() => {
                    setSubmissionStatus(AjaxState.initial);
                }, 3000);
            })
    };

    return (
        <div>
            <div>
                <Card styles={{ root: { textAlign: 'initial' } }} tokens={{ padding: 5, childrenGap: 5, width: '100%', maxWidth: '-webkit-fill-available' }}>
                    <Card.Section tokens={{ padding: 4 }}>
                        <Stack horizontal tokens={{ childrenGap: 12 }}>
                            <StackItem>
                                <Icon styles={{ root: { fontSize: FontSizes.xxLarge } }} iconName="CircleAddition"></Icon>
                            </StackItem>
                            <StackItem grow>
                                <TextField styles={{
                                    root: {},
                                    field: { fontSize: FontSizes.xLarge },
                                    fieldGroup: {
                                        background: 'none',
                                        selectors: {
                                            '&:hover': {
                                                background: DefaultPalette.white
                                            }
                                        }
                                    }
                                }}
                                    placeholder={'Add your title here'}
                                    borderless
                                    onChange={(element, value) => setName(String(value))}></TextField>
                            </StackItem>
                        </Stack>

                    </Card.Section>
                    <Card.Section tokens={{ padding: 4 }} styles={{ root: { borderTop: `solid 1px ${DefaultPalette.neutralQuaternary}` } }}>
                        <TextField styles={{
                            root: {},
                            fieldGroup: {
                                background: 'none',
                                selectors: {
                                    '&:hover': {
                                        background: DefaultPalette.white
                                    }
                                }
                            }
                        }}
                            placeholder={'Add your description here'}
                            resizable={false}
                            autoAdjustHeight
                            multiline
                            borderless
                            onChange={(element, value) => setDescription(String(value))}></TextField>
                    </Card.Section>

                    {/* BUTTONS & MESSAGES*/}
                    <Card.Section tokens={{ padding: 4 }} horizontalAlign={"end"} horizontal styles={{ root: { borderTop: `solid 1px ${DefaultPalette.neutralQuaternary}` } }}>
                        {submissionStatus === AjaxState.pending &&
                            <StackItem grow>
                                <ProgressIndicator />
                            </StackItem>
                        }

                        {submissionStatus === AjaxState.success &&
                            <StackItem grow>
                                <MessageBar messageBarType={MessageBarType.success}>
                                    Added your todo!
                                </MessageBar>
                            </StackItem>
                        }

                        {submissionStatus === AjaxState.error &&
                            <StackItem grow>
                                <MessageBar messageBarType={MessageBarType.error}>
                                    Could not add your todo!
                                </MessageBar>
                            </StackItem>
                        }
                        <IconButton onClick={() => clickedSubmit()}
                            disabled={!name || submissionStatus === AjaxState.pending}
                            iconProps={{ iconName: 'Add' }}></IconButton>
                    </Card.Section>
                </Card>
            </div>
        </div>
    )
}

export default TodoForm;
