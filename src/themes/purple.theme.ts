import { loadTheme } from 'office-ui-fabric-react';
export const PurpleTheme: string = 'purple';
export const loadPurpleTheme = () => {
    return (
        loadTheme({
            palette: {
                themePrimary: '#7a00d4',
                themeLighterAlt: '#f9f3fd',
                themeLighter: '#e7d0f8',
                themeLight: '#d3a9f2',
                themeTertiary: '#ab5ce5',
                themeSecondary: '#881ad9',
                themeDarkAlt: '#6e00be',
                themeDark: '#5d00a1',
                themeDarker: '#440077',
                neutralLighterAlt: '#f8f8f8',
                neutralLighter: '#f4f4f4',
                neutralLight: '#eaeaea',
                neutralQuaternaryAlt: '#dadada',
                neutralQuaternary: '#d0d0d0',
                neutralTertiaryAlt: '#c8c8c8',
                neutralTertiary: '#bab8b7',
                neutralSecondary: '#a3a2a0',
                neutralPrimaryAlt: '#8d8b8a',
                neutralPrimary: '#323130',
                neutralDark: '#605e5d',
                black: '#494847',
                white: '#ffffff',
            }
        })
    );
};
