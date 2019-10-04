import { loadTheme } from 'office-ui-fabric-react';
export const HighContrastTheme: string = 'high-contrast';
export const loadHightContrastTheme = () => {
    return (
        loadTheme({
            palette: {
                themePrimary: '#faf400',
                themeLighterAlt: '#0a0a00',
                themeLighter: '#282700',
                themeLight: '#4b4900',
                themeTertiary: '#969300',
                themeSecondary: '#dcd700',
                themeDarkAlt: '#fbf619',
                themeDark: '#fcf73c',
                themeDarker: '#fcf96f',
                neutralLighterAlt: '#1d1d1d',
                neutralLighter: '#262626',
                neutralLight: '#353535',
                neutralQuaternaryAlt: '#3e3e3e',
                neutralQuaternary: '#454545',
                neutralTertiaryAlt: '#656565',
                neutralTertiary: '#fcfcfc',
                neutralSecondary: '#fcfcfc',
                neutralPrimaryAlt: '#fdfdfd',
                neutralPrimary: '#fafafa',
                neutralDark: '#fefefe',
                black: '#fefefe',
                white: '#121212',
            }
        })
    );
};
