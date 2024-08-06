import { TestApi } from '@batzionrotman123/backstage-plugin-orchestrator';
import { RegistryWidgetsType } from '@rjsf/utils';
import ColorWidget from './widgets/ColorWidget';

class CustomApi implements TestApi {
    test() {
        console.log("custom api test");
    }
    getCustomWidgets(): RegistryWidgetsType<any, any, any> {
        return {
            color1: ColorWidget
        }
    }
};


export default CustomApi;