import { ITheme } from '@uifabric/styling';
import { IButtonStyles, IToggleStyles, IStackItemStyles } from 'office-ui-fabric-react';

export const ButtonBorders: string = 'button-borders';
export const SquareToggle: string = 'square-toggle';
export const RoundedCorners: string = 'rounded-corners';

export const getButtonBorderStyles = (theme: ITheme): any => {
    return ({
        ActionButton: {
            styles: {
                root: { border: `solid 1px ${theme.semanticColors.buttonText}` },
                rootHovered: { border: `solid 1px ${theme.palette.themePrimary}` }
            } as Partial<IButtonStyles>
        },
    })
};

export const getSquareToggleStyles = (theme: ITheme): any => {
    return ({
        Toggle: {
            styles: {
                pill: {
                    borderRadius: 0
                },
                thumb: {
                    borderRadius: 0
                } as Partial<IToggleStyles>
            }
        }
    })
};

export const getRoundCornerStyles = (theme: ITheme): any => {
    return ({
        StackItem: {
            styles: {
                root: {
                    borderRadius: 12
                }
            } as Partial<IStackItemStyles>
        }
    })
};
