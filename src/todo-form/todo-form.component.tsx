import React, { useState, useContext } from 'react'
import { Card } from '@uifabric/react-cards';
import { FontSizes, getTheme, Stack, StackItem, MessageBar, MessageBarType, IconButton, TextField, ProgressIndicator } from 'office-ui-fabric-react';

import ITodoService from '../services/todo-service.interface';
import ITodoItem from '../models/ITodoItem.model';
import { AjaxState } from '../enums/ajax-state.enum';
import { initializeTodoService } from '../services/todo-service-helper';
import DataSourceContext from '../contexts/data-source.context';

const TodoForm = (props: { onCreate: Function }) => {

    const todoService: ITodoService =
        initializeTodoService(useContext(DataSourceContext));

    const [name, setName] = useState<string>(String());
    const [description, setDescription] = useState<string>(String());
    const [isImportant, setIsImportant] = useState<boolean | undefined>(undefined);

    const [submissionStatus, setSubmissionStatus] = useState<AjaxState>(AjaxState.initial);

    const clickedSubmit = () => {
        setSubmissionStatus(AjaxState.pending);

        // use non important as default
        if (isImportant === undefined) setIsImportant(false);
        todoService.create({ name, description, isComplete: false, isImportant } as ITodoItem)

            .then((newItem: ITodoItem) => {
                setSubmissionStatus(AjaxState.success);
                props.onCreate(newItem);

                // reset fields for next todo
                setName(String());
                setDescription(String());
                setIsImportant(undefined);
            })

            .catch(error => {
                console.error('Failed to create');
                setSubmissionStatus(AjaxState.error);
            })

            .finally(() => {
                // reset submission button
                setTimeout(() => {
                    setSubmissionStatus(AjaxState.initial);
                }, 3000);
            })
    };

    const getIcon = () => {
        switch (isImportant) {
            case false:
                return 'DietPlanNotebook';
            case true:
                return 'LightningBolt';
            default:
                return 'CircleAddition';
        }
    }

    return (
        <div>
            <div>
                <Card styles={{ root: { textAlign: 'initial' } }} tokens={{ padding: 5, childrenGap: 5, width: '100%', maxWidth: '-webkit-fill-available' }}>
                    <Card.Section tokens={{ padding: 4 }}>
                        <Stack horizontal tokens={{ childrenGap: 12 }}>
                            <StackItem>
                                <IconButton styles={{ icon: { fontSize: FontSizes.xxLarge } }}
                                    iconProps={{ iconName: getIcon() }}
                                    menuProps={{
                                        calloutProps: {
                                            styles: {
                                                calloutMain: {
                                                    selectors: {
                                                        'div': {
                                                            minWidth: 'unset',
                                                        },
                                                        'i': {
                                                            fontSize: FontSizes.xLarge
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        isBeakVisible: true,
                                        items: [
                                            {
                                                key: 'nonImportant',
                                                name: 'Common',
                                                title: 'not important',
                                                onClick: () => setIsImportant(false),
                                                iconProps: { iconName: 'DietPlanNotebook' }
                                            },
                                            {
                                                key: 'Important',
                                                name: 'Important',
                                                title: 'important',
                                                onClick: () => setIsImportant(true),
                                                iconProps: { iconName: 'LightningBolt' }
                                            }
                                        ],
                                        directionalHintFixed: true
                                    }} ></IconButton>
                            </StackItem>
                            <StackItem grow>
                                <TextField styles={{
                                    root: {},
                                    field: { fontSize: FontSizes.xLarge },
                                    fieldGroup: {
                                        background: 'none',
                                        selectors: {
                                            '&:hover': {
                                                background: getTheme().palette.white
                                            }
                                        }
                                    }
                                }}
                                    placeholder={'Add your title here'}
                                    value={name}
                                    borderless
                                    onChange={(element, value) => setName(String(value))}></TextField>
                            </StackItem>
                        </Stack>

                    </Card.Section>
                    <Card.Section tokens={{ padding: 4 }} styles={{ root: { borderTop: `solid 1px ${getTheme().palette.neutralQuaternary}` } }}>
                        <TextField styles={{
                            root: {},
                            fieldGroup: {
                                background: 'none',
                                selectors: {
                                    '&:hover': {
                                        background: getTheme().palette.white
                                    }
                                }
                            }
                        }}
                            placeholder={'Add your description here'}
                            value={description}
                            resizable={false}
                            autoAdjustHeight
                            multiline
                            borderless
                            onChange={(element, value) => setDescription(String(value))}></TextField>
                    </Card.Section>

                    {/* BUTTONS & MESSAGES*/}
                    <Card.Section tokens={{ padding: 4 }} horizontalAlign={"end"} horizontal styles={{ root: { borderTop: `solid 1px ${getTheme().palette.neutralQuaternary}` } }}>
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
