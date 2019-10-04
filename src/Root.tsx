import React, { useEffect, useState } from 'react';

import { ThemeProvider } from '@uifabric/foundation';
import { Fabric, CommandBar, Text, getTheme, ITheme } from 'office-ui-fabric-react';

import App from './App';
import DataSourceType from './models/data-source-type.model';
import { DataSourceProvider } from './contexts/data-source.context';
import { PurpleTheme, loadPurpleTheme } from './themes/purple.theme';
import { IceDarkmodeTheme, loadIceDarkmodeTheme } from './themes/ice-darkmode.theme';
import { DefaultTheme, loadDefaultTheme } from './themes/default.theme';
import { HighContrastTheme, loadHightContrastTheme } from './themes/high-contrast.theme';

const Root: React.FC = () => {

    const [dataSourcetype, setDataSourceType] = useState<string>(DataSourceType.localStorage);
    const [selectedTheme, setSelectedTheme] = useState<ITheme>();
    const [selectedThemeTitle, setSelectedThemeTitle] = useState<string>(DefaultTheme);

    const onClickTheme = (themeName: string) => {
        // save theme across sessions
        localStorage.setItem('Theme', themeName);

        setTheme(themeName);
    };

    const setTheme = (themeName: string) => {
        setSelectedThemeTitle(themeName);
        switch (themeName) {
            case PurpleTheme:
                setSelectedTheme(loadPurpleTheme());
                break;
            case IceDarkmodeTheme:
                setSelectedTheme(loadIceDarkmodeTheme());
                break;
            case HighContrastTheme:
                setSelectedTheme(loadHightContrastTheme());
                break;
            default:
                setSelectedTheme(loadDefaultTheme());
                break;
        }
    }

    //component did mount
    useEffect(() => {
        // initialize data type context
        console.log(window.location.hostname);
        if (window.location.hostname.includes('github.io')) {
            setDataSourceType(DataSourceType.localStorage);
        }

        // load theme if saved in local storage
        const theme = localStorage.getItem('Theme');
        if (theme)
            setTheme(theme);

        // eslint-disable-next-line
    }, []);

    return (
        <ThemeProvider theme={selectedTheme}>
            <DataSourceProvider value={dataSourcetype}>
                <div style={{ backgroundColor: getTheme().semanticColors.bodyBackground }}>
                    <Fabric styles={{ root: { backgroundColor: getTheme().palette.neutralLighterAlt } }}>

                        {/* TOP MENU */}
                        <CommandBar styles={{
                            root: {
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                zIndex: 1000,
                                width: '100%',
                                borderBottom: `solid 1px`,
                                borderBottomColor: getTheme().palette.themePrimary,
                                boxShadow: `rgba(0, 0, 0, 0.133) 0px 1.6px 3.6px 0px, rgba(0, 0, 0, 0.11) 0px 0.3px 0.9px 0px`
                            }
                        }}
                            items={[
                                {
                                    key: 'theme',
                                    iconProps: { iconName: 'Color' },
                                    text: 'Theme',
                                    subMenuProps: {
                                        items: [
                                            {
                                                key: DefaultTheme,
                                                iconProps: { iconName: selectedThemeTitle === DefaultTheme ? 'ColorSolid' : 'Color' },
                                                text: 'Default',
                                                onClick: () => onClickTheme(DefaultTheme)
                                            },
                                            {
                                                key: PurpleTheme,
                                                iconProps: { iconName: selectedThemeTitle === PurpleTheme ? 'ColorSolid' : 'Color' },
                                                text: 'Purple',
                                                onClick: () => onClickTheme(PurpleTheme)
                                            },
                                            {
                                                key: IceDarkmodeTheme,
                                                iconProps: { iconName: selectedThemeTitle === IceDarkmodeTheme ? 'ColorSolid' : 'Color' },
                                                text: 'Ice Darkmode',
                                                onClick: () => onClickTheme(IceDarkmodeTheme)
                                            }, {
                                                key: HighContrastTheme,
                                                iconProps: { iconName: selectedThemeTitle === HighContrastTheme ? 'ColorSolid' : 'Color' },
                                                text: 'High Contrast',
                                                onClick: () => onClickTheme(HighContrastTheme)
                                            }
                                        ]
                                    }
                                }
                            ]} />

                        {/* APP CONTAINER */}
                        <div style={{ marginTop: 44 }}>
                            <App />
                        </div>

                        {/* FOOTER */}
                        <div style={{
                            textAlign: 'center',
                            marginTop: 12
                        }}>
                            <Text styles={{
                                root: {

                                }
                            }}>Find repository under <a style={{ color: getTheme().palette.themePrimary }} href='https://github.com/Oshimani/todo-react'>https://github.com/Oshimani/todo-react</a>.</Text>
                        </div>
                    </Fabric>
                </div>
            </DataSourceProvider>
            <div style={{
                backgroundColor: getTheme().semanticColors.bodyBackground,
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                zIndex: -1000
            }}></div>
        </ThemeProvider>
    );
}

export default Root;
