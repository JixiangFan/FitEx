import * as React from 'react';
import { Tooltip, TooltipModel } from '@syncfusion/ej2-popups';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface TooltipTypecast {
    content?: string | Function | any;
}
/**
 * Represents the React Tooltip component that displays a piece of information about the target element on mouse hover.
 * ```html
 * <Tooltip content='Tooltip content'>Show Tooltip</Tooltip>
 * ```
 */
export declare class TooltipComponent extends Tooltip {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<TooltipModel & DefaultHtmlAttributes | TooltipTypecast>;
    setState: any;
    private getDefaultAttributes;
    initRenderCalled: boolean;
    private checkInjectedModules;
    private immediateRender;
    props: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<TooltipModel & DefaultHtmlAttributes | TooltipTypecast>;
    forceUpdate: (callBack?: () => any) => void;
    context: Object;
    portals: any;
    isReactComponent: Object;
    refs: {
        [key: string]: React.ReactInstance;
    };
    constructor(props: any);
    render(): any;
}
