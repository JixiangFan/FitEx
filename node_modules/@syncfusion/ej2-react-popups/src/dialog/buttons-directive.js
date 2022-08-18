var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ComplexBase } from '@syncfusion/ej2-react-base';
/**
 * `ButtonDirective` represent a button of the react dialog.
 * It must be contained in a Dialog component(`DialogComponent`).
 * ```tsx
 * <DialogComponent showCloseIcon={true}>
 *   <ButtonsDirective>
 *     <DialogbuttonDirective buttonModal={this.okButton}></DialogbuttonDirective>
 *     <DialogbuttonDirective buttonModal={this.cancelButton}></DialogbuttonDirective>
 *   <ButtonsDirective>
 * </DialogComponent>
 * ```
 */
var DialogButtonDirective = /** @class */ (function (_super) {
    __extends(DialogButtonDirective, _super);
    function DialogButtonDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DialogButtonDirective.moduleName = 'dialogButton';
    return DialogButtonDirective;
}(ComplexBase));
export { DialogButtonDirective };
var ButtonsDirective = /** @class */ (function (_super) {
    __extends(ButtonsDirective, _super);
    function ButtonsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonsDirective.propertyName = 'buttons';
    ButtonsDirective.moduleName = 'buttons';
    return ButtonsDirective;
}(ComplexBase));
export { ButtonsDirective };
