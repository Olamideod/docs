import React, { useState } from 'react';

interface WizardStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<WizardStepProps>;
}

interface WizardStepProps {
  data: any;
  setData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const PlatformSelection: React.FC<WizardStepProps> = ({ data, setData, nextStep }) => {
  const platforms = [
    { id: 'web', name: 'Web Application', icon: '🌐', description: 'React, Vue, Angular, or vanilla JavaScript' },
    { id: 'mobile', name: 'Mobile App', icon: '📱', description: 'React Native, Flutter, iOS, or Android' },
    { id: 'api', name: 'API / Server-to-Server', icon: '🔌', description: 'Machine-to-machine authentication' },
    { id: 'spa', name: 'Single Page App', icon: '⚡', description: 'SPA without backend server' }
  ];

  return (
    <div className="wizard-step">
      <h2>Choose Your Platform</h2>
      <p>Select the type of application you're building to get customized setup instructions.</p>
      
      <div className="platform-grid">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className={`platform-card ${data.platform === platform.id ? 'selected' : ''}`}
            onClick={() => setData({ ...data, platform: platform.id })}
          >
            <div className="platform-icon">{platform.icon}</div>
            <h3>{platform.name}</h3>
            <p>{platform.description}</p>
          </div>
        ))}
      </div>
      
      <button
        className="wizard-button"
        disabled={!data.platform}
        onClick={nextStep}
      >
        Continue
      </button>
    </div>
  );
};

const AuthenticationType: React.FC<WizardStepProps> = ({ data, setData, nextStep, prevStep }) => {
  const authTypes = [
    { id: 'email', name: 'Email & Password', description: 'Traditional email/password authentication' },
    { id: 'social', name: 'Social Login', description: 'Google, GitHub, Facebook, etc.' },
    { id: 'sso', name: 'Enterprise SSO', description: 'SAML, OAuth with enterprise providers' },
    { id: 'passwordless', name: 'Passwordless', description: 'Magic links, WebAuthn, SMS' }
  ];

  return (
    <div className="wizard-step">
      <h2>Authentication Type</h2>
      <p>How do you want users to authenticate?</p>
      
      <div className="auth-grid">
        {authTypes.map((type) => (
          <div
            key={type.id}
            className={`auth-card ${data.authType === type.id ? 'selected' : ''}`}
            onClick={() => setData({ ...data, authType: type.id })}
          >
            <h3>{type.name}</h3>
            <p>{type.description}</p>
          </div>
        ))}
      </div>
      
      <div className="wizard-buttons">
        <button onClick={prevStep}>Back</button>
        <button
          className="wizard-button"
          disabled={!data.authType}
          onClick={nextStep}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

const SecurityFeatures: React.FC<WizardStepProps> = ({ data, setData, nextStep, prevStep }) => {
  const features = [
    { id: 'mfa', name: 'Multi-Factor Authentication', description: 'TOTP, SMS, WebAuthn' },
    { id: 'rbac', name: 'Role-Based Access Control', description: 'User roles and permissions' },
    { id: 'attack-protection', name: 'Attack Protection', description: 'Brute force and breach detection' },
    { id: 'compliance', name: 'Compliance', description: 'GDPR, HIPAA, SOC2 support' }
  ];

  const toggleFeature = (featureId: string) => {
    const currentFeatures = data.securityFeatures || [];
    const newFeatures = currentFeatures.includes(featureId)
      ? currentFeatures.filter((id: string) => id !== featureId)
      : [...currentFeatures, featureId];
    setData({ ...data, securityFeatures: newFeatures });
  };

  return (
    <div className="wizard-step">
      <h2>Security Features</h2>
      <p>Select additional security features for your application.</p>
      
      <div className="features-grid">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`feature-card ${(data.securityFeatures || []).includes(feature.id) ? 'selected' : ''}`}
            onClick={() => toggleFeature(feature.id)}
          >
            <input
              type="checkbox"
              checked={(data.securityFeatures || []).includes(feature.id)}
              onChange={() => toggleFeature(feature.id)}
            />
            <h3>{feature.name}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
      
      <div className="wizard-buttons">
        <button onClick={prevStep}>Back</button>
        <button className="wizard-button" onClick={nextStep}>
          Continue
        </button>
      </div>
    </div>
  );
};

const SetupInstructions: React.FC<WizardStepProps> = ({ data, prevStep }) => {
  const generateInstructions = () => {
    let instructions = [];
    
    // Platform-specific setup
    switch (data.platform) {
      case 'web':
        instructions.push('npm install @protekt/sdk');
        instructions.push('Configure Protekt SDK in your web app');
        break;
      case 'mobile':
        instructions.push('npm install @protekt/react-native');
        instructions.push('Configure Protekt for mobile platforms');
        break;
      case 'api':
        instructions.push('npm install @protekt/server');
        instructions.push('Set up machine-to-machine authentication');
        break;
      case 'spa':
        instructions.push('npm install @protekt/sdk');
        instructions.push('Configure for single-page application');
        break;
    }
    
    // Authentication type setup
    switch (data.authType) {
      case 'social':
        instructions.push('Configure social login providers');
        break;
      case 'sso':
        instructions.push('Set up SAML/OAuth enterprise providers');
        break;
      case 'passwordless':
        instructions.push('Configure magic links and WebAuthn');
        break;
    }
    
    // Security features setup
    if (data.securityFeatures?.includes('mfa')) {
      instructions.push('Enable multi-factor authentication');
    }
    if (data.securityFeatures?.includes('rbac')) {
      instructions.push('Configure role-based access control');
    }
    
    return instructions;
  };

  return (
    <div className="wizard-step">
      <h2>Setup Instructions</h2>
      <p>Based on your selections, here are the steps to get started:</p>
      
      <div className="instructions">
        <ol>
          {generateInstructions().map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
      
      <div className="wizard-buttons">
        <button onClick={prevStep}>Back</button>
        <a href={`/tutorials/${data.platform === 'web' ? 'first-integration' : data.platform === 'mobile' ? 'mobile-app' : 'server-to-server'}`} className="wizard-button">
          View Detailed Guide
        </a>
      </div>
    </div>
  );
};

const InteractiveWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardData, setWizardData] = useState({});

  const steps: WizardStep[] = [
    {
      id: 'platform',
      title: 'Platform Selection',
      description: 'Choose your application type',
      component: PlatformSelection
    },
    {
      id: 'auth-type',
      title: 'Authentication Type',
      description: 'Select authentication method',
      component: AuthenticationType
    },
    {
      id: 'security',
      title: 'Security Features',
      description: 'Choose security features',
      component: SecurityFeatures
    },
    {
      id: 'instructions',
      title: 'Setup Instructions',
      description: 'Get your setup guide',
      component: SetupInstructions
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="interactive-wizard">
      <div className="wizard-header">
        <h1>Protekt Setup Wizard</h1>
        <div className="wizard-progress">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`progress-step ${index <= currentStep ? 'active' : ''}`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
      
      <div className="wizard-content">
        <CurrentStepComponent
          data={wizardData}
          setData={setWizardData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      </div>
    </div>
  );
};

export default InteractiveWizard; 