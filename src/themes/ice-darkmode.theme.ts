import { loadTheme } from 'office-ui-fabric-react';
export const IceDarkmodeTheme: string = 'ice-darkmode';
export const loadIceDarkmodeTheme = () => {
    return (
        loadTheme({
            palette: {
                themePrimary: '#00c7d4',
                themeLighterAlt: '#000808',
                themeLighter: '#002022',
                themeLight: '#003c3f',
                themeTertiary: '#00777f',
                themeSecondary: '#00afba',
                themeDarkAlt: '#16ccd8',
                themeDark: '#35d4de',
                themeDarker: '#66dfe7',
                neutralLighterAlt: '#2c2c2c',
                neutralLighter: '#353535',
                neutralLight: '#434343',
                neutralQuaternaryAlt: '#4b4b4b',
                neutralQuaternary: '#525252',
                neutralTertiaryAlt: '#707070',
                neutralTertiary: '#f3f3f3',
                neutralSecondary: '#f5f5f5',
                neutralPrimaryAlt: '#f7f7f7',
                neutralPrimary: '#ededed',
                neutralDark: '#fbfbfb',
                black: '#fdfdfd',
                white: '#232323',
            }
        })
    );
};
