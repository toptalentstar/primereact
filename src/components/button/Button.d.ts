import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

declare namespace Button {

    interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
        label?: string;
        icon?: string;
        iconPos?: string;
        badge?: string;
        badgeClassName?: string;
        tooltip?: string;
        tooltipOptions?: TooltipOptions;
    }
}

export declare class Button extends React.Component<Button.ButtonProps, any> { }
