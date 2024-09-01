import {FormProps} from '@rjsf/core';
import {OrchestratorFormApi} from '@batzionrotman123/backstage-plugin-orchestrator-form-api';
import React from 'react';
import LanguageSelectWidget from './widgets/LanguageSelectWidget';

class CustomFormExtensionsApi implements OrchestratorFormApi {  
    getFormDecorator() {
      return (FormComponent: React.ComponentType<Partial<FormProps>>) => {
        const widgets = {
            languageSelect: LanguageSelectWidget
        };
        return () => <FormComponent widgets={widgets}/>;
      }
    }    
  }
  

export default CustomFormExtensionsApi;