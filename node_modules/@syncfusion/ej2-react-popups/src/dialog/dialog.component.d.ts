import * as React from 'react';
import { Dialog, DialogModel } from '@syncfusion/ej2-popups';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface DialogTypecast {
    footerTemplate?: string | Function | any;
    header?: string | Function | any;
    content?: string | Function | any;
}
/**
 * Represents the React Dialog Component
 * ```html
 * <Dialog></Dialog>
 * ```
 */
export declare class DialogComponent extends Dialog {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<DialogModel & DefaultHtmlAttributes | DialogTypecast>;
    setState: any;
    private getDefaultAttributes;
    initRenderCalled: boolean;
    private checkInjectedModules;
    directivekeys: {
        [key: string]: Object;
    };
    private immediateRender;
    props: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<DialogModel & DefaultHtmlAttributes | DialogTypecast>;
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
