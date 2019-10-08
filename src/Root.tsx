import React, { useEffect, useState } from 'react';

import { ThemeProvider } from '@uifabric/foundation';
import { Fabric, CommandBar, Text, getTheme, ITheme, Customizer } from 'office-ui-fabric-react';
import { Depths } from '@uifabric/fluent-theme';

import App from './App';
import DataSourceType from './models/data-source-type.model';
import { DataSourceProvider } from './contexts/data-source.context';

// themes
import { PurpleTheme, loadPurpleTheme } from './themes/purple.theme';
import { IceDarkmodeTheme, loadIceDarkmodeTheme } from './themes/ice-darkmode.theme';
import { DefaultTheme, loadDefaultTheme } from './themes/default.theme';
import { HighContrastTheme, loadHightContrastTheme } from './themes/high-contrast.theme';

// scoped settings
import { ButtonBorders, getButtonBorderStyles, SquareToggle, getSquareToggleStyles, RoundedCorners, getRoundCornerStyles as getRoundCardCornerStyles } from './themes/customizations/customizations';

const Root: React.FC = () => {

    const [dataSourcetype, setDataSourceType] = useState<string>(DataSourceType.localStorage);
    const [selectedTheme, setSelectedTheme] = useState<ITheme>();
    const [selectedThemeTitle, setSelectedThemeTitle] = useState<string>(DefaultTheme);

    // customizations
    const [buttonBordersIsActive, setButtonBordersIsActive] = useState<boolean>(Boolean(localStorage.getItem(ButtonBorders)));
    const [squareToggleIsActive, setSquareToggleIsActive] = useState<boolean>(Boolean(localStorage.getItem(SquareToggle)));
    const [roundedCornersIsActive, setRoundedCornersIsActive] = useState<boolean>(Boolean(localStorage.getItem(RoundedCorners)));

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

    const getCustomizations = () => {
        const customizations: any = {};
        if (buttonBordersIsActive) Object.assign(customizations, getButtonBorderStyles(getTheme()));
        if (squareToggleIsActive) Object.assign(customizations, getSquareToggleStyles(getTheme()));
        if (roundedCornersIsActive) Object.assign(customizations, getRoundCardCornerStyles(getTheme()));
        return customizations;
    };

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
        <Customizer scopedSettings={getCustomizations()}>
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
                                    boxShadow: Depths.depth8
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
                                    },
                                    {
                                        key: 'customization',
                                        iconProps: { iconName: 'Repair' },
                                        text: 'Customization',
                                        subMenuProps: {
                                            items: [
                                                {
                                                    key: ButtonBorders,
                                                    iconProps: { iconName: buttonBordersIsActive ? 'CheckboxComposite' : 'Checkbox' },
                                                    text: 'Show button borders',
                                                    onClick: () => {
                                                        localStorage.setItem(ButtonBorders, String(!buttonBordersIsActive));
                                                        setButtonBordersIsActive(!buttonBordersIsActive);
                                                    }
                                                },
                                                {
                                                    key: SquareToggle,
                                                    iconProps: { iconName: squareToggleIsActive ? 'CheckboxComposite' : 'Checkbox' },
                                                    text: 'Show square toggles',
                                                    onClick: () => {
                                                        localStorage.setItem(SquareToggle, String(!squareToggleIsActive));
                                                        setSquareToggleIsActive(!squareToggleIsActive);
                                                    }
                                                },
                                                {
                                                    key: RoundedCorners,
                                                    iconProps: { iconName: roundedCornersIsActive ? 'CheckboxComposite' : 'Checkbox' },
                                                    text: 'Use rounded corners',
                                                    onClick: () => {
                                                        localStorage.setItem(RoundedCorners, String(!roundedCornersIsActive));
                                                        setRoundedCornersIsActive(!roundedCornersIsActive);
                                                    }
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
        </Customizer>
    );
}

export default Root;
